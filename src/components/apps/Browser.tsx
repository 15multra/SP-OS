import { ArrowLeft, ArrowRight, RotateCw, Home, Star, Lock } from "lucide-react";

export const Browser = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Browser Controls */}
      <div className="h-14 border-b border-border/50 flex items-center px-3 gap-2">
        <button className="w-9 h-9 rounded-lg hover:bg-muted transition-colors flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-muted transition-colors flex items-center justify-center">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-muted transition-colors flex items-center justify-center">
          <RotateCw className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-muted transition-colors flex items-center justify-center">
          <Home className="w-4 h-4" />
        </button>

        {/* Address Bar */}
        <div className="flex-1 h-9 bg-secondary/50 rounded-lg flex items-center px-3 gap-2 border border-border/50">
          <Lock className="w-4 h-4 text-green-500" />
          <span className="text-sm flex-1">lovable.dev</span>
          <Star className="w-4 h-4 text-muted-foreground hover:text-yellow-500 cursor-pointer transition-colors" />
        </div>

        <button className="px-4 h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
          Sign in
        </button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-auto p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>
        
        <h1 className="text-3xl font-semibold mb-3">Welcome to Browser</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Start browsing the web with a fast, secure, and modern browser experience
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
          {[
            { name: "GitHub", url: "github.com", color: "bg-purple-500/10 text-purple-500" },
            { name: "YouTube", url: "youtube.com", color: "bg-red-500/10 text-red-500" },
            { name: "Twitter", url: "twitter.com", color: "bg-blue-500/10 text-blue-500" },
            { name: "LinkedIn", url: "linkedin.com", color: "bg-blue-600/10 text-blue-600" },
          ].map((site) => (
            <button
              key={site.name}
              className="p-6 rounded-xl bg-card hover:bg-muted/50 transition-all border border-border/50 hover:border-primary/30 group"
            >
              <div className={`w-12 h-12 rounded-lg ${site.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                {site.name[0]}
              </div>
              <div className="text-sm font-medium mb-1">{site.name}</div>
              <div className="text-xs text-muted-foreground">{site.url}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
