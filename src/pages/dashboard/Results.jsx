import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import { FileText, Download, Eye, Search, Loader2, Plus, X, Check, Lock, Unlock } from 'lucide-react';
import api from '../../services/api';

export default function Results() {
  const { user } = useAuthStore();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({ classId: '', subjectId: '', termId: '', sessionId: '' });
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState('view');

  useEffect(() => {
    fetchTerms();
  }, []);

  useEffect(() => {
    if (selectedTerm) {
      fetchResults();
    }
  }, [selectedTerm]);

  useEffect(() => {
    if (mode === 'view') {
      fetchResults();
    } else if (mode === 'upload') {
      fetchDropdownData();
    }
  }, [mode]);

  const fetchTerms = async () => {
    try {
      const response = await api.get('/sessions');
      const sessionsData = response.data.data || [];
      if (sessionsData.length > 0) {
        const activeSession = sessionsData.find(s => s.isActive) || sessionsData[0];
        setTerms(activeSession.terms || []);
        setSessions(sessionsData);
        if (activeSession.terms?.length > 0) {
          setSelectedTerm(activeSession.terms[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch terms:', error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [classesRes] = await Promise.all([api.get('/classes')]);
      setClasses(classesRes.data.data || []);
    } catch (error) {
      console.error('Failed to fetch dropdowns:', error);
    }
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      let endpoint = '/results';
      if (user?.role === 'student') {
        endpoint = `/results/student/${user.id}?termId=${selectedTerm}`;
      } else if (user?.role === 'teacher') {
        endpoint = `/results/my-class?termId=${selectedTerm}`;
      } else if (user?.role === 'admin') {
        endpoint = `/results?termId=${selectedTerm}`;
      }
      const response = await api.get(endpoint);
      setResults(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsForUpload = async () => {
    try {
      const response = await api.get(`/students?classId=${uploadData.classId}`);
      setStudents(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const fetchSubjectsForUpload = async () => {
    if (!uploadData.classId) return;
    try {
      const response = await api.get(`/subjects?classId=${uploadData.classId}`);
      setSubjects(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    }
  };

  useEffect(() => {
    if (uploadData.classId) {
      fetchSubjectsForUpload();
      fetchStudentsForUpload();
    }
  }, [uploadData.classId]);

  const handleScoreChange = (studentId, value) => {
    const score = Math.min(100, Math.max(0, parseInt(value) || 0));
    setScores(prev => ({ ...prev, [studentId]: score }));
  };

  const handleSubmitResults = async () => {
    setSaving(true);
    try {
      const resultsData = Object.entries(scores).map(([studentId, score]) => ({
        studentId,
        subjectId: uploadData.subjectId,
        termId: uploadData.termId,
        score,
        grade: calculateGrade(score)
      }));
      
      for (const data of resultsData) {
        await api.post('/results', data);
      }
      
      setShowUploadModal(false);
      setScores({});
      setUploadData({ classId: '', subjectId: '', termId: '', sessionId: '' });
      fetchResults();
    } catch (error) {
      console.error('Failed to submit results:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePublishResult = async (resultId) => {
    try {
      await api.put(`/results/${resultId}`, { isPublished: true });
      fetchResults();
    } catch (error) {
      console.error('Failed to publish result:', error);
    }
  };

  const calculateGrade = (score) => {
    if (score >= 90) return 'A1';
    if (score >= 80) return 'A2';
    if (score >= 70) return 'B2';
    if (score >= 60) return 'B3';
    if (score >= 50) return 'C4';
    if (score >= 40) return 'C5';
    if (score >= 30) return 'D6';
    return 'F9';
  };

  const getGradeColor = (grade) => {
    if (['A1', 'A2'].includes(grade)) return 'text-green-600';
    if (['B2', 'B3'].includes(grade)) return 'text-blue-600';
    if (['C4', 'C5'].includes(grade)) return 'text-amber-600';
    return 'text-red-600';
  };

  const isTeacher = user?.role === 'teacher';
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isTeacher ? 'Results' : isStudent ? 'My Results' : 'Results Management'}
          </h1>
          <p className="text-slate-600">
            {isStudent ? 'View your academic results' : isTeacher ? 'Upload student results' : 'Manage all results'}
          </p>
        </div>
        <div className="flex gap-3">
          {(isTeacher || isAdmin) && (
            <div className="flex rounded-xl overflow-hidden border border-slate-200">
              <button
                onClick={() => setMode('view')}
                className={`px-4 py-2 text-sm font-medium ${mode === 'view' ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                View
              </button>
              <button
                onClick={() => setMode('upload')}
                className={`px-4 py-2 text-sm font-medium ${mode === 'upload' ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Upload
              </button>
            </div>
          )}
        </div>
      </div>

      {!isStudent && (
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="input w-auto"
          >
            <option value="">Select Term</option>
            {terms.map(term => (
              <option key={term.id} value={term.id}>{term.name}</option>
            ))}
          </select>
        </div>
      )}

      {mode === 'upload' && isTeacher && (
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Upload New Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="label">Class *</label>
              <select
                value={uploadData.classId}
                onChange={(e) => setUploadData({ ...uploadData, classId: e.target.value, subjectId: '' })}
                className="input"
              >
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Subject *</label>
              <select
                value={uploadData.subjectId}
                onChange={(e) => setUploadData({ ...uploadData, subjectId: e.target.value })}
                className="input"
                disabled={!uploadData.classId}
              >
                <option value="">Select Subject</option>
                {subjects.map(subj => (
                  <option key={subj.id} value={subj.id}>{subj.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Term *</label>
              <select
                value={uploadData.termId}
                onChange={(e) => setUploadData({ ...uploadData, termId: e.target.value })}
                className="input"
              >
                <option value="">Select Term</option>
                {terms.map(term => (
                  <option key={term.id} value={term.id}>{term.name}</option>
                ))}
              </select>
            </div>
          </div>

          {uploadData.classId && uploadData.subjectId && uploadData.termId && students.length > 0 && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-medium mb-4">Enter Scores ({students.length} students)</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Score (0-100)</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id}>
                        <td className="font-medium">{student.studentId}</td>
                        <td>{student.firstName} {student.lastName}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={scores[student.id] || ''}
                            onChange={(e) => handleScoreChange(student.id, e.target.value)}
                            className="input w-24"
                            placeholder="0-100"
                          />
                        </td>
                        <td className={`font-semibold ${getGradeColor(calculateGrade(scores[student.id] || 0))}`}>
                          {scores[student.id] ? calculateGrade(scores[student.id]) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSubmitResults}
                  disabled={saving || Object.keys(scores).length === 0}
                  className="btn-primary"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                  Submit Results
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card p-0">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
          </div>
        ) : results.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {isTeacher && <th>Student ID</th>}
                  {isAdmin && <th>Student</th>}
                  <th>Subject</th>
                  {!isStudent && <th>Class</th>}
                  {!isStudent && <th>Term</th>}
                  <th>Score</th>
                  <th>Grade</th>
                  {!isStudent && <th>Status</th>}
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    {isTeacher && <td className="font-medium">{result.student?.studentId}</td>}
                    {isAdmin && <td>{result.student?.firstName} {result.student?.lastName}</td>}
                    <td className="font-medium">{result.subject?.name}</td>
                    {!isStudent && <td>{result.student?.class?.name}</td>}
                    {!isStudent && <td>{result.term?.name}</td>}
                    <td>{result.score}%</td>
                    <td className={`font-semibold ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </td>
                    {!isStudent && (
                      <td>
                        {result.isPublished ? (
                          <span className="badge-success flex items-center gap-1">
                            <Unlock className="w-3 h-3" /> Published
                          </span>
                        ) : (
                          <span className="badge-warning flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </td>
                    )}
                    {isAdmin && (
                      <td>
                        {!result.isPublished ? (
                          <button
                            onClick={() => handlePublishResult(result._id || result.id)}
                            className="btn-secondary text-sm py-1"
                          >
                            Publish
                          </button>
                        ) : (
                          <span className="text-green-600 text-sm">Published</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No results available</p>
            {isStudent && <p className="text-sm text-slate-500 mt-1">Results will appear here once published</p>}
          </div>
        )}
      </div>
    </div>
  );
}