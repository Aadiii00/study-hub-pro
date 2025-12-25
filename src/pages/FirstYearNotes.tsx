import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, BookOpen, Calculator, FlaskConical, Cpu, Zap, Code, Scale, Lightbulb, PenTool, Languages, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Subject data with icons
const subjectIcons: Record<string, React.ElementType> = {
  BMATS101: Calculator,
  BMATS201: Calculator,
  BPOPS103: Code,
  BPHYS102: FlaskConical,
  BCHES202: FlaskConical,
  BENGK206: PenTool,
  BESCK104B: Zap,
  BESCK104C: Cpu,
  BPLCK105B: Code,
  BICOK207: Scale,
  BIDTK258: Lightbulb,
  BPWSK106: PenTool,
  BKSKK107: Languages,
  BSFHK158: Heart,
};

const subjectColors: Record<string, string> = {
  BMATS101: "from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 border-blue-500/20",
  BMATS201: "from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 border-blue-500/20",
  BPOPS103: "from-emerald-500/20 to-emerald-600/10 hover:from-emerald-500/30 hover:to-emerald-600/20 border-emerald-500/20",
  BPHYS102: "from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 border-purple-500/20",
  BCHES202: "from-orange-500/20 to-orange-600/10 hover:from-orange-500/30 hover:to-orange-600/20 border-orange-500/20",
  BENGK206: "from-pink-500/20 to-pink-600/10 hover:from-pink-500/30 hover:to-pink-600/20 border-pink-500/20",
  BESCK104B: "from-yellow-500/20 to-yellow-600/10 hover:from-yellow-500/30 hover:to-yellow-600/20 border-yellow-500/20",
  BESCK104C: "from-cyan-500/20 to-cyan-600/10 hover:from-cyan-500/30 hover:to-cyan-600/20 border-cyan-500/20",
  BPLCK105B: "from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 border-green-500/20",
  BICOK207: "from-red-500/20 to-red-600/10 hover:from-red-500/30 hover:to-red-600/20 border-red-500/20",
  BIDTK258: "from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20 border-amber-500/20",
  BPWSK106: "from-rose-500/20 to-rose-600/10 hover:from-rose-500/30 hover:to-rose-600/20 border-rose-500/20",
  BKSKK107: "from-indigo-500/20 to-indigo-600/10 hover:from-indigo-500/30 hover:to-indigo-600/20 border-indigo-500/20",
  BSFHK158: "from-teal-500/20 to-teal-600/10 hover:from-teal-500/30 hover:to-teal-600/20 border-teal-500/20",
};

const iconColors: Record<string, string> = {
  BMATS101: "text-blue-500",
  BMATS201: "text-blue-500",
  BPOPS103: "text-emerald-500",
  BPHYS102: "text-purple-500",
  BCHES202: "text-orange-500",
  BENGK206: "text-pink-500",
  BESCK104B: "text-yellow-500",
  BESCK104C: "text-cyan-500",
  BPLCK105B: "text-green-500",
  BICOK207: "text-red-500",
  BIDTK258: "text-amber-500",
  BPWSK106: "text-rose-500",
  BKSKK107: "text-indigo-500",
  BSFHK158: "text-teal-500",
};

// Subject data for P Cycle and C Cycle
const pCycleSubjects = [
  { name: "Mathematics-I for CSE", code: "BMATS101" },
  { name: "Mathematics-II for CSE", code: "BMATS201" },
  { name: "Principles of Programming using C", code: "BPOPS103" },
  { name: "Applied Physics for CSE", code: "BPHYS102" },
  { name: "Chemistry for CSE", code: "BCHES202" },
  { name: "Communicative English", code: "BENGK206" },
  { name: "Intro to Electrical Engineering", code: "BESCK104B" },
  { name: "Intro to Electronics & Communication", code: "BESCK104C" },
  { name: "Intro to Python Programming", code: "BPLCK105B" },
  { name: "Indian Constitution", code: "BICOK207" },
  { name: "Innovation & Design Thinking", code: "BIDTK258" },
  { name: "Professional Writing Skills in English", code: "BPWSK106" },
  { name: "Samskrutika Kannada", code: "BKSKK107" },
  { name: "Scientific Foundations for Health", code: "BSFHK158" },
];

const cCycleSubjects = [
  { name: "Mathematics-I for CSE", code: "BMATS101" },
  { name: "Mathematics-II for CSE", code: "BMATS201" },
  { name: "Principles of Programming using C", code: "BPOPS103" },
  { name: "Applied Physics for CSE", code: "BPHYS102" },
  { name: "Chemistry for CSE", code: "BCHES202" },
  { name: "Communicative English", code: "BENGK206" },
  { name: "Intro to Electrical Engineering", code: "BESCK104B" },
  { name: "Intro to Electronics & Communication", code: "BESCK104C" },
  { name: "Intro to Python Programming", code: "BPLCK105B" },
  { name: "Indian Constitution", code: "BICOK207" },
  { name: "Innovation & Design Thinking", code: "BIDTK258" },
  { name: "Professional Writing Skills in English", code: "BPWSK106" },
  { name: "Samskrutika Kannada", code: "BKSKK107" },
  { name: "Scientific Foundations for Health", code: "BSFHK158" },
];

function SubjectCard({ name, code, scheme, cycle, index }: { name: string; code: string; scheme: string; cycle: string; index: number }) {
  const Icon = subjectIcons[code] || BookOpen;
  const colorClass = subjectColors[code] || "from-gray-500/20 to-gray-600/10 hover:from-gray-500/30 hover:to-gray-600/20 border-gray-500/20";
  const iconColor = iconColors[code] || "text-gray-500";
  
  return (
    <Link
      to={`/notes/first-year/${scheme}/${cycle}/${code}`}
      className={`group relative block bg-gradient-to-br ${colorClass} border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className={`p-3 rounded-xl bg-background/50 backdrop-blur-sm ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm leading-tight mb-1">
            {name}
          </h3>
          <span className="text-xs text-muted-foreground font-mono">
            {code}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}

export default function FirstYearNotes() {
  const { scheme, cycle } = useParams<{ scheme: string; cycle: string }>();
  
  const cycleName = cycle === "p-cycle" ? "P Cycle" : "C Cycle";
  const schemeName = scheme === "2022" ? "2022 Scheme" : "2025 Scheme";
  const subjects = cycle === "p-cycle" ? pCycleSubjects : cCycleSubjects;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
            <Link to="/notes/first-year"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              First Year - {cycleName}
            </h1>
            <p className="text-muted-foreground mt-1">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {schemeName} • {subjects.length} Subjects
              </span>
            </p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {subjects.map((subject, index) => (
            <SubjectCard 
              key={subject.code} 
              name={subject.name} 
              code={subject.code} 
              scheme={scheme || "2022"}
              cycle={cycle || "p-cycle"}
              index={index}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
