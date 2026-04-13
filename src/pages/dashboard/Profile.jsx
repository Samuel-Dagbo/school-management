import { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { User, Mail, Phone, MapPin, BookOpen, GraduationCap, Loader2, Save } from 'lucide-react';

export default function Profile() {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
    }, 1000);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-600">Manage your account information</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)} className="btn-primary">
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setEditing(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">First Name</label>
                    <p className="text-slate-900 font-medium">{user?.firstName}</p>
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <p className="text-slate-900 font-medium">{user?.lastName}</p>
                  </div>
                </div>
                <div>
                  <label className="label">Email</label>
                  <p className="text-slate-900 font-medium">{user?.email}</p>
                </div>
                <div>
                  <label className="label">Role</label>
                  <p className="text-slate-900 font-medium capitalize">{user?.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card text-center">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-primary-600">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-slate-600 capitalize">{user?.role}</p>
          </div>

          <div className="card mt-6">
            <h3 className="font-semibold text-slate-900 mb-4">Account Security</h3>
            <button className="btn-secondary w-full justify-start">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}