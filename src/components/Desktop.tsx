import { useState } from "react";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { Window } from "./Window";
import { FileExplorer } from "./apps/FileExplorer";
import { Settings } from "./apps/Settings";
import { Browser } from "./apps/Browser";
import wallpaper from "@/assets/wallpaper.jpg";

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  component: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export const Desktop = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = (appId: string, title: string, icon: string, component: React.ReactNode) => {
    const existingWindow = windows.find(w => w.id === appId);
    
    if (existingWindow) {
      // Bring to front and un-minimize if minimized
      setWindows(windows.map(w => 
        w.id === appId 
          ? { ...w, isMinimized: false, zIndex: nextZIndex }
          : w
      ));
      setNextZIndex(nextZIndex + 1);
      return;
    }

    const newWindow: WindowState = {
      id: appId,
      title,
      icon,
      component,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
      size: { width: 900, height: 600 },
      zIndex: nextZIndex,
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
    setShowStartMenu(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative select-none"
      style={{ 
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onClick={() => setShowStartMenu(false)}
    >
      {/* Windows */}
      {windows.map(window => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
        />
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu 
          onClose={() => setShowStartMenu(false)}
          onOpenApp={openWindow}
        />
      )}

      {/* Taskbar */}
      <Taskbar 
        onStartClick={(e) => {
          e.stopPropagation();
          setShowStartMenu(!showStartMenu);
        }}
        windows={windows}
        onWindowClick={focusWindow}
        onOpenApp={openWindow}
      />
    </div>
  );
};
