
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Save,
  Eye,
  LoaderCircle,
  Printer
} from "lucide-react";

import api from "@/services/api";
import ResumePreview from "@/components/ResumePreview";
import {
  emptyResume,
  ResumeFormData
} from "@/types/resume";

export default function ResumeEditor({
  resumeId
}: {
  resumeId?: string;
}) {
  const router = useRouter();

  const [form, setForm] = useState<ResumeFormData>(emptyResume);
  const [loading, setLoading] = useState(Boolean(resumeId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!resumeId) return;

    const loadResume = async () => {
      try {
        const { data } = await api.get(`/resumes/${resumeId}`);
        const item = data.resume;

        setForm({
          title: item.title || "",
          personalInfo: {
            ...emptyResume.personalInfo,
            ...item.personalInfo
          },
          education: item.education || [],
          experience: item.experience || [],
          skills: item.skills || [],
          projects: item.projects || [],
          certifications: item.certifications || []
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Unable to load resume."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

  const updatePersonal = (
    field: keyof ResumeFormData["personalInfo"],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateEducation = (
    index: number,
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      experience: prev.experience.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateProject = (
    index: number,
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: field === "technologies"
                ? value.split(",").map(v => v.trim()).filter(Boolean)
                : value
            }
          : item
      )
    }));
  };

  const saveResume = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.title.trim()) {
        throw new Error("Please enter a resume title.");
      }

      if (!form.personalInfo.fullName.trim()) {
        throw new Error("Please enter your full name.");
      }

      if (resumeId) {
        await api.put(`/resumes/${resumeId}`, form);
        setSuccess("Resume updated successfully!");
      } else {
        const { data } = await api.post("/resumes", form);
        setSuccess("Resume created successfully!");

        if (data.resume?._id) {
          router.replace(`/resumes/${data.resume._id}`);
        } else {
          router.replace("/dashboard");
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to save resume."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  const addEducation = () => {
    setForm(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          startYear: "",
          endYear: "",
          percentage: ""
        }
      ]
    }));
  };

  const addExperience = () => {
    setForm(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ]
    }));
  };

  const addProject = () => {
    setForm(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          technologies: [],
          description: ""
        }
      ]
    }));
  };

  const removeItem = (field: "education" | "experience" | "projects", index: number) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const inputClass = "form-input";

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="no-print sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b bg-white px-5 py-4">

        <div>
          <h1 className="text-xl font-bold">
            {resumeId ? "Edit Resume" : "Create Resume"}
          </h1>
          <p className="text-xs text-slate-500">
            Build your professional profile
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <Eye size={17} />
            {preview ? "Edit" : "Preview"}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <Printer size={17} />
            PDF / Print
          </button>

          <button
            onClick={saveResume}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving
              ? <LoaderCircle size={17} className="animate-spin" />
              : <Save size={17} />}
            Save Resume
          </button>
        </div>
      </div>

      <div className={`mx-auto max-w-[1500px] gap-7 p-5 lg:p-8 ${
        preview ? "block" : "grid lg:grid-cols-2"
      }`}>

        <div className={`no-print space-y-6 ${preview ? "hidden" : ""}`}>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          <section className="dashboard-card p-6">
            <h2 className="mb-5 text-lg font-bold">
              Resume Details
            </h2>

            <label className="mb-2 block text-sm font-semibold">
              Resume Title
            </label>

            <input
              className={inputClass}
              value={form.title}
              onChange={e => setForm({
                ...form,
                title: e.target.value
              })}
              placeholder="Frontend Developer Resume"
            />
          </section>

          <section className="dashboard-card p-6">
            <h2 className="mb-5 text-lg font-bold">
              Personal Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {([
                ["fullName", "Full Name"],
                ["jobTitle", "Job Title"],
                ["email", "Email Address"],
                ["phone", "Phone Number"],
                ["address", "Location"]
              ] as const).map(([field, label]) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-semibold">
                    {label}
                  </label>

                  <input
                    className={inputClass}
                    value={form.personalInfo[field]}
                    onChange={e => updatePersonal(field, e.target.value)}
                    placeholder={label}
                  />
                </div>
              ))}
            </div>

            <label className="mb-2 mt-5 block text-sm font-semibold">
              Professional Summary
            </label>

            <textarea
              className={inputClass}
              rows={4}
              value={form.personalInfo.summary}
              onChange={e => updatePersonal("summary", e.target.value)}
              placeholder="Write a short professional summary..."
            />
          </section>

          <section className="dashboard-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Education</h2>

              <button onClick={addEducation}
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
                <Plus size={17} /> Add
              </button>
            </div>

            {form.education.map((item, index) => (
              <div key={index} className="mb-5 rounded-xl border p-4">
                <div className="mb-4 flex justify-between">
                  <p className="font-semibold">Education {index + 1}</p>

                  <button
                    onClick={() => removeItem("education", index)}
                    className="text-red-500"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {([
                    ["degree", "Degree"],
                    ["institution", "Institution"],
                    ["startYear", "Start Year"],
                    ["endYear", "End Year"],
                    ["percentage", "Percentage / CGPA"]
                  ] as const).map(([field, label]) => (
                    <input
                      key={field}
                      className={inputClass}
                      placeholder={label}
                      value={item[field]}
                      onChange={e => updateEducation(index, field, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="dashboard-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Experience</h2>

              <button onClick={addExperience}
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
                <Plus size={17} /> Add
              </button>
            </div>

            {form.experience.map((item, index) => (
              <div key={index} className="mb-5 rounded-xl border p-4">
                <div className="mb-4 flex justify-between">
                  <p className="font-semibold">Experience {index + 1}</p>

                  <button
                    onClick={() => removeItem("experience", index)}
                    className="text-red-500"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {([
                    ["position", "Position"],
                    ["company", "Company"],
                    ["startDate", "Start Date"],
                    ["endDate", "End Date"]
                  ] as const).map(([field, label]) => (
                    <input
                      key={field}
                      className={inputClass}
                      placeholder={label}
                      value={item[field]}
                      onChange={e => updateExperience(index, field, e.target.value)}
                    />
                  ))}
                </div>

                <textarea
                  className={`${inputClass} mt-3`}
                  rows={3}
                  placeholder="Job responsibilities and achievements"
                  value={item.description}
                  onChange={e => updateExperience(index, "description", e.target.value)}
                />
              </div>
            ))}
          </section>

          <section className="dashboard-card p-6">
            <h2 className="mb-5 text-lg font-bold">Skills</h2>

            <label className="mb-2 block text-sm font-semibold">
              Skills (comma separated)
            </label>

            <textarea
              className={inputClass}
              rows={3}
              placeholder="JavaScript, React, Angular, Node.js"
              value={form.skills.join(", ")}
              onChange={e => setForm({
                ...form,
                skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
              })}
            />
          </section>

          <section className="dashboard-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Projects</h2>

              <button onClick={addProject}
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
                <Plus size={17} /> Add
              </button>
            </div>

            {form.projects.map((item, index) => (
              <div key={index} className="mb-5 rounded-xl border p-4">
                <div className="mb-4 flex justify-between">
                  <p className="font-semibold">Project {index + 1}</p>

                  <button
                    onClick={() => removeItem("projects", index)}
                    className="text-red-500"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <input
                  className={inputClass}
                  placeholder="Project Name"
                  value={item.name}
                  onChange={e => updateProject(index, "name", e.target.value)}
                />

                <input
                  className={`${inputClass} mt-3`}
                  placeholder="Technologies (React, Node.js)"
                  value={item.technologies.join(", ")}
                  onChange={e => updateProject(index, "technologies", e.target.value)}
                />

                <textarea
                  className={`${inputClass} mt-3`}
                  rows={3}
                  placeholder="Project description"
                  value={item.description}
                  onChange={e => updateProject(index, "description", e.target.value)}
                />
              </div>
            ))}
          </section>

          <section className="dashboard-card p-6">
            <h2 className="mb-4 text-lg font-bold">Certifications</h2>

            <textarea
              className={inputClass}
              rows={3}
              placeholder="AWS Certification, React Certification, etc. Separate with commas."
              value={form.certifications.join(", ")}
              onChange={e => setForm({
                ...form,
                certifications: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
              })}
            />
          </section>

          <button
            onClick={saveResume}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-bold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Resume"}
          </button>

        </div>

        <div className={preview ? "mx-auto max-w-4xl" : "min-w-0"}>
          <div className="no-print mb-4 flex items-center justify-between">
            <h2 className="font-bold">Live Resume Preview</h2>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Live
            </span>
          </div>

          <ResumePreview resume={form} />
        </div>

      </div>
    </div>
  );
}
