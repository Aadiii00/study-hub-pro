import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, Rocket, Download, FileText, BookOpen, ClipboardList, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Module {
  name: string;
  url: string;
}

interface NoteItem {
  title: string;
  source: string;
  type: "notes" | "textbook" | "qp";
  url: string;
  modules?: Module[];
}

// Subject info with notes from different colleges
const subjectNotesData: Record<string, {
  name: string;
  code: string;
  semester: number;
  notes: NoteItem[];
}> = {
  "BCS301": {
    name: "Mathematics for CSE",
    code: "BCS301",
    semester: 3,
    notes: [
      { 
        title: "Notes 1 — SVIT", 
        source: "SVIT College", 
        type: "notes", 
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/MATHS/Module_1_SVIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/MATHS/Module_2_SVIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/MATHS/Module_3_SVIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/MATHS/Module_4_SVIT.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem3/MATHS/Module_5_SVIT.pdf" },
        ]
      },
      { title: "Notes 2 — RNSIT", source: "RNSIT College", type: "notes", url: "#" },
      { title: "Notes 3 — SJCIT", source: "SJCIT College", type: "notes", url: "#" },
      { title: "Notes 4 — ATME", source: "ATME College", type: "notes", url: "#" },
      { title: "Textbooks", source: "Reference Books", type: "textbook", url: "#" },
      { title: "Model QP with Solution", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  "BCS302": {
    name: "Data Structures and Applications",
    code: "BCS302",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2 — RNSIT", source: "RNSIT College", type: "notes", url: "#" },
      { title: "Notes 3 — DSCE", source: "DSCE College", type: "notes", url: "#" },
      { title: "Textbooks", source: "Reference Books", type: "textbook", url: "#" },
      { title: "Model QP with Solution", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  "BCS303": {
    name: "Digital Design and Computer Organization",
    code: "BCS303",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2 — RNSIT", source: "RNSIT College", type: "notes", url: "#" },
      { title: "Textbooks", source: "Reference Books", type: "textbook", url: "#" },
      { title: "Model QP with Solution", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  "BCS304": {
    name: "Operating Systems",
    code: "BCS304",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2 — RNSIT", source: "RNSIT College", type: "notes", url: "#" },
      { title: "Textbooks", source: "Reference Books", type: "textbook", url: "#" },
      { title: "Model QP with Solution", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  "BCS305": {
    name: "Object Oriented Programming with C++ and Java",
    code: "BCS305",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2 — RNSIT", source: "RNSIT College", type: "notes", url: "#" },
      { title: "Textbooks", source: "Reference Books", type: "textbook", url: "#" },
      { title: "Model QP with Solution", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  "BCSL306": {
    name: "Data Structures Lab",
    code: "BCSL306",
    semester: 3,
    notes: [
      { title: "Lab Manual", source: "Official Lab Manual", type: "notes", url: "#" },
      { title: "Lab Programs with Output", source: "Complete Programs", type: "notes", url: "#" },
      { title: "Viva Questions", source: "Lab Viva Q&A", type: "qp", url: "#" },
    ],
  },
  "BCS307": {
    name: "Universal Human Values",
    code: "BCS307",
    semester: 3,
    notes: [
      { title: "Notes 1 — Complete", source: "All Modules", type: "notes", url: "#" },
      { title: "Important Questions", source: "Frequently Asked", type: "qp", url: "#" },
      { title: "Model QP with Solution", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
};

function NoteButton({ 
  note, 
  index, 
  isExpanded,
  onToggle,
  onDownload 
}: { 
  note: NoteItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onDownload: (url: string, title: string) => void;
}) {
  const getIcon = () => {
    switch (note.type) {
      case "textbook": return <BookOpen className="w-5 h-5" />;
      case "qp": return <ClipboardList className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const hasModules = note.modules && note.modules.length > 0;

  return (
    <div className="animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
      <button
        onClick={() => hasModules ? onToggle() : onDownload(note.url, note.title)}
        className="group relative w-full"
      >
        <div className={`relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isExpanded ? 'rounded-t-xl' : 'rounded-xl'}`}>
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          {/* Content */}
          <div className="relative flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold">
            {getIcon()}
            <span className="text-base">{note.title}</span>
            {hasModules ? (
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            ) : (
              <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2" />
            )}
          </div>
        </div>
      </button>

      {/* Modules dropdown */}
      {hasModules && isExpanded && (
        <div className="bg-card border border-t-0 border-border/50 rounded-b-xl overflow-hidden animate-fade-in">
          <div className="p-4 space-y-2">
            {note.modules!.map((module, idx) => (
              <button
                key={idx}
                onClick={() => onDownload(module.url, module.name)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 group"
              >
                <span className="text-sm font-medium text-foreground">{module.name}</span>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BranchSubjectNotes() {
  const { category, semester, subjectCode } = useParams<{ 
    category: string; 
    semester: string; 
    subjectCode: string;
  }>();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const subject = subjectCode ? subjectNotesData[subjectCode] : null;

  const handleDownload = (url: string, title: string) => {
    if (url === "#") {
      alert(`"${title}" will be available for download soon!`);
    } else {
      window.open(url, "_blank");
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!subject) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Subject not found</h2>
          <Button asChild variant="outline" className="mt-4">
            <Link to={`/notes/${category}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Back Button */}
          <Button asChild variant="ghost" size="sm" className="mb-8 hover:bg-primary/10">
            <Link to={`/notes/${category}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Semester {semester}
            </Link>
          </Button>

          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <p className="text-sm text-muted-foreground font-mono mb-2">{subject.code}</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{subject.name}</h1>
            <p className="text-muted-foreground">2022 Scheme • Semester {subject.semester}</p>
          </div>

          {/* Banner */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-muted/50 border border-border/50 mx-auto w-fit">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Notes from Every Corner—We Bring Them All to You!</span>
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            {subject.notes.map((note, index) => (
              <NoteButton
                key={index}
                note={note}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => toggleExpand(index)}
                onDownload={handleDownload}
              />
            ))}
          </div>

          {/* Footer info */}
          <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "500ms" }}>
            <p className="text-sm text-muted-foreground">
              Click on any option above to download the study material
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
