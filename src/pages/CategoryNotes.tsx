import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FileX, ArrowLeft, BookOpen, Download, ChevronRight, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

// Subject data per branch and semester
const subjectData: Record<string, Record<number, { code: string; name: string; shortName: string }[]>> = {
  "cse-ise": {
    3: [
      { code: "BCS301", name: "Mathematics for CSE", shortName: "Maths" },
      { code: "BCS302", name: "Data Structures and Applications", shortName: "DSA" },
      { code: "BCS303", name: "Digital Design and Computer Organization", shortName: "DDCO" },
      { code: "BCS304", name: "Operating Systems", shortName: "OS" },
      { code: "BCS305", name: "Object Oriented Programming with C++ and Java", shortName: "OOP" },
      { code: "BCSL306", name: "Data Structures Lab", shortName: "DS Lab" },
      { code: "BCS307", name: "Universal Human Values", shortName: "UHV" },
    ],
    4: [
      { code: "BCS401", name: "Mathematical Foundation for Computing", shortName: "MFC" },
      { code: "BCS402", name: "Design and Analysis of Algorithms", shortName: "DAA" },
      { code: "BCS403", name: "Database Management Systems", shortName: "DBMS" },
      { code: "BCS404", name: "Computer Organization and Architecture", shortName: "COA" },
      { code: "BCS405", name: "Software Engineering", shortName: "SE" },
      { code: "BCSL406", name: "Database Management Systems Lab", shortName: "DBMS Lab" },
      { code: "BCS407", name: "Constitution of India and Professional Ethics", shortName: "CIPE" },
    ],
    5: [
      { code: "BCS501", name: "Computer Networks", shortName: "CN" },
      { code: "BCS502", name: "Theory of Computation", shortName: "TOC" },
      { code: "BCS503", name: "Artificial Intelligence", shortName: "AI" },
      { code: "BCS504", name: "Web Technologies", shortName: "WT" },
      { code: "BCSL505", name: "Computer Networks Lab", shortName: "CN Lab" },
    ],
    6: [
      { code: "BCS601", name: "System Software and Compiler Design", shortName: "SSCD" },
      { code: "BCS602", name: "Computer Graphics", shortName: "CG" },
      { code: "BCS603", name: "Machine Learning", shortName: "ML" },
      { code: "BCS604", name: "Cryptography and Network Security", shortName: "CNS" },
      { code: "BCSL605", name: "System Software Lab", shortName: "SS Lab" },
    ],
    7: [
      { code: "BCS701", name: "Big Data Analytics", shortName: "BDA" },
      { code: "BCS702", name: "Cloud Computing", shortName: "CC" },
      { code: "BCS703", name: "Internet of Things", shortName: "IoT" },
      { code: "BCS704", name: "Project Phase 1", shortName: "Project 1" },
    ],
    8: [
      { code: "BCS801", name: "Deep Learning", shortName: "DL" },
      { code: "BCS802", name: "Blockchain Technology", shortName: "BT" },
      { code: "BCS803", name: "Project Phase 2", shortName: "Project 2" },
      { code: "BCS804", name: "Internship", shortName: "Internship" },
    ],
  },
  "ece": {
    3: [
      { code: "BEC301", name: "Mathematics for EC", shortName: "Maths" },
      { code: "BEC302", name: "Network Analysis", shortName: "NA" },
      { code: "BEC303", name: "Electronic Devices", shortName: "ED" },
      { code: "BEC304", name: "Digital Electronics", shortName: "DE" },
      { code: "BEC305", name: "Signals and Systems", shortName: "S&S" },
    ],
    4: [
      { code: "BEC401", name: "Analog Electronics", shortName: "AE" },
      { code: "BEC402", name: "Control Systems", shortName: "CS" },
      { code: "BEC403", name: "Microprocessors", shortName: "MP" },
      { code: "BEC404", name: "Communication Systems", shortName: "Comm" },
    ],
    5: [],
    6: [],
    7: [],
    8: [],
  },
  "eee": {
    3: [
      { code: "BEE301", name: "Mathematics for EE", shortName: "Maths" },
      { code: "BEE302", name: "Electric Circuit Analysis", shortName: "ECA" },
      { code: "BEE303", name: "Electrical Machines I", shortName: "EM-I" },
      { code: "BEE304", name: "Electronic Devices", shortName: "ED" },
    ],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  },
  "civil": {
    3: [
      { code: "BCV301", name: "Engineering Mathematics III", shortName: "Maths" },
      { code: "BCV302", name: "Strength of Materials", shortName: "SOM" },
      { code: "BCV303", name: "Fluid Mechanics", shortName: "FM" },
      { code: "BCV304", name: "Surveying", shortName: "Survey" },
    ],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  },
  "mech": {
    3: [
      { code: "BME301", name: "Engineering Mathematics III", shortName: "Maths" },
      { code: "BME302", name: "Materials Science", shortName: "MS" },
      { code: "BME303", name: "Basic Thermodynamics", shortName: "TD" },
      { code: "BME304", name: "Mechanics of Materials", shortName: "MOM" },
    ],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  },
};

const categoryInfo: Record<string, { name: string; semesters: number[]; gradient: string }> = {
  "cse-ise": { name: "CSE / ISE", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-indigo-600 to-violet-500" },
  "ece": { name: "ECE", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-rose-600 to-orange-500" },
  "eee": { name: "EEE", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-amber-600 to-lime-500" },
  "civil": { name: "Civil", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-slate-600 to-zinc-500" },
  "mech": { name: "Mechanical", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-emerald-600 to-cyan-500" },
};

const semesterGradients = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-indigo-500 to-blue-500",
];

const subjectGradients = [
  "from-cyan-500 to-blue-500",
  "from-purple-500 to-violet-500",
  "from-pink-500 to-rose-500",
  "from-orange-500 to-amber-500",
  "from-teal-500 to-emerald-500",
  "from-blue-500 to-indigo-500",
  "from-fuchsia-500 to-purple-500",
];

function SemesterCard({ 
  semester, 
  index, 
  onClick,
  isActive,
  subjectCount
}: { 
  semester: number; 
  index: number; 
  onClick: () => void;
  isActive: boolean;
  subjectCount: number;
}) {
  const gradient = semesterGradients[index % semesterGradients.length];
  
  return (
    <button
      onClick={onClick}
      className={`group relative block w-full text-left animate-fade-in transition-all duration-300 ${
        isActive ? 'scale-[1.02]' : 'hover:scale-[1.02]'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`relative overflow-hidden rounded-2xl p-1 ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
        
        <div className="relative bg-card/90 backdrop-blur-sm rounded-xl p-5 border border-border/50 group-hover:border-transparent transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {semester}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">Semester {semester}</h3>
                <p className="text-sm text-muted-foreground">{subjectCount} subjects</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 ${isActive ? 'text-primary rotate-90' : ''}`} />
          </div>
        </div>
      </div>
    </button>
  );
}

function SubjectCard({
  subject,
  index,
  category,
  semester,
}: {
  subject: { code: string; name: string; shortName: string };
  index: number;
  category: string;
  semester: number;
}) {
  const gradient = subjectGradients[index % subjectGradients.length];

  return (
    <Link
      to={`/notes/${category}/${semester}/${subject.code}`}
      className="group relative block animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl p-1 transition-all duration-300 hover:scale-[1.02]">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
        
        <div className="relative bg-card/90 backdrop-blur-sm rounded-xl p-5 border border-border/50 group-hover:border-transparent transition-all duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                <FolderOpen className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-mono mb-1">{subject.code}</p>
                <h3 className="font-semibold text-foreground leading-tight mb-1 line-clamp-2">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground">Click to view notes</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${gradient} text-white text-sm font-medium shadow-lg`}>
              <Download className="w-4 h-4 inline mr-1" />
              View
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CategoryNotes() {
  const { category } = useParams<{ category: string }>();
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  const info = category ? categoryInfo[category] : null;
  const subjects = category && selectedSemester ? subjectData[category]?.[selectedSemester] || [] : [];

  const handleSemesterClick = (sem: number) => {
    if (selectedSemester === sem) {
      setSelectedSemester(null);
    } else {
      setSelectedSemester(sem);
    }
  };


  if (!info) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <FileX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Category not found</h2>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4 hover:bg-primary/10">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg`}>
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{info.name}</h1>
              <p className="text-muted-foreground">Select a semester to view subjects</p>
            </div>
          </div>
        </div>

        {/* Semester Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {info.semesters.map((sem, index) => (
            <SemesterCard
              key={sem}
              semester={sem}
              index={index}
              onClick={() => handleSemesterClick(sem)}
              isActive={selectedSemester === sem}
              subjectCount={subjectData[category!]?.[sem]?.length || 0}
            />
          ))}
        </div>

        {/* Subjects Section */}
        {selectedSemester && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${semesterGradients[(selectedSemester - 3) % semesterGradients.length]} flex items-center justify-center text-white font-bold`}>
                {selectedSemester}
              </div>
              <div>
                <h2 className="text-xl font-bold">Semester {selectedSemester} Subjects</h2>
                <p className="text-sm text-muted-foreground">{subjects.length} subjects available</p>
              </div>
            </div>

            {subjects.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border/50">
                <FileX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No subjects added yet</h3>
                <p className="text-muted-foreground text-sm">
                  Subjects for this semester will be added soon
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject, index) => (
                  <SubjectCard
                    key={subject.code}
                    subject={subject}
                    index={index}
                    category={category!}
                    semester={selectedSemester}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State when no semester selected */}
        {!selectedSemester && (
          <div className="text-center py-16 bg-muted/20 rounded-2xl border border-border/50 animate-fade-in">
            <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select a Semester</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Click on any semester above to view subjects and download study materials
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
