import React from 'react';

export const MinimalTemplate = ({ resume }) => {
  if (!resume) return null;

  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
  } = resume;

  return (
    <div className="bg-white text-slate-900 p-8 sm:p-10 font-sans max-w-[800px] mx-auto min-h-[1050px] shadow-sm leading-normal">
      {/* HEADER */}
      <header className="mb-6 pb-4 border-b-2 border-slate-900">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-sm font-bold text-slate-600 tracking-wide uppercase mt-0.5">
          {personalInfo.title || 'Professional Title'}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium mt-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            // SUMMARY
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            // EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-slate-900">{exp.position} @ {exp.company}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && (
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                    {exp.description.split('\n').filter(Boolean).map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet.replace(/^[•\-\*]\s*/, '')}</li>
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
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            // TECHNICAL SKILLS
          </h2>
          <div className="space-y-1.5 text-xs">
            {skills.map((sGroup, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="font-bold text-slate-800 min-w-[130px]">{sGroup.category}:</span>
                <span className="text-slate-600">{Array.isArray(sGroup.items) ? sGroup.items.join(', ') : sGroup.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            // PROJECTS
          </h2>
          <div className="space-y-3 text-xs">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.title}</span>
                  {proj.technologies && <span className="font-normal text-slate-500 font-mono text-[11px]">{proj.technologies.join(', ')}</span>}
                </div>
                {proj.description && <p className="text-slate-700">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            // EDUCATION
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span>
                  <span className="text-slate-600"> — {edu.institution}</span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
