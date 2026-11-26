
import { Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResumeEditor from "@/components/ResumeEditor";

interface EditResumePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditResumePage({
  params,
}: EditResumePageProps) {
  const { id } = await params;

  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            Loading resume...
          </div>
        }
      >
        <ResumeEditor resumeId={id} />
      </Suspense>
    </ProtectedRoute>
  );
}
