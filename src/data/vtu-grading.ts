// VTU 2022 Grading Scale
export interface GradeInfo {
  grade: string;
  gradePoint: number;
  failed: boolean;
}

export function marksToGrade(marks: number): GradeInfo {
  if (marks >= 90) return { grade: "O", gradePoint: 10, failed: false };
  if (marks >= 80) return { grade: "A+", gradePoint: 9, failed: false };
  if (marks >= 70) return { grade: "A", gradePoint: 8, failed: false };
  if (marks >= 60) return { grade: "B+", gradePoint: 7, failed: false };
  if (marks >= 55) return { grade: "B", gradePoint: 6, failed: false };
  if (marks >= 50) return { grade: "C", gradePoint: 5, failed: false };
  if (marks >= 40) return { grade: "P", gradePoint: 4, failed: false };
  return { grade: "F", gradePoint: 0, failed: true };
}

export function calculateSGPA(
  marks: number[],
  credits: number[]
): { sgpa: number; totalCredits: number; percentage: number } {
  const totalCredits = credits.reduce((sum, c) => sum + c, 0);
  const totalPoints = marks.reduce((sum, m, i) => {
    return sum + marksToGrade(m).gradePoint * credits[i];
  }, 0);
  const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  const percentage = sgpa > 0 ? sgpa * 10 - 7.5 : 0;
  return {
    sgpa: parseFloat(sgpa.toFixed(2)),
    totalCredits,
    percentage: parseFloat(percentage.toFixed(2)),
  };
}
