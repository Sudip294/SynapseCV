import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { TemplateEngine } from '../components/templates/TemplateEngine';
import { TemplateGalleryModal } from '../components/templates/TemplateGalleryModal';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Edit3, 
  Plus, 
  Trash2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Globe, 
  Sparkles, 
  Loader2, 
  Layout,
  Wand2,
  Printer,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ResumeBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [mobileView, setMobileView] = useState('editor');
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const fetchResume = async () => {
    try {
      const res = await api.get(`/resumes/${id}`);
      if (res.data.success) {
        setResume(res.data.resume);
      }
    } catch (error) {
      toast.error('Failed to load resume');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const handleSave = async (customResumeObj = null) => {
    const target = customResumeObj || resume;
    if (!target) return;

    setSaving(true);
    try {
      const res = await api.put(`/resumes/${id}`, target);
      if (res.data.success) {
        setResume(res.data.resume);
        toast.success('Resume saved successfully');
      }
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    toast.success('Opening print dialog... Select "Save as PDF" to download vector PDF.');
    window.print();
  };

  const handleSelectTemplate = (templateId) => {
    const updated = { ...resume, templateId };
    setResume(updated);
    handleSave(updated);
  };

  // AI Summary Enhancer
  const handleAiEnhanceSummary = async () => {
    setAiLoading(true);
    try {
      const res = await api.post('/ai/enhance-summary', {
        summary: resume.summary,
        targetRole: resume.personalInfo?.title || resume.targetRole || 'Software Engineer',
      });
      if (res.data.success && res.data.data.enhancedSummary) {
        setResume((prev) => ({ ...prev, summary: res.data.data.enhancedSummary }));
        toast.success('Executive summary optimized with Gemini AI!');
      }
    } catch (error) {
      toast.error('AI Summary optimization failed');
    } finally {
      setAiLoading(false);
    }
  };

  // AI Bullet Enhancer
  const handleAiEnhanceBullet = async (index) => {
    const exp = resume.experience[index];
    if (!exp) return;

    setAiLoading(true);
    try {
      const res = await api.post('/ai/enhance-bullet', {
        bulletText: exp.description,
        position: exp.position,
        targetRole: resume.personalInfo?.title || 'Software Engineer',
      });
      if (res.data.success && res.data.data.enhancedBullet) {
        updateExperience(index, 'description', res.data.data.enhancedBullet);
        toast.success('Experience bullets improved with Gemini AI!');
      }
    } catch (error) {
      toast.error('AI Bullet optimization failed');
    } finally {
      setAiLoading(false);
    }
  };

  // AI Skill Recommender
  const handleAiSuggestSkills = async () => {
    setAiLoading(true);
    try {
      const allCurrentSkills = (resume.skills || []).flatMap((s) => s.items || []);
      const res = await api.post('/ai/suggest-skills', {
        targetRole: resume.personalInfo?.title || resume.targetRole || 'Software Engineer',
        existingSkills: allCurrentSkills,
      });
      if (res.data.success && res.data.data.suggestedSkills) {
        setSuggestedSkills(res.data.data.suggestedSkills);
        toast.success('Fetched AI skill recommendations');
      }
    } catch (error) {
      toast.error('Failed to fetch skill recommendations');
    } finally {
      setAiLoading(false);
    }
  };

  const addSuggestedSkillToCategory = (skillName) => {
    if (!resume.skills || resume.skills.length === 0) {
      setResume((prev) => ({
        ...prev,
        skills: [{ category: 'Core Skills', items: [skillName] }],
      }));
    } else {
      setResume((prev) => {
        const updated = [...prev.skills];
        updated[0] = {
          ...updated[0],
          items: [...(updated[0].items || []), skillName],
        };
        return { ...prev, skills: updated };
      });
    }
    setSuggestedSkills((prev) => prev.filter((s) => s !== skillName));
    toast.success(`Added "${skillName}" to skills`);
  };

  // Helper update handlers
  const updatePersonalInfo = (field, value) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Experience handlers
  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const updateExperience = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const removeExperience = (index) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Education handlers
  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: '',
          degree: '',
          fieldOfStudy: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: '',
          description: '',
        },
      ],
    }));
  };

  const updateEducation = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const removeEducation = (index) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Skill category handlers
  const addSkillCategory = () => {
    setResume((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { category: 'New Category', items: ['Skill 1', 'Skill 2'] },
      ],
    }));
  };

  const updateSkillCategory = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.skills];
      if (field === 'items') {
        updated[index] = { ...updated[index], items: value.split(',').map((s) => s.trim()) };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, skills: updated };
    });
  };

  const removeSkillCategory = (index) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Project handlers
  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: '', description: '', technologies: [], link: '', github: '' },
      ],
    }));
  };

  const updateProject = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.projects];
      if (field === 'technologies') {
        updated[index] = { ...updated[index], technologies: value.split(',').map((t) => t.trim()) };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, projects: updated };
    });
  };

  const removeProject = (index) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading your resume workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      
      {/* TOP WORKSPACE BAR */}
      <header className="sticky top-16 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <input
              type="text"
              value={resume.title}
              onChange={(e) => setResume({ ...resume, title: e.target.value })}
              className="font-bold text-base bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none px-1 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Change Template Button */}
            <button
              onClick={() => setGalleryOpen(true)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Layout className="w-4 h-4 text-brand-600" />
              <span>Template: <strong className="capitalize">{resume.templateId || 'Executive'}</strong></span>
            </button>

            {/* Print / Export PDF Button */}
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Export PDF / Print</span>
            </button>

            {/* Mobile View Toggle */}
            <div className="flex md:hidden bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setMobileView('editor')}
                className={`px-3 py-1.5 rounded-lg ${mobileView === 'editor' ? 'bg-white dark:bg-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Editor
              </button>
              <button
                onClick={() => setMobileView('preview')}
                className={`px-3 py-1.5 rounded-lg ${mobileView === 'preview' ? 'bg-white dark:bg-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Preview
              </button>
            </div>

            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Resume</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN EDITOR & PREVIEW GRID */}
      <div className="max-w-7xl mx-auto w-full flex-grow grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-6">
        
        {/* LEFT PANEL: FORM EDITOR */}
        <div className={`md:col-span-6 lg:col-span-6 space-y-6 no-print ${mobileView === 'preview' ? 'hidden md:block' : 'block'}`}>
          
          {/* Section Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'personal', label: 'Personal', icon: User },
              { id: 'summary', label: 'Summary', icon: Edit3 },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'skills', label: 'Skills', icon: Wrench },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT PANELS */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* 1. PERSONAL INFORMATION */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-500 font-semibold mb-1 block">Full Name</label>
                    <input
                      type="text"
                      value={resume.personalInfo?.fullName || ''}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-semibold mb-1 block">Target Title</label>
                    <input
                      type="text"
                      value={resume.personalInfo?.title || ''}
                      onChange={(e) => updatePersonalInfo('title', e.target.value)}
                      placeholder="Senior Software Engineer"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-semibold mb-1 block">Email</label>
                    <input
                      type="email"
                      value={resume.personalInfo?.email || ''}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-semibold mb-1 block">Phone</label>
                    <input
                      type="text"
                      value={resume.personalInfo?.phone || ''}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-semibold mb-1 block">Location</label>
                    <input
                      type="text"
                      value={resume.personalInfo?.location || ''}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-semibold mb-1 block">LinkedIn URL</label>
                    <input
                      type="url"
                      value={resume.personalInfo?.linkedin || ''}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-semibold mb-1 block">GitHub URL</label>
                    <input
                      type="url"
                      value={resume.personalInfo?.github || ''}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-semibold mb-1 block">Portfolio Website</label>
                    <input
                      type="url"
                      value={resume.personalInfo?.website || ''}
                      onChange={(e) => updatePersonalInfo('website', e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. SUMMARY */}
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Professional Summary
                  </h3>
                  
                  <button
                    onClick={handleAiEnhanceSummary}
                    disabled={aiLoading}
                    className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold text-xs border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-brand-600" />}
                    <span>AI Improve Summary</span>
                  </button>
                </div>

                <textarea
                  rows={6}
                  value={resume.summary || ''}
                  onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                  placeholder="Summarize your core achievements, tech stack, and experience..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white leading-relaxed"
                />
              </div>
            )}

            {/* 3. WORK EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Work Experience</h3>
                  <button
                    onClick={addExperience}
                    className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Experience
                  </button>
                </div>

                {resume.experience.map((exp, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Position #{index + 1}</span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAiEnhanceBullet(index)}
                          disabled={aiLoading}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400 font-semibold text-[11px] flex items-center gap-1 hover:bg-slate-100 transition-colors"
                        >
                          <Wand2 className="w-3 h-3" />
                          <span>AI Improve Bullets</span>
                        </button>

                        <button
                          onClick={() => removeExperience(index)}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Job Position Title"
                        value={exp.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                      <input
                        type="text"
                        placeholder="Location (e.g. San Francisco, CA)"
                        value={exp.location}
                        onChange={(e) => updateExperience(index, 'location', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Start Date (Jan 2022)"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                        <input
                          type="text"
                          placeholder="End Date (Present)"
                          value={exp.endDate}
                          disabled={exp.current}
                          onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <textarea
                      rows={4}
                      placeholder="Bullet points (one per line)..."
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 4. EDUCATION */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Education</h3>
                  <button
                    onClick={addEducation}
                    className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Education
                  </button>
                </div>

                {resume.education.map((edu, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Degree #{index + 1}</span>
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Degree (e.g. B.S.)"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study (e.g. Computer Science)"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                      <input
                        type="text"
                        placeholder="Institution / University"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                      <input
                        type="text"
                        placeholder="GPA (e.g. 3.8/4.0)"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. TECHNICAL SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Technical Skills</h3>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAiSuggestSkills}
                      disabled={aiLoading}
                      className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold text-xs border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                      <span>AI Suggest Skills</span>
                    </button>

                    <button
                      onClick={addSkillCategory}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Category
                    </button>
                  </div>
                </div>

                {suggestedSkills.length > 0 && (
                  <div className="p-3 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Recommended for {resume.personalInfo?.title || 'Target Role'}:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedSkills.map((skill, idx) => (
                        <button
                          key={idx}
                          onClick={() => addSuggestedSkillToCategory(skill)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-medium hover:border-brand-500 hover:text-brand-600 transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3 text-brand-600" />
                          <span>{skill}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {resume.skills.map((skillGroup, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="Category Name (e.g. Languages & Frameworks)"
                        value={skillGroup.category}
                        onChange={(e) => updateSkillCategory(index, 'category', e.target.value)}
                        className="font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                      <button
                        onClick={() => removeSkillCategory(index)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Skills (comma separated, e.g. React.js, Node.js, TypeScript)"
                      value={Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                      onChange={(e) => updateSkillCategory(index, 'items', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 6. PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Key Projects</h3>
                  <button
                    onClick={addProject}
                    className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                {resume.projects.map((proj, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Project #{index + 1}</span>
                      <button
                        onClick={() => removeProject(index)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                      <input
                        type="text"
                        placeholder="Tech Stack (comma separated)"
                        value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                        onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>

                    <textarea
                      rows={3}
                      placeholder="Brief description of the project & metrics..."
                      value={proj.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* RIGHT PANEL: LIVE PREVIEW CONTAINER */}
        <div className={`md:col-span-6 lg:col-span-6 ${mobileView === 'editor' ? 'hidden md:block' : 'block'}`}>
          <div className="sticky top-32 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2 no-print">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-brand-600" /> Live Resume Preview
              </span>
              <button
                onClick={() => setGalleryOpen(true)}
                className="px-2 py-0.5 rounded bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 font-mono text-[10px] hover:underline"
              >
                Template: {resume.templateId || 'Executive'} ✎
              </button>
            </div>

            {/* Paper Container */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-slate-200 dark:bg-slate-900 p-4 max-h-[80vh] overflow-y-auto">
              <TemplateEngine resume={resume} templateId={resume.templateId} />
            </div>
          </div>
        </div>

      </div>

      {/* TEMPLATE GALLERY MODAL */}
      <TemplateGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        currentTemplateId={resume.templateId}
        onSelectTemplate={handleSelectTemplate}
        resume={resume}
      />

    </div>
  );
};
