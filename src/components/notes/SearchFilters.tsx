import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedUniversity: string;
  onUniversityChange: (value: string) => void;
  selectedBranch: string;
  onBranchChange: (value: string) => void;
  selectedSemester: string;
  onSemesterChange: (value: string) => void;
  selectedSubject: string;
  onSubjectChange: (value: string) => void;
  universities: string[];
  branches: string[];
  subjects: string[];
  onClearFilters: () => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedUniversity,
  onUniversityChange,
  selectedBranch,
  onBranchChange,
  selectedSemester,
  onSemesterChange,
  selectedSubject,
  onSubjectChange,
  universities,
  branches,
  subjects,
  onClearFilters,
}: SearchFiltersProps) {
  const hasActiveFilters =
    selectedUniversity || selectedBranch || selectedSemester || selectedSubject;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search notes by title, subject, or module..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 text-base input-premium"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={selectedUniversity} onValueChange={onUniversityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="University" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Universities</SelectItem>
            {universities.map((uni) => (
              <SelectItem key={uni} value={uni}>
                {uni}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedBranch} onValueChange={onBranchChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>
                {branch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSemester} onValueChange={onSemesterChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <SelectItem key={sem} value={sem.toString()}>
                Semester {sem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSubject} onValueChange={onSubjectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={onClearFilters}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedUniversity && selectedUniversity !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedUniversity}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onUniversityChange("all")}
              />
            </Badge>
          )}
          {selectedBranch && selectedBranch !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedBranch}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onBranchChange("all")}
              />
            </Badge>
          )}
          {selectedSemester && selectedSemester !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Semester {selectedSemester}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onSemesterChange("all")}
              />
            </Badge>
          )}
          {selectedSubject && selectedSubject !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedSubject}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onSubjectChange("all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
