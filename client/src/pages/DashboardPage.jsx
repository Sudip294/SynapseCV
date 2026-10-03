import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { 
  Plus, 
  FileText, 
  Edit3, 
  Copy, 
  Trash2, 
  Sparkles, 
  Clock, 
  Briefcase, 
  Loader2, 
  Search,
  ExternalLink,
  X,
  Wand2
} from 'lucide-react';
import toast from 'react-hot-toast';

// Common job roles for quick selection
const QUICK_ROLES = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'DevOps Engineer',
  'Product Manager', 'UX/UI Designer', 'Graphic Designer', 'Marketing Manager',
  'Business Analyst', 'Project Manager', 'Sales Manager', 'HR Manager',
  'Content Writer', 'Financial Analyst', 'Cybersecurity Analyst', 'Cloud Architect',
];

export const DashboardPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // New Resume Modal state
  const [showNewResumeModal, setShowNewResumeModal] = useState(false);
  const [newResumeRole, setNewResumeRole] = useState('');
  const [roleInputFocused, setRoleInputFocused] = useState(false);
  const [roleFilter, setRoleFilter] = useState('');

  const templateParam = searchParams.get('template');

  const fetchResumes = async () => {
    try {
      const res = await api.get('/resumes');
      if (res.data.success) {
        setResumes(res.data.resumes);
      }
    } catch (error) {
      toast.error('Failed to load your resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const openNewResumeModal = () => {
    setNewResumeRole('');
    setRoleFilter('');
    setShowNewResumeModal(true);
  };

  const handleCreateResume = async () => {
    const role = newResumeRole.trim();
    if (!role) {
      toast.error('Please enter your target role or position.');
      return;
    }

    const templateId = templateParam || 'executive';
    const resumeTitle = `${role} Resume`;

    setCreating(true);
    try {
      const res = await api.post('/resumes', {
        title: resumeTitle,
        targetRole: role,
        templateId,
      });
      if (res.data.success) {
        toast.success(`"${resumeTitle}" created successfully!`);
        setShowNewResumeModal(false);
        navigate(`/builder/${res.data.resume._id}`);
      }
    } catch (error) {
      toast.error('Failed to create resume');
    } finally {
      setCreating(false);
    }
  };

  const handleDuplicate = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await api.post(`/resumes/${id}/duplicate`);
      if (res.data.success) {
        toast.success('Resume duplicated');
        fetchResumes();
      }
    } catch (error) {
      toast.error('Failed to duplicate resume');
    }
  };

  const handleDelete = async (id, title, e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await api.delete(`/resumes/${id}`);
      if (res.data.success) {
        toast.success('Resume deleted');
        setResumes((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  const filteredResumes = resumes.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.targetRole?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuickRoles = QUICK_ROLES.filter(r =>
    r.toLowerCase().includes(roleFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">My Resumes</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your structured ATS-optimized resume documents.
          </p>
        </div>

        <button
          onClick={openNewResumeModal}
          disabled={creating}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>Create New Resume</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      {resumes.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by resume title or target role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
      )}

      {/* RESUME CARDS GRID */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <p className="text-xs text-slate-500">Fetching your documents...</p>
        </div>
      ) : filteredResumes.length === 0 ? (
        /* EMPTY STATE */
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Resumes Found</h3>
            <p className="text-xs text-slate-500">
              {searchQuery ? 'No resumes matching your search filter.' : "You haven't created any resumes yet. Start building your ATS resume now!"}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={openNewResumeModal}
              className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create My First Resume</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <div
              key={resume._id}
              onClick={() => navigate(`/builder/${resume._id}`)}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {resume.templateId || 'Executive'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                    {resume.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{resume.targetRole || 'General'}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleDuplicate(resume._id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Duplicate Resume"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(resume._id, resume.title, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete Resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────── */}
      {/* NEW RESUME ROLE MODAL */}
      {/* ─────────────────────────────────────────────────── */}
      {showNewResumeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowNewResumeModal(false); }}
        >
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Create New Resume</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">AI will tailor suggestions to your role</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewResumeModal(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-5">
              
              {/* Role Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-600" />
                  Target Role / Job Position
                </label>
                <input
                  type="text"
                  placeholder="e.g. Graphic Designer, Data Scientist, Marketing Manager..."
                  value={newResumeRole}
                  onChange={(e) => {
                    setNewResumeRole(e.target.value);
                    setRoleFilter(e.target.value);
                  }}
                  onFocus={() => setRoleInputFocused(true)}
                  onBlur={() => setTimeout(() => setRoleInputFocused(false), 150)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleCreateResume(); }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                  autoFocus
                />
                <p className="text-[11px] text-slate-400">
                  Resume will be saved as: <span className="font-semibold text-brand-600 dark:text-brand-400">{newResumeRole.trim() ? `${newResumeRole.trim()} Resume` : '(your role) Resume'}</span>
                </p>
              </div>

              {/* Quick Role Pills */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Quick Select</p>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {filteredQuickRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setNewResumeRole(role);
                        setRoleFilter(role);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        newResumeRole === role
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowNewResumeModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateResume}
                disabled={!newResumeRole.trim() || creating}
                className="flex-1 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Creating...</span></>
                ) : (
                  <><Sparkles className="w-4 h-4" /><span>Create Resume</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
