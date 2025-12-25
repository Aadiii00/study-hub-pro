import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, BookOpen, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FirstYear() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center px-4 py-12">
        {/* Back Button */}
        <div className="w-full max-w-xl mb-8">
          <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Choose Your Cycle */}
        <div className="w-full max-w-xl space-y-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">First Year</h1>
            <p className="text-muted-foreground">Select your cycle to view subjects</p>
          </div>

          {/* Cycle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* P Cycle */}
            <Link
              to="/notes/first-year/2022/p-cycle"
              className="group relative block p-8 rounded-2xl text-center text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 overflow-hidden animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl tracking-wide mb-2">P Cycle</h2>
                <p className="text-white/80 text-sm font-normal">Physics & Mathematics First</p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </Link>

            {/* C Cycle */}
            <Link
              to="/notes/first-year/2022/c-cycle"
              className="group relative block p-8 rounded-2xl text-center text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 overflow-hidden animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FlaskConical className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl tracking-wide mb-2">C Cycle</h2>
                <p className="text-white/80 text-sm font-normal">Chemistry & Programming First</p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
