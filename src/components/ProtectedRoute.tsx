import { Navigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Layout } from "@/components/layout/Layout";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAdmin, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <Layout showFooter={false}>
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
}
