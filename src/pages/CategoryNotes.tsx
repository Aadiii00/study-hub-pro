import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteCardSkeleton } from "@/components/notes/NoteCardSkeleton";
import { BulkDownloadBar } from "@/components/notes/BulkDownloadBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileX, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Note {
  id: string;
  title: string;
  subject: string;
  module: string | null;
  semester: number;
  branch: string;
  university: string;
  file_type: string;
  file_size: number;
  download_count: number;
  file_url: string;
}

const categoryInfo: Record<string, { name: string; semesters: number[] }> = {
  "first-year": { name: "First Year (P & C Cycle)", semesters: [1, 2] },
  "cse-ise": { name: "CSE / ISE", semesters: [3, 4, 5, 6, 7, 8] },
  "ece": { name: "ECE", semesters: [3, 4, 5, 6, 7, 8] },
  "eee": { name: "EEE", semesters: [3, 4, 5, 6, 7, 8] },
  "civil": { name: "CIVIL", semesters: [3, 4, 5, 6, 7, 8] },
  "mech": { name: "MECH", semesters: [3, 4, 5, 6, 7, 8] },
};

export default function CategoryNotes() {
  const { category } = useParams<{ category: string }>();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");

  const info = category ? categoryInfo[category] : null;

  useEffect(() => {
    if (category) fetchNotes();
  }, [category]);

  const fetchNotes = async () => {
    setLoading(true);
    const branchName = info?.name.replace(" (P & C Cycle)", "").replace(" / ", "/") || "";
    
    let query = supabase
      .from("notes")
      .select("*")
      .eq("is_enabled", true)
      .order("created_at", { ascending: false });

    // Filter by branch
    if (category === "first-year") {
      query = query.in("semester", [1, 2]);
    } else {
      query = query.ilike("branch", `%${branchName.split("/")[0]}%`);
    }

    const { data, error } = await query;
    
    if (error) {
      toast({ title: "Error", description: "Failed to fetch notes", variant: "destructive" });
    } else {
      setNotes(data || []);
    }
    setLoading(false);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = searchQuery === "" || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSemester = selectedSemester === "all" || note.semester.toString() === selectedSemester;
    return matchesSearch && matchesSemester;
  });

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedNotes);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedNotes(newSelected);
  };

  const handleDownload = async (id: string, url: string, title: string) => {
    try {
      await supabase.rpc("increment_download_count", { note_id: id });
    } catch {}
    window.open(url, "_blank");
    toast({ title: "Download started", description: `Downloading ${title}` });
  };

  const handlePreview = (url: string) => window.open(url, "_blank");

  const handleBulkDownload = () => {
    toast({ title: "Feature coming soon", description: "Bulk ZIP download will be available shortly" });
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
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="icon">
            <Link to="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{info.name}</h1>
            <p className="text-muted-foreground">Browse and download notes</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11"
            />
          </div>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[160px] h-11">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {info.semesters.map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>
                  Semester {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Notes Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <NoteCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-20">
            <FileX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No notes found</h3>
            <p className="text-muted-foreground mb-4">
              {notes.length === 0 
                ? "Notes will be added soon for this category" 
                : "Try adjusting your search or filters"}
            </p>
            <Button asChild variant="outline">
              <Link to="/"><ArrowLeft className="h-4 w-4 mr-2" />Browse Other Categories</Link>
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                subject={note.subject}
                module={note.module || undefined}
                semester={note.semester}
                branch={note.branch}
                fileType={note.file_type}
                fileSize={note.file_size}
                downloadCount={note.download_count}
                fileUrl={note.file_url}
                isSelected={selectedNotes.has(note.id)}
                onSelect={handleSelect}
                onPreview={handlePreview}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}

        <BulkDownloadBar
          selectedCount={selectedNotes.size}
          onDownloadAll={handleBulkDownload}
          onClearSelection={() => setSelectedNotes(new Set())}
        />
      </div>
    </Layout>
  );
}
