import React from 'react';
import { SynapseLogo } from '../brand/SynapseLogo';
import { Mail, Shield, CheckCircle2, Globe, Share2, FileText } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <SynapseLogo className="h-8 w-auto" textSize="text-2xl" textColor="text-white" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Production-grade AI resume builder and ATS analyzer SaaS engineered to help software engineers and ambitious professionals land dream roles at top tech companies.
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-2">
              <a href="#" className="hover:text-white transition-colors" aria-label="Global Web">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Share">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Product
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">AI Resume Builder</a></li>
              <li><a href="#analyzer" className="hover:text-white transition-colors">ATS Analyzer</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Resume Templates</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Keyword Optimization</a></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Software Engineers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Managers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Scientists</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Executive Resumes</a></li>
            </ul>
          </div>

          {/* Security & System Status */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Trust & Security
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% ATS Compliant Layouts</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-4 h-4 text-brand-400" />
                <span>End-to-End Privacy Guaranteed</span>
              </div>
              <p className="text-slate-500 pt-2 text-[11px] leading-relaxed">
                SynapseCV AI assessment does not guarantee employment or passing specific hiring filters.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SynapseCV Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
