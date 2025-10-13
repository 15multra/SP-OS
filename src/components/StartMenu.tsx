import { Folder, Settings, Globe, Calendar, Mail, Image, Music, Film, Code, FileText, Calculator, Package } from "lucide-react";
import { FileExplorer } from "./apps/FileExplorer";
import { Settings as SettingsApp } from "./apps/Settings";
import { Browser } from "./apps/Browser";

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (id: string, title: string, icon: string, component: React.ReactNode) => void;
}

export const StartMenu = ({ onClose, onOpenApp }: StartMenuProps) => {
  const apps = [
    { id: "file-explorer", icon: Folder, label: "File Explorer", color: "text-yellow-500", component: <FileExplorer /> },
    { id: "browser", icon: Globe, label: "Browser", color: "text-blue-500", component: <Browser /> },
    { id: "settings", icon: Settings, label: "Settings", color: "text-gray-400", component: <SettingsApp /> },
    { id: "mail", icon: Mail, label: "Mail", color: "text-blue-400", component: <div className="p-6">Mail App</div> },
    { id: "calendar", icon: Calendar, label: "Calendar", color: "text-red-500", component: <div className="p-6">Calendar</div> },
    { id: "photos", icon: Image, label: "Photos", color: "text-purple-500", component: <div className="p-6">Photos</div> },
    { id: "music", icon: Music, label: "Music", color: "text-pink-500", component: <div className="p-6">Music Player</div> },
    { id: "videos", icon: Film, label: "Videos", color: "text-indigo-500", component: <div className="p-6">Video Player</div> },
    { id: "code", icon: Code, label: "Code", color: "text-cyan-500", component: <div className="p-6">Code Editor</div> },
    { id: "notes", icon: FileText, label: "Notes", color: "text-amber-500", component: <div className="p-6">Notes App</div> },
    { id: "calculator", icon: Calculator, label: "Calculator", color: "text-green-500", component: <div className="p-6">Calculator</div> },
    { id: "store", icon: Package, label: "Store", color: "text-blue-600", component: <div className="p-6">App Store</div> },
  ];

  return (
    <div 
      className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[680px] glass-effect rounded-xl p-8 window-shadow animate-in fade-in slide-in-from-bottom-2 duration-200 z-[10000]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Pinned Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-4 px-2">Pinned</h3>
        <div className="grid grid-cols-6 gap-4">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => {
                  onOpenApp(app.id, app.label, app.id, app.component);
                  onClose();
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[hsl(var(--hover-overlay))] transition-all hover-lift group"
              >
                <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${app.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-center">{app.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="border-t border-border/50 pt-4">
        <div className="flex items-center justify-between mb-3 px-2">
          <h3 className="text-sm font-medium">Recommended</h3>
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            More
          </button>
        </div>
        
        <div className="space-y-1">
          {[
            { name: "Project Documentation", type: "Word Document", time: "2h ago", icon: FileText },
            { name: "Design System", type: "Folder", time: "Yesterday", icon: Folder },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[hsl(var(--hover-overlay))] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.type} • {item.time}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 mt-4 pt-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-medium">
            U
          </div>
          <span className="text-sm font-medium">User</span>
        </div>
        <button className="w-10 h-10 rounded-lg hover:bg-[hsl(var(--hover-overlay))] transition-colors flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
