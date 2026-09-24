import React from 'react';

export const ExecutiveTemplate = ({ resume }) => {
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
    customLinks = [],
  } = resume;

  return (
    <div className="bg-white text-slate-900 p-8 sm:p-10 font-sans max-w-[800px] mx-auto min-h-[1050px] shadow-sm leading-normal">
      
      {/* HEADER SECTION */}
      <header className="border-b border-slate-300 pb-4 mb-5 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-slate-900 mb-1">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        {personalInfo.title && (
          <p className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
            {personalInfo.title}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && (
            <>
              {personalInfo.location && <span>•</span>}
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.email && (
            <>
              {(personalInfo.location || personalInfo.phone) && <span>•</span>}
              <a href={`mailto:${personalInfo.email}`} className="text-slate-800 underline">
                {personalInfo.email}
              </a>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-slate-800 underline">
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-slate-800 underline">
                GitHub
              </a>
            </>
          )}
          {personalInfo.website && (
            <>
              <span>•</span>
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="text-slate-800 underline">
                Portfolio
              </a>
            </>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
            {summary}
          </p>
        </section>
      )}

      {/* WORK EXPERIENCE */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-3">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={exp._id || index} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{exp.position}</span>
                    {exp.company && <span className="font-semibold text-slate-700"> | {exp.company}</span>}
                    {exp.location && <span className="text-slate-500 font-normal"> — {exp.location}</span>}
                  </div>
                  <div className="text-slate-500 font-medium whitespace-nowrap">
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '-' : ''} {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>

                {exp.description && (
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1 leading-relaxed">
                    {exp.description.split('\n').filter(Boolean).map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-snug">
                        {bullet.replace(/^[•\-\*]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TECHNICAL SKILLS */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-1 text-xs">
            {skills.map((skillGroup, index) => (
              <div key={skillGroup._id || index} className="flex flex-wrap gap-1 text-slate-700">
                <span className="font-bold text-slate-900 min-w-[120px]">
                  {skillGroup.category}:
                </span>
                <span>{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-3">
            KEY PROJECTS
          </h2>
          <div className="space-y-3">
            {projects.map((proj, index) => (
              <div key={proj._id || index} className="space-y-1 text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{proj.title}</span>
                  <div className="flex gap-2 font-normal text-slate-600">
                    {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="underline">Live Demo</a>}
                    {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="underline">GitHub</a>}
                  </div>
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-[11px] font-semibold text-slate-600">
                    Tech Stack: {proj.technologies.join(', ')}
                  </p>
                )}
                {proj.description && (
                  <p className="text-slate-700 leading-snug">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-3">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={edu._id || index} className="text-xs space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</span>
                    <span className="font-semibold text-slate-700"> | {edu.institution}</span>
                    {edu.location && <span className="text-slate-500 font-normal"> — {edu.location}</span>}
                  </div>
                  <div className="text-slate-500 font-medium whitespace-nowrap">
                    {edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}
                  </div>
                </div>
                {edu.gpa && <p className="text-[11px] text-slate-600 font-medium">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-slate-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
            CERTIFICATIONS
          </h2>
          <div className="space-y-1.5 text-xs">
            {certifications.map((cert, index) => (
              <div key={cert._id || index} className="flex justify-between">
                <div>
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-700 font-medium"> — {cert.issuer}</span>}
                </div>
                {cert.issueDate && <span className="text-slate-500 font-medium">{cert.issueDate}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACHIEVEMENTS & LANGUAGES */}
      {(achievements.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
                HONORS & ACHIEVEMENTS
              </h2>
              <div className="space-y-1.5 text-xs">
                {achievements.map((ach, index) => (
                  <div key={ach._id || index}>
                    <span className="font-bold text-slate-900">{ach.title}</span>
                    {ach.description && <p className="text-slate-700 text-[11px]">{ach.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
                LANGUAGES
              </h2>
              <div className="space-y-1 text-xs text-slate-700">
                {languages.map((lang, index) => (
                  <div key={lang._id || index} className="flex justify-between">
                    <span className="font-semibold text-slate-900">{lang.language}</span>
                    <span className="text-slate-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

    </div>
  );
};
