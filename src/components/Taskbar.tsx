import { Folder, Settings, Globe, Calendar, Mail } from "lucide-react";
import { WindowState } from "./Desktop";
import { FileExplorer } from "./apps/FileExplorer";
import { Settings as SettingsApp } from "./apps/Settings";
import { Browser } from "./apps/Browser";

interface TaskbarProps {
  onStartClick: (e: React.MouseEvent) => void;
  windows: WindowState[];
  onWindowClick: (id: string) => void;
  onOpenApp: (id: string, title: string, icon: string, component: React.ReactNode) => void;
}

export const Taskbar = ({ onStartClick, windows, onWindowClick, onOpenApp }: TaskbarProps) => {
  const pinnedApps = [
    { 
      id: "file-explorer", 
      icon: Folder, 
      label: "File Explorer",
      component: <FileExplorer />
    },
    { 
      id: "browser", 
      icon: Globe, 
      label: "Browser",
      component: <Browser />
    },
    { 
      id: "settings", 
      icon: Settings, 
      label: "Settings",
      component: <SettingsApp />
    },
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 taskbar-glass flex items-center justify-center px-2 z-[9999]">
      <div className="flex items-center gap-1">
        {/* Start Button */}
        <button
          onClick={onStartClick}
          className="w-12 h-10 flex items-center justify-center rounded-md hover:bg-[hsl(var(--hover-overlay))] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
          </svg>
        </button>

        {/* Search Box */}
        <div className="w-80 h-10 rounded-md bg-secondary/50 backdrop-blur-sm flex items-center px-3 text-muted-foreground text-sm border border-border/50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          Search
        </div>

        <div className="w-px h-6 bg-border/50 mx-2" />

        {/* Pinned Apps */}
        {pinnedApps.map((app) => {
          const Icon = app.icon;
          const isOpen = windows.some(w => w.id === app.id);
          
          return (
            <button
              key={app.id}
              onClick={() => {
                if (isOpen) {
                  const window = windows.find(w => w.id === app.id);
                  if (window) onWindowClick(window.id);
                } else {
                  onOpenApp(app.id, app.label, app.id, app.component);
                }
              }}
              className={`w-12 h-10 flex items-center justify-center rounded-md hover:bg-[hsl(var(--hover-overlay))] transition-colors relative ${
                isOpen ? 'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full' : ''
              }`}
              title={app.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}

        {/* Open Windows */}
        {windows.filter(w => !pinnedApps.some(app => app.id === w.id)).map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className="w-12 h-10 flex items-center justify-center rounded-md hover:bg-[hsl(var(--hover-overlay))] transition-colors relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full"
          >
            <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center text-xs">
              {window.title[0]}
            </div>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="absolute right-2 flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[hsl(var(--hover-overlay))] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
          </svg>
        </button>
        
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[hsl(var(--hover-overlay))] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </button>

        <button className="px-3 h-10 flex flex-col items-end justify-center rounded hover:bg-[hsl(var(--hover-overlay))] transition-colors text-xs">
          <div className="font-medium">{currentTime}</div>
          <div className="text-muted-foreground">{currentDate}</div>
        </button>
      </div>
    </div>
  );
};
