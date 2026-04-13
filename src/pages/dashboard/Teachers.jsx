import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Loader2, UserPlus, X, Mail, Phone, Award } from 'lucide-react';
import api from '../../services/api';
import { useToastStore } from '../../store/toast';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deleteTeacher, setDeleteTeacher] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    address: '',
    qualification: ''
  });
  const toast = useToastStore();

  useEffect(() => {
    fetchTeachers();
  }, [search]);

  const fetchTeachers = async () => {
    try {
      const response = await api.get(`/teachers?search=${search}&limit=100`);
      setTeachers(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load teachers');
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
      if (selectedTeacher) {
        await api.put(`/teachers/${selectedTeacher.id}`, formData);
        toast.success('Teacher updated');
      } else {
        await api.post('/teachers', formData);
        toast.success('Teacher created');
      }
      fetchTeachers();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save teacher');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/teachers/${deleteTeacher.id}`);
      toast.success('Teacher deleted');
      fetchTeachers();
    } catch (error) {
      toast.error('Failed to delete teacher');
    } finally {
      setDeleteTeacher(null);
    }
  };

  const openNewModal = () => {
    setSelectedTeacher(null);
    setFormData({ employeeId: '', firstName: '', lastName: '', gender: '', phone: '', address: '', qualification: '' });
    setShowModal(true);
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      employeeId: teacher.employeeId || '',
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      gender: teacher.gender || '',
      phone: teacher.phone || '',
      address: teacher.address || '',
      qualification: teacher.qualification || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
  };

  const getInitials = (teacher) => {
    return `${teacher.firstName?.[0] || ''}${teacher.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teachers</h1>
          <p className="text-slate-600">Manage teacher records</p>
        </div>
        <button onClick={openNewModal} className="btn-primary">
          <Plus className="w-5 h-5" />
          Add Teacher
        </button>
      </div>

      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-12"
          />
        </div>
      </div>

      <div className="card p-0">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
          </div>
        ) : teachers.length === 0 ? (
          <EmptyState type="users" title="No teachers found" description="Add your first teacher to get started" action={{ label: 'Add Teacher', onClick: openNewModal }} />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Employee ID</th>
                  <th>Qualification</th>
                  <th>Contact</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary-600">{getInitials(teacher)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{teacher.firstName} {teacher.lastName}</p>
                          <p className="text-xs text-slate-500 capitalize">{teacher.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-sm">{teacher.employeeId}</td>
                    <td>{teacher.qualification || '-'}</td>
                    <td>
                      <div className="flex flex-col text-sm">
                        {teacher.phone && <span className="text-slate-600">{teacher.phone}</span>}
                        {!teacher.phone && <span className="text-slate-400">-</span>}
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(teacher)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                        <button onClick={() => setDeleteTeacher({ id: teacher._id || teacher.id })} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title={selectedTeacher ? 'Edit Teacher' : 'Add Teacher'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Employee ID</label>
              <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} className="input" required placeholder="TCH001" />
            </div>
            <div>
              <label className="label">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="input" required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input" required />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input" required />
            </div>
          </div>
          <div>
            <label className="label">Qualification</label>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="input" placeholder="B.Ed, Degree, etc." />
          </div>
          <div>
            <label className="label">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input" placeholder="+233..." />
          </div>
          <div>
            <label className="label">Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} className="input" rows="2"></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : selectedTeacher ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTeacher}
        onClose={() => setDeleteTeacher(null)}
        onConfirm={handleDelete}
        title="Delete Teacher"
        message={`Are you sure you want to delete ${deleteTeacher?.firstName} ${deleteTeacher?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}