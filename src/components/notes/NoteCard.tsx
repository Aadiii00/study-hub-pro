import { FileText, Download, Eye, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface NoteCardProps {
  id: string;
  title: string;
  subject: string;
  module?: string;
  semester: number;
  branch: string;
  fileType: string;
  fileSize: number;
  downloadCount: number;
  fileUrl: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onPreview?: (url: string) => void;
  onDownload?: (id: string, url: string, title: string) => void;
}

export function NoteCard({
  id,
  title,
  subject,
  module,
  semester,
  branch,
  fileType,
  fileSize,
  downloadCount,
  fileUrl,
  isSelected = false,
  onSelect,
  onPreview,
  onDownload,
}: NoteCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8" />;
  };

  const getFileTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "doc":
      case "docx":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "ppt":
      case "pptx":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div
      className={`card-premium p-5 group relative transition-all duration-300 hover:-translate-y-1 ${
        isSelected ? "ring-2 ring-primary border-primary" : ""
      }`}
    >
      {/* Selection Checkbox */}
      {onSelect && (
        <div className="absolute top-4 right-4 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(id)}
            className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </div>
      )}

      {/* File Type Badge */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${getFileTypeColor(
            fileType
          )}`}
        >
          {getFileIcon(fileType)}
        </div>
        <div className="flex-1 min-w-0 pr-8">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{subject}</p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="text-xs">
          Sem {semester}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {branch}
        </Badge>
        {module && (
          <Badge variant="secondary" className="text-xs">
            {module}
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" />
          {formatFileSize(fileSize)}
        </span>
        <span className="flex items-center gap-1">
          <Download className="h-3.5 w-3.5" />
          {downloadCount.toLocaleString()} downloads
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onPreview?.(fileUrl)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button
          size="sm"
          className="flex-1 btn-gradient"
          onClick={() => onDownload?.(id, fileUrl, title)}
        >
          <Download className="h-4 w-4 mr-2" />
          <span>Download</span>
        </Button>
      </div>
    </div>
  );
}
