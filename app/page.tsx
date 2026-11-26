
import Link from "next/link";
import Navbar from "@/components/Navbar";

import {
  ArrowRight,
  FileText,
  Sparkles,
  Palette,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Easy Resume Builder",
    description: "Create and manage your professional resume in minutes."
  },
  {
    icon: Palette,
    title: "Professional Templates",
    description: "Choose clean, modern and ATS-friendly resume layouts."
  },
  {
    icon: ShieldCheck,
    title: "Secure Resume Storage",
    description: "Your resume information is protected by authentication."
  },
  {
    icon: Zap,
    title: "Live Preview",
    description: "See your resume changes instantly while editing."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:py-32">

          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              <Sparkles size={16} />
              Your career starts here
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Build Your
              <span className="block text-indigo-600">
                Perfect Resume.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
              Create professional resumes, showcase your skills
              and make your next career opportunity count.
              Everything you need in one simple platform.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
              >
                Create My Resume
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-200 px-7 py-4 font-semibold hover:bg-slate-50"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Easy to use
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Professional layouts
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-indigo-100 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-bold">Resume Preview</p>
                  <p className="text-xs text-slate-400">
                    Professional Template
                  </p>
                </div>

                <FileText className="text-indigo-600" size={28} />
              </div>

              <div className="rounded-xl border p-7">
                <h2 className="text-2xl font-bold">Alex Morgan</h2>

                <p className="mt-1 text-sm font-semibold text-indigo-600">
                  Full Stack Developer
                </p>

                <p className="mt-3 text-xs text-slate-400">
                  alex@example.com | +1 234 567 890
                </p>

                <hr className="my-5" />

                <h3 className="font-bold">PROFILE</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Experienced developer passionate about
                  creating modern web applications.
                </p>

                <h3 className="mt-6 font-bold">SKILLS</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "MongoDB"].map(item => (
                    <span key={item}
                      className="rounded-md bg-indigo-50 px-3 py-2 text-xs text-indigo-700">
                      {item}
                    </span>
                  ))}
                </div>

                <h3 className="mt-6 font-bold">EXPERIENCE</h3>

                <div className="mt-3">
                  <p className="text-sm font-semibold">
                    Software Developer
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Building modern web applications
                  </p>
                </div>

                <div className="mt-6 rounded-lg bg-indigo-50 p-3 text-center text-sm font-semibold text-indigo-700">
                  Your professional journey starts here
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="font-semibold text-indigo-600">
            POWERFUL FEATURES
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Everything You Need to Build Your Resume
          </h2>

          <p className="mt-4 text-slate-500">
            A simple platform designed to help students,
            freshers and professionals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title}
                className="dashboard-card p-7">
                <div className="inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-6 mb-20 rounded-3xl bg-indigo-600 px-6 py-16 text-center text-white md:mx-auto md:max-w-7xl">
        <h2 className="text-3xl font-bold">
          Ready to Create Your Resume?
        </h2>

        <p className="mt-4 text-indigo-100">
          Start building your professional profile today.
        </p>

        <Link
          href="/register"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-indigo-700 hover:bg-indigo-50"
        >
          Get Started
          <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="border-t bg-white py-8 text-center text-sm text-slate-500">
        © 2026 ResumeCraft. All rights reserved.
      </footer>
    </main>
  );
}
