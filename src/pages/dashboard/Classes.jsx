import { useState, useEffect } from 'react';
import { Plus, Search, Loader2, X, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';
import { useToastStore } from '../../store/toast';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteClass, setDeleteClass] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', level: '', stream: '', academicYear: new Date().getFullYear() });
  const toast = useToastStore();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes');
      setClasses(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedClass) {
        await api.put(`/classes/${selectedClass.id}`, formData);
        toast.success('Class updated');
      } else {
        await api.post('/classes', formData);
        toast.success('Class created');
      }
      fetchClasses();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save class');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/classes/${deleteClass.id}`);
      toast.success('Class deleted');
      fetchClasses();
    } catch (error) {
      toast.error('Failed to delete class');
    } finally {
      setDeleteClass(null);
    }
  };

  const openNewModal = () => {
    setSelectedClass(null);
    setFormData({ name: '', level: '', stream: '', academicYear: new Date().getFullYear() });
    setShowModal(true);
  };

  const openEditModal = (cls) => {
    setSelectedClass(cls);
    setFormData({
      name: cls.name || '',
      level: cls.level || '',
      stream: cls.stream || '',
      academicYear: cls.academicYear || new Date().getFullYear()
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClass(null);
  };

  const levelColors = {
    creche: 'bg-pink-100 text-pink-700',
    kg: 'bg-purple-100 text-purple-700',
    primary: 'bg-blue-100 text-blue-700',
    jhs: 'bg-green-100 text-green-700'
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Classes</h1>
          <p className="text-slate-600">Manage class levels</p>
        </div>
        <button onClick={openNewModal} className="btn-primary">
          <Plus className="w-5 h-5" />
          Add Class
        </button>
      </div>

      <div className="card p-0">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
          </div>
        ) : classes.length === 0 ? (
          <EmptyState type="folder" title="No classes found" description="Add your first class to get started" action={{ label: 'Add Class', onClick: openNewModal }} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {classes.map((cls) => (
              <div key={cls.id} className="bg-white border-2 border-slate-100 rounded-xl p-4 hover:border-primary-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{cls.name}</h3>
                    <p className="text-sm text-slate-500">Year {cls.academicYear}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[cls.level] || 'bg-slate-100 text-slate-700'}`}>
                    {cls.level}
                  </span>
                </div>
                {cls.stream && (
                  <p className="text-sm text-slate-600 mb-3">{cls.stream} Stream</p>
                )}
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditModal(cls)} className="flex-1 btn-secondary py-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button onClick={() => setDeleteClass({ id: cls._id || cls.id })} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title={selectedClass ? 'Edit Class' : 'Add Class'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Class Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input" required placeholder="e.g., Primary 1" />
          </div>
          <div>
            <label className="label">Level *</label>
            <select name="level" value={formData.level} onChange={handleChange} className="input" required>
              <option value="">Select level</option>
              <option value="creche">Creche</option>
              <option value="kg">KG</option>
              <option value="primary">Primary</option>
              <option value="jhs">JHS</option>
            </select>
          </div>
          <div>
            <label className="label">Stream</label>
            <input type="text" name="stream" value={formData.stream} onChange={handleChange} className="input" placeholder="e.g., Science, Arts" />
          </div>
          <div>
            <label className="label">Academic Year *</label>
            <input type="number" name="academicYear" value={formData.academicYear} onChange={handleChange} className="input" required />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : selectedClass ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteClass}
        onClose={() => setDeleteClass(null)}
        onConfirm={handleDelete}
        title="Delete Class"
        message={`Are you sure you want to delete ${deleteClass?.name}? This may affect students assigned to this class.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}