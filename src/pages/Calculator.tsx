import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, Calculator as CalcIcon, Plus, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Subject {
  id: string;
  credits: number;
  grade: string;
}

const gradePoints: { [key: string]: number } = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "P": 4,
  "F": 0,
};

const gradeOptions = Object.keys(gradePoints);

function SGPACalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", credits: 4, grade: "O" },
    { id: "2", credits: 4, grade: "A+" },
    { id: "3", credits: 3, grade: "A" },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now().toString(), credits: 3, grade: "O" }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };

  const updateSubject = (id: string, field: "credits" | "grade", value: number | string) => {
    setSubjects(
      subjects.map((s) =>
        s.id === id ? { ...s, [field]: field === "credits" ? Number(value) : value } : s
      )
    );
  };

  const calculateSGPA = () => {
    const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
    const totalPoints = subjects.reduce((sum, s) => sum + s.credits * gradePoints[s.grade], 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const resetSGPA = () => {
    setSubjects([
      { id: "1", credits: 4, grade: "O" },
      { id: "2", credits: 4, grade: "A+" },
      { id: "3", credits: 3, grade: "A" },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Add your subjects</h3>
        <Button variant="ghost" size="sm" onClick={resetSGPA} className="text-muted-foreground hover:text-foreground">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {subjects.map((subject, index) => (
          <div
            key={subject.id}
            className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Credits</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={subject.credits}
                onChange={(e) => updateSubject(subject.id, "credits", e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Grade</label>
              <select
                value={subject.grade}
                onChange={(e) => updateSubject(subject.id, "grade", e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
              >
                {gradeOptions.map((g) => (
                  <option key={g} value={g}>
                    {g} ({gradePoints[g]})
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSubject(subject.id)}
              disabled={subjects.length === 1}
              className="mt-5 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={addSubject} variant="outline" className="w-full border-dashed">
        <Plus className="w-4 h-4 mr-2" />
        Add Subject
      </Button>

      {/* Result */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20">
        <p className="text-sm text-muted-foreground mb-2">Your SGPA</p>
        <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {calculateSGPA()}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Total Credits: {subjects.reduce((sum, s) => sum + s.credits, 0)}
        </p>
      </div>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Add your semesters</h3>
        <Button variant="ghost" size="sm" onClick={resetCGPA} className="text-muted-foreground hover:text-foreground">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {semesters.map((semester, index) => (
          <div
            key={semester.id}
            className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
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
              className="mt-5 text-muted-foreground hover:text-destructive"
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
        <p className="text-sm text-muted-foreground mb-2">Your CGPA</p>
        <p className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
          {calculateCGPA()}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Total Credits: {semesters.reduce((sum, s) => sum + s.credits, 0)} • 
          Percentage: {(parseFloat(calculateCGPA()) * 10 - 7.5).toFixed(1)}%
        </p>
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
            <p className="text-muted-foreground">Calculate your SGPA and CGPA instantly</p>
          </div>

          {/* Calculator Tabs */}
          <Tabs defaultValue="sgpa" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1 bg-muted/50">
              <TabsTrigger value="sgpa" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg">
                SGPA
              </TabsTrigger>
              <TabsTrigger value="cgpa" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg">
                CGPA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sgpa" className="mt-0">
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <SGPACalculator />
              </div>
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
