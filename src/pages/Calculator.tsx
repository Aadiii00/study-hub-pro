import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, Calculator as CalcIcon, Plus, Trash2, RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// VTU Subject Data
const subjectData: Record<string, Record<string, Record<string, { name: string; code: string; credits: number }[]>>> = {
  "2022": {
    "CSE": {
      "1": [
        { name: "Mathematics-I for CSE Stream", code: "BMATS101", credits: 4 },
        { name: "Applied Physics for CSE Stream", code: "BPHYS102", credits: 4 },
        { name: "Principles of Programming Using C", code: "BPOPS103", credits: 3 },
        { name: "Engineering Science Course", code: "BESCK104", credits: 4 },
        { name: "Emerging Technology Course", code: "BETCK105", credits: 3 },
        { name: "Communicative English", code: "BENGK106", credits: 1 },
        { name: "Samskrutika Kannada / Balake Kannada", code: "BKSKK107", credits: 1 },
        { name: "Innovation and Design Thinking", code: "BIDTK158", credits: 3 },
      ],
      "2": [
        { name: "Mathematics-II for CSE Stream", code: "BMATS201", credits: 4 },
        { name: "Applied Chemistry for CSE Stream", code: "BCHES202", credits: 4 },
        { name: "Introduction to Python Programming", code: "BPLCK205", credits: 3 },
        { name: "Computer Aided Engineering Drawing", code: "BCEDK206", credits: 3 },
        { name: "Professional Writing Skills in English", code: "BPWSK207", credits: 1 },
        { name: "Constitution of India", code: "BICOK208", credits: 1 },
        { name: "Scientific Foundations of Health", code: "BSFHK209", credits: 1 },
      ],
      "3": [
        { name: "Mathematics for CSE", code: "BCS301", credits: 4 },
        { name: "Digital Design & Computer Organization", code: "BCS302", credits: 4 },
        { name: "Operating Systems", code: "BCS303", credits: 3 },
        { name: "Data Structures and Applications", code: "BCS304", credits: 3 },
        { name: "Object Oriented Programming with Java", code: "BCS306", credits: 3 },
        { name: "Social Connect and Responsibility", code: "BSCK307", credits: 1 },
      ],
      "4": [
        { name: "Analysis & Design of Algorithms", code: "BCS401", credits: 4 },
        { name: "Microcontrollers", code: "BCS402", credits: 4 },
        { name: "Database Management Systems", code: "BCS403", credits: 3 },
        { name: "Discrete Mathematical Structures", code: "BCS405", credits: 3 },
        { name: "Graph Theory", code: "BCSL404", credits: 1 },
        { name: "Biology for Engineers", code: "BBEK407", credits: 1 },
      ],
    },
    "ECE": {
      "1": [
        { name: "Mathematics-I for EC Stream", code: "BMATE101", credits: 4 },
        { name: "Applied Physics for EC Stream", code: "BPHYE102", credits: 4 },
        { name: "Elements of Electrical Engineering", code: "BELEE103", credits: 4 },
        { name: "Engineering Science Course", code: "BESCK104", credits: 4 },
        { name: "Communicative English", code: "BENGK106", credits: 1 },
        { name: "Samskrutika Kannada", code: "BKSKK107", credits: 1 },
        { name: "Innovation and Design Thinking", code: "BIDTK158", credits: 3 },
      ],
      "2": [
        { name: "Mathematics-II for EC Stream", code: "BMATE201", credits: 4 },
        { name: "Applied Chemistry", code: "BCHEE202", credits: 4 },
        { name: "Introduction to C Programming", code: "BPOPE205", credits: 3 },
        { name: "Computer Aided Engineering Drawing", code: "BCEDK206", credits: 3 },
        { name: "Professional Writing Skills in English", code: "BPWSK207", credits: 1 },
        { name: "Constitution of India", code: "BICOK208", credits: 1 },
        { name: "Scientific Foundations of Health", code: "BSFHK209", credits: 1 },
      ],
    },
    "ME": {
      "1": [
        { name: "Mathematics-I for Mech Stream", code: "BMATM101", credits: 4 },
        { name: "Applied Physics for Mech Stream", code: "BPHYM102", credits: 4 },
        { name: "Elements of Mechanical Engineering", code: "BEMEM103", credits: 4 },
        { name: "Engineering Science Course", code: "BESCK104", credits: 4 },
        { name: "Communicative English", code: "BENGK106", credits: 1 },
        { name: "Samskrutika Kannada", code: "BKSKK107", credits: 1 },
        { name: "Innovation and Design Thinking", code: "BIDTK158", credits: 3 },
      ],
    },
    "CV": {
      "1": [
        { name: "Mathematics-I for Civil Stream", code: "BMATC101", credits: 4 },
        { name: "Applied Physics for Civil Stream", code: "BPHYC102", credits: 4 },
        { name: "Elements of Civil Engineering", code: "BECEC103", credits: 4 },
        { name: "Engineering Science Course", code: "BESCK104", credits: 4 },
        { name: "Communicative English", code: "BENGK106", credits: 1 },
        { name: "Samskrutika Kannada", code: "BKSKK107", credits: 1 },
        { name: "Innovation and Design Thinking", code: "BIDTK158", credits: 3 },
      ],
    },
  },
};

const gradePoints: { [key: string]: number } = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "P": 4,
  "F": 0,
  "Ab": 0,
};

const gradeOptions = Object.keys(gradePoints);

const schemes = ["2022"];
const branches = [
  { value: "CSE", label: "Computer Science and Engineering (CSE)" },
  { value: "ECE", label: "Electronics and Communication (ECE)" },
  { value: "ME", label: "Mechanical Engineering (ME)" },
  { value: "CV", label: "Civil Engineering (CV)" },
  { value: "EEE", label: "Electrical and Electronics (EEE)" },
  { value: "ISE", label: "Information Science (ISE)" },
];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface SubjectMark {
  code: string;
  name: string;
  credits: number;
  grade: string;
}

function SGPACalculator() {
  const [scheme, setScheme] = useState("2022");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [studentName, setStudentName] = useState("");
  const [usn, setUsn] = useState("");
  const [subjectMarks, setSubjectMarks] = useState<SubjectMark[]>([]);

  const availableSubjects = useMemo(() => {
    if (scheme && branch && semester) {
      return subjectData[scheme]?.[branch]?.[semester] || [];
    }
    return [];
  }, [scheme, branch, semester]);

  const handleSelectionComplete = () => {
    if (availableSubjects.length > 0) {
      setSubjectMarks(
        availableSubjects.map((sub) => ({
          code: sub.code,
          name: sub.name,
          credits: sub.credits,
          grade: "O",
        }))
      );
    } else {
      setSubjectMarks([]);
    }
  };

  const updateGrade = (code: string, grade: string) => {
    setSubjectMarks((prev) =>
      prev.map((s) => (s.code === code ? { ...s, grade } : s))
    );
  };

  const calculateSGPA = () => {
    if (subjectMarks.length === 0) return "0.00";
    const totalCredits = subjectMarks.reduce((sum, s) => sum + s.credits, 0);
    const totalPoints = subjectMarks.reduce(
      (sum, s) => sum + s.credits * gradePoints[s.grade],
      0
    );
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const resetForm = () => {
    setBranch("");
    setSemester("");
    setStudentName("");
    setUsn("");
    setSubjectMarks([]);
  };

  const sgpa = parseFloat(calculateSGPA());
  const percentage = sgpa > 0 ? (sgpa * 10 - 7.5).toFixed(2) : "0.00";

  return (
    <div className="space-y-6">
      {/* Selection Section */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-5">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <div className="w-1 h-5 bg-primary rounded-full" />
          Select Your Details
        </div>

        <div className="grid gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Select Scheme</label>
            <Select value={scheme} onValueChange={setScheme}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Scheme" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {schemes.map((s) => (
                  <SelectItem key={s} value={s}>{s} Scheme</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Select Branch</label>
            <Select value={branch} onValueChange={(v) => { setBranch(v); setSubjectMarks([]); }}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {branches.map((b) => (
                  <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Select Semester</label>
            <Select 
              value={semester} 
              onValueChange={(v) => { 
                setSemester(v); 
                setTimeout(() => {
                  const subjects = subjectData[scheme]?.[branch]?.[v] || [];
                  if (subjects.length > 0) {
                    setSubjectMarks(
                      subjects.map((sub) => ({
                        code: sub.code,
                        name: sub.name,
                        credits: sub.credits,
                        grade: "O",
                      }))
                    );
                  } else {
                    setSubjectMarks([]);
                  }
                }, 0);
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {semesters.map((s) => (
                  <SelectItem key={s} value={s}>Semester {s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Info */}
        {branch && semester && subjectMarks.length === 0 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">Subject data not available for this combination. Please try CSE Sem 1-4.</span>
          </div>
        )}
      </div>

      {/* Student Details */}
      {subjectMarks.length > 0 && (
        <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Enter your Details
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Enter your Name</label>
              <Input
                placeholder="Your Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="bg-background"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Enter your USN</label>
              <Input
                placeholder="1XX22CS001"
                value={usn}
                onChange={(e) => setUsn(e.target.value.toUpperCase())}
                className="bg-background"
              />
            </div>
          </div>
        </div>
      )}

      {/* Subjects & Grades */}
      {subjectMarks.length > 0 && (
        <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <div className="w-1 h-5 bg-primary rounded-full" />
              Enter your Grades
            </div>
            <Button variant="ghost" size="sm" onClick={resetForm} className="text-muted-foreground hover:text-foreground">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="space-y-3">
            {subjectMarks.map((subject, index) => (
              <div
                key={subject.code}
                className="p-4 rounded-xl bg-muted/30 border border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm mb-1">
                      {subject.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {subject.code} • <span className="text-primary">{subject.credits} credits</span>
                    </p>
                  </div>
                  <select
                    value={subject.grade}
                    onChange={(e) => updateGrade(subject.code, e.target.value)}
                    className="w-full md:w-28 h-10 px-3 rounded-lg border border-input bg-background text-foreground font-medium"
                  >
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {subjectMarks.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Credits</p>
              <p className="text-3xl font-bold text-foreground">
                {subjectMarks.reduce((sum, s) => sum + s.credits, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your SGPA</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {calculateSGPA()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Percentage</p>
              <p className="text-3xl font-bold text-foreground">
                {percentage}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Semester {
  id: string;
  sgpa: number;
  credits: number;
}

function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: "1", sgpa: 9.0, credits: 20 },
    { id: "2", sgpa: 8.5, credits: 22 },
  ]);

  const addSemester = () => {
    setSemesters([...semesters, { id: Date.now().toString(), sgpa: 8.0, credits: 20 }]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== id));
    }
  };

  const updateSemester = (id: string, field: "sgpa" | "credits", value: number) => {
    setSemesters(
      semesters.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  };

  const calculateCGPA = () => {
    const totalCredits = semesters.reduce((sum, s) => sum + s.credits, 0);
    const totalPoints = semesters.reduce((sum, s) => sum + s.credits * s.sgpa, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const resetCGPA = () => {
    setSemesters([
      { id: "1", sgpa: 9.0, credits: 20 },
      { id: "2", sgpa: 8.5, credits: 22 },
    ]);
  };

  const cgpa = parseFloat(calculateCGPA());
  const percentage = cgpa > 0 ? (cgpa * 10 - 7.5).toFixed(2) : "0.00";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <div className="w-1 h-5 bg-primary rounded-full" />
          Add your semesters
        </div>
        <Button variant="ghost" size="sm" onClick={resetCGPA} className="text-muted-foreground hover:text-foreground">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {semesters.map((semester, index) => (
          <div
            key={semester.id}
            className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              Sem {index + 1}
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">SGPA</label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={semester.sgpa}
                onChange={(e) => updateSemester(semester.id, "sgpa", parseFloat(e.target.value) || 0)}
                className="bg-background"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Credits</label>
              <Input
                type="number"
                min="1"
                max="30"
                value={semester.credits}
                onChange={(e) => updateSemester(semester.id, "credits", parseInt(e.target.value) || 0)}
                className="bg-background"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSemester(semester.id)}
              disabled={semesters.length === 1}
              className="mt-5 text-muted-foreground hover:text-destructive flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={addSemester} variant="outline" className="w-full border-dashed">
        <Plus className="w-4 h-4 mr-2" />
        Add Semester
      </Button>

      {/* Result */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border border-violet-500/20">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Credits</p>
            <p className="text-3xl font-bold text-foreground">
              {semesters.reduce((sum, s) => sum + s.credits, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Your CGPA</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              {calculateCGPA()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Percentage</p>
            <p className="text-3xl font-bold text-foreground">
              {percentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calculator() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Back Button */}
          <Button asChild variant="ghost" size="sm" className="mb-8 hover:bg-primary/10">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-600 mb-4">
              <CalcIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">VTU Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your Semester Grade Point Average (SGPA), Percentage and Class for{" "}
              <span className="text-primary font-medium">VTU 2022 Scheme</span> with precision
            </p>
          </div>

          {/* Calculator Tabs */}
          <Tabs defaultValue="sgpa" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1 bg-muted/50">
              <TabsTrigger value="sgpa" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg">
                SGPA Calculator
              </TabsTrigger>
              <TabsTrigger value="cgpa" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg">
                CGPA Calculator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sgpa" className="mt-0">
              <SGPACalculator />
            </TabsContent>

            <TabsContent value="cgpa" className="mt-0">
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <CGPACalculator />
              </div>
            </TabsContent>
          </Tabs>

          {/* Info */}
          <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border/50 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-sm text-muted-foreground text-center">
              Based on VTU grading system • O=10, A+=9, A=8, B+=7, B=6, C=5, P=4, F=0
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
