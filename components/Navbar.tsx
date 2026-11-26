
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <FileText size={22} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Resume<span className="text-indigo-600">Craft</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>

          <Link href="/#features" className="hover:text-indigo-600">
            Features
          </Link>

          <Link href="/login" className="hover:text-indigo-600">
            Login
          </Link>
        </div>

        <Link
          href="/register"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Get Started
          <ArrowRight size={16} />
        </Link>

      </nav>
    </header>
  );
}
