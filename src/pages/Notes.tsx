import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteCardSkeleton } from "@/components/notes/NoteCardSkeleton";
import { SearchFilters } from "@/components/notes/SearchFilters";
import { BulkDownloadBar } from "@/components/notes/BulkDownloadBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileX } from "lucide-react";

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

export default function Notes() {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("notes").select("*").eq("is_enabled", true).order("created_at", { ascending: false });
    if (error) { toast({ title: "Error", description: "Failed to fetch notes", variant: "destructive" }); }
    else { setNotes(data || []); }
    setLoading(false);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = searchQuery === "" || note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUniversity = selectedUniversity === "all" || note.university === selectedUniversity;
    const matchesBranch = selectedBranch === "all" || note.branch === selectedBranch;
    const matchesSemester = selectedSemester === "all" || note.semester.toString() === selectedSemester;
    const matchesSubject = selectedSubject === "all" || note.subject === selectedSubject;
    return matchesSearch && matchesUniversity && matchesBranch && matchesSemester && matchesSubject;
  });

  const universities = [...new Set(notes.map((n) => n.university))];
  const branches = [...new Set(notes.map((n) => n.branch))];
  const subjects = [...new Set(notes.map((n) => n.subject))];

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Notes</h1>
          <p className="text-muted-foreground">Find and download study materials for your courses</p>
        </div>
        <div className="mb-8">
          <SearchFilters
            searchQuery={searchQuery} onSearchChange={setSearchQuery}
            selectedUniversity={selectedUniversity} onUniversityChange={setSelectedUniversity}
            selectedBranch={selectedBranch} onBranchChange={setSelectedBranch}
            selectedSemester={selectedSemester} onSemesterChange={setSelectedSemester}
            selectedSubject={selectedSubject} onSubjectChange={setSelectedSubject}
            universities={universities} branches={branches} subjects={subjects}
            onClearFilters={() => { setSelectedUniversity("all"); setSelectedBranch("all"); setSelectedSemester("all"); setSelectedSubject("all"); }}
          />
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{Array.from({ length: 8 }).map((_, i) => <NoteCardSkeleton key={i} />)}</div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-20"><FileX className="h-16 w-16 text-muted-foreground mx-auto mb-4" /><h3 className="text-xl font-semibold mb-2">No notes found</h3><p className="text-muted-foreground">Try adjusting your filters</p></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} id={note.id} title={note.title} subject={note.subject} module={note.module || undefined} semester={note.semester} branch={note.branch} fileType={note.file_type} fileSize={note.file_size} downloadCount={note.download_count} fileUrl={note.file_url} isSelected={selectedNotes.has(note.id)} onSelect={handleSelect} onPreview={handlePreview} onDownload={handleDownload} />
            ))}
          </div>
        )}
        <BulkDownloadBar selectedCount={selectedNotes.size} onDownloadAll={handleBulkDownload} onClearSelection={() => setSelectedNotes(new Set())} />
      </div>
    </Layout>
  );
}
