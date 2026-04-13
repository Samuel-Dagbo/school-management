import { useState, useEffect } from 'react';
import { Plus, Loader2, X, Check, Calendar, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';
import { useToastStore } from '../../store/toast';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [deleteSession, setDeleteSession] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', startDate: '', endDate: '', isActive: false });
  const toast = useToastStore();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get('/sessions');
      setSessions(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedSession) {
        await api.put(`/sessions/${selectedSession.id}`, formData);
        toast.success('Session updated');
      } else {
        await api.post('/sessions', formData);
        toast.success('Session created');
      }
      fetchSessions();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save session');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/sessions/${deleteSession.id}`);
      toast.success('Session deleted');
      fetchSessions();
    } catch (error) {
      toast.error('Failed to delete session');
    } finally {
      setDeleteSession(null);
    }
  };

  const setActive = async (session) => {
    try {
      await api.put(`/sessions/${session.id}`, { isActive: true });
      toast.success('Active session set');
      fetchSessions();
    } catch (error) {
      toast.error('Failed to set active session');
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const openNewModal = () => {
    setSelectedSession(null);
    setFormData({ name: '', startDate: '', endDate: '', isActive: false });
    setShowModal(true);
  };

  const openEditModal = (session) => {
    setSelectedSession(session);
    setFormData({
      name: session.name || '',
      startDate: session.startDate?.split('T')[0] || '',
      endDate: session.endDate?.split('T')[0] || '',
      isActive: session.isActive || false
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSession(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sessions & Terms</h1>
          <p className="text-slate-600">Manage academic sessions</p>
        </div>
        <button onClick={openNewModal} className="btn-primary">
          <Plus className="w-5 h-5" />
          Add Session
        </button>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="card p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
          </div>
        ) : sessions.length === 0 ? (
          <EmptyState type="calendar" title="No sessions found" description="Add your first academic session" action={{ label: 'Add Session', onClick: openNewModal }} />
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${session.isActive ? 'bg-green-500' : 'bg-slate-300'}`} />
                  <h3 className="text-lg font-semibold text-slate-900">{session.name}</h3>
                  {session.isActive && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!session.isActive && (
                    <button onClick={() => setActive(session)} className="btn-secondary py-2">
                      <Check className="w-4 h-4" />
                      Set Active
                    </button>
                  )}
                  <button onClick={() => openEditModal(session)} className="p-2 hover:bg-slate-100 rounded-lg">
                    <Edit className="w-4 h-4 text-slate-600" />
                  </button>
                  <button onClick={() => setDeleteSession(session)} className="p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(session.startDate)} - {formatDate(session.endDate)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title={selectedSession ? 'Edit Session' : 'Add Session'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Session Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input" required placeholder="e.g., 2025-2026" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Start Date *</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input" required />
            </div>
            <div>
              <label className="label">End Date *</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input" required />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} className="w-4 h-4 rounded text-primary-600" />
            <label htmlFor="isActive" className="text-sm text-slate-700">Set as active session</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : selectedSession ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteSession}
        onClose={() => setDeleteSession(null)}
        onConfirm={handleDelete}
        title="Delete Session"
        message={`Are you sure you want to delete ${deleteSession?.name}?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}