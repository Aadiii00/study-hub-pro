import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteCardSkeleton } from "@/components/notes/NoteCardSkeleton";
import { BulkDownloadBar } from "@/components/notes/BulkDownloadBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function SubjectNotes() {
  const { scheme, cycle, subjectCode } = useParams<{ scheme: string; cycle: string; subjectCode: string }>();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const cycleName = cycle === "p-cycle" ? "P Cycle" : "C Cycle";

  useEffect(() => {
    fetchNotes();
  }, [scheme, cycle, subjectCode]);

  const fetchNotes = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("is_enabled", true)
      .ilike("subject", `%${subjectCode}%`)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch notes", variant: "destructive" });
    } else {
      setNotes(data || []);
    }
    setLoading(false);
  };

  const filteredNotes = notes.filter((note) => {
    return searchQuery === "" || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.module?.toLowerCase().includes(searchQuery.toLowerCase());
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
    
    // Create a temporary anchor element to trigger download without popup blockers
    const link = document.createElement("a");
    link.href = url;
    link.download = title + ".pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: "Download started", description: `Downloading ${title}` });
  };

  const handlePreview = (url: string) => window.open(url, "_blank");

  const handleBulkDownload = () => {
    toast({ title: "Feature coming soon", description: "Bulk ZIP download will be available shortly" });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="icon">
            <Link to={`/notes/first-year/${scheme}/${cycle}`}><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{subjectCode}</h1>
            <p className="text-muted-foreground">First Year • {cycleName}</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="Search notes by title or module..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md h-11"
          />
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
              Notes for {subjectCode} will be added soon
            </p>
            <Button asChild variant="outline">
              <Link to={`/notes/first-year/${scheme}/${cycle}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />Back to Subjects
              </Link>
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
