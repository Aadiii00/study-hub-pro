import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface IAItem {
  subjectCode: string;
  subjectName: string;
  ia1Url: string;
  ia2Url: string;
}

const sem3IAData: IAItem[] = [
  { subjectCode: "BCS301", subjectName: "Mathematics for CSE", ia1Url: "/ia-papers/sem3/MAT-CIE_1.pdf", ia2Url: "#" },
  { subjectCode: "BCS302", subjectName: "Data Structures and Applications", ia1Url: "/ia-papers/sem3/DSA-CIE_1.pdf", ia2Url: "#" },
  { subjectCode: "BCS303", subjectName: "Digital Design and Computer Organization", ia1Url: "/ia-papers/sem3/DDCO-CIE_1.pdf", ia2Url: "#" },
  { subjectCode: "BCS304", subjectName: "Operating Systems", ia1Url: "/ia-papers/sem3/OS-CIE_1.pdf", ia2Url: "#" },
  { subjectCode: "BCS305", subjectName: "Object Oriented Programming with C++ and Java", ia1Url: "/ia-papers/sem3/JAVA-CIE_1.pdf", ia2Url: "#" },
  { subjectCode: "BCSL306", subjectName: "Data Structures Lab", ia1Url: "#", ia2Url: "#" },
  { subjectCode: "BCS307", subjectName: "Universal Human Values", ia1Url: "#", ia2Url: "#" },
];

interface BIETIATableProps {
  semester: number;
}

export function BIETIATable({ semester }: BIETIATableProps) {
  const handleDownload = (url: string, title: string) => {
    if (url === "#") {
      toast("Coming soon", {
        description: `"${title}" will be available for download soon.`,
      });
      return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "download.pdf";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();

    toast.success("Download started", { description: title });
  };

  // Only show for semester 3 for now
  if (semester !== 3) return null;

  return (
    <div className="mt-6 animate-fade-in">
      <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5 hover:bg-primary/5">
              <TableHead className="font-semibold text-foreground">Subject Code</TableHead>
              <TableHead className="font-semibold text-foreground">Subject Name</TableHead>
              <TableHead className="font-semibold text-foreground text-center">IA 1</TableHead>
              <TableHead className="font-semibold text-foreground text-center">IA 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sem3IAData.map((item, index) => (
              <TableRow 
                key={item.subjectCode}
                className="hover:bg-muted/50 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {item.subjectCode}
                </TableCell>
                <TableCell className="font-medium text-sm">
                  {item.subjectName}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleDownload(item.ia1Url, `${item.subjectCode} IA 1`)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-opacity"
                  >
                    <Download className="w-3 h-3" />
                    IA 1
                  </button>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleDownload(item.ia2Url, `${item.subjectCode} IA 2`)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/90 transition-opacity"
                  >
                    <Download className="w-3 h-3" />
                    IA 2
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
