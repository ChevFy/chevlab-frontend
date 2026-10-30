import { AuthGuard } from "@/components/layout/AuthGuard";
import { ComingSoon } from "@/components/ComingSoon";

export default function HomelabPage() {
  return (
    <AuthGuard>
      <ComingSoon title="Homelab" />
    </AuthGuard>
  );
}
