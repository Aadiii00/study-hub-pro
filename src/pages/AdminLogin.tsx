import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Mail, Lock, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signIn, isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (user && isAdmin) {
    navigate("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!", description: "Redirecting to dashboard..." });
      setTimeout(() => navigate("/admin/dashboard"), 500);
    }
    setIsLoading(false);
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary mx-auto mb-4 shadow-glow">
              <BookOpen className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage notes</p>
          </div>
          <div className="card-premium p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 btn-gradient" disabled={isLoading}>
                {isLoading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" /> : <><span>Sign In</span><ArrowRight className="ml-2 h-5 w-5" /></>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
