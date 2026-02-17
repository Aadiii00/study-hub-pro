import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface SubjectRow {
  code: string;
  name: string;
  credits: number;
  marks: number;
  grade: string;
  gradePoint: number;
}

interface MarksCardData {
  studentName: string;
  usn: string;
  branch: string;
  semester: string;
  scheme: string;
  subjects: SubjectRow[];
  sgpa: number;
  percentage: number;
  totalCredits: number;
  hasFailed: boolean;
}

export function generateMarksCardPDF(data: MarksCardData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header - white to cyan-blue gradient effect
  doc.setFillColor(0, 188, 212); // cyan
  doc.rect(0, 0, pageWidth, 8, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 8, pageWidth, 40, "F");

  doc.setTextColor(0, 131, 176); // dark cyan
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("StudyHub - Marks Card", pageWidth / 2, 24, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text(`VTU ${data.scheme} Scheme`, pageWidth / 2, 33, { align: "center" });

  doc.setFontSize(9);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`, pageWidth / 2, 41, { align: "center" });

  // Student Details
  let y = 55;
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Student Information", 14, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const details = [
    ["Name", data.studentName || "N/A"],
    ["USN", data.usn || "N/A"],
    ["Branch", data.branch],
    ["Semester", data.semester],
  ];

  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 50, y);
    y += 7;
  });

  // Subjects Table
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Subject-wise Results", 14, y);
  y += 4;

  const tableBody = data.subjects.map((s, i) => [
    (i + 1).toString(),
    s.code,
    s.name,
    s.credits.toString(),
    s.marks.toString(),
    s.grade,
    s.gradePoint.toString(),
  ]);

  autoTable(doc, {
    startY: y,
    head: [["#", "Code", "Subject", "Credits", "Marks", "Grade", "GP"]],
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: [0, 188, 212],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 30, 30],
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 25 },
      2: { cellWidth: 65 },
      3: { cellWidth: 18, halign: "center" },
      4: { cellWidth: 18, halign: "center" },
      5: { cellWidth: 18, halign: "center" },
      6: { cellWidth: 15, halign: "center" },
    },
    margin: { left: 14, right: 14 },
  });

  // Result Summary
  const finalY = (doc as any).lastAutoTable.finalY + 12;

  doc.setFillColor(224, 247, 250); // light cyan background
  doc.roundedRect(14, finalY, pageWidth - 28, 35, 3, 3, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);

  const resultY = finalY + 12;
  const colWidth = (pageWidth - 28) / 3;

  // Total Credits
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Total Credits", 14 + colWidth * 0.5, resultY, { align: "center" });
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(data.totalCredits.toString(), 14 + colWidth * 0.5, resultY + 12, { align: "center" });

  // SGPA
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("SGPA", 14 + colWidth * 1.5, resultY, { align: "center" });
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  if (data.hasFailed) {
    doc.setTextColor(220, 38, 38);
  } else {
    doc.setTextColor(16, 185, 129);
  }
  doc.text(data.sgpa.toFixed(2), 14 + colWidth * 1.5, resultY + 13, { align: "center" });

  // Percentage
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Percentage", 14 + colWidth * 2.5, resultY, { align: "center" });
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.percentage.toFixed(2)}%`, 14 + colWidth * 2.5, resultY + 12, { align: "center" });

  if (data.hasFailed) {
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(10);
    doc.text("Result: FAIL", pageWidth / 2, finalY + 40, { align: "center" });
  }

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(0, 188, 212);
  doc.rect(0, pageHeight - 14, pageWidth, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("By Team Code-Blooded", pageWidth / 2, pageHeight - 5, { align: "center" });

  // Save
  const safeName = (data.studentName || "Student").replace(/\s+/g, "");
  doc.save(`${safeName}smarkscard.pdf`);
}

interface CGPACardData {
  semesters: { sgpa: number; credits: number }[];
  cgpa: string;
  percentage: string;
}

export function generateCGPACardPDF(data: CGPACardData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(0, 188, 212);
  doc.rect(0, 0, pageWidth, 8, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 8, pageWidth, 40, "F");
  doc.setTextColor(0, 131, 176);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("StudyHub - CGPA Report", pageWidth / 2, 24, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`, pageWidth / 2, 33, { align: "center" });

  // Table
  const tableBody = data.semesters.map((s, i) => [
    `Semester ${i + 1}`,
    s.sgpa.toFixed(2),
    s.credits.toString(),
    (s.sgpa * s.credits).toFixed(2),
  ]);

  autoTable(doc, {
    startY: 55,
    head: [["Semester", "SGPA", "Credits", "Weighted Points"]],
    body: tableBody,
    theme: "grid",
    headStyles: { fillColor: [0, 188, 212], textColor: [255, 255, 255], fontStyle: "bold" },
    bodyStyles: { fontSize: 10, halign: "center" },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { left: 30, right: 30 },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 15;

  doc.setFillColor(224, 247, 250);
  doc.roundedRect(30, finalY, pageWidth - 60, 30, 3, 3, "F");

  const colW = (pageWidth - 60) / 2;
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("CGPA", 30 + colW * 0.5, finalY + 10, { align: "center" });
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129);
  doc.text(data.cgpa, 30 + colW * 0.5, finalY + 22, { align: "center" });

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Percentage", 30 + colW * 1.5, finalY + 10, { align: "center" });
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.percentage}%`, 30 + colW * 1.5, finalY + 22, { align: "center" });

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(0, 188, 212);
  doc.rect(0, pageHeight - 14, pageWidth, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("By Team Code-Blooded", pageWidth / 2, pageHeight - 5, { align: "center" });

  doc.save("CGPA_Report.pdf");
}
