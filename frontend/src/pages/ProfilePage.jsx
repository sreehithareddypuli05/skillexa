import { useState } from 'react';
import { User, Mail, Phone, Edit3, Save, X, BookOpen, Award, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ first_name: user?.name?.split(' ')[0] || '', last_name: user?.name?.split(' ')[1] || '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await authAPI.updateProfile(form);
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch {}
    setSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-5 text-sm flex items-center gap-2">
              ✅ Profile updated successfully!
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              <div className="card p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <h2 className="font-bold text-xl text-gray-900">{user?.name || 'Student'}</h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold capitalize">
                  {user?.role || 'Student'}
                </span>
              </div>

              <div className="card p-4 space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 text-blue-500" /> My Courses
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg text-sm text-gray-600">
                  <Award className="w-4 h-4 text-blue-500" /> Certificates
                </div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>

            {/* Profile Form */}
            <div className="md:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-4 py-2">
                      <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                    {editing ? (
                      <input className="input-field" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} />
                    ) : (
                      <p className="text-gray-900 font-medium py-3">{user?.name?.split(' ')[0] || '—'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                    {editing ? (
                      <input className="input-field" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} />
                    ) : (
                      <p className="text-gray-900 font-medium py-3">{user?.name?.split(' ')[1] || '—'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                  <p className="text-gray-900 font-medium py-3 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" /> {user?.email}
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Not editable</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  {editing ? (
                    <input className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 xxxxx xxxxx" />
                  ) : (
                    <p className="text-gray-900 font-medium py-3 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" /> {form.phone || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}