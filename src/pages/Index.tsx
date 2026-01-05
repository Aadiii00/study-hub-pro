import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, BookOpen, Download, Users, Shield, Sparkles, GraduationCap, Star, ChevronRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    name: "CSE / ISE",
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

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const Icon = category.icon;
  const linkPath = category.id === "calculator" ? "/calculator" : `/notes/${category.id}`;
  
  return (
    <Link 
      to={linkPath} 
      className="group relative block animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-3xl p-1 transition-all duration-500 hover:scale-[1.02]">
        {/* Animated gradient border */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
        
        {/* Card content */}
        <div className="relative bg-card/95 dark:bg-card/80 backdrop-blur-xl rounded-[22px] p-6 h-full border border-border/50 group-hover:border-transparent transition-all duration-500">
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-[22px]">
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${category.gradient} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-700`} />
            <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${category.gradient} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity duration-700`} />
          </div>
          
          {/* Icon */}
          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} p-0.5 mb-5 group-hover:scale-110 transition-transform duration-500`}>
            <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
              <Icon className={`w-6 h-6 bg-gradient-to-br ${category.iconGradient} bg-clip-text text-transparent`} style={{ color: 'currentColor' }} />
            </div>
          </div>
          
          {/* Tag */}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.gradient} text-white mb-4`}>
            {category.tag}
          </span>
          
          {/* Title & subtitle */}
          <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">{category.subtitle}</p>
          
          {/* Stats & CTA */}
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
    { value: "6", label: "Branches" },
    { value: "8", label: "Semesters" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 hero-glow" />
          {/* Floating orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-md mb-10 animate-fade-in border border-primary/30 shadow-glow">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-white">Free access to 1000+ premium notes</span>
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-slide-up font-display tracking-tight">
              <span className="text-white">Your Gateway to</span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-cyan to-accent bg-clip-text text-transparent animate-shimmer" style={{ backgroundSize: '200% auto' }}>
                Academic Excellence
              </span>
              <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full ml-1 animate-pulse" />
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 mb-12 max-w-2xl mx-auto animate-slide-up stagger-1 leading-relaxed">
              Access quality VTU notes organized by branch and semester. 
              Download individual files or get everything in one click.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-slide-up stagger-2">
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
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 animate-fade-in stagger-3">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="group text-center p-6 md:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-500"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-display bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2 group-hover:from-primary group-hover:to-cyan transition-all duration-500">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-7 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-28 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/5 via-transparent to-transparent dark:from-navy/30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-5 border border-primary/20">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore by Branch
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display">
              Choose Your <span className="gradient-text">Branch</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Select your engineering branch to access semester-wise notes and study materials
            </p>
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
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display">
              Why Choose <span className="gradient-text">Campus Notes</span>?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
              Everything you need to succeed in your exams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group relative p-8 lg:p-10 rounded-3xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-500 hover:-translate-y-3 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-7`}>
                  <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold mb-3 font-display">{feature.title}</h3>
                <p className="text-muted-foreground text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hero-gradient opacity-60" />
          <div className="absolute inset-0 hero-glow" />
          {/* Decorative orbs */}
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
