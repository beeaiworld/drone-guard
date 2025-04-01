import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Shield, Map, Bell, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Map, label: 'Drone Haritası', path: '/map' },
    { icon: Shield, label: 'Güvenlik', path: '/security' },
    { icon: Bell, label: 'Uyarı Yönetimi', path: '/alerts' },
    { icon: Settings, label: 'Ayarlar', path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen glass fixed left-0 top-0 p-4 border-r border-white/20">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-xl font-semibold">DroneGuard</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-white/50 text-foreground/60 hover:text-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
