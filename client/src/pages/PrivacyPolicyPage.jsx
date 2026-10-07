import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative pt-24 pb-20 min-h-screen overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-500/10 via-brand-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-brand-400/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-60 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-flex items-center justify-center p-3.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 rounded-2xl mb-6 shadow-inner">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-brand-500">Policy</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            We value your privacy and are committed to protecting your personal data. Here's how we handle your information securely.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl max-w-3xl mx-auto p-2"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none" />
          <img 
            src="/privacy_illustration.png" 
            alt="Data Privacy Illustration" 
            className="w-full h-auto object-cover max-h-[340px] rounded-2xl shadow-sm"
          />
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="prose prose-lg prose-slate dark:prose-invert max-w-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 md:p-14 rounded-[2rem] shadow-xl border border-slate-200/60 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-2 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Last Updated: October 2026
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When you use SynapseCV, we collect information that you voluntarily provide to us, including your name, email address, phone number, and professional history (the contents of your resume). We also automatically collect certain technical data like your IP address, browser type, and usage metrics to improve our service.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300 mb-8">
            <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"/> Provide, maintain, and improve our AI resume building services.</li>
            <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"/> Process your resume data through our AI models to generate suggestions.</li>
            <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"/> Communicate with you regarding your account, updates, and security alerts.</li>
            <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"/> Analyze usage trends to enhance user experience.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">3. AI Processing & Third Parties</h2>
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800/20 p-6 md:p-8 rounded-2xl border border-blue-100/50 dark:border-blue-800/30 my-8 shadow-sm">
            <h4 className="flex items-center gap-3 mt-0 mb-3 text-lg font-bold text-blue-800 dark:text-blue-300">
              <Lock className="w-6 h-6 text-blue-500" /> Strict Data Isolation
            </h4>
            <p className="mb-0 text-slate-700 dark:text-slate-300 leading-relaxed">
              Your resume data is sent to our AI partners (e.g., Groq) exclusively for generating your specific suggestions. <strong>We do not permit our AI partners to use your personal data to train their models.</strong> Your data is discarded immediately after processing.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">4. Data Security</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We implement industry-standard security measures, including encryption in transit (HTTPS) and at rest, to protect your personal information. While no system is impenetrable, we continuously monitor and update our security practices to safeguard your data.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">5. Your Rights</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            You have the right to access, correct, or delete your personal information at any time. You can delete your account and all associated resumes directly from your Dashboard settings.
          </p>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@synapsecv.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@synapsecv.com</a>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
