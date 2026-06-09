import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
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
          { name: "VTU Previous QB", url: "/notes/CSE/Sem3/MATHS/VTU_Previous_QB.pdf" },
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
          { name: "DSA Question Paper", url: "/notes/CSE/Sem3/DSA/DSA_QP.pdf" },
          { name: "VTU Previous QB", url: "/notes/CSE/Sem3/DSA/DSA_VTU_QB.pdf" },
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
          { name: "DDCO VTU QB", url: "/notes/CSE/Sem3/DDCO/DDCO_VTU_QB.pdf" },
          { name: "BIET QB", url: "/notes/CSE/Sem3/DDCO/BIET_QB.pdf" },
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
          { name: "BIET Model QB", url: "/notes/CSE/Sem3/OS/BIET_Model_QB.pdf" },
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
  "BIET-IA": {
    name: "BIET IA Papers",
    code: "BIET-IA",
    semester: 3,
    notes: [
      { title: "Mathematics for CSE", source: "BCS301", type: "qp", url: "/ia-papers/sem3/MAT-CIE_1.pdf" },
      { title: "Data Structures", source: "BCS302", type: "qp", url: "/ia-papers/sem3/DSA-CIE_1.pdf" },
      { title: "DDCO", source: "BCS303", type: "qp", url: "/ia-papers/sem3/DDCO-CIE_1.pdf" },
      { title: "Operating Systems", source: "BCS304", type: "qp", url: "/ia-papers/sem3/OS-CIE_1.pdf" },
      { title: "OOP with Java", source: "BCS305", type: "qp", url: "/ia-papers/sem3/JAVA-CIE_1.pdf" },
      { title: "BIET Model Question Paper", source: "MQP", type: "qp", url: "/ia-papers/sem3/MQP-CSE-3Sem.pdf" },
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
      {
        title: "BIET QB and Notes",
        source: "BIET College",
        type: "qp",
        url: "#",
        modules: [],
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
      {
        title: "BIET QB and Notes",
        source: "BIET College",
        type: "qp",
        url: "#",
        modules: [
          { name: "Module 3 — Space and Time Trade-Offs", url: "/notes/CSE/Sem4/DAA/BIET/ADA_M3_Space_Time_TradeOffs.pdf" },
          { name: "Module 4 — Greedy & Dynamic", url: "/notes/CSE/Sem4/DAA/BIET/ADA_M4_GD.pdf" },
          { name: "Module 5 — Limitations of Algorithmic Power", url: "/notes/CSE/Sem4/DAA/BIET/ADA_M5_Limitations.pdf" },
          { name: "Question Bank 2", url: "/notes/CSE/Sem4/DAA/BIET/Question_Bank_2.docx" },
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
      {
        title: "BIET QB and Notes",
        source: "BIET College",
        type: "qp",
        url: "#",
        modules: [],
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
      {
        title: "BIET QB and Notes",
        source: "BIET College",
        type: "qp",
        url: "#",
        modules: [],
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
      {
        title: "BIET QB and Notes",
        source: "BIET College",
        type: "qp",
        url: "#",
        modules: [],
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
      {
        title: "BIET QB and Notes",
        source: "BIET College",
        type: "qp",
        url: "#",
        modules: [],
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
      {
        title: "BIET QB and Notes",
        source: "BIET College",
        type: "qp",
        url: "#",
        modules: [],
      },
    ],
  },
  ESC404B: {
    name: "Linear Algebra",
    code: "ESC404B",
    semester: 4,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem4/ESC404B/Module_1_Notes1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem4/ESC404B/Module_2_Notes1.pdf" },
        ],
      },
      {
        title: "BIET QB and Notes",
        source: "BIET College",
        type: "qp",
        url: "#",
        modules: [],
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
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem6/BCS601/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem6/BCS601/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem6/BCS601/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem6/BCS601/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem6/BCS601/Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem6/BCS601/CC_Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem6/BCS601/CC_Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem6/BCS601/CC_Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem6/BCS601/CC_Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem6/BCS601/CC_Module_5.pdf" },
        ],
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
        modules: [
          { name: "IA1 Question Bank", url: "/notes/CSE/Sem6/BCS601/CC_IA1_Question_Bank.pdf" },
          { name: "IA2 Question Bank", url: "/notes/CSE/Sem6/BCS601/CC_IA2_Question_Bank.pdf" },
          { name: "Important Questions", url: "/notes/CSE/Sem6/BCS601/BCS601_Imp_Questions.pdf" },
          { name: "QB Module 1 & 2", url: "/notes/CSE/Sem6/BCS601/QB_Module_1_2.pdf" },
        ],
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
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem6/BCS602/ML_Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem6/BCS602/ML_Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem6/BCS602/ML_Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem6/BCS602/ML_Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem6/BCS602/ML_Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem6/BCS602/BCS602_Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem6/BCS602/BCS602_Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem6/BCS602/BCS602_Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem6/BCS602/BCS602_Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem6/BCS602/BCS602_Module_5.pdf" },
        ],
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
        modules: [
          { name: "Question Bank 1", url: "/notes/CSE/Sem6/BCS602/Question_Bank_1.pdf" },
          { name: "Question Bank 2", url: "/notes/CSE/Sem6/BCS602/Question_Bank_2.pdf" },
          { name: "Question Bank 3", url: "/notes/CSE/Sem6/BCS602/Question_Bank_3.pdf" },
          { name: "Extra Problems", url: "/notes/CSE/Sem6/BCS602/Extra_Problems.pdf" },
        ],
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
        modules: [
          { name: "BCSL606 Lab Manual", url: "/notes/CSE/Sem6/BCSL606/BCSL606_Lab_Manual.pdf" },
          { name: "ML Lab - RNSIT", url: "/notes/CSE/Sem6/BCSL606/ML_Lab_Manual_RNSIT.pdf" },
          { name: "ML Lab - SVIT", url: "/notes/CSE/Sem6/BCSL606/ML_Lab_Manual_SVIT.pdf" },
          { name: "ML Lab - SMVITM", url: "/notes/CSE/Sem6/BCSL606/ML_Lab_Manual_SMVITM.pdf" },
          { name: "ML Lab - PESIT", url: "/notes/CSE/Sem6/BCSL606/ML_Lab_Manual_PESIT.pdf" },
        ],
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
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem6/BIKS609/Module_1_IKS.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem6/BIKS609/Module_2_IKS.pdf" },
        ],
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
        modules: [
          { name: "IA 2 QB Answers", url: "/notes/CSE/Sem6/BIKS609/IKS_IA_2_QB_Answers.pdf" },
          { name: "IKS Assignment", url: "/notes/CSE/Sem6/BIKS609/IKS_Assignment.pdf" },
        ],
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
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem6/BIS601/BIS601_Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem6/BIS601/BIS601_Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem6/BIS601/BIS601_Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem6/BIS601/BIS601_Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem6/BIS601/BIS601_Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem6/BIS601/FSD_M1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem6/BIS601/FSD_Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem6/BIS601/FSD_Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem6/BIS601/FSD_Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem6/BIS601/FSD_Module_5.pdf" },
        ],
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
        modules: [
          { name: "Lab Manual - SIET", url: "/notes/CSE/Sem6/BIS601/FSD_Lab_Manual_SIET.pdf" },
          { name: "Lab Manual - EWIT", url: "/notes/CSE/Sem6/BIS601/FSD_Lab_Manual_EWIT.pdf" },
        ],
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
        url: "/notes/CSE/Sem6/BCSL657B/React_Lab_Manual.pdf",
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
        modules: [
          { name: "Gen AI Lab - PES", url: "/notes/CSE/Sem6/BAIL657C/Gen_AI_Lab_Manual_PES.pdf" },
          { name: "Gen AI Lab - TCE", url: "/notes/CSE/Sem6/BAIL657C/Gen_AI_Lab_Manual_TCE.pdf" },
          { name: "Gen AI Lab - GNDEC", url: "/notes/CSE/Sem6/BAIL657C/Gen_AI_Lab_Manual_GNDEC.pdf" },
        ],
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
        modules: [
          { name: "DevOps Lab - RNSIT", url: "/notes/CSE/Sem6/BCSL657D/DevOps_Lab_Manual_RNSIT.pdf" },
          { name: "DevOps Lab - KCT", url: "/notes/CSE/Sem6/BCSL657D/DevOps_Manual_KCT.pdf" },
          { name: "DevOps Lab - SMVIT", url: "/notes/CSE/Sem6/BCSL657D/DevOps_Manual_SMVIT.pdf" },
        ],
      },
    ],
  },
  // ECE Semester 3 Subjects
  BMATEC301: {
    name: "AV Mathematics-III for EC Engineering",
    code: "BMATEC301",
    semester: 3,
    notes: [
      {
        title: "Notes 1 — SVIT",
        source: "SVIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1 - Fourier Series", url: "/notes/ECE/Sem3/MATHS/Module_1.pdf" },
          { name: "Module 2 - Fourier Transforms", url: "/notes/ECE/Sem3/MATHS/Module_2.pdf" },
          { name: "Module 3 - Z-Transforms", url: "/notes/ECE/Sem3/MATHS/Module_3.pdf" },
          { name: "Module 4 - ODE of Higher Order", url: "/notes/ECE/Sem3/MATHS/Module_4.pdf" },
          { name: "Module 5 - Curve Fitting", url: "/notes/ECE/Sem3/MATHS/Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 2", url: "/notes/ECE/Sem3/MATHS/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/ECE/Sem3/MATHS/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/ECE/Sem3/MATHS/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/ECE/Sem3/MATHS/Module_5_Notes2.pdf" },
        ],
      },
      {
        title: "Question Bank",
        source: "VTU Question Bank",
        type: "qp",
        url: "#",
        modules: [
          { name: "Model QP 1", url: "/notes/ECE/Sem3/MATHS/Model_QP_1.pdf" },
          { name: "Model QP 2", url: "/notes/ECE/Sem3/MATHS/Model_QP_2.pdf" },
        ],
      },
      {
        title: "Model QP",
        source: "VTU Model Papers",
        type: "qp",
        url: "#",
        modules: [
          { name: "Model QP 1", url: "/notes/ECE/Sem3/MATHS/Model_QP_3.pdf" },
          { name: "Model QP 2", url: "/notes/ECE/Sem3/MATHS/Model_QP_4.pdf" },
        ],
      },
    ],
  },
  BEC302: {
    name: "Digital System Design using Verilog",
    code: "BEC302",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/bec302/Module_1_SVIT.pdf" },
        { name: "Module 2", url: "/notes/bec302/Module_2_SVIT.pdf" },
        { name: "Module 3", url: "/notes/bec302/Module_3_SVIT.pdf" },
        { name: "Module 4", url: "/notes/bec302/Module_4_SVIT.pdf" },
        { name: "Module 5", url: "/notes/bec302/Module_5_SVIT.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "/notes/bec302/BEC302_IPCC_DSDV.pdf" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BEC303: {
    name: "Electronic Principles and Circuits",
    code: "BEC303",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/bec303/Module_1_SVIT.pdf" },
        { name: "Module 2", url: "/notes/bec303/Module_2_SVIT.pdf" },
        { name: "Module 3", url: "/notes/bec303/Module_3_SVIT.pdf" },
        { name: "Module 4", url: "/notes/bec303/Module_4_SVIT.pdf" },
        { name: "Module 5", url: "/notes/bec303/Module_5_SVIT.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "/notes/bec303/EPC_Notes_BEC303.pdf" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#", modules: [
        { name: "EPC Important Questions", url: "/notes/bec303/EPC_IMP_Questions.pdf" },
        { name: "Important Questions", url: "/notes/bec303/Imp_Questions.pdf" },
      ] },
    ],
  },
  BEC304: {
    name: "Network Analysis",
    code: "BEC304",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/bec304/BEC304_NA_MODULE-1_NOTES.pdf" },
        { name: "Module 2", url: "/notes/bec304/BEC304_NA_MODULE-2_NOTES.pdf" },
        { name: "Module 3", url: "/notes/bec304/BEC304_NA_MODULE-3_NOTES.pdf" },
        { name: "Module 5", url: "/notes/bec304/BEC304_NA_MODULE-5_NOTES.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECL305: {
    name: "Analog and Digital Systems Design Lab",
    code: "BECL305",
    semester: 3,
    notes: [
      { title: "Lab Manual", source: "Official Lab Manual", type: "notes", url: "/notes/becl305/BECL305_Lab_Manual.pdf" },
      { title: "Viva Questions", source: "Lab Viva Q&A", type: "qp", url: "#" },
    ],
  },
  BSCK307: {
    name: "Social Connect and Responsibility",
    code: "BSCK307",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
    ],
  },
  BEC306A: {
    name: "Electronic Devices",
    code: "BEC306A",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/bec306a/22BEC306C_Module_1.pdf" },
        { name: "Module 2", url: "/notes/bec306a/22BEC306C_Module_2.pdf" },
        { name: "Module 3", url: "/notes/bec306a/22BEC306C_Module_3.pdf" },
        { name: "Module 4", url: "/notes/bec306a/22BEC306C_Module_4.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1 Part 1", url: "/notes/bec306a/Module_1_Part_1.pdf" },
        { name: "Module 1 Part 2", url: "/notes/bec306a/Module_1_Part_2.pdf" },
        { name: "Module 2", url: "/notes/bec306a/Module_2.pdf" },
        { name: "Module 3", url: "/notes/bec306a/Module_3.pdf" },
        { name: "Module 4", url: "/notes/bec306a/Module_4.pdf" },
        { name: "Module 5", url: "/notes/bec306a/Module_5.pdf" },
      ] },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BEC306B: {
    name: "Sensors and Instrumentation",
    code: "BEC306B",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BEC306C: {
    name: "Computer Organization and Architecture",
    code: "BEC306C",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BEC306D: {
    name: "Applied Numerical Methods for EC Engineers",
    code: "BEC306D",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BEC358A: {
    name: "LABVIEW Programming",
    code: "BEC358A",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Lab Manual", source: "Official Lab Manual", type: "notes", url: "#" },
    ],
  },
  BEC358B: {
    name: "MATLAB Programming",
    code: "BEC358B",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Lab Manual", source: "Official Lab Manual", type: "notes", url: "#" },
    ],
  },
  BEC358C: {
    name: "C++ Basics",
    code: "BEC358C",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Lab Manual", source: "Official Lab Manual", type: "notes", url: "#" },
    ],
  },
  BEC358D: {
    name: "IOT for Smart Infrastructure",
    code: "BEC358D",
    semester: 3,
    notes: [
      { title: "Notes 1 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Lab Manual", source: "Official Lab Manual", type: "notes", url: "#" },
    ],
  },
  // ECE Semester 4 Subjects
  BECPCC401: {
    name: "Electromagnetics Theory",
    code: "BECPCC401",
    semester: 4,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc401/EMW_Module_1.pdf" },
        { name: "Module 2", url: "/notes/becpcc401/EMW_Module_2.pdf" },
        { name: "Module 3", url: "/notes/becpcc401/EMW_Module_3.pdf" },
        { name: "Module 4", url: "/notes/becpcc401/EMW_Module_4.pdf" },
        { name: "Module 5", url: "/notes/becpcc401/EMW_Module_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "/notes/becpcc401/EMW_Module_1-5.pdf" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPCC402: {
    name: "Principles of Communication Systems",
    code: "BECPCC402",
    semester: 4,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc402/Module_1_SVIT.pdf" },
        { name: "Module 2", url: "/notes/becpcc402/Module_2_SVIT.pdf" },
        { name: "Module 3", url: "/notes/becpcc402/Module_3_SVIT.pdf" },
        { name: "Module 4", url: "/notes/becpcc402/Module_4_SVIT.pdf" },
        { name: "Module 5", url: "/notes/becpcc402/Module_5_SVIT.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc402/Module_1_RV.pdf" },
        { name: "Module 2", url: "/notes/becpcc402/Module_2_AM.pdf" },
        { name: "Module 3", url: "/notes/becpcc402/Module_3_FM.pdf" },
        { name: "Module 4", url: "/notes/becpcc402/Module_4_Digital.pdf" },
      ] },
      { title: "Lab Manual", source: "College Lab Manuals", type: "notes", url: "/notes/becpcc402/PCS_Lab_Manual_KLE.pdf" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPCC403: {
    name: "Control Systems",
    code: "BECPCC403",
    semester: 4,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc403/CS_Module_1.pdf" },
        { name: "Module 2", url: "/notes/becpcc403/CS_Module_2.pdf" },
        { name: "Module 3", url: "/notes/becpcc403/CS_Module_3.pdf" },
        { name: "Module 4 - Stability Analysis", url: "/notes/becpcc403/CS_Module_4.pdf" },
        { name: "Module 5B - Bode Plots", url: "/notes/becpcc403/CS_Module_5B.pdf" },
        { name: "Root Locus", url: "/notes/becpcc403/Root_Locus.pdf" },
        { name: "Signal Flow Graph", url: "/notes/becpcc403/Signal_Flow_Graph.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BBTBIO405: {
    name: "Biology for Engineers",
    code: "BBTBIO405",
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
  // ECE Semester 5 Subjects
  BECPCC501: {
    name: "Digital Communication",
    code: "BECPCC501",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc501/DC_Module_1.pdf" },
        { name: "Module 2", url: "/notes/becpcc501/DC_Module_2.pdf" },
        { name: "Module 3", url: "/notes/becpcc501/DC_Module_3.pdf" },
        { name: "Module 4", url: "/notes/becpcc501/DC_Module_4.pdf" },
        { name: "Module 5", url: "/notes/becpcc501/DC_Module_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPCC502: {
    name: "Digital Signal Processing",
    code: "BECPCC502",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc502/DSP_Mod_1.pdf" },
        { name: "Module 2", url: "/notes/becpcc502/DSP_Mod_2.pdf" },
        { name: "Module 3", url: "/notes/becpcc502/DSP_Mod_3.pdf" },
        { name: "Module 4", url: "/notes/becpcc502/DSP_Mod_4.pdf" },
        { name: "Module 5", url: "/notes/becpcc502/DSP_Mod_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECMAE503: {
    name: "Technological Innovation and Management Entrepreneurship",
    code: "BECMAE503",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becmae503/TIME_Module_1.pdf" },
        { name: "Module 2", url: "/notes/becmae503/TIME_Module_2.pdf" },
        { name: "Module 3", url: "/notes/becmae503/TIME_Module_3.pdf" },
        { name: "Module 4", url: "/notes/becmae503/TIME_Module_4.pdf" },
        { name: "Module 5", url: "/notes/becmae503/TIME_Module_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPEC504X: {
    name: "Professional Elective Course (PEC)",
    code: "BECPEC504X",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BHSRMI505: {
    name: "Research Methodology and IPR",
    code: "BHSRMI505",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/bhsrmi505/Module_1.pdf" },
        { name: "Module 2", url: "/notes/bhsrmi505/Module_2.pdf" },
        { name: "Module 3", url: "/notes/bhsrmi505/Module_3.pdf" },
        { name: "Module 4", url: "/notes/bhsrmi505/Module_4.pdf" },
        { name: "Module 5", url: "/notes/bhsrmi505/Module_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPRJ506: {
    name: "Mini Project Work",
    code: "BECPRJ506",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPCL507: {
    name: "Digital Communication Lab",
    code: "BECPCL507",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECAEC508X: {
    name: "Ability / Skill Enhancement Course (AEC)",
    code: "BECAEC508X",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BMNAPT509: {
    name: "General Aptitude for Competitive Examinations",
    code: "BMNAPT509",
    semester: 5,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  // ECE Semester 6 Subjects
  BECPCC601: {
    name: "VLSI Design and Testing",
    code: "BECPCC601",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc601/Module_1.pdf" },
        { name: "Module 2", url: "/notes/becpcc601/Module_2.pdf" },
        { name: "Module 3", url: "/notes/becpcc601/Module_3.pdf" },
        { name: "Module 4", url: "/notes/becpcc601/Module_4.pdf" },
        { name: "Module 5", url: "/notes/becpcc601/Module_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPCC602: {
    name: "Embedded System Design",
    code: "BECPCC602",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1 & 2", url: "/notes/becpcc602/Module_1_2.pdf" },
        { name: "Ch 3 - Characteristics & Quality", url: "/notes/becpcc602/Ch3_Characteristics.pdf" },
        { name: "Ch 7 - HW/SW Co-Design", url: "/notes/becpcc602/Ch7_HWSW_CoDesign.pdf" },
        { name: "Ch 9 - Firmware Design", url: "/notes/becpcc602/Ch9_Firmware.pdf" },
        { name: "Ch 10 - RTOS1 Threads & Process", url: "/notes/becpcc602/Ch10_RTOS1_Threads.pdf" },
        { name: "Ch 10 - RTOS2 Multitasking", url: "/notes/becpcc602/Ch10_RTOS2_Multitasking.pdf" },
        { name: "Ch 10 - RTOS3 Task Communication", url: "/notes/becpcc602/Ch10_RTOS3_Task_Comm.pdf" },
        { name: "Ch 12 - Embedded BE", url: "/notes/becpcc602/Ch12_Embedded_BE.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPEC603X: {
    name: "Professional Elective Course (PEC)",
    code: "BECPEC603X",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECOEC604X: {
    name: "Open Elective Course (OEC)",
    code: "BECOEC604X",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPRJ605: {
    name: "Capstone Project Work – Phase I",
    code: "BECPRJ605",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPCL606: {
    name: "VLSI Design and Testing Lab",
    code: "BECPCL606",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECAEC607X: {
    name: "Ability / Skill Enhancement Course (AEC)",
    code: "BECAEC607X",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BHSIKS608: {
    name: "Indian Knowledge System",
    code: "BHSIKS608",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BMNCLB609X: {
    name: "Club Activities",
    code: "BMNCLB609X",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BEC613A: {
    name: "Multimedia Communication",
    code: "BEC613A",
    semester: 6,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/bec613a/MMC_Module_1.pdf" },
        { name: "Module 2", url: "/notes/bec613a/MMC_Module_2.pdf" },
        { name: "Module 3", url: "/notes/bec613a/MMC_Module_3.pdf" },
        { name: "Module 4", url: "/notes/bec613a/MMC_Module_4.pdf" },
        { name: "Module 5", url: "/notes/bec613a/MMC_Module_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  // ECE Semester 7 Subjects
  BECPCC701: {
    name: "Microwave Engineering and Antenna Theory",
    code: "BECPCC701",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc701/Module_1.pdf" },
        { name: "Module 2", url: "/notes/becpcc701/Module_2.pdf" },
        { name: "Module 3", url: "/notes/becpcc701/Module_3.pdf" },
        { name: "Module 4", url: "/notes/becpcc701/Module_4.pdf" },
        { name: "Module 5", url: "/notes/becpcc701/Module_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPCC702: {
    name: "Wireless Communication Systems",
    code: "BECPCC702",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#", modules: [
        { name: "Module 1", url: "/notes/becpcc702/WCS_Module_1.pdf" },
        { name: "Module 1 (Alt)", url: "/notes/becpcc702/Module_1_alt.pdf" },
        { name: "Module 2", url: "/notes/becpcc702/WCS_Module_2.pdf" },
        { name: "Module 3", url: "/notes/becpcc702/WCS_Module_3.pdf" },
        { name: "Module 4", url: "/notes/becpcc702/WCS_Module_4.pdf" },
        { name: "Module 4 (Alt)", url: "/notes/becpcc702/Module_4_alt.pdf" },
        { name: "Module 5", url: "/notes/becpcc702/Module_5.pdf" },
      ] },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPCC703: {
    name: "Computer Networks and Protocols",
    code: "BECPCC703",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPEC704X: {
    name: "Professional Elective Course (PEC)",
    code: "BECPEC704X",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECOEC705X: {
    name: "Open Elective Course (OEC)",
    code: "BECOEC705X",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  BECPRJ706: {
    name: "Capstone Project Work – Phase II",
    code: "BECPRJ706",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2", source: "College Notes", type: "notes", url: "#" },
      { title: "Question Bank", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Model QP", source: "VTU Model Papers", type: "qp", url: "#" },
    ],
  },
  // CSE/ISE Semester 7 Subjects
  BCS701: {
    name: "Internet of Things",
    code: "BCS701",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2 — Hirasugar", source: "Hirasugar College", type: "notes", url: "#" },
      { title: "Notes 3 — Old Notes", source: "Previous Year Notes", type: "notes", url: "#" },
      { title: "Notes 4 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Question Bank (Updated)", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Textbook", source: "Reference Books", type: "textbook", url: "#" },
    ],
  },
  BCS714D: {
    name: "Big Data Analytics",
    code: "BCS714D",
    semester: 7,
    notes: [
      {
        title: "Notes 1",
        source: "College Notes",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem7/BDA/Module_1.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem7/BDA/Module_2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem7/BDA/Module_3.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem7/BDA/Module_4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem7/BDA/Module_5.pdf" },
        ],
      },
      {
        title: "Notes 2 — Hirasugar",
        source: "Hirasugar College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem7/BDA/Module_1_Notes2.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem7/BDA/Module_2_Notes2.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem7/BDA/Module_3_Notes2.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem7/BDA/Module_4_Notes2.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem7/BDA/Module_5_Notes2.pdf" },
        ],
      },
      { title: "Notes 3 — Old Notes", source: "Previous Year Notes", type: "notes", url: "/notes/CSE/Sem7/BDA/Complete_Notes_Old.pdf" },
      {
        title: "Notes 4 — SVIT",
        source: "SVIT College",
        type: "notes",
        url: "#",
        modules: [
          { name: "Module 1", url: "/notes/CSE/Sem7/BDA/Module_1_Notes4.pdf" },
          { name: "Module 2", url: "/notes/CSE/Sem7/BDA/Module_2_Notes4.pdf" },
          { name: "Module 3", url: "/notes/CSE/Sem7/BDA/Module_3_Notes4.pdf" },
          { name: "Module 4", url: "/notes/CSE/Sem7/BDA/Module_4_Notes4.pdf" },
          { name: "Module 5", url: "/notes/CSE/Sem7/BDA/Module_5_Notes4.pdf" },
        ],
      },
      { title: "Question Bank (Updated)", source: "VTU Question Bank", type: "qp", url: "/notes/CSE/Sem7/BDA/Question_Bank.pdf" },
      { title: "Textbook", source: "Reference Books", type: "textbook", url: "#" },
    ],
  },
  BCS702: {
    name: "Cloud Computing",
    code: "BCS702",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2 — Hirasugar", source: "Hirasugar College", type: "notes", url: "#" },
      { title: "Notes 3 — Old Notes", source: "Previous Year Notes", type: "notes", url: "#" },
      { title: "Notes 4 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Question Bank (Updated)", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Textbook", source: "Reference Books", type: "textbook", url: "#" },
    ],
  },
  BCS703: {
    name: "Internet of Things",
    code: "BCS703",
    semester: 7,
    notes: [
      { title: "Notes 1", source: "College Notes", type: "notes", url: "#" },
      { title: "Notes 2 — Hirasugar", source: "Hirasugar College", type: "notes", url: "#" },
      { title: "Notes 3 — Old Notes", source: "Previous Year Notes", type: "notes", url: "#" },
      { title: "Notes 4 — SVIT", source: "SVIT College", type: "notes", url: "#" },
      { title: "Question Bank (Updated)", source: "VTU Question Bank", type: "qp", url: "#" },
      { title: "Textbook", source: "Reference Books", type: "textbook", url: "#" },
    ],
  },
  BCS704: {
    name: "Project Phase 1",
    code: "BCS704",
    semester: 7,
    notes: [
      { title: "Project Guidelines", source: "VTU Guidelines", type: "notes", url: "#" },
      { title: "Sample Reports", source: "Reference Reports", type: "notes", url: "#" },
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
            {note.modules!.map((module) => (
              <button
                key={`${note.title}-${module.name}-${module.url}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDownload(module.url, `${note.title} — ${module.name}`);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted active:bg-muted transition-colors duration-200 group touch-manipulation"
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

    // Use anchor element to avoid popup blockers
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Opening file", { description: title });
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
      <SEO
        title={`${subject.name} (${subject.code}) — VTU Notes, QB & Lab`}
        description={`Module-wise notes, question banks and lab manuals for ${subject.name} (${subject.code}), VTU semester ${semester}. Free download for engineering students.`}
        path={`/notes/${category}/${semester}/${subject.code}`}
        type="article"
      />
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
            <p className="text-muted-foreground">Semester {subject.semester}</p>
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
