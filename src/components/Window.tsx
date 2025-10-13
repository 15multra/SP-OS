import { useState, useRef, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";
import { WindowState } from "./Desktop";

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

export const Window = ({ window, onClose, onMinimize, onMaximize, onFocus, onPositionChange }: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(0, e.clientY - dragOffset.y);
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      onFocus();
    }
  };

  if (window.isMinimized) return null;

  const style = window.isMaximized
    ? { top: 0, left: 0, right: 0, bottom: 56, width: "100%", height: "calc(100% - 56px)" }
    : {
        top: window.position.y,
        left: window.position.x,
        width: window.size.width,
        height: window.size.height,
      };

  return (
    <div
      ref={windowRef}
      className={`fixed bg-card rounded-lg window-shadow overflow-hidden flex flex-col ${
        window.isMaximized ? 'rounded-none' : ''
      }`}
      style={{ ...style, zIndex: window.zIndex }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-card border-b border-border flex items-center justify-between px-3 cursor-move select-none"
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center text-[10px]">
            {window.title[0]}
          </div>
          <span className="text-sm font-medium">{window.title}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-8 h-8 rounded hover:bg-muted transition-colors flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={onMaximize}
            className="w-8 h-8 rounded hover:bg-muted transition-colors flex items-center justify-center"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[hsl(var(--window-bg))]">
        {window.component}
      </div>
    </div>
  );
};
