import React from 'react';

export const CreativeTemplate = ({ resume }) => {
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
    <div className="bg-white text-slate-900 p-8 sm:p-10 font-sans max-w-[800px] mx-auto shadow-sm leading-normal grid grid-cols-12 gap-6">
      {/* LEFT COLUMN (Header & Sidebar) */}
      <div className="col-span-4 border-r border-slate-200 pr-4 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-xs font-bold text-brand-600 uppercase tracking-wide mt-1">
            {personalInfo.title}
          </p>
        </div>

        <div className="space-y-2 text-[11px] text-slate-600">
          <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Contact</p>
          {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.website && <p className="break-all">{personalInfo.website}</p>}
          {personalInfo.github && <p className="break-all">{personalInfo.github}</p>}
        </div>

        {skills.length > 0 && (
          <div className="space-y-3">
            <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Skills</p>
            {skills.map((sGroup, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-[11px] font-bold text-slate-800">{sGroup.category}</p>
                <div className="flex flex-wrap gap-1">
                  {(Array.isArray(sGroup.items) ? sGroup.items : [sGroup.items]).map((skill, sIdx) => (
                    <span key={sIdx} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="space-y-2 text-xs">
            <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Education</p>
            {education.map((edu, idx) => (
              <div key={idx}>
                <p className="font-bold text-slate-900">{edu.degree}</p>
                <p className="text-slate-600 text-[11px]">{edu.institution}</p>
                <p className="text-slate-400 text-[10px]">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN (Summary, Experience, Projects) */}
      <div className="col-span-8 space-y-6">
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Profile Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Work History
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">{exp.position}</span>
                    <span className="text-slate-500 font-normal">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-brand-600 font-semibold text-[11px]">{exp.company} • {exp.location}</p>
                  {exp.description && (
                    <ul className="list-disc list-inside text-slate-700 space-y-1 pt-1">
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

        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Notable Projects
            </h2>
            <div className="space-y-3 text-xs">
              {projects.map((proj, idx) => (
                <div key={idx}>
                  <p className="font-bold text-slate-900">{proj.title}</p>
                  {proj.description && <p className="text-slate-700 text-[11px]">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
