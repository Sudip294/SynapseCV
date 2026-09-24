import React, { useState } from 'react';
import { TEMPLATES, TemplateEngine } from './TemplateEngine';
import { X, Check, Layout, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const TemplateGalleryModal = ({ isOpen, onClose, currentTemplateId, onSelectTemplate, resume }) => {
  const [selected, setSelected] = useState(currentTemplateId || 'executive');

  if (!isOpen) return null;

  const handleApply = () => {
    onSelectTemplate(selected);
    toast.success(`Applied ${TEMPLATES.find(t => t.id === selected)?.name} template!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Choose ATS Template</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Template Selection Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {TEMPLATES.map((tpl) => {
              const isCurrent = selected === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelected(tpl.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-850'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{tpl.name}</span>
                      {isCurrent && <Check className="w-4 h-4 text-brand-600" />}
                    </div>
                    <p className="text-xs text-slate-500">{tpl.category}</p>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                      {tpl.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 overflow-y-auto max-h-[500px]">
            <div className="scale-90 transform-origin-top">
              <TemplateEngine resume={resume} templateId={selected} />
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">All templates use 100% standard ATS parsing layers.</span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md"
            >
              Apply Template
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
