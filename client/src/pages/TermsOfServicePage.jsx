import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, CheckCircle2 } from 'lucide-react';

export const TermsOfServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative pt-24 pb-20 min-h-screen overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-60 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-flex items-center justify-center p-3.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl mb-6 shadow-inner">
            <Scale className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Service</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Please read these terms carefully before using our platform. By accessing SynapseCV, you agree to these rules and conditions.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl max-w-3xl mx-auto p-2"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
          <img 
            src="/terms_illustration.png" 
            alt="Terms of Service Illustration" 
            className="w-full h-auto object-cover max-h-[340px] rounded-2xl shadow-sm"
          />
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="prose prose-lg prose-slate dark:prose-invert max-w-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 md:p-14 rounded-[2rem] shadow-xl border border-slate-200/60 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-2 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Last Updated: October 2026
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            By accessing or using SynapseCV, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">2. Description of Service</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            SynapseCV is an AI-powered resume building and Applicant Tracking System (ATS) optimization platform. We provide tools to generate, format, and evaluate resumes. We do not guarantee employment, interviews, or specific career outcomes resulting from the use of our service.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">3. User Responsibilities</h2>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300 mb-8">
            <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"/> You must provide accurate and truthful information in your resumes.</li>
            <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"/> You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"/> You must not use the service for any illegal or unauthorized purpose.</li>
            <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"/> You agree not to attempt to reverse engineer, disrupt, or hack the platform or its AI integrations.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">4. Intellectual Property</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The platform, including its original content, features, templates, and functionality, are owned by SynapseCV and are protected by international copyright, trademark, and other intellectual property laws. You retain all ownership rights to the content you input (your resume data).
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">5. Service Availability & Limitations</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We strive to ensure maximum uptime, but the service is provided on an "as is" and "as available" basis. We rely on third-party AI providers and cannot guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the service at any time.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">6. Limitation of Liability</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In no event shall SynapseCV, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the service.
          </p>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              If you have any questions about these Terms, please contact us at <a href="mailto:support@synapsecv.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@synapsecv.com</a>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
