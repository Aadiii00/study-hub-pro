import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, FileQuestion, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NotesRequest {
  id: string;
  student_name: string;
  branch: string;
  semester: number;
  subject: string;
  module: string | null;
  description: string | null;
  status: string;
  created_at: string;
}

const FEEDBACK_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-feedback`;

const branches = ["CSE", "ISE", "ECE", "EEE", "Civil", "Mechanical", "First Year"];
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function RequestNotes() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState<number>(0);
  const [subject, setSubject] = useState("");
  const [module, setModule] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState<NotesRequest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("notes_requests" as any)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setRequests(data as unknown as NotesRequest[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !branch || !semester || !subject.trim()) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("notes_requests" as any).insert({
        student_name: name.trim(),
        branch,
        semester,
        subject: subject.trim(),
        module: module.trim() || null,
        description: description.trim() || null,
      } as any);

      if (error) throw error;

      // Also send email notification
      try {
        await fetch(FEEDBACK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
          body: JSON.stringify({
            name: name.trim(),
            branch,
            rating: 5,
            message: `📝 NOTES REQUEST\nSubject: ${subject.trim()}\nSemester: ${semester}\nModule: ${module.trim() || "All"}\nDetails: ${description.trim() || "None"}`,
          }),
        });
      } catch {
        // Email is optional
      }

      setSubmitted(true);
      toast({ title: "Request submitted! 🎉", description: "We'll work on getting these notes for you." });
      fetchRequests();
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "fulfilled": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "in_progress": return <Clock className="w-4 h-4 text-amber-500" />;
      default: return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "fulfilled": return "Fulfilled";
      case "in_progress": return "In Progress";
      default: return "Pending";
    }
  };

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-[100px] animate-float" />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md mb-6 border border-primary/30">
              <FileQuestion className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white">Community Driven</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
              Request <span className="gradient-text">Notes</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Can't find the notes you need? Submit a request and we'll add them for you!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-3xl bg-card border border-border/50 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3 text-foreground">Request Submitted!</h3>
                  <p className="text-muted-foreground mb-5">We'll try to add these notes as soon as possible.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-xl">
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 md:p-8 rounded-3xl bg-card border border-border/50 shadow-premium space-y-4"
                >
                  <h3 className="text-lg font-bold font-display text-foreground mb-2">Submit a Request</h3>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Your Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="Enter your name" className="w-full input-premium" required />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Branch *</label>
                      <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full input-premium" required>
                        <option value="">Select</option>
                        {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Semester *</label>
                      <select value={semester || ""} onChange={(e) => setSemester(Number(e.target.value))} className="w-full input-premium" required>
                        <option value="">Select</option>
                        {semesters.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} placeholder="e.g. Data Structures" className="w-full input-premium" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Module (optional)</label>
                    <input type="text" value={module} onChange={(e) => setModule(e.target.value)} maxLength={100} placeholder="e.g. Module 3" className="w-full input-premium" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Additional Details</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} rows={3} placeholder="Any specific topics or format preferences..." className="w-full input-premium resize-none" />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full btn-gradient rounded-xl py-5 text-base font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-500">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Submit Request
                      </span>
                    )}
                  </Button>
                </motion.form>
              )}
            </div>

            {/* Recent Requests */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold font-display text-foreground mb-4">Recent Requests</h3>
              <div className="space-y-3">
                {requests.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
                    <FileQuestion className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No requests yet. Be the first!</p>
                  </div>
                ) : (
                  requests.map((req, i) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground text-sm truncate">{req.subject}</span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground flex-shrink-0">
                              {req.branch} • Sem {req.semester}
                            </span>
                          </div>
                          {req.module && <p className="text-xs text-muted-foreground">Module: {req.module}</p>}
                          {req.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{req.description}</p>}
                          <p className="text-xs text-muted-foreground mt-1.5">by {req.student_name} • {new Date(req.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {statusIcon(req.status)}
                          <span className="text-xs font-medium text-muted-foreground">{statusLabel(req.status)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
