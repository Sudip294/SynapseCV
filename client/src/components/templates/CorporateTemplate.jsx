import React from 'react';

export const CorporateTemplate = ({ resume }) => {
  if (!resume) return null;

  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
  } = resume;

  return (
    <div className="bg-white text-slate-900 p-8 sm:p-10 font-sans max-w-[800px] mx-auto min-h-[1050px] shadow-sm leading-normal">
      {/* TOP BRAND HEADER */}
      <header className="bg-slate-900 text-white p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-extrabold uppercase tracking-wide text-white">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mt-1">
          {personalInfo.title || 'Executive Leadership'}
        </p>
        <div className="flex flex-wrap gap-4 text-[11px] text-slate-300 mt-3 pt-3 border-t border-slate-800">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-brand-600 pb-1 mb-2">
            EXECUTIVE SUMMARY
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-brand-600 pb-1 mb-3">
            LEADERSHIP EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900">{exp.position}</span>
                    <span className="font-semibold text-brand-700"> — {exp.company}</span>
                  </div>
                  <span className="text-slate-500 font-semibold">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && (
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {exp.description.split('\n').filter(Boolean).map((b, bIdx) => (
                      <li key={bIdx}>{b.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-brand-600 pb-1 mb-2">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {skills.map((sGroup, idx) => (
              <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="font-bold text-slate-900 block text-[11px] uppercase mb-0.5">{sGroup.category}</span>
                <span className="text-slate-600 text-[11px]">{Array.isArray(sGroup.items) ? sGroup.items.join(' • ') : sGroup.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-brand-600 pb-1 mb-2">
            EDUCATION & QUALIFICATIONS
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy} ({edu.institution})</span>
                <span className="text-slate-500">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
