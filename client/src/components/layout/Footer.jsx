import React from 'react';
import { SynapseLogo } from '../brand/SynapseLogo';
import { Mail, Share2, Shield, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

// LinkedIn SVG icon (not available in this version of lucide-react)
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const Footer = () => {
  const handleShareLink = (e) => {
    e.preventDefault();
    const shareUrl = 'https://synapse-cv-project.vercel.app/';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy link'));
    } else {
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <SynapseLogo className="h-8 w-auto" textSize="text-2xl" textColor="text-white" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Production-grade AI resume builder and ATS analyzer SaaS engineered to help software engineers and ambitious professionals land dream roles at top tech companies.
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-2">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-[#0077B5] hover:text-white transition-all"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>

              {/* Gmail */}
              <a
                href="https://gmail.google.com/mail/"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-red-600 hover:text-white transition-all"
                aria-label="Email"
                title="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>

              {/* Share Link */}
              <button
                type="button"
                onClick={handleShareLink}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-brand-600 hover:text-white transition-all"
                aria-label="Copy share link"
                title="Copy app link to clipboard"
              >
                <Share2 className="w-5 h-5" />
              </button>
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

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SynapseCV Inc. All rights reserved. | Designed by Sudip Bag.</p>
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
