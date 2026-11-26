
"use client";

import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResumeEditor from "@/components/ResumeEditor";

export default function EditResumePage() {
  const params = useParams<{ id: string }>();

  return (
    <ProtectedRoute>
      <ResumeEditor resumeId={params.id} />
    </ProtectedRoute>
  );
}
