import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, ArrowLeft, FileUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminUpload() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", university: "", branch: "", semester: "1", subject: "", module: "" });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => { if (!isLoading && (!user || !isAdmin)) navigate("/admin"); }, [user, isAdmin, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast({ title: "Error", description: "Please select a file", variant: "destructive" }); return; }
    setUploading(true);
    
    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from("notes").upload(filePath, file);
    if (uploadError) { toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" }); setUploading(false); return; }
    
    const { data: { publicUrl } } = supabase.storage.from("notes").getPublicUrl(filePath);
    
    const { error: insertError } = await supabase.from("notes").insert({
      ...form, semester: parseInt(form.semester), file_url: publicUrl, file_name: file.name, file_type: fileExt || "pdf", file_size: file.size, uploaded_by: user?.id,
    });
    
    if (insertError) { toast({ title: "Error", description: insertError.message, variant: "destructive" }); }
    else { toast({ title: "Success", description: "Note uploaded successfully!" }); navigate("/admin/dashboard"); }
    setUploading(false);
  };

  if (isLoading) return <Layout><div className="flex items-center justify-center min-h-[60vh]"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div></Layout>;

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" asChild className="mb-6"><Link to="/admin/dashboard"><ArrowLeft className="h-4 w-4 mr-2" />Back to Dashboard</Link></Button>
        <div className="card-premium p-8">
          <div className="flex items-center gap-3 mb-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Upload className="h-6 w-6" /></div><div><h1 className="text-2xl font-bold">Upload Notes</h1><p className="text-muted-foreground text-sm">Add new study materials</p></div></div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
              <div className="space-y-2"><Label>University *</Label><Input value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Branch *</Label><Input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Semester *</Label><Select value={form.semester} onValueChange={(v) => setForm({ ...form, semester: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{[1,2,3,4,5,6,7,8].map(s => <SelectItem key={s} value={s.toString()}>Semester {s}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>Subject *</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Module</Label><Input value={form.module} onChange={(e) => setForm({ ...form, module: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div className="space-y-2"><Label>File *</Label><div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById("file-input")?.click()}><FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-3" /><p className="text-sm text-muted-foreground">{file ? file.name : "Click to upload PDF, DOC, or PPT"}</p><input id="file-input" type="file" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={(e) => setFile(e.target.files?.[0] || null)} /></div></div>
            <Button type="submit" className="w-full btn-gradient" disabled={uploading}>{uploading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" /> : <><span>Upload Note</span></>}</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
