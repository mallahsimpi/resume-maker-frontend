
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import {
  Plus,
  FileText,
  LoaderCircle,
  Search,
  Sparkles,
} from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import ResumeCard from "@/components/ResumeCard";

import api from "@/services/api";
import { Resume } from "@/types/resume";

function DashboardContent() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("User");

  // Load resumes from backend
  const loadResumes = useCallback(async () => {
    try {
      setError("");

      const { data } = await api.get("/resumes");

      setResumes(data.resumes || []);
    } catch (err: unknown) {
      const message =
        (
          err as {
            response?: {
              data?: {
                message?: string;
              };
            };
          }
        ).response?.data?.message || "Unable to load resumes.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize dashboard
  useEffect(() => {
    let active = true;

    const initializeDashboard = async () => {
      try {
        // Read logged-in user
        const userData = await Promise.resolve(
          localStorage.getItem("user")
        );

        if (active && userData) {
          try {
            const user = JSON.parse(userData);
            setUserName(user.name || "User");
          } catch {
            setUserName("User");
          }
        }

        if (active) {
          await loadResumes();
        }
      } catch {
        if (active) {
          setError("Unable to initialize dashboard.");
          setLoading(false);
        }
      }
    };

    initializeDashboard();

    return () => {
      active = false;
    };
  }, [loadResumes]);

  // Delete resume
  const deleteResume = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/resumes/${id}`);

      setResumes((previousResumes) =>
        previousResumes.filter(
          (resume) => resume._id !== id
        )
      );
    } catch (err: unknown) {
      const message =
        (
          err as {
            response?: {
              data?: {
                message?: string;
              };
            };
          }
        ).response?.data?.message || "Unable to delete resume.";

      window.alert(message);
    }
  };

  // Search resumes
  const filteredResumes = resumes.filter((resume) =>
    (resume.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <div className="no-print hidden md:block">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">

        {/* Header */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">

          <div>
            <p className="text-sm font-medium text-slate-500">
              Workspace / Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Welcome, {userName}!
            </h1>

            <p className="mt-2 text-slate-500">
              Manage and create your professional resumes.
            </p>
          </div>

          <button
            onClick={() => router.push("/resumes/new")}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
          >
            <Plus size={19} />
            Create Resume
          </button>

        </header>

        {/* Statistics */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Resumes */}
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Resumes
              </p>

              <FileText className="text-indigo-600" />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              {resumes.length}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Your saved resumes
            </p>
          </div>

          {/* Latest Resume */}
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Latest Resume
              </p>

              <Sparkles className="text-indigo-600" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              {resumes[0]?.title || "No resume yet"}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Most recently saved
            </p>
          </div>

          {/* Profile Status */}
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Profile Status
              </p>

              <Sparkles className="text-indigo-600" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              {resumes.length > 0 ? "Started" : "Not Started"}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Based on saved resume count
            </p>
          </div>

        </section>

        {/* Search Section */}
        <section className="dashboard-card mb-7 p-6">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                My Resumes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create, edit and manage your resumes.
              </p>
            </div>

            <div className="relative w-full sm:w-72">

              <Search
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />

              <input
                className="form-input pl-10"
                placeholder="Search resumes..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

          </div>

        </section>

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Resume List */}
        {loading ? (

          <div className="flex justify-center py-20">
            <LoaderCircle
              className="animate-spin text-indigo-600"
              size={32}
            />
          </div>

        ) : filteredResumes.length > 0 ? (

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {filteredResumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onDelete={deleteResume}
              />
            ))}

          </div>

        ) : (

          /* Empty State */
          <div className="dashboard-card flex flex-col items-center px-6 py-20 text-center">

            <div className="rounded-2xl bg-indigo-50 p-5 text-indigo-600">
              <FileText size={35} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              {search
                ? "No matching resumes"
                : "No resumes yet"}
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              {search
                ? "Try another search term."
                : "Create your first professional resume and keep your career profile organized."}
            </p>

            {!search && (
              <button
                onClick={() => router.push("/resumes/new")}
                className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                <Plus size={18} />
                Create Your First Resume
              </button>
            )}

          </div>

        )}

      </main>

    </div>
  );
}

// Protected Dashboard Page
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
