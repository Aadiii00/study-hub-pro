import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteCardSkeleton } from "@/components/notes/NoteCardSkeleton";
import { BulkDownloadBar } from "@/components/notes/BulkDownloadBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileX, ArrowLeft, BookOpen, Download, ChevronRight } from "lucide-react";
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

const categoryInfo: Record<string, { name: string; semesters: number[]; gradient: string }> = {
  "first-year": { name: "First Year (P & C Cycle)", semesters: [1, 2], gradient: "from-blue-600 to-cyan-500" },
  "cse-ise": { name: "CSE / ISE", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-indigo-600 to-violet-500" },
  "ece": { name: "ECE", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-rose-600 to-orange-500" },
  "eee": { name: "EEE", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-amber-600 to-lime-500" },
  "civil": { name: "Civil", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-slate-600 to-zinc-500" },
  "mech": { name: "Mechanical", semesters: [3, 4, 5, 6, 7, 8], gradient: "from-emerald-600 to-cyan-500" },
};

const semesterGradients = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-indigo-500 to-blue-500",
];

function SemesterCard({ 
  semester, 
  index, 
  onClick,
  isActive 
}: { 
  semester: number; 
  index: number; 
  onClick: () => void;
  isActive: boolean;
}) {
  const gradient = semesterGradients[index % semesterGradients.length];
  
  return (
    <button
      onClick={onClick}
      className={`group relative block w-full text-left animate-fade-in transition-all duration-300 ${
        isActive ? 'scale-[1.02]' : 'hover:scale-[1.02]'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`relative overflow-hidden rounded-2xl p-1 ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
        
        <div className="relative bg-card/90 backdrop-blur-sm rounded-xl p-5 border border-border/50 group-hover:border-transparent transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {semester}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">Semester {semester}</h3>
                <p className="text-sm text-muted-foreground">View all notes & materials</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 ${isActive ? 'text-primary rotate-90' : ''}`} />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function CategoryNotes() {
  const { category } = useParams<{ category: string }>();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  const info = category ? categoryInfo[category] : null;

  useEffect(() => {
    if (selectedSemester && category) {
      fetchNotes();
    }
  }, [selectedSemester, category]);

  const fetchNotes = async () => {
    if (!selectedSemester) return;
    
    setLoading(true);
    const branchName = info?.name.replace(" (P & C Cycle)", "").replace(" / ", "/") || "";
    
    let query = supabase
      .from("notes")
      .select("*")
      .eq("is_enabled", true)
      .eq("semester", selectedSemester)
      .order("created_at", { ascending: false });

    if (category !== "first-year") {
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
    return matchesSearch;
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

  const handleSemesterClick = (sem: number) => {
    if (selectedSemester === sem) {
      setSelectedSemester(null);
      setNotes([]);
    } else {
      setSelectedSemester(sem);
      setSearchQuery("");
      setSelectedNotes(new Set());
    }
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
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4 hover:bg-primary/10">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg`}>
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{info.name}</h1>
              <p className="text-muted-foreground">Select a semester to view notes</p>
            </div>
          </div>
        </div>

        {/* Semester Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {info.semesters.map((sem, index) => (
            <SemesterCard
              key={sem}
              semester={sem}
              index={index}
              onClick={() => handleSemesterClick(sem)}
              isActive={selectedSemester === sem}
            />
          ))}
        </div>

        {/* Notes Section */}
        {selectedSemester && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${semesterGradients[(selectedSemester - 3) % semesterGradients.length]} flex items-center justify-center text-white font-bold`}>
                  {selectedSemester}
                </div>
                <div>
                  <h2 className="text-xl font-bold">Semester {selectedSemester} Notes</h2>
                  <p className="text-sm text-muted-foreground">{filteredNotes.length} notes available</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { setSelectedSemester(null); setNotes([]); }}
                className="text-muted-foreground"
              >
                Close
              </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search notes by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md h-11"
              />
            </div>

            {/* Notes Grid */}
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <NoteCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border/50">
                <FileX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notes found</h3>
                <p className="text-muted-foreground text-sm">
                  {notes.length === 0 
                    ? "Notes for this semester will be added soon" 
                    : "Try adjusting your search"}
                </p>
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
          </div>
        )}

        {/* Empty State when no semester selected */}
        {!selectedSemester && (
          <div className="text-center py-16 bg-muted/20 rounded-2xl border border-border/50 animate-fade-in">
            <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select a Semester</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Click on any semester above to view and download notes, question papers, and study materials
            </p>
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
