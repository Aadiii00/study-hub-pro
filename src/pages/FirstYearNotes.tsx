import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

function SubjectCard({ name, code, scheme, cycle }: { name: string; code: string; scheme: string; cycle: string }) {
  return (
    <Link
      to={`/notes/first-year/${scheme}/${cycle}/${code}`}
      className="block bg-secondary/80 dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <h3 className="font-semibold text-foreground text-sm md:text-base leading-tight">
        {name} - {code}
      </h3>
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
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="ghost" size="icon">
            <Link to="/notes/first-year"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">First Year - {cycleName}</h1>
            <p className="text-muted-foreground">{schemeName} • Select a subject</p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject) => (
            <SubjectCard 
              key={subject.code} 
              name={subject.name} 
              code={subject.code} 
              scheme={scheme || "2022"}
              cycle={cycle || "p-cycle"}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
