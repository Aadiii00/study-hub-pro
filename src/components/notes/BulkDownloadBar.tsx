import { Download, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BulkDownloadBarProps {
  selectedCount: number;
  onDownloadAll: () => void;
  onClearSelection: () => void;
  isDownloading?: boolean;
}

export function BulkDownloadBar({
  selectedCount,
  onDownloadAll,
  onClearSelection,
  isDownloading = false,
}: BulkDownloadBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="glass-strong rounded-full px-6 py-3 shadow-xl flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Package className="h-4 w-4 text-primary" />
          <span>{selectedCount} notes selected</span>
        </div>
        <div className="h-6 w-px bg-border" />
        <Button
          size="sm"
          className="btn-gradient rounded-full"
          onClick={onDownloadAll}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              <span>Preparing ZIP...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              <span>Download All as ZIP</span>
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={onClearSelection}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
