
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Settings,
  Sparkles
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "My Resumes",
    href: "/dashboard",
    icon: FileText
  },
  {
    name: "Create Resume",
    href: "/resumes/new",
    icon: PlusCircle
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r bg-white px-5 py-7">

      <Link href="/dashboard"
        className="mb-12 flex items-center gap-3 px-2">
        <div className="rounded-xl bg-indigo-600 p-2 text-white">
          <FileText size={22} />
        </div>

        <span className="text-xl font-bold">
          Resume<span className="text-indigo-600">Craft</span>
        </span>
      </Link>

      <p className="mb-4 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        Workspace
      </p>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href === "/dashboard" &&
              pathname.startsWith("/dashboard"));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="mb-5 rounded-2xl bg-indigo-50 p-4">
          <Sparkles className="mb-3 text-indigo-600" size={22} />
          <p className="font-semibold text-indigo-900">
            Build your future
          </p>
          <p className="mt-1 text-xs leading-5 text-indigo-700">
            Keep your professional profile updated.
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-slate-50"
        >
          <Settings size={19} />
          Settings
        </button>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
