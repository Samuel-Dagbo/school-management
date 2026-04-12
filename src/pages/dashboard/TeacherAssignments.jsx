import { useState, useEffect } from 'react';
import { Plus, Loader2, X, Trash2, User, BookOpen } from 'lucide-react';
import api from '../../services/api';

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ teacherId: '', subjectId: '', classId: '', sessionId: '' });
  const [saving, setSaving] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  const fetchData = async () => {
    try {
      const [assignmentsRes, teachersRes, classesRes, sessionsRes] = await Promise.all([
        api.get('/teachers/assignments/all'),
        api.get('/teachers'),
        api.get('/classes'),
        api.get('/sessions')
      ]);
      setAssignments(assignmentsRes.data.data || []);
      setTeachers(teachersRes.data.data || []);
      setClasses(classesRes.data.data || []);
      setSessions(sessionsRes.data.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const response = await api.get(`/subjects?classId=${classId}`);
      setSubjects(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/teachers/assignments', formData);
      fetchData();
      setShowModal(false);
      setFormData({ teacherId: '', subjectId: '', classId: '', sessionId: '' });
      setSelectedClass('');
    } catch (error) {
      console.error('Failed to create assignment:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this assignment?')) return;
    try {
      await api.delete(`/teachers/assignments/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete assignment:', error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teacher Assignments</h1>
          <p className="text-slate-600">Assign teachers to classes and subjects</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus className="w-5 h-5" />
          Assign Teacher
        </button>
      </div>

      <div className="card p-0">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
          </div>
        ) : assignments.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Employee ID</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="font-medium">
                      {assignment.teacher?.firstName} {assignment.teacher?.lastName}
                    </td>
                    <td>{assignment.teacher?.employeeId}</td>
                    <td>{assignment.class?.name}</td>
                    <td>
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-500" />
                        {assignment.subject?.name}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(assignment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <User className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600">No teacher assignments yet</p>
            <p className="text-sm text-slate-500">Add teachers to classes and subjects</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Assign Teacher</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Teacher *</label>
                <select
                  value={formData.teacherId}
                  onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Select teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.firstName} {teacher.lastName} ({teacher.employeeId})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Class *</label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setFormData({ ...formData, classId: e.target.value, subjectId: '' });
                  }}
                  className="input"
                  required
                >
                  <option value="">Select class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Subject *</label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  className="input"
                  required
                  disabled={!selectedClass}
                >
                  <option value="">Select subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Session *</label>
                <select
                  value={formData.sessionId}
                  onChange={(e) => setFormData({ ...formData, sessionId: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Select session</option>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.name} {session.isActive && '(Active)'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}