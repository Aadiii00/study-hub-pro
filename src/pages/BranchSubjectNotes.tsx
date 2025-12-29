import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, Rocket, Download, FileText, BookOpen, ClipboardList, ChevronDown } from "lucide-react";
import { toast } from "sonner";
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
const subjectNotesData: Record<
  string,
  {
    name: string;
    code: string;
    semester: number;
    notes: NoteItem[];
  }
> = {
  BCS301: {
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
        ],
      },
      {
        title: "Notes 2 — RNSIT",
        source: "RNSIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/MATHS/Module_1_RNSIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/MATHS/Module_2_RNSIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/MATHS/Module_3_RNSIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/MATHS/Module_4_RNSIT.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem3/MATHS/Module_5_RNSIT.pdf" },
        ],
      },
      {
        title: "Notes 3 — SJCIT",
        source: "SJCIT College",
        type: "notes",
        url: "/notes/CSE/Sem3/MATHS/Complete_Notes_SJCIT.pdf",
      },
      {
        title: "Notes 4 — ATME",
        source: "ATME College",
        type: "notes",
        url: "/notes/CSE/Sem3/MATHS/Complete_Notes_ATME.pdf",
      },
      { title: "Textbooks", source: "Reference Books", type: "textbook", url: "/notes/CSE/Sem3/MATHS/Textbook_1.pdf" },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Model QP 1", url: "/notes/CSE/Sem3/MATHS/Model_QP_1.pdf" },
          { name: "Model QP 2", url: "/notes/CSE/Sem3/MATHS/Model_QP_2.pdf" },
          { name: "BIET Model QP", url: "/notes/CSE/Sem3/MATHS/BIET_Model_QP.pdf" },
          { name: "Question Bank", url: "/notes/CSE/Sem3/MATHS/Question_Bank.pdf" },
        ],
      },
    ],
  },
  BCS302: {
    name: "Data Structures and Applications",
    code: "BCS302",
    semester: 3,
    notes: [
      {
        title: "Notes 1 — SVIT",
        source: "SVIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/DSA/Module_1_SVIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/DSA/Module_2_SVIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/DSA/Module_3_SVIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/DSA/Module_4_SVIT.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem3/DSA/Module_5_SVIT.pdf" },
        ],
      },
      {
        title: "Notes 2 — RNSIT",
        source: "RNSIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/DSA/Module_1_RNSIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/DSA/Module_2_RNSIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/DSA/Module_3_RNSIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/DSA/Module_4_RNSIT.pdf" },
        ],
      },
      {
        title: "Notes 3 — DSCE",
        source: "DSCE College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/DSA/Module_1_DSCE.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/DSA/Module_2_DSCE.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/DSA/Module_3_DSCE.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/DSA/Module_4_DSCE.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem3/DSA/Module_5_DSCE.pdf" },
        ],
      },

      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Module 1 question bank", url: "/notes/CSE/Sem3/DSA/DS_M1_Question_Bank.pdf" },
          { name: "Module 2 question bank", url: "/notes/CSE/Sem3/DSA/DS_M2_Question_Bank.pdf" },
          { name: "Module 3 question bank", url: "/notes/CSE/Sem3/DSA/DS_M3_Question_Bank.pdf" },
          { name: "Module 4 question bank", url: "/notes/CSE/Sem3/DSA/DS_M4_Question_Bank.pdf" },
        ],
      },
    ],
  },
  BCS303: {
    name: "Digital Design and Computer Organization",
    code: "BCS303",
    semester: 3,
    notes: [
      {
        title: "Notes 1",
        source: "SVIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/DDCO/Module_1_SVIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/DDCO/Module_2_SVIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/DDCO/Module_3_SVIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/DDCO/Module_4_SVIT.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem3/DDCO/Module_5_SVIT.pdf" },
        ],
      },
      {
        title: "Notes 2 ",
        source: "RNSIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/DDCO/Module_1_RNSIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/DDCO/Module_2_RNSIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/DDCO/Module_3_RNSIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/DDCO/Module_4_RNSIT.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem3/DDCO/Module_5_RNSIT.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Module Wise QB", url: "/notes/CSE/Sem3/DDCO/Module_Wise_QB.pdf" },
          { name: "QB With Solutions", url: "/notes/CSE/Sem3/DDCO/QB_With_Solutions.pdf" },
        ],
      },
    ],
  },
  BCS304: {
    name: "Operating Systems",
    code: "BCS304",
    semester: 3,
    notes: [
      { title: "Notes 1", source: "SVIT College", type: "notes", url: "/notes/CSE/Sem3/OS/All_Modules_SVIT.pdf" },
      {
        title: "Notes 2",
        source: "RNSIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/OS/Module_1_RNSIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/OS/Module_2_RNSIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/OS/Module_3_RNSIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/OS/Module_4_RNSIT.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem3/OS/Module_5_RNSIT.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Question Bank", url: "/notes/CSE/Sem3/OS/Question_Bank.pdf" },
          { name: "Model Paper Solution", url: "/notes/CSE/Sem3/OS/Model_Paper_Solution.pdf" },
        ],
      },
    ],
  },
  BCS305: {
    name: "Object Oriented Programming with C++ and Java",
    code: "BCS305",
    semester: 3,
    notes: [
      {
        title: "Notes for C++",
        source: "C++ Modules",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/CPP/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/CPP/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/CPP/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/CPP/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem3/CPP/Module_5.pdf" },
        ],
      },
      {
        title: "Notes for JAVA",
        source: "Java Modules",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem3/JAVA/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem3/JAVA/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem3/JAVA/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem3/JAVA/Module_4.pdf" },
          { name: "Module 5 Part 1", url: "/notes/CSE/Sem3/JAVA/Module_5_Part_1.pdf" },
          { name: "Module 5 Part 2", url: "/notes/CSE/Sem3/JAVA/Module_5_Part_2.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Solved Model QP", url: "/notes/CSE/Sem3/CPP/OOP_Java_Solved_Model_QP.pdf" },
          { name: "Java Module Wise QB", url: "/notes/CSE/Sem3/CPP/Java_Module_Wise_QB.pdf" },
          { name: "OOP Java Module Wise QB", url: "/notes/CSE/Sem3/CPP/OOP_Java_Module_Wise_QB.pdf" },
        ],
      },
    ],
  },
  BCSL306: {
    name: "Data Structures Lab",
    code: "BCSL306",
    semester: 3,
    notes: [
      { title: "Lab Manual", source: "Official Lab Manual", type: "notes", url: "/notes/CSE/Sem3/DSA/Lab_Manual.pdf" },
      { title: "Viva Questions", source: "Lab Viva Q&A", type: "qp", url: "/notes/CSE/Sem3/DSA/Viva_Questions.pdf" },
    ],
  },
  BCS307: {
    name: "Universal Human Values",
    code: "BCS307",
    semester: 3,
    notes: [
      { title: "Question Bank", source: "UHV Question Bank", type: "qp", url: "/notes/CSE/Sem3/UHV/Question_Bank.pdf" },
    ],
  },
  // Semester 4 Subjects
  BCS401: {
    name: "Microcontrollers",
    code: "BCS401",
    semester: 4,
    notes: [
      {
        title: "Notes 1",
        source: "SVIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/MC/Module_1_SVIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/MC/Module_2_SVIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/MC/Module_3_SVIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/MC/Module_4_SVIT.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/MC/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/MC/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/MC/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/MC/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem4/MC/Module_5_Notes2.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Lab Manual - SVIT", url: "/notes/CSE/Sem4/MC/Lab_Manual_SVIT.pdf" },
          { name: "Lab Manual - DSATM", url: "/notes/CSE/Sem4/MC/Lab_Manual_DSATM.pdf" },
          { name: "Lab Manual - East Point", url: "/notes/CSE/Sem4/MC/Lab_Manual_EastPoint.pdf" },
        ],
      },
    ],
  },
  BCS402: {
    name: "Analysis and design of Algorithms",
    code: "BCS402",
    semester: 4,
    notes: [
      {
        title: "Notes 1",
        source: "SVIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/DAA/Module_1_SVIT.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/DAA/Module_2_SVIT.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/DAA/Module_3_SVIT.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/DAA/Module_4_SVIT.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem4/DAA/Module_5_SVIT.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/DAA/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/DAA/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/DAA/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/DAA/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem4/DAA/Module_5_Notes2.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Module 1 QB", url: "/notes/CSE/Sem4/DAA/ADA_QB_M1.pdf" },
          { name: "Module 2 QB", url: "/notes/CSE/Sem4/DAA/ADA_QB_M2.pdf" },
          { name: "Module 3 QB", url: "/notes/CSE/Sem4/DAA/ADA_QB_M3.pdf" },
          { name: "Module 4 QB", url: "/notes/CSE/Sem4/DAA/ADA_QB_M4.pdf" },
          { name: "Module 1 Extra", url: "/notes/CSE/Sem4/DAA/Module_1_QB.pdf" },
        ],
      },
    ],
  },
  BCS403: {
    name: "Database Management Systems",
    code: "BCS403",
    semester: 4,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/DAA/Module_1_Notes1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/DAA/Module_2_Notes1.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/DAA/Module_3_Notes1.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/DAA/Module_4_Notes1.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem4/DAA/Module_5_Notes1.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/DAA/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/DAA/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/DAA/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/DAA/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem4/DAA/Module_5_Notes2.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Lab Manual - MIT", url: "/notes/CSE/Sem4/DBMS/Lab_Manual_MIT.pdf" },
          { name: "Lab Manual - RNSIT", url: "/notes/CSE/Sem4/DBMS/Lab_Manual_RNSIT.pdf" },
          { name: "Lab Manual - SVIT", url: "/notes/CSE/Sem4/DBMS/Lab_Manual_SVIT.pdf" },
        ],
      },
    ],
  },
  BCS404: {
    name: "Biology for Computer enginners",
    code: "BCS404",
    semester: 4,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/BIO/Module_1_Notes1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/BIO/Module_2_Notes1.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/BIO/Module_3_Notes1.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/BIO/Module_4_Notes1.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem4/BIO/Module_5_Notes1.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/BIO/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/BIO/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/BIO/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/BIO/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem4/BIO/Module_5_Notes2.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Important Questions", url: "/notes/CSE/Sem4/BIO/Important_Questions.pdf" },
          { name: "Question Bank", url: "/notes/CSE/Sem4/BIO/Question_Bank.pdf" },
          { name: "Module Wise QB", url: "/notes/CSE/Sem4/BIO/Module_Wise_QB.pdf" },
          { name: "Solved Questions", url: "/notes/CSE/Sem4/BIO/Solved_Questions.pdf" },
          { name: "VTU Model QP 1", url: "/notes/CSE/Sem4/BIO/VTU_Model_QP_1.pdf" },
          { name: "VTU Model QP 2", url: "/notes/CSE/Sem4/BIO/VTU_Model_QP_2.pdf" },
        ],
      },
    ],
  },
  BCS405: {
    name: "ADA Lab Mannual",
    code: "BCS405",
    semester: 4,
    notes: [
      {
        title: "Lab Manual",
        source: "College Lab Manuals",
        type: "notes",
        url: "#",
        modules: [
          { name: "Lab Manual - MIT", url: "/notes/CSE/Sem4/BCS405/Lab_Manual_MIT.pdf" },
          { name: "Lab Manual - MVIT", url: "/notes/CSE/Sem4/BCS405/Lab_Manual_MVIT.pdf" },
          { name: "Lab Manual - RNSIT", url: "/notes/CSE/Sem4/BCS405/Lab_Manual_RNSIT.pdf" },
          { name: "Final Lab Manual", url: "/notes/CSE/Sem4/BCS405/Final_Lab_Manual.pdf" },
        ],
      },
    ],
  },
  BCSL406: {
    name: "Database Management Systems Lab",
    code: "BCSL406",
    semester: 4,
    notes: [
      {
        title: "Lab Manual",
        source: "Official Lab Manual",
        type: "notes",
        url: "#",
      },
      {
        title: "Viva Questions",
        source: "Lab Viva Q&A",
        type: "qp",
        url: "#",
      },
    ],
  },
  BCS407: {
    name: "Discrete Mathematical structures",
    code: "BCS407",
    semester: 4,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/BCS407/Module_1.pdf" },
          { name: "Module 1 (Quantifiers)", url: "/notes/CSE/Sem4/BCS407/Module_1_Quantifiers.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/BCS407/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem4/BCS407/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem4/BCS407/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem4/BCS407/Module_5.pdf" },
        ],
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "/notes/CSE/Sem4/BCS407/Question_Bank.pdf",
      },
    ],
  },
  // 5th Semester CSE Subjects
  BCS501: {
    name: "Software Engineering & Project Management",
    code: "BCS501",
    semester: 5,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BCS501/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BCS501/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BCS501/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BCS501/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem5/BCS501/Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BCS501/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BCS501/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BCS501/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BCS501/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem5/BCS501/Module_5_Notes2.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Model QP Solution", url: "/notes/CSE/Sem5/BCS501/Model_QP_Solution.pdf" },
          { name: "Question Bank", url: "/notes/CSE/Sem5/BCS501/Question_Bank.pdf" },
        ],
      },
    ],
  },
  BCS502: {
    name: "Computer Networks",
    code: "BCS502",
    semester: 5,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BCS502/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BCS502/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BCS502/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BCS502/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem5/BCS502/Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BCS502/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BCS502/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BCS502/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BCS502/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem5/BCS502/Module_5_Notes2.pdf" },
          { name: "Module 1 (Alt)", url: "/notes/CSE/Sem5/BCS502/Module_1_Notes2_Alt.pdf" },
          { name: "Module 2 (Alt)", url: "/notes/CSE/Sem5/BCS502/Module_2_Notes2_Alt.pdf" },
          { name: "Module 3 (Alt)", url: "/notes/CSE/Sem5/BCS502/Module_3_Notes2_Alt.pdf" },
        ],
      },
      {
        title: "Lab Manual",
        source: "College Lab Manuals",
        type: "notes",
        url: "#",
        modules: [
          { name: "Lab Manual - Atria", url: "/notes/CSE/Sem5/BCS502/Lab_Manual_Atria.pdf" },
          { name: "Lab Manual - BGSCET", url: "/notes/CSE/Sem5/BCS502/Lab_Manual_BGSCET.pdf" },
          { name: "Lab Manual - East Point", url: "/notes/CSE/Sem5/BCS502/Lab_Manual_EastPoint.pdf" },
          { name: "Lab Manual - SVIT", url: "/notes/CSE/Sem5/BCS502/Lab_Manual_SVIT.pdf" },
        ],
      },
    ],
  },
  BCS503: {
    name: "Theory of Computation",
    code: "BCS503",
    semester: 5,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BCS503/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BCS503/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BCS503/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BCS503/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem5/BCS503/Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BCS503/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BCS503/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BCS503/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BCS503/Module_4_Notes2.pdf" },
          { name: "Module 5A", url: "/notes/CSE/Sem5/BCS503/Module_5A_Notes2.pdf" },
          { name: "Module 5B", url: "/notes/CSE/Sem5/BCS503/Module_5B_Notes2.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "QB Module 1", url: "/notes/CSE/Sem5/BCS503/QB_Module_1.pdf" },
          { name: "QB Module 3", url: "/notes/CSE/Sem5/BCS503/QB_Module_3.pdf" },
          { name: "QB Module 4", url: "/notes/CSE/Sem5/BCS503/QB_Module_4.pdf" },
          { name: "QB Module 5", url: "/notes/CSE/Sem5/BCS503/QB_Module_5.pdf" },
          { name: "QB All Modules", url: "/notes/CSE/Sem5/BCS503/QB_All_Modules.pdf" },
        ],
      },
    ],
  },
  BCSL504: {
    name: "Web Technology Lab",
    code: "BCSL504",
    semester: 5,
    notes: [
      {
        title: "Lab Manual",
        source: "College Lab Manuals",
        type: "notes",
        url: "#",
        modules: [
          { name: "Lab Manual - ATME", url: "/notes/CSE/Sem5/BCSL504/Lab_Manual_ATME.pdf" },
          { name: "Lab Manual - EPCET", url: "/notes/CSE/Sem5/BCSL504/Lab_Manual_EPCET.pdf" },
          { name: "Web Technology Programs", url: "/notes/CSE/Sem5/BCSL504/Web_Technology_Programs.pdf" },
        ],
      },
    ],
  },
  BRMK557: {
    name: "Research Methodology and IPR",
    code: "BRMK557",
    semester: 5,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BRMK557/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BRMK557/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BRMK557/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BRMK557/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem5/BRMK557/Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BRMK557/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BRMK557/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BRMK557/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BRMK557/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem5/BRMK557/Module_5_Notes2.pdf" },
        ],
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
      },
    ],
  },
  BESK508: {
    name: "Environmental Studies",
    code: "BESK508",
    semester: 5,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "EVS Syllabus", url: "/notes/CSE/Sem5/BESK508/EVS_Syllabus.pdf" },
          { name: "EVS Full Notes", url: "/notes/CSE/Sem5/BESK508/EVS_Full_Notes.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Model QP with Solution",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Module 3 MCQ", url: "/notes/CSE/Sem5/BESK508/Module_3_MCQ.pdf" },
          { name: "Module 4 MCQ", url: "/notes/CSE/Sem5/BESK508/Module_4_MCQ.pdf" },
          { name: "Module 5 MCQ", url: "/notes/CSE/Sem5/BESK508/Module_5_MCQ.pdf" },
          { name: "Question Bank 1", url: "/notes/CSE/Sem5/BESK508/Question_Bank_1.pdf" },
          { name: "Question Bank 3 (Solved)", url: "/notes/CSE/Sem5/BESK508/Question_Bank_3_Solved.pdf" },
          { name: "IA1 Question Paper", url: "/notes/CSE/Sem5/BESK508/IA1_QP.pdf" },
        ],
      },
    ],
  },
  BAIL504: {
    name: "Data Visualization Lab",
    code: "BAIL504",
    semester: 5,
    notes: [
      {
        title: "Lab Manual",
        source: "College Lab Manuals",
        type: "notes",
        url: "#",
        modules: [
          { name: "Lab Manual", url: "/notes/CSE/Sem5/BAIL504/Lab_Manual.pdf" },
          { name: "Lab Manual - BGSCET", url: "/notes/CSE/Sem5/BAIL504/Lab_Manual_BGSCET.pdf" },
        ],
      },
    ],
  },
  BCS515B: {
    name: "Artificial Intelligence",
    code: "BCS515B",
    semester: 5,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem5/BCS515B/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem5/BCS515B/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem5/BCS515B/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem5/BCS515B/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem5/BCS515B/Module_5.pdf" },
          { name: "Module 1 (Alt)", url: "/notes/CSE/Sem5/BCS515B/Module_1_Alt.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "AI Notes", url: "/notes/CSE/Sem5/BCS515B/AI_Notes.pdf" },
        ],
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
      },
    ],
  },
  // Semester 6 Subjects
  BCS601: {
    name: "Cloud Computing (Open Stack/Google)",
    code: "BCS601",
    semester: 6,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
      },
    ],
  },
  BCS602: {
    name: "Machine Learning",
    code: "BCS602",
    semester: 6,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
      },
    ],
  },
  BCSL606: {
    name: "Machine Learning Lab",
    code: "BCSL606",
    semester: 6,
    notes: [
      {
        title: "Lab Manual 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Lab Manual 2",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
    ],
  },
  BIKS609: {
    name: "Indian Knowledge System",
    code: "BIKS609",
    semester: 6,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
      },
    ],
  },
  BIS601: {
    name: "Full Stack Development",
    code: "BIS601",
    semester: 6,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
      },
    ],
  },
  // Skill Enhancement Courses - Semester 6
  BISL657A: {
    name: "Tosca – Automated Software Testing",
    code: "BISL657A",
    semester: 6,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Lab Manual",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
    ],
  },
  BCSL657B: {
    name: "React",
    code: "BCSL657B",
    semester: 6,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Lab Manual",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
    ],
  },
  BAIL657C: {
    name: "Generative AI",
    code: "BAIL657C",
    semester: 6,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Lab Manual",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
    ],
  },
  BCSL657D: {
    name: "DevOps",
    code: "BCSL657D",
    semester: 6,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
      {
        title: "Lab Manual",
        source: "College Notes",
        type: "notes",
        url: "#",
      },
    ],
  },
};

function NoteButton({
  note,
  index,
  isExpanded,
  onToggle,
  onDownload,
}: {
  note: NoteItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onDownload: (url: string, title: string) => void;
}) {
  const getIcon = () => {
    switch (note.type) {
      case "textbook":
        return <BookOpen className="w-5 h-5" />;
      case "qp":
        return <ClipboardList className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const hasModules = note.modules && note.modules.length > 0;
  const hasValidUrl = note.url !== "#";

  const buttonContent = (
    <div
      className={`relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isExpanded ? "rounded-t-xl" : "rounded-xl"}`}
    >
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shine effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold">
        {getIcon()}
        <span className="text-base">{note.title}</span>
        {hasModules ? (
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        ) : (
          <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2" />
        )}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
      {hasModules ? (
        <button type="button" onClick={onToggle} aria-expanded={isExpanded} className="group relative w-full">
          {buttonContent}
        </button>
      ) : hasValidUrl ? (
        <button
          type="button"
          onClick={() => onDownload(note.url, note.title)}
          className="group relative w-full block text-left"
        >
          {buttonContent}
        </button>
      ) : (
        <button type="button" onClick={() => onDownload(note.url, note.title)} className="group relative w-full">
          {buttonContent}
        </button>
      )}

      {/* Modules dropdown */}
      {hasModules && isExpanded && (
        <div className="bg-card border border-t-0 border-border/50 rounded-b-xl overflow-hidden animate-fade-in">
          <div className="p-4 space-y-2">
            {note.modules!.map((module, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onDownload(module.url, `${note.title} — ${module.name}`)}
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

  const subject = subjectCode ? subjectNotesData[subjectCode] : null;

  const [expandedIndex, setExpandedIndex] = useState<number | null>(() => {
    if (!subject) return null;
    const idx = subject.notes.findIndex((n) => (n.modules?.length ?? 0) > 0);
    return idx >= 0 ? idx : null;
  });

  useEffect(() => {
    if (!subject) return;

    // Ensure the first section with modules (e.g. Notes 1 — SVIT) is visible
    const idx = subject.notes.findIndex((n) => (n.modules?.length ?? 0) > 0);
    setExpandedIndex(idx >= 0 ? idx : null);
  }, [subjectCode]);

  const filenameFromUrl = (url: string) => {
    const clean = (url ?? "").split("#")[0].split("?")[0];
    const base = clean.split("/").filter(Boolean).pop();
    return base && base.length > 0 ? base : "download.pdf";
  };

  const handleDownload = (url: string, title: string) => {
    if (url === "#") {
      toast("Coming soon", {
        description: `"${title}" will be available for download soon.`,
      });
      return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = filenameFromUrl(url);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();

    toast.success("Download started", { description: title });
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index));
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
            <p className="text-sm text-muted-foreground">Click on any option above to download the study material</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
