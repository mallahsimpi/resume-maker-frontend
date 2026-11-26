
"use client";

import { ResumeFormData } from "@/types/resume";

export default function ResumePreview({
  resume
}: {
  resume: ResumeFormData;
}) {
  const { personalInfo, education, experience, skills, projects, certifications } = resume;

  return (
    <div className="resume-paper">

      <div className="border-b-2 border-indigo-600 pb-5">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>

        <p className="mt-2 font-semibold text-indigo-600">
          {personalInfo.jobTitle || "Professional Title"}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <section className="mt-6">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-indigo-700">
            Professional Summary
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-indigo-700">
            Experience
          </h2>

          {experience.map((item, index) => (
            <div key={index} className="mt-4">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="text-sm font-bold">{item.position}</h3>
                <span className="text-xs text-slate-500">
                  {item.startDate} – {item.endDate}
                </span>
              </div>

              <p className="mt-1 text-sm font-medium text-slate-600">
                {item.company}
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-indigo-700">
            Education
          </h2>

          {education.map((item, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-sm font-bold">{item.degree}</h3>

              <p className="mt-1 text-sm text-slate-600">
                {item.institution}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {item.startYear} – {item.endYear}
                {item.percentage && ` | ${item.percentage}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-indigo-700">
            Skills
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index}
                className="rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-indigo-700">
            Projects
          </h2>

          {projects.map((item, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-sm font-bold">{item.name}</h3>

              <p className="mt-1 text-xs text-indigo-600">
                {item.technologies.join(", ")}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-indigo-700">
            Certifications
          </h2>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {certifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
}
