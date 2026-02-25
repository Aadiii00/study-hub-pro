import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, BookOpen, Download, Users, Shield, Sparkles, GraduationCap, Star, ChevronRight, Calculator, Quote, Zap, Trophy, Clock, Send, MessageSquare, Brain, FileQuestion, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const categories = [
  {
    id: "first-year",
    name: "First Year",
    subtitle: "1st & 2nd Semester",
    tag: "P & C Cycle",
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    iconGradient: "from-blue-400 to-cyan-300",
    stats: "40K+ Downloads",
    icon: GraduationCap,
    isLink: true,
  },
  {
    id: "cse-ise",
    name: "CSE Stream",
    subtitle: "3rd to 8th Semester",
    tag: "Computer Science",
    gradient: "from-indigo-600 via-purple-500 to-violet-400",
    iconGradient: "from-indigo-400 to-violet-300",
    stats: "119K+ Downloads",
    icon: BookOpen,
    isLink: true,
  },
  {
    id: "calculator",
    name: "Calculator",
    subtitle: "SGPA & CGPA",
    tag: "VTU Tools",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    iconGradient: "from-violet-400 to-fuchsia-300",
    stats: "Quick Calculate",
    icon: Calculator,
    isLink: true,
  },
  {
    id: "ai-quiz",
    name: "AI Quiz",
    subtitle: "Quiz & Flashcards",
    tag: "AI Powered",
    gradient: "from-pink-600 via-rose-500 to-red-400",
    iconGradient: "from-pink-400 to-red-300",
    stats: "Instant Generate",
    icon: Brain,
    isLink: true,
  },
  {
    id: "study-planner",
    name: "Study Planner",
    subtitle: "AI Schedule Generator",
    tag: "AI Powered",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    iconGradient: "from-emerald-400 to-cyan-300",
    stats: "Smart Planning",
    icon: Calendar,
    isLink: true,
  },
  {
    id: "request-notes",
    name: "Request Notes",
    subtitle: "Community Driven",
    tag: "New Feature",
    gradient: "from-sky-600 via-blue-500 to-indigo-400",
    iconGradient: "from-sky-400 to-indigo-300",
    stats: "Submit Requests",
    icon: FileQuestion,
    isLink: true,
  },
  {
    id: "ece",
    name: "ECE",
    subtitle: "3rd to 8th Semester",
    tag: "Electronics",
    gradient: "from-rose-600 via-pink-500 to-orange-400",
    iconGradient: "from-rose-400 to-orange-300",
    stats: "42K+ Downloads",
    icon: BookOpen,
    isLink: true,
  },
  {
    id: "eee",
    name: "EEE",
    subtitle: "3rd to 8th Semester",
    tag: "Electrical",
    gradient: "from-amber-600 via-yellow-500 to-lime-400",
    iconGradient: "from-amber-400 to-lime-300",
    stats: "32K+ Downloads",
    icon: BookOpen,
    isLink: true,
  },
  {
    id: "civil",
    name: "Civil",
    subtitle: "3rd to 8th Semester",
    tag: "Civil Engineering",
    gradient: "from-slate-600 via-gray-500 to-zinc-400",
    iconGradient: "from-slate-400 to-zinc-300",
    stats: "28K+ Downloads",
    icon: BookOpen,
    isLink: true,
  },
  {
    id: "mech",
    name: "Mechanical",
    subtitle: "3rd to 8th Semester",
    tag: "Mechanical",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    iconGradient: "from-emerald-400 to-cyan-300",
    stats: "35K+ Downloads",
    icon: BookOpen,
    isLink: true,
  },
];

const testimonials = [
  { name: "Rahul S.", branch: "CSE, 6th Sem", text: "StudyHub saved my semester! The notes are concise and exam-focused. Got 9.2 SGPA thanks to these materials.", avatar: "RS" },
  { name: "Priya M.", branch: "ECE, 4th Sem", text: "The GURU AI feature is a game-changer. It explains complex circuits in seconds. Best study companion ever!", avatar: "PM" },
  { name: "Karthik R.", branch: "Mech, 5th Sem", text: "No more hunting for notes. Everything is organized semester-wise. The PDF quality is amazing!", avatar: "KR" },
  { name: "Sneha D.", branch: "EEE, 3rd Sem", text: "I recommend StudyHub to every VTU student. The solved papers helped me score a distinction in all subjects.", avatar: "SD" },
  { name: "Arun K.", branch: "Civil, 7th Sem", text: "The SGPA calculator is super handy. And the notes cover every module thoroughly. Five stars!", avatar: "AK" },
  { name: "Meera V.", branch: "ISE, 4th Sem", text: "Clean interface, fast downloads, and the AI assistant is incredibly smart. This is what students need!", avatar: "MV" },
];

const marqueeItems = [
  "📚 1000+ Quality Notes", "⬇️ 50K+ Downloads", "🎓 6 Engineering Branches", 
  "🧮 SGPA & CGPA Calculator", "🤖 GURU AI Assistant", "📝 Solved Question Papers",
  "⚡ Instant Access", "🏆 Top Performer Notes", "🔒 Verified Content", "💡 Module-wise Organization",
];

function AnimatedCounter({ target, label }: { target: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = numericTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  return (
    <div ref={ref} className="group text-center p-6 md:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-500">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-display bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2 group-hover:from-primary group-hover:to-cyan transition-all duration-500">
        {isInView ? `${count}${suffix}` : "0"}
      </div>
      <div className="text-sm md:text-base text-white/50 font-medium">{label}</div>
    </div>
  );
}

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const Icon = category.icon;
  const specialRoutes: Record<string, string> = { calculator: "/calculator", "ai-quiz": "/ai-quiz", "request-notes": "/request-notes", "study-planner": "/study-planner" };
  const linkPath = specialRoutes[category.id] || `/notes/${category.id}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={linkPath} className="group relative block">
        <div className="relative overflow-hidden rounded-3xl p-1 transition-all duration-500 hover:scale-[1.02]">
          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
          
          <div className="relative bg-card/95 dark:bg-card/80 backdrop-blur-xl rounded-[22px] p-6 h-full border border-border/50 group-hover:border-transparent transition-all duration-500">
            <div className="absolute inset-0 overflow-hidden rounded-[22px]">
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${category.gradient} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-700`} />
              <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${category.gradient} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity duration-700`} />
            </div>
            
            <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} p-0.5 mb-5 group-hover:scale-110 transition-transform duration-500`}>
              <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
                <Icon className={`w-6 h-6`} style={{ color: 'currentColor' }} />
              </div>
            </div>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.gradient} text-white mb-4`}>
              {category.tag}
            </span>
            
            <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">{category.subtitle}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Download className="w-3 h-3" />
                {category.stats}
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                Explore <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow/10 min-w-[320px] flex-shrink-0"
    >
      <Quote className="w-8 h-8 text-primary/20 mb-3" />
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.branch}</p>
        </div>
      </div>
    </motion.div>
  );
}

const FEEDBACK_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-feedback`;

function FeedbackSection() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating === 0) {
      toast({ title: "Please fill all required fields", description: "Name, rating, and message are required.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const resp = await fetch(FEEDBACK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ name: name.trim(), branch: branch.trim() || null, rating, message: message.trim() }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        throw new Error(err.error || "Failed to submit");
      }
      setSubmitted(true);
      toast({ title: "Thank you! 🎉", description: "Your feedback has been submitted successfully." });
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center p-10 rounded-3xl bg-card border border-border/50"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
              <Star className="w-8 h-8 text-primary fill-primary" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-3 text-foreground">Thank You!</h3>
            <p className="text-muted-foreground">Your feedback means a lot to us. We'll use it to make StudyHub even better! 🚀</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-5 border border-primary/20"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Share Your Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display"
          >
            Your <span className="gradient-text">Feedback</span> Matters
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Help us improve StudyHub by sharing your thoughts and suggestions
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-8 md:p-10 rounded-3xl bg-card border border-border/50 shadow-premium"
        >
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                placeholder="Your name"
                className="w-full input-premium"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Branch & Semester</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                maxLength={100}
                placeholder="e.g. CSE, 4th Sem"
                className="w-full input-premium"
              />
            </div>
          </div>

          {/* Star Rating */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">Your Feedback *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Tell us what you love about StudyHub or how we can improve..."
              className="w-full input-premium resize-none"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">{message.length}/1000</p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-gradient rounded-xl py-6 text-base font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-500 hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Feedback
              </span>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

export default function Index() {
  const features = [
    { icon: BookOpen, title: "Quality Notes", description: "Curated study materials from top performers", color: "from-blue-500 to-cyan-500" },
    { icon: Download, title: "Instant Access", description: "Download without any signup required", color: "from-emerald-500 to-teal-500" },
    { icon: Users, title: "Community", description: "Built by students, for students", color: "from-violet-500 to-purple-500" },
    { icon: Shield, title: "Verified", description: "Reviewed by academic experts", color: "from-amber-500 to-orange-500" },
  ];

  const stats = [
    { value: "1000+", label: "Notes" },
    { value: "50K+", label: "Downloads" },
    { value: "6+", label: "Branches" },
    { value: "8+", label: "Semesters" },
  ];

  const highlights = [
    { icon: Zap, title: "AI-Powered", desc: "GURU AI answers your doubts instantly" },
    { icon: Trophy, title: "Exam Ready", desc: "Solved papers & question banks" },
    { icon: Clock, title: "Always Updated", desc: "New notes added every semester" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-md mb-10 border border-primary/30 shadow-glow"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-white">Your Premium Study Companion</span>
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 font-display tracking-tight"
            >
              <span className="text-white">Welcome to</span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-cyan to-accent bg-clip-text text-transparent animate-shimmer" style={{ backgroundSize: '200% auto' }}>
                StudyHub
              </span>
              <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full ml-1 animate-glow-pulse" />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl lg:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Premium VTU notes, solved papers & AI-powered study assistant — all in one place. Built by students, for students.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <Button asChild size="lg" className="group btn-gradient rounded-full px-10 py-7 text-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-500 hover:scale-105">
                <Link to="/notes/first-year">
                  <span>Start Learning</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 py-7 text-lg font-semibold border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-primary/50 backdrop-blur-md transition-all duration-300">
                <Link to="/notes/cse-ise">
                  Browse All Notes
                </Link>
              </Button>
            </motion.div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20">
              {stats.map((stat, i) => (
                <AnimatedCounter key={i} target={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-7 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <section className="py-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border/30 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-medium text-muted-foreground flex-shrink-0">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-premium-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-28 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/5 via-transparent to-transparent dark:from-navy/30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-5 border border-primary/20"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Explore by Branch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display"
            >
              Choose Your <span className="gradient-text">Branch</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            >
              Select your engineering branch to access semester-wise notes and study materials
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display"
            >
              Why Choose <span className="gradient-text">StudyHub</span>?
            </motion.h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
              Everything you need to succeed in your exams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 lg:p-10 rounded-3xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-500 hover:-translate-y-3"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-7`}>
                  <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold mb-3 font-display">{feature.title}</h3>
                <p className="text-muted-foreground text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Feedback Form */}
      <FeedbackSection />

      {/* CTA */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hero-gradient opacity-60" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-white">Join 50,000+ students</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-7 text-white font-display">
              Ready to Ace Your Exams?
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get instant access to comprehensive notes, solved papers, and question banks. Start your journey to academic success today.
            </p>
            
            <Button asChild size="lg" className="group btn-gradient rounded-full px-12 py-7 text-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-500 hover:scale-105">
              <Link to="/notes/first-year">
                <span>Get Started Free</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
