import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  Target, 
  CheckCircle2, 
  Zap, 
  Shield, 
  ArrowRight, 
  Layout, 
  BarChart3, 
  Briefcase, 
  Layers, 
  Star, 
  Download,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('modern');

  const handleAction = (featureName) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-brand-600 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm">Phase 1 Preview Mode</p>
          <p className="text-xs text-slate-500">{featureName} will be enabled in subsequent build phases.</p>
        </div>
      </div>
    ), { duration: 3500 });
  };

  const templates = [
    { id: 'modern', name: 'Executive Modern', tag: 'Most Popular', color: 'bg-brand-600' },
    { id: 'minimal', name: 'Minimalist Tech', tag: 'ATS Standard', color: 'bg-slate-800' },
    { id: 'corporate', name: 'Corporate Leader', tag: 'High-Impact', color: 'bg-indigo-600' },
    { id: 'creative', name: 'Product Innovator', tag: 'Clean Grid', color: 'bg-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-500/10 via-brand-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* HERO SECTION */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400 animate-pulse" />
              <span>Next-Generation Resume Engine Powered by Gemini AI</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              Build Resumes That Beat the ATS & Land <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 bg-clip-text text-transparent">Dream Interviews</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              SynapseCV combines structured resume craftsmanship with contextual AI evaluation. Optimize key metrics, extract missing keywords, and export high-conversion ATS templates.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button
                onClick={() => handleAction('Resume Builder')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Create My Resume Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('ATS Resume Analyzer')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Target className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Analyze Existing Resume</span>
              </button>
            </motion.div>

            {/* Key Value Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Parsing-Safe Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Hallucination AI Guarantee</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Preview Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-4 sm:p-6 md:p-8"
          >
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 font-mono ml-2">synapsecv.io/builder/preview</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live AI Parsing Engine</span>
              </div>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form & Editor Mockup */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-850 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm">
                      JD
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Jane Doe</h4>
                      <p className="text-xs text-slate-500">Senior Staff Software Engineer</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    ATS Score: 94/100
                  </span>
                </div>

                {/* Simulated AI Suggestion Box */}
                <div className="p-4 rounded-xl border border-brand-200 dark:border-brand-900/60 bg-brand-50/50 dark:bg-brand-950/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Gemini AI Actionable Improvement</span>
                    </div>
                    <span className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">+12 ATS Points</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    "Architected microservices infrastructure reducing p99 latency by 42%" — Quantified business impact detected. Action verbs optimized.
                  </p>
                </div>

                {/* Sections list */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Work Experience</span>
                    <span className="text-slate-400 font-mono">4 items</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Technical Skills</span>
                    <span className="text-slate-400 font-mono">18 tags</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Education & Certs</span>
                    <span className="text-slate-400 font-mono">3 verified</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Projects & Impact</span>
                    <span className="text-slate-400 font-mono">2 links</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Resume Preview Sheet Mockup */}
              <div className="lg:col-span-5 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-3 font-sans">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">JANE DOE</h3>
                    <p className="text-[11px] text-brand-600 dark:text-brand-400 font-medium">Senior Staff Software Engineer • San Francisco, CA</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Executive Summary</p>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Core Stack & Skills</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Distributed Systems</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">React.js</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Node.js</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">AWS / K8s</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Executive Template #1
                  </span>
                  <button 
                    onClick={() => handleAction('PDF Export')} 
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Preview PDF
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase">
                Enterprise-Grade Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Everything You Need to Get Hired Faster
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                SynapseCV provides an end-to-end suite designed specifically to bypass initial automated ATS rejections and highlight your real achievements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-brand-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Content Refinement</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Transform raw bullet points into quantifiable, high-impact statements using Google Gemini AI, strictly grounded in your actual experience.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-brand-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-Time ATS Score</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Instant breakdown of your resume's keyword match, section depth, formatting hygiene, and formatting score against modern applicant tracking systems.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-brand-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">5-10+ Professional Templates</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Choose from clean, battle-tested layout architectures designed to parse flawlessly in Workday, Greenhouse, Lever, and Taleo.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-brand-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Job Description Matcher</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Paste target job specs to instantly highlight missing technical skills, domain terms, and required qualification gaps before submitting.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-brand-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Structured Data Model</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your experience, projects, skills, and certifications are stored cleanly as separate entities, guaranteeing seamless template swapping.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-brand-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Full Privacy Control</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your data remains strictly yours. Manage profile details, export anytime, or delete your account and all stored records permanently with one click.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase">
              Simple 3-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              From Raw Draft to High-Score ATS Resume
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-600 text-white font-extrabold text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enter Your Data</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Add your career history, projects, and skills into structured forms designed for maximum parsing accuracy.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-600 text-white font-extrabold text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Run AI Enhancement</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Let Gemini AI refine your accomplishments with action metrics while calculating your real-time ATS score.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-600 text-white font-extrabold text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Export ATS PDF</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Select from 5-10+ ATS-ready template designs and download a pixel-perfect, printer-friendly PDF.
              </p>
            </div>
          </div>
        </section>

        {/* TEMPLATE GALLERY TEASER SECTION */}
        <section id="templates" className="py-20 bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase">
                  ATS Optimized Designs
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                  Battle-Tested Template Architectures
                </h2>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setActiveTab(tpl.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      activeTab === tpl.id
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Template Card Teaser */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  {templates.find(t => t.id === activeTab)?.tag}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {templates.find(t => t.id === activeTab)?.name} Template
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Engineered with standard section header tags, single-column font hierarchies, and zero non-standard graphic layers to ensure 100% readability across Taleo, Workday, and Greenhouse ATS systems.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Single / Multi Page Support</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Customizable Accent Colors</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Vector PDF Render</span>
                </div>
                <button
                  onClick={() => handleAction(`Use ${templates.find(t => t.id === activeTab)?.name} Template`)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Use This Template
                </button>
              </div>

              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 min-h-[300px] flex flex-col justify-between">
                <div className="bg-white dark:bg-slate-900 p-5 rounded border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="h-4 bg-slate-800 dark:bg-slate-200 rounded w-1/3"></div>
                  <div className="h-3 bg-brand-500 rounded w-1/4"></div>
                  <div className="space-y-1 pt-3">
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 font-mono mt-4">
                  Parsing Compatibility Score: <span className="text-emerald-500 font-bold">100% Passed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 text-white p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Create an Industry-Leading Resume?
              </h2>
              <p className="text-brand-100 text-base sm:text-lg leading-relaxed">
                Join thousands of tech candidates using SynapseCV to craft ATS-compliant resumes and gain an unfair advantage in their job search.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleAction('Get Started Free')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-brand-700 hover:bg-slate-100 font-bold shadow-lg transition-colors"
                >
                  Get Started for Free
                </button>
                <button
                  onClick={() => handleAction('ATS Resume Analyzer')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-800/60 hover:bg-brand-800/90 border border-brand-400/40 text-white font-semibold transition-colors"
                >
                  Analyze My Resume
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
