
import ProtectedRoute from "@/components/ProtectedRoute";
import ResumeEditor from "@/components/ResumeEditor";

export default function NewResumePage() {
  return (
    <ProtectedRoute>
      <ResumeEditor />
    </ProtectedRoute>
  );
}
