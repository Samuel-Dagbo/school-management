import { useState, useEffect } from 'react';
import { Loader2, ArrowUpCircle, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

export default function Promotions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState(false);
  const [selectedSession, setSelectedSession] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get('/sessions');
      const sessionsData = response.data.data || [];
      setSessions(sessionsData);
      if (sessionsData.length > 0) {
        const activeSession = sessionsData.find(s => s.isActive) || sessionsData[0];
        setSelectedSession(activeSession.id);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async () => {
    if (!confirm('Are you sure you want to promote all students to the next class? This action cannot be undone.')) {
      return;
    }

    setPromoting(true);
    setResult(null);
    try {
      const response = await api.post('/promote/students', { sessionId: selectedSession });
      setResult(response.data);
      fetchSessions();
    } catch (error) {
      console.error('Failed to promote students:', error);
      setResult({ success: false, message: error.response?.data?.message || 'Promotion failed' });
    } finally {
      setPromoting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Student Promotion</h1>
        <p className="text-slate-600">Promote students to the next class level</p>
      </div>

      <div className="card mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">End of Session Promotion</h2>
            <p className="text-slate-600 mb-4">
              This will automatically move all students to their next class level:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Creche → KG 1</li>
              <li>KG 1 → KG 2</li>
              <li>KG 2 → Primary 1</li>
              <li>Primary 1 → Primary 2</li>
              <li>...</li>
              <li>JHS 2 → JHS 3</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="mb-6">
          <label className="label">Current Academic Session</label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="input"
            disabled={loading}
          >
            <option value="">Select Session</option>
            {sessions.map(session => (
              <option key={session.id} value={session.id}>
                {session.name} {session.isActive && '(Active)'}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handlePromote}
          disabled={promoting || !selectedSession}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {promoting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Promoting...
            </>
          ) : (
            <>
              <ArrowUpCircle className="w-5 h-5" />
              Promote All Students
            </>
          )}
        </button>

        {result && (
          <div className={`mt-4 p-4 rounded-xl ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {result.message}
          </div>
        )}
      </div>
    </div>
  );
}