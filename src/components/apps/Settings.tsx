import { Monitor, Wifi, Volume2, Battery, Bell, Lock, Globe, Palette, User } from "lucide-react";

export const Settings = () => {
  const categories = [
    { icon: Monitor, label: "System", description: "Display, sound, notifications" },
    { icon: Wifi, label: "Network & Internet", description: "Wi-Fi, airplane mode, VPN" },
    { icon: Bell, label: "Notifications", description: "App notifications, banners" },
    { icon: User, label: "Accounts", description: "Your accounts, email, sync" },
    { icon: Palette, label: "Personalization", description: "Background, themes, colors" },
    { icon: Lock, label: "Privacy & Security", description: "Windows Security, permissions" },
    { icon: Volume2, label: "Sound", description: "Volume, input/output devices" },
    { icon: Battery, label: "Power & Battery", description: "Sleep, battery usage" },
    { icon: Globe, label: "Time & Language", description: "Region, date format" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-secondary/30 border-r border-border/50 p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-1">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your device</p>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Find a setting"
            className="w-full h-10 bg-secondary/50 rounded-lg px-3 text-sm border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-semibold mb-8">Settings</h1>

        <div className="grid gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted/50 transition-all border border-border/50 hover:border-primary/30 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-base font-medium mb-0.5">{category.label}</div>
                  <div className="text-sm text-muted-foreground">{category.description}</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            );
          })}
        </div>

        {/* Quick Settings */}
        <div className="mt-8 p-6 rounded-xl bg-card border border-border/50">
          <h3 className="text-lg font-semibold mb-4">Quick Settings</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Wifi, label: "Wi-Fi", status: "Connected" },
              { icon: Volume2, label: "Volume", status: "65%" },
              { icon: Battery, label: "Battery", status: "85%" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Icon className="w-5 h-5 mb-2 text-primary" />
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.status}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
