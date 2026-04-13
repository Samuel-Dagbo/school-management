import { useState, useEffect } from 'react';
import { Search, Check, X, Loader2 } from 'lucide-react';
import api from '../../services/api';

export default function AdmissionsList() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAdmissions();
  }, [filter]);

  const fetchAdmissions = async () => {
    try {
      const status = filter !== 'all' ? filter : undefined;
      const response = await api.get(`/admissions?status=${status}`);
      setAdmissions(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await api.put(`/admissions/${id}/status`, { status });
      fetchAdmissions();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admissions</h1>
          <p className="text-slate-600">Manage admission applications</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'accepted', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="card p-0">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
          </div>
        ) : admissions.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Applied Class</th>
                  <th>Parent</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map((admission) => (
                  <tr key={admission._id || admission.id}>
                    <td className="font-medium">{admission.firstName} {admission.lastName}</td>
                    <td className="capitalize">{admission.gender}</td>
                    <td>{admission.appliedClass}</td>
                    <td>{admission.parentName}</td>
                    <td>{admission.parentPhone}</td>
                    <td>
                      <span
                        className={`badge ${
                          admission.status === 'accepted'
                            ? 'badge-success'
                            : admission.status === 'rejected'
                            ? 'badge-danger'
                            : 'badge-warning'
                        }`}
                      >
                        {admission.status}
                      </span>
                    </td>
                    <td>
                      {admission.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStatus(admission._id || admission.id, 'accepted')}
                            className="p-2 hover:bg-green-50 rounded-lg"
                            title="Accept"
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleStatus(admission._id || admission.id, 'rejected')}
                            className="p-2 hover:bg-red-50 rounded-lg"
                            title="Reject"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-slate-600">No applications found</p>
          </div>
        )}
      </div>
    </div>
  );
}