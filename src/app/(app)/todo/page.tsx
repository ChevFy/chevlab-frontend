import { AuthGuard } from "@/components/layout/AuthGuard";
import { ComingSoon } from "@/components/ComingSoon";

export default function TodoPage() {
  return (
    <AuthGuard>
      <ComingSoon title="Todo" />
    </AuthGuard>
  );
}
