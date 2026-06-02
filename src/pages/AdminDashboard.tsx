import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calculator,
  FileText,
  Users,
  LogOut,
  ShieldCheck,
  BarChart3,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
  const { isAdmin, isLoading, user, signOut } = useAdmin();
  const navigate = useNavigate();
  const [cgpaLogs, setCgpaLogs] = useState<any[]>([]);
  const [notesCount, setNotesCount] = useState(0);
  const [requestsCount, setRequestsCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      if (!user) {
        navigate("/admin-login");
      }
    }
  }, [isLoading, isAdmin, user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    const [logsRes, notesRes, reqRes, fbRes] = await Promise.all([
      supabase.from("cgpa_logs").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("notes").select("id", { count: "exact", head: true }),
      supabase.from("notes_requests").select("id", { count: "exact", head: true }),
      supabase.from("feedback").select("id", { count: "exact", head: true }),
    ]);

    setCgpaLogs(logsRes.data || []);
    setNotesCount(notesRes.count || 0);
    setRequestsCount(reqRes.count || 0);
    setFeedbackCount(fbRes.count || 0);
    setLoadingData(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin-login");
  };

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
    return (
      <Layout showFooter={false}>
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <ShieldCheck className="w-16 h-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
            <p className="text-muted-foreground">You don't have admin privileges.</p>
            <Button onClick={() => navigate("/admin-login")} variant="outline">
              Go to Login
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-5rem)] py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Logged in as {user?.email}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchDashboardData}
                disabled={loadingData}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loadingData ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="destructive" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Notes"
              value={notesCount}
              icon={FileText}
            />
            <StatCard
              title="Note Requests"
              value={requestsCount}
              icon={Users}
            />
            <StatCard
              title="Feedback"
              value={feedbackCount}
              icon={BarChart3}
            />
            <StatCard
              title="CGPA Calculations"
              value={cgpaLogs.length}
              subtitle="Last 50 entries"
              icon={Calculator}
            />
          </div>

          {/* CGPA Logs Table */}
          <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
            <div className="p-4 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">CGPA Usage Logs</h2>
              <p className="text-sm text-muted-foreground">Recent calculator usage tracked anonymously</p>
            </div>

            {cgpaLogs.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No CGPA logs yet. Usage will appear here as students use the calculator.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>SGPA</TableHead>
                      <TableHead>CGPA</TableHead>
                      <TableHead>%</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cgpaLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            log.calculation_type === "cgpa"
                              ? "bg-violet-500/10 text-violet-600"
                              : "bg-cyan-500/10 text-cyan-600"
                          }`}>
                            {log.calculation_type?.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>{log.branch || "—"}</TableCell>
                        <TableCell>{log.semester || "—"}</TableCell>
                        <TableCell>{log.sgpa ?? "—"}</TableCell>
                        <TableCell>{log.cgpa ?? "—"}</TableCell>
                        <TableCell>{log.percentage ?? "—"}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {new Date(log.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
