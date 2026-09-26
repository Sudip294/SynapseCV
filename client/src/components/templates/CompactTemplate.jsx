import React from 'react';

export const CompactTemplate = ({ resume }) => {
  if (!resume) return null;

  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
  } = resume;

  return (
    <div className="bg-white text-slate-900 p-6 sm:p-8 font-sans max-w-[800px] mx-auto shadow-sm leading-tight text-xs space-y-3">
      {/* HEADER */}
      <header className="text-center border-b border-slate-900 pb-2">
        <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-[11px] font-bold text-slate-700 uppercase">{personalInfo.title}</p>
        <div className="flex justify-center gap-3 text-[10px] text-slate-600 mt-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.github && <span>| {personalInfo.github}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
            SUMMARY
          </h2>
          <p className="text-[11px] text-slate-700">{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
            EXPERIENCE
          </h2>
          <div className="space-y-2">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.position} — {exp.company}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && (
                  <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 pl-1">
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
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
            SKILLS
          </h2>
          <div className="space-y-0.5 text-[11px]">
            {skills.map((sGroup, idx) => (
              <p key={idx}>
                <strong className="text-slate-900">{sGroup.category}:</strong>{' '}
                <span className="text-slate-700">{Array.isArray(sGroup.items) ? sGroup.items.join(', ') : sGroup.items}</span>
              </p>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
            EDUCATION
          </h2>
          <div className="space-y-1 text-[11px]">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between">
                <span><strong className="text-slate-900">{edu.degree} in {edu.fieldOfStudy}</strong> — {edu.institution}</span>
                <span className="text-slate-500 text-[10px]">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
