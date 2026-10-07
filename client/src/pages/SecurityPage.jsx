import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Server, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SecurityPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative pt-24 pb-20 min-h-screen overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-purple-500/10 via-fuchsia-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-fuchsia-400/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-60 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-flex items-center justify-center p-3.5 bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800/50 rounded-2xl mb-6 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">Overview</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Enterprise-grade security built directly into our infrastructure to ensure your professional data remains completely safe and private.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl max-w-3xl mx-auto p-2"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent pointer-events-none" />
          <img 
            src="/legal_illustration.png" 
            alt="Security Architecture Illustration" 
            className="w-full h-auto object-cover max-h-[340px] rounded-2xl shadow-sm"
          />
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-200/60 dark:border-slate-700/50 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-900/40 dark:to-fuchsia-900/40 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-purple-200/50 dark:border-purple-800/50">
              <Lock className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Encryption</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your resume data is protected at the database level against unauthorized access.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-200/60 dark:border-slate-700/50 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-emerald-200/50 dark:border-emerald-800/50">
              <Server className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Cloud Infrastructure</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Hosted on industry-leading, SOC 2 compliant cloud providers. We utilize strict VPC networks, firewalls, and continuous threat monitoring to secure our environments.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="prose prose-lg prose-slate dark:prose-invert max-w-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 md:p-14 rounded-[2rem] shadow-xl border border-slate-200/60 dark:border-slate-700/50"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">AI Data Handling</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            When you use our AI tools (Summary Enhancement, Bullet Optimization, ATS Scoring), your data is sent securely to our enterprise AI partners (such as Groq) via API. 
          </p>
          <ul className="space-y-4 text-slate-600 dark:text-slate-300 mb-10">
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900 dark:text-white">Zero Data Retention:</strong> Our AI partners are contractually bound to not retain your resume data after the API request is completed.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900 dark:text-white">No Model Training:</strong> Your personal information and resume content are strictly excluded from being used to train or improve external AI models.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Authentication & Access Control</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
            SynapseCV utilizes robust JWT (JSON Web Token) authentication with HttpOnly secure cookies to prevent XSS and CSRF attacks. Password hashes are salted and secured using modern bcrypt algorithms.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Vulnerability Disclosure</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Security is a continuous process. We welcome reports from security researchers and experts. If you believe you have discovered a vulnerability in SynapseCV, please disclose it to us responsibly by emailing <a href="mailto:security@synapsecv.com" className="text-purple-600 dark:text-purple-400 hover:underline">security@synapsecv.com</a>. We will investigate all legitimate reports promptly.
          </p>
        </motion.div>
      </section>
    </div>
  );
};
