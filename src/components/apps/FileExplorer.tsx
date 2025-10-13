import { Folder, File, Image, Music, Film, ChevronRight, Home, Star, Clock, Trash2 } from "lucide-react";

export const FileExplorer = () => {
  const sidebarItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Star, label: "Favorites", active: false },
    { icon: Clock, label: "Recent", active: false },
    { icon: Trash2, label: "Recycle Bin", active: false },
  ];

  const folders = [
    { icon: Folder, name: "Documents", items: 42 },
    { icon: Folder, name: "Downloads", items: 18 },
    { icon: Folder, name: "Pictures", items: 156 },
    { icon: Folder, name: "Videos", items: 23 },
    { icon: Folder, name: "Music", items: 89 },
  ];

  const files = [
    { icon: File, name: "Project_Notes.txt", size: "2.4 KB", modified: "Today" },
    { icon: Image, name: "Screenshot_2024.png", size: "1.2 MB", modified: "Yesterday" },
    { icon: Music, name: "Soundtrack.mp3", size: "4.8 MB", modified: "2 days ago" },
    { icon: Film, name: "Tutorial_Video.mp4", size: "45.6 MB", modified: "Last week" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-52 bg-secondary/30 border-r border-border/50 p-3">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="text-xs font-medium text-muted-foreground px-3 mb-2">Quick Access</div>
          <div className="space-y-1">
            {folders.slice(0, 3).map((folder) => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.name}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{folder.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
        <div className="h-12 border-b border-border/50 flex items-center px-4 gap-2">
          <button className="w-8 h-8 rounded hover:bg-muted transition-colors flex items-center justify-center">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <button className="w-8 h-8 rounded hover:bg-muted transition-colors flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="flex-1 mx-4 h-8 bg-secondary/50 rounded-lg flex items-center px-3 text-sm">
            <Home className="w-4 h-4 mr-2" />
            <ChevronRight className="w-3 h-3 mx-1 text-muted-foreground" />
            <span>This PC</span>
          </div>

          <button className="px-3 h-8 rounded bg-secondary/50 text-sm hover:bg-secondary transition-colors">
            New
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-auto p-6">
          {/* Folders */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Folders</h3>
            <div className="grid grid-cols-4 gap-4">
              {folders.map((folder) => {
                const Icon = folder.icon;
                return (
                  <button
                    key={folder.name}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all group"
                  >
                    <Icon className="w-12 h-12 text-yellow-500 group-hover:scale-110 transition-transform" />
                    <div className="text-center">
                      <div className="text-sm font-medium">{folder.name}</div>
                      <div className="text-xs text-muted-foreground">{folder.items} items</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Files */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Files</h3>
            <div className="space-y-1">
              {files.map((file) => {
                const Icon = file.icon;
                return (
                  <button
                    key={file.name}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{file.name}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{file.size}</div>
                    <div className="text-xs text-muted-foreground w-24">{file.modified}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
