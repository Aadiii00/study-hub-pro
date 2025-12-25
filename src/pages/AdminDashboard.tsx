import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download, Upload, Users, Plus, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [stats, setStats] = useState({ totalNotes: 0, totalDownloads: 0 });

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) navigate("/admin");
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) fetchStats();
  }, [user, isAdmin]);

  const fetchStats = async () => {
    const { data } = await supabase.from("notes").select("download_count");
    if (data) {
      setStats({
        totalNotes: data.length,
        totalDownloads: data.reduce((sum, n) => sum + (n.download_count || 0), 0),
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  if (isLoading) return <Layout><div className="flex items-center justify-center min-h-[60vh]"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div></Layout>;

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold">Dashboard</h1><p className="text-muted-foreground">Manage your notes platform</p></div>
          <div className="flex gap-3">
            <Button asChild className="btn-gradient"><Link to="/admin/upload"><Plus className="h-4 w-4 mr-2" /><span>Upload Notes</span></Link></Button>
            <Button variant="outline" onClick={handleSignOut}><LogOut className="h-4 w-4 mr-2" />Sign Out</Button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={FileText} title="Total Notes" value={stats.totalNotes} />
          <StatCard icon={Download} title="Total Downloads" value={stats.totalDownloads.toLocaleString()} />
          <StatCard icon={Upload} title="This Month" value="0" subtitle="Notes uploaded" />
          <StatCard icon={Users} title="Active Users" value="--" subtitle="Coming soon" />
        </div>
      </div>
    </Layout>
  );
}
