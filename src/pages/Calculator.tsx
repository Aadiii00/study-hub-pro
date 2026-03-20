import { useState, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, Calculator as CalcIcon, Plus, Trash2, RotateCcw, Info, AlertTriangle, Download } from "lucide-react";
import { generateMarksCardPDF, generateCGPACardPDF } from "@/utils/generate-marks-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSchemes, getBranches, getSemesters, getSubjects, getTotalCredits, type Subject } from "@/data/vtu-subjects";
import { marksToGrade, calculateSGPA as calcSGPA } from "@/data/vtu-grading";

const allBranches = [
  { value: "CSE", label: "Computer Science and Engineering (CSE)" },
  { value: "ECE", label: "Electronics and Communication (ECE)" },
  { value: "ME", label: "Mechanical Engineering (ME)" },
  { value: "CV", label: "Civil Engineering (CV)" },
  { value: "EEE", label: "Electrical and Electronics (EEE)" },
  { value: "ISE", label: "Information Science (ISE)" },
];
const allSemesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface SubjectMark {
  code: string;
  name: string;
  credits: number;
  marks: number;
  subjectType: "theory" | "lab";
}

function SGPACalculator() {
  const schemes = getSchemes();
  const [scheme, setScheme] = useState(schemes[0] || "2022");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [studentName, setStudentName] = useState("");
  const [usn, setUsn] = useState("");
  const [subjectMarks, setSubjectMarks] = useState<SubjectMark[]>([]);

  const availableBranches = useMemo(() => getBranches(scheme), [scheme]);
  const availableSemesters = useMemo(() => branch ? getSemesters(scheme, branch) : [], [scheme, branch]);

  const loadSubjects = (s: string, b: string, sem: string) => {
    const subjects = getSubjects(s, b, sem);
    if (subjects.length > 0) {
      setSubjectMarks(
        subjects.map((sub) => ({
          code: sub.subjectCode,
          name: sub.subjectName,
          credits: sub.credits,
          marks: 0,
          subjectType: sub.subjectType,
        }))
      );
    } else {
      setSubjectMarks([]);
    }
  };

  const updateMarks = (code: string, marks: number) => {
    const clamped = Math.min(100, Math.max(0, marks));
    setSubjectMarks((prev) =>
      prev.map((s) => (s.code === code ? { ...s, marks: clamped } : s))
    );
  };

  const resetMarks = () => {
    setSubjectMarks((prev) => prev.map((s) => ({ ...s, marks: 0 })));
  };

  const resetForm = () => {
    setBranch("");
    setSemester("");
    setStudentName("");
    setUsn("");
    setSubjectMarks([]);
  };

  const result = useMemo(() => {
    if (subjectMarks.length === 0) return { sgpa: 0, totalCredits: 0, percentage: 0 };
    return calcSGPA(
      subjectMarks.map((s) => s.marks),
      subjectMarks.map((s) => s.credits)
    );
  }, [subjectMarks]);

  const hasFailed = subjectMarks.some((s) => s.marks > 0 && s.marks < 40);
  const avgMarks = subjectMarks.length > 0
    ? subjectMarks.reduce((sum, s) => sum + s.marks, 0) / subjectMarks.length
    : 0;

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
            <Select value={scheme} onValueChange={(v) => { setScheme(v); setBranch(""); setSemester(""); setSubjectMarks([]); }}>
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
            <Select value={branch} onValueChange={(v) => { setBranch(v); setSemester(""); setSubjectMarks([]); }}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {allBranches
                  .filter((b) => availableBranches.includes(b.value))
                  .map((b) => (
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
                loadSubjects(scheme, branch, v);
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {allSemesters
                  .filter((s) => availableSemesters.includes(s))
                  .map((s) => (
                    <SelectItem key={s} value={s}>Semester {s}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {branch && semester && subjectMarks.length === 0 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">No subjects found for selected combination.</span>
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
              <label className="text-sm text-muted-foreground mb-2 block">Enter your Name <span className="text-destructive">*</span></label>
              <Input placeholder="Your Name (Required)" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-background" required />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Enter your USN</label>
              <Input placeholder="1XX22CS001" value={usn} onChange={(e) => setUsn(e.target.value.toUpperCase())} className="bg-background" />
            </div>
          </div>
        </div>
      )}

      {/* Subjects & Marks */}
      {subjectMarks.length > 0 && (
        <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <div className="w-1 h-5 bg-primary rounded-full" />
              Enter your Marks
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={resetMarks} className="text-muted-foreground hover:text-foreground">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Marks
              </Button>
              <Button variant="ghost" size="sm" onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {subjectMarks.map((subject, index) => {
              const gradeInfo = marksToGrade(subject.marks);
              const isFailed = subject.marks > 0 && gradeInfo.failed;

              return (
                <div
                  key={subject.code}
                  className={`p-4 rounded-xl border animate-fade-in transition-all duration-300 ${
                    isFailed
                      ? "bg-destructive/5 border-destructive/30"
                      : "bg-muted/30 border-border/50"
                  }`}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm mb-1 ${isFailed ? "text-destructive" : "text-foreground"}`}>
                        {subject.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {subject.code} • <span className="text-primary">{subject.credits} credits</span>
                        {subject.subjectType === "lab" && (
                          <span className="ml-2 px-1.5 py-0.5 rounded bg-accent text-accent-foreground text-[10px] uppercase font-semibold">Lab</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="w-24">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="0-100"
                          value={subject.marks || ""}
                          onChange={(e) => updateMarks(subject.code, parseInt(e.target.value) || 0)}
                          className={`bg-background text-center font-medium ${isFailed ? "border-destructive/50 text-destructive" : ""}`}
                        />
                      </div>

                      {subject.marks > 0 && (
                        <div className={`flex items-center gap-2 min-w-[90px] transition-all duration-300 ${isFailed ? "text-destructive" : "text-foreground"}`}>
                          <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                            isFailed
                              ? "bg-destructive/10 text-destructive"
                              : "bg-primary/10 text-primary"
                          }`}>
                            {gradeInfo.grade}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            GP: {gradeInfo.gradePoint}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isFailed && (
                    <div className="flex items-center gap-1.5 mt-2 text-destructive text-xs font-medium">
                      <AlertTriangle className="w-3 h-3" />
                      Fail in Subject
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Live Progress Bar */}
      {subjectMarks.length > 0 && subjectMarks.some((s) => s.marks > 0) && (
        <div className="p-4 rounded-2xl bg-card border border-border/50 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average Score</span>
            <span className="font-semibold text-foreground">{avgMarks.toFixed(1)}%</span>
          </div>
          <Progress value={avgMarks} className="h-3" />
        </div>
      )}

      {/* Result */}
      {subjectMarks.length > 0 && subjectMarks.some((s) => s.marks > 0) && (
        <div className={`p-6 rounded-2xl border animate-fade-in transition-all duration-500 ${
          hasFailed
            ? "bg-gradient-to-br from-destructive/10 via-destructive/5 to-background border-destructive/20"
            : "bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border-cyan-500/20"
        }`}>
          {hasFailed && (
            <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              You have failed subjects. SGPA is calculated but result is Fail.
            </div>
          )}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Credits</p>
              <p className="text-3xl font-bold text-foreground">{result.totalCredits}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your SGPA</p>
              <p className={`text-4xl font-bold transition-all duration-500 ${
                hasFailed
                  ? "text-destructive"
                  : "text-foreground"
              }`}>
                {result.sgpa.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Percentage</p>
              <p className="text-3xl font-bold text-foreground">{result.percentage.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Download Button */}
      {subjectMarks.length > 0 && subjectMarks.some((s) => s.marks > 0) && (
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          {!studentName.trim() && (
            <p className="text-sm text-destructive font-medium">Please enter your name to download the marks card</p>
          )}
          <Button
            disabled={!studentName.trim()}
            onClick={() => {
              // Log SGPA calculation
              supabase.from("cgpa_logs").insert({
                student_name: studentName || null,
                branch: branch || null,
                semester: semester || null,
                sgpa: result.sgpa,
                percentage: result.percentage,
                calculation_type: "sgpa",
              }).then(() => {});
              generateMarksCardPDF({
                studentName,
                usn,
                branch,
                semester,
                scheme,
                subjects: subjectMarks.map((s) => ({
                  ...s,
                  grade: marksToGrade(s.marks).grade,
                  gradePoint: marksToGrade(s.marks).gradePoint,
                })),
                sgpa: result.sgpa,
                percentage: result.percentage,
                totalCredits: result.totalCredits,
                hasFailed,
              });
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Marks Card (PDF)
          </Button>
        </div>
      )}
    </div>
  );
}

interface Semester {
  id: string;
  sgpa: number;
}

function CGPACalculator() {
  const DEFAULT_CREDITS = 20;
  const [studentName, setStudentName] = useState("");
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: "1", sgpa: 9.0 },
    { id: "2", sgpa: 8.5 },
  ]);

  const addSemester = () => {
    setSemesters([...semesters, { id: Date.now().toString(), sgpa: 8.0 }]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== id));
    }
  };

  const updateSemester = (id: string, field: "sgpa", value: number) => {
    setSemesters(
      semesters.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  };

  const calculateCGPA = () => {
    const totalCredits = semesters.length * DEFAULT_CREDITS;
    const totalPoints = semesters.reduce((sum, s) => sum + DEFAULT_CREDITS * s.sgpa, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const resetCGPA = () => {
    setSemesters([
      { id: "1", sgpa: 9.0 },
      { id: "2", sgpa: 8.5 },
    ]);
  };

  const cgpa = parseFloat(calculateCGPA());
  const percentage = cgpa > 0 ? (cgpa * 10 - 7.5).toFixed(2) : "0.00";

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Enter your Name</label>
        <Input placeholder="Your Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-background" />
      </div>

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
              {semesters.length * DEFAULT_CREDITS}
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

      {/* Download Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => {
            // Log CGPA calculation
            supabase.from("cgpa_logs").insert({
              student_name: studentName || null,
              cgpa: parseFloat(calculateCGPA()),
              percentage: parseFloat(percentage),
              calculation_type: "cgpa",
            }).then(() => {});
            generateCGPACardPDF({
              studentName,
              semesters: semesters.map((s) => ({ sgpa: s.sgpa, credits: DEFAULT_CREDITS })),
              cgpa: calculateCGPA(),
              percentage,
            });
          }}
          className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-8"
        >
          <Download className="w-4 h-4 mr-2" />
          Download CGPA Report (PDF)
        </Button>
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
              Calculate your Semester Grade Point Average (SGPA), Percentage and Class with precision
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
