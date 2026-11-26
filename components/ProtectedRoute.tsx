
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      // Authentication check completes asynchronously.
      await Promise.resolve();

      if (active) {
        setAuthorized(true);
      }
    };

    checkAuthentication();

    return () => {
      active = false;
    };
  }, [router]);

  if (authorized !== true) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle
          className="animate-spin text-indigo-600"
          size={32}
        />
      </div>
    );
  }

  return <>{children}</>;
}
