import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import DroneMap from '@/components/DroneMap';

const DroneMapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className="pl-64 pt-16 p-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Drone Haritası</h1>
            <p className="text-muted-foreground mt-1">
              Drone konumları, rotaları ve güvenli bölgelerin gerçek zamanlı izlenmesi
            </p>
          </div>

          <DroneMap />
        </div>
      </main>
    </div>
  );
};

export default DroneMapPage; 