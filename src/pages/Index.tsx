import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Eye, Heart, Zap, ArrowRight, BookOpen, Download, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "first-year",
    name: "FIRST YEAR",
    subtitle: "1 & 2 Sem",
    tag: "P AND C CYCLE",
    color: "from-blue-500 to-cyan-400",
    views: "40.4K",
    likes: 136,
  },
  {
    id: "cse-ise",
    name: "CSE / ISE",
    subtitle: "3 to 8 Sem",
    tag: "CSE-ISE",
    color: "from-purple-500 to-violet-400",
    views: "119.5K",
    likes: 94,
  },
  {
    id: "ece",
    name: "ECE",
    subtitle: "3 to 8 Sem",
    tag: "ECE",
    color: "from-violet-500 to-purple-400",
    views: "41.9K",
    likes: 142,
  },
  {
    id: "eee",
    name: "EEE",
    subtitle: "3 to 8 Sem",
    tag: "EEE",
    color: "from-indigo-500 to-violet-400",
    views: "32.1K",
    likes: 98,
  },
  {
    id: "civil",
    name: "CIVIL",
    subtitle: "3 to 8 Sem",
    tag: "CIVIL",
    color: "from-slate-500 to-gray-400",
    views: "28.5K",
    likes: 76,
  },
  {
    id: "mech",
    name: "MECH",
    subtitle: "3 to 8 Sem",
    tag: "MECH",
    color: "from-cyan-500 to-teal-400",
    views: "35.2K",
    likes: 112,
  },
];

function CategoryCard({ category }: { category: typeof categories[0] }) {
  return (
    <Link to={`/notes/${category.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] hover-lift">
        {/* Background with gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
        
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 20 }).map((_, i) => (
              <rect
                key={i}
                x={Math.random() * 100}
                y={Math.random() * 100}
                width={4 + Math.random() * 6}
                height={4 + Math.random() * 6}
                fill="currentColor"
                className="text-white"
                rx="1"
              />
            ))}
          </svg>
        </div>

        {/* Tag badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-foreground shadow-md">
            {category.tag}
          </span>
        </div>

        {/* Category name */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold tracking-wider">{category.name}</h3>
          {category.subtitle && (
            <p className="text-sm mt-2 opacity-80">{category.subtitle}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mt-3 text-muted-foreground">
        <span className="flex items-center gap-1.5 text-sm">
          <Eye className="h-4 w-4" />
          {category.views} views
        </span>
        <span className="flex items-center gap-1.5 text-sm">
          <Heart className="h-4 w-4" />
          {category.likes}
        </span>
      </div>

      {/* Title with icon */}
      <div className="flex items-center gap-2 mt-2">
        <Zap className="h-4 w-4 text-primary" />
        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.name === "FIRST YEAR" ? "First Year" : category.name}
        </span>
      </div>
    </Link>
  );
}

export default function Index() {
  const features = [
    { icon: BookOpen, title: "Quality Notes", description: "Curated study materials from VTU" },
    { icon: Download, title: "Fast Downloads", description: "Instant access without signup" },
    { icon: Users, title: "Community Driven", description: "Notes by students, for students" },
    { icon: Shield, title: "Verified Content", description: "Reviewed by academic experts" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-primary-foreground">
        <div className="absolute inset-0 hero-glow" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm mb-6 animate-fade-in">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Free access to 1000+ notes</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
              Your Gateway to
              <span className="block gradient-text bg-gradient-to-r from-teal to-sky">Academic Success</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-6 animate-slide-up stagger-1">
              Access quality VTU notes organized by branch and semester. Download individual files or bulk download as ZIP.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Browse by Branch</h2>
            <p className="text-muted-foreground">Select your branch to find relevant notes</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card-premium p-6 text-center hover-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of students using NoteVault to ace their exams.
          </p>
          <Button asChild size="lg" className="btn-gradient rounded-full px-8">
            <Link to="/notes/first-year">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
