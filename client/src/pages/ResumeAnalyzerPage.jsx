import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  Sparkles, 
  Target, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Search, 
  Loader2, 
  Info,
  Zap,
  ShieldCheck,
  Tag,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ResumeAnalyzerPage = () => {
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [rawText, setRawText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'keywords' | 'issues'

  useEffect(() => {
    const fetchUserResumes = async () => {
      try {
        const res = await api.get('/resumes');
        if (res.data.success && res.data.resumes.length > 0) {
          setUserResumes(res.data.resumes);
          setSelectedResumeId(res.data.resumes[0]._id);
        }
      } catch (error) {
        toast.error('Failed to load user resumes');
      } finally {
        setLoadingResumes(false);
      }
    };
    fetchUserResumes();
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    let payloadData = null;
    if (selectedResumeId) {
      const found = userResumes.find((r) => r._id === selectedResumeId);
      payloadData = found || { rawText };
    } else {
      if (!rawText.trim()) {
        toast.error('Please select a resume or paste resume text to analyze.');
        return;
      }
      payloadData = { rawText };
    }

    setAnalyzing(true);
    try {
      const res = await api.post('/ai/analyze-resume', {
        resumeData: payloadData,
        jobDescription,
      });

      if (res.data.success) {
        setAnalysisResult(res.data.data);
        toast.success('ATS Analysis complete!');
      }
    } catch (error) {
      toast.error('AI Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-500 border-emerald-500';
    if (score >= 70) return 'text-amber-500 border-amber-500';
    return 'text-rose-500 border-rose-500';
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>Gemini-Powered ATS Parsing & Match Evaluator</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Resume & ATS Score Analyzer
        </h1>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Evaluate your resume against industry Applicant Tracking Systems, uncover missing technical keywords, and match against job descriptions.
        </p>
      </div>

      {/* INPUT FORM CONTAINER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Box: Resume Selection / Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" /> Select Resume
              </label>

              {userResumes.length > 0 ? (
                <div className="space-y-2">
                  <select
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                  >
                    {userResumes.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.title} ({r.targetRole || 'Software Engineering'})
                      </option>
                    ))}
                    <option value="">Paste Plain Resume Text</option>
                  </select>

                  {!selectedResumeId && (
                    <textarea
                      rows={5}
                      placeholder="Paste your full resume text here..."
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  )}
                </div>
              ) : (
                <textarea
                  rows={5}
                  placeholder="Paste your full resume text here..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              )}
            </div>

            {/* Right Box: Target Job Description */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-2"><Target className="w-4 h-4 text-brand-600" /> Target Job Description</span>
                <span className="text-[10px] text-slate-400 font-normal">Optional</span>
              </label>

              <textarea
                rows={5}
                placeholder="Paste job posting text to analyze missing keywords and calculate match percentage..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={analyzing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Evaluating ATS Metrics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Run AI ATS Audit</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>

      {/* RESULTS DISPLAY SECTION */}
      {analysisResult && (
        <div className="space-y-8 animate-fade-in">
          
          {/* DISCLAIMER NOTICE BANNER */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              {analysisResult.disclaimer}
            </p>
          </div>

          {/* OVERALL SCORE DASHBOARD HEADER */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* ATS Score Dial */}
            <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-6 md:pb-0 md:pr-6">
              <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center flex-col ${getScoreColor(analysisResult.atsScore)}`}>
                <span className="text-3xl font-extrabold">{analysisResult.atsScore}</span>
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">/ 100</span>
              </div>
              <span className="text-xs font-bold mt-3 text-slate-700 dark:text-slate-300">Overall ATS Score</span>
            </div>

            {/* Headline & Details */}
            <div className="md:col-span-8 space-y-3 text-center md:text-left">
              {analysisResult.matchPercentage && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                  Target Job Match: {analysisResult.matchPercentage}%
                </span>
              )}

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {analysisResult.headline}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 text-center">
                  <span className="text-slate-400 block text-[10px]">Summary</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{analysisResult.sectionAnalysis?.summary?.score || 90}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 text-center">
                  <span className="text-slate-400 block text-[10px]">Experience</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{analysisResult.sectionAnalysis?.experience?.score || 85}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 text-center">
                  <span className="text-slate-400 block text-[10px]">Skills</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{analysisResult.sectionAnalysis?.skills?.score || 92}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 text-center">
                  <span className="text-slate-400 block text-[10px]">Education</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{analysisResult.sectionAnalysis?.education?.score || 88}%</span>
                </div>
              </div>
            </div>

          </div>

          {/* TABS HEADER */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Actionable Suggestions
            </button>

            <button
              onClick={() => setActiveTab('keywords')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'keywords'
                  ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Tag className="w-4 h-4" />
              Keyword & Skills Match
            </button>

            <button
              onClick={() => setActiveTab('issues')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'issues'
                  ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Formatting & Content Issues
            </button>
          </div>

          {/* TAB CONTENT */}

          {/* TAB 1: SUGGESTIONS */}
          {activeTab === 'overview' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Actionable Steps to Increase ATS Score</h3>
              <div className="space-y-3">
                {analysisResult.actionableSuggestions?.map((sugg, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{sugg}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: KEYWORDS */}
          {activeTab === 'keywords' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Detected Keywords */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Detected ATS Keywords ({analysisResult.detectedKeywords?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.detectedKeywords?.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 text-xs font-semibold">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Missing Key Terms ({analysisResult.missingKeywords?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.missingKeywords?.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-semibold">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ISSUES */}
          {activeTab === 'issues' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Formatting & Phrase Deficiencies</h3>
              <div className="space-y-3">
                {analysisResult.issues?.map((issue, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{issue.category}</span>
                      <span className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${
                        issue.severity === 'high' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {issue.severity} priority
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{issue.description}</p>
                    <p className="text-brand-600 dark:text-brand-400 font-medium"><strong>Recommended Fix:</strong> {issue.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
