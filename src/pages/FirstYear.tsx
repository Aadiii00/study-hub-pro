import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FirstYear() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center px-4 py-12">
        {/* Back Button */}
        <div className="w-full max-w-2xl mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Choose Your Scheme */}
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center">
            <div className="inline-block px-8 py-4 rounded-xl border-2 border-border bg-card">
              <h1 className="text-xl md:text-2xl font-bold tracking-wide">CHOOSE YOUR SCHEME</h1>
            </div>
          </div>

          {/* 2022 Scheme */}
          <div className="space-y-4">
            <div className="bg-red-500 text-white py-4 px-6 rounded-xl text-center">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">2022 SCHEME</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/notes/first-year/2022/p-cycle"
                className="block py-4 px-6 rounded-xl text-center text-white font-bold text-lg md:text-xl tracking-wide transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r from-cyan-500 to-teal-500"
              >
                P Cycle
              </Link>
              <Link
                to="/notes/first-year/2022/c-cycle"
                className="block py-4 px-6 rounded-xl text-center text-white font-bold text-lg md:text-xl tracking-wide transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r from-purple-500 to-violet-500"
              >
                C Cycle
              </Link>
            </div>
          </div>

          {/* 2025 Scheme */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white py-4 px-6 rounded-xl text-center">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">2025 SCHEME</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/notes/first-year/2025/p-cycle"
                className="block py-4 px-6 rounded-xl text-center text-white font-bold text-lg md:text-xl tracking-wide transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r from-emerald-400 to-green-500"
              >
                P Cycle
              </Link>
              <Link
                to="/notes/first-year/2025/c-cycle"
                className="block py-4 px-6 rounded-xl text-center text-white font-bold text-lg md:text-xl tracking-wide transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r from-emerald-400 to-green-500"
              >
                C Cycle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
