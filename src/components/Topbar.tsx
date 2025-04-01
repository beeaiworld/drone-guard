
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Topbar = () => {
  return (
    <div className="h-16 fixed top-0 right-0 left-64 glass z-10 px-6 flex items-center justify-between border-b border-white/20">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="bg-white/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/50 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
