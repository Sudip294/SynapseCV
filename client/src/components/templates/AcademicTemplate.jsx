import React from 'react';

export const AcademicTemplate = ({ resume }) => {
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
  } = resume;

  return (
    <div className="bg-white text-slate-900 p-8 sm:p-10 font-serif max-w-[800px] mx-auto min-h-[1050px] shadow-sm leading-normal">
      {/* HEADER */}
      <header className="text-center border-b border-slate-400 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900 font-serif">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-sm font-semibold text-slate-700 mt-1 uppercase tracking-wider">{personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-600 mt-2 font-sans">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            RESEARCH & EXECUTIVE SUMMARY
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* EDUCATION FIRST FOR ACADEMIC */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
            EDUCATION
          </h2>
          <div className="space-y-3 text-xs">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                  <span className="font-normal font-sans text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-slate-700 italic">{edu.institution}, {edu.location}</p>
                {edu.gpa && <p className="text-[11px] text-slate-600 font-sans">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
            APPOINTMENTS & EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.position} — {exp.company}</span>
                  <span className="font-normal font-sans text-slate-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && (
                  <ul className="list-disc list-inside text-slate-800 space-y-1 pt-1">
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
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            AREAS OF EXPERTISE
          </h2>
          <div className="space-y-1 text-xs font-sans">
            {skills.map((sGroup, idx) => (
              <p key={idx}>
                <strong className="text-slate-900">{sGroup.category}:</strong>{' '}
                <span className="text-slate-700">{Array.isArray(sGroup.items) ? sGroup.items.join(', ') : sGroup.items}</span>
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
