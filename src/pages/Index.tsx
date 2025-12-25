import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Download, Users, Zap, Search, Shield } from "lucide-react";

export default function Index() {
  const features = [
    { icon: BookOpen, title: "Quality Notes", description: "Curated study materials from top universities" },
    { icon: Download, title: "Fast Downloads", description: "Instant access to all notes without signup" },
    { icon: Users, title: "Community Driven", description: "Notes shared by students, for students" },
    { icon: Shield, title: "Verified Content", description: "All notes reviewed by academic experts" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-primary-foreground">
        <div className="absolute inset-0 hero-glow" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm mb-6 animate-fade-in">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Free access to 1000+ notes</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Your Gateway to
              <span className="block gradient-text bg-gradient-to-r from-teal to-sky">Academic Success</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-slide-up stagger-1">
              Access quality university notes organized by branch, semester, and subject. Download individual files or bulk download as ZIP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
              <Button asChild size="lg" className="btn-gradient rounded-full px-8">
                <Link to="/notes">
                  <span>Browse Notes</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/notes">
                  <Search className="mr-2 h-5 w-5" />
                  Search Notes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose NoteVault?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to excel in your studies</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card-premium p-6 text-center hover-lift">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join thousands of students using NoteVault to ace their exams.</p>
          <Button asChild size="lg" className="btn-gradient rounded-full px-8">
            <Link to="/notes"><span>Get Started Free</span><ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
