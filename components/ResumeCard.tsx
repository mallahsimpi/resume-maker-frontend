
"use client";

import Link from "next/link";
import { FileText, Pencil, Trash2, CalendarDays } from "lucide-react";
import { Resume } from "@/types/resume";

export default function ResumeCard({
  resume,
  onDelete
}: {
  resume: Resume;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="dashboard-card group p-5">

      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          <FileText size={25} />
        </div>

        <button
          onClick={() => onDelete(resume._id)}
          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
          title="Delete resume"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <h3 className="mt-5 truncate text-lg font-bold">
        {resume.title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {resume.personalInfo?.jobTitle || "Professional Resume"}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <CalendarDays size={14} />
        {resume.updatedAt
          ? new Date(resume.updatedAt).toLocaleDateString()
          : "Recently created"}
      </div>

      <div className="mt-5 border-t pt-4">
        <Link
          href={`/resumes/${resume._id}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
        >
          <Pencil size={16} />
          Edit Resume
        </Link>
      </div>
    </div>
  );
}
