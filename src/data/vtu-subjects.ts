export interface Subject {
  subjectCode: string;
  subjectName: string;
  credits: number;
  subjectType: "theory" | "lab";
}

export interface VTUSubjectDatabase {
  [scheme: string]: {
    [branch: string]: {
      [semester: string]: Subject[];
    };
  };
}

export const vtuSubjects: VTUSubjectDatabase = {
  "2022": {
    CSE: {
      "1": [
        { subjectCode: "BMATS101", subjectName: "Mathematics-I for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPHYS102", subjectName: "Applied Physics for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPOPS103", subjectName: "Principles of Programming Using C", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK104A", subjectName: "Introduction to Electronics Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BENGK105", subjectName: "Communicative English", credits: 1, subjectType: "theory" },
        { subjectCode: "BPHYL106", subjectName: "Applied Physics Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BPOPL107", subjectName: "C Programming Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BIDTK158", subjectName: "Innovation and Design Thinking", credits: 3, subjectType: "theory" },
      ],
      "2": [
        { subjectCode: "BMATS201", subjectName: "Mathematics-II for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BCHES202", subjectName: "Applied Chemistry for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BICS203", subjectName: "Introduction to Computer Science", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK204B", subjectName: "Introduction to Civil Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BKSKK205", subjectName: "Samskrutika Kannada / Constitution of India", credits: 1, subjectType: "theory" },
        { subjectCode: "BCHEL206", subjectName: "Applied Chemistry Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BICSL207", subjectName: "Computer Science Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BSFHK258", subjectName: "Scientific Foundation of Health", credits: 3, subjectType: "theory" },
      ],
    },
  },
};

// Helper functions
export function getSchemes(): string[] {
  return Object.keys(vtuSubjects);
}

export function getBranches(scheme: string): string[] {
  return Object.keys(vtuSubjects[scheme] ?? {});
}

export function getSemesters(scheme: string, branch: string): string[] {
  return Object.keys(vtuSubjects[scheme]?.[branch] ?? {});
}

export function getSubjects(scheme: string, branch: string, semester: string): Subject[] {
  return vtuSubjects[scheme]?.[branch]?.[semester] ?? [];
}

export function getTotalCredits(subjects: Subject[]): number {
  return subjects.reduce((sum, s) => sum + s.credits, 0);
}
