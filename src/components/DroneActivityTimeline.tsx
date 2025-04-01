import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, MapPin, AlertTriangle, Shield, Battery, Signal } from 'lucide-react';

// Aktivite türleri
type ActivityType = 'takeoff' | 'landing' | 'patrol' | 'alert' | 'lowBattery' | 'signalLoss' | 'maintenance';

// Aktivite verisi için tip tanımı
interface DroneActivity {
  id: string;
  droneId: string;
  droneName: string;
  activityType: ActivityType;
  timestamp: Date;
  location?: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
}

// Aktivite türüne göre ikon ve renk belirleme
const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'takeoff':
      return <Plane className="h-5 w-5 text-blue-500" />;
    case 'landing':
      return <Plane className="h-5 w-5 text-green-500" />;
    case 'patrol':
      return <MapPin className="h-5 w-5 text-indigo-500" />;
    case 'alert':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'lowBattery':
      return <Battery className="h-5 w-5 text-amber-500" />;
    case 'signalLoss':
      return <Signal className="h-5 w-5 text-orange-500" />;
    case 'maintenance':
      return <Shield className="h-5 w-5 text-purple-500" />;
  }
};

// Aktivite türüne göre başlık belirleme
const getActivityTitle = (type: ActivityType) => {
  switch (type) {
    case 'takeoff':
      return 'Kalkış';
    case 'landing':
      return 'İniş';
    case 'patrol':
      return 'Devriye';
    case 'alert':
      return 'Alarm';
    case 'lowBattery':
      return 'Düşük Batarya';
    case 'signalLoss':
      return 'Sinyal Kaybı';
    case 'maintenance':
      return 'Bakım';
  }
};

// Aktivite önem derecesine göre badge rengi belirleme
const getSeverityColor = (severity?: 'low' | 'medium' | 'high') => {
  switch (severity) {
    case 'low':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
    case 'medium':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
    case 'high':
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
  }
};

// Örnek aktivite verileri oluşturma
const generateDroneActivities = (): DroneActivity[] => {
  const now = new Date();
  
  // Son 24 saat içinde rastgele aktiviteler oluştur
  return [
    {
      id: '1',
      droneId: 'DRN-001',
      droneName: 'Alpha-1',
      activityType: 'takeoff' as ActivityType,
      timestamp: new Date(now.getTime() - 23 * 60 * 60 * 1000),
      location: 'Kuzey Bölgesi',
      description: 'Planlı devriye için kalkış yapıldı',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '2',
      droneId: 'DRN-001',
      droneName: 'Alpha-1',
      activityType: 'patrol' as ActivityType,
      timestamp: new Date(now.getTime() - 22 * 60 * 60 * 1000),
      location: 'Kuzey Bölgesi',
      description: 'Perimeter devriyesi başlatıldı',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '3',
      droneId: 'DRN-002',
      droneName: 'Beta-2',
      activityType: 'takeoff' as ActivityType,
      timestamp: new Date(now.getTime() - 20 * 60 * 60 * 1000),
      location: 'Güney Bölgesi',
      description: 'Acil durum taraması için kalkış yapıldı',
      severity: 'medium' as 'low' | 'medium' | 'high'
    },
    {
      id: '4',
      droneId: 'DRN-003',
      droneName: 'Gamma-3',
      activityType: 'maintenance' as ActivityType,
      timestamp: new Date(now.getTime() - 18 * 60 * 60 * 1000),
      description: 'Planlı bakım için geri çağrıldı',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '5',
      droneId: 'DRN-002',
      droneName: 'Beta-2',
      activityType: 'alert' as ActivityType,
      timestamp: new Date(now.getTime() - 16 * 60 * 60 * 1000),
      location: 'Güney Bölgesi - Sektör 7',
      description: 'İzinsiz giriş tespit edildi',
      severity: 'high' as 'low' | 'medium' | 'high'
    },
    {
      id: '6',
      droneId: 'DRN-001',
      droneName: 'Alpha-1',
      activityType: 'lowBattery' as ActivityType,
      timestamp: new Date(now.getTime() - 14 * 60 * 60 * 1000),
      location: 'Kuzey Bölgesi - Sektör 3',
      description: 'Batarya seviyesi %15 altına düştü',
      severity: 'medium' as 'low' | 'medium' | 'high'
    },
    {
      id: '7',
      droneId: 'DRN-001',
      droneName: 'Alpha-1',
      activityType: 'landing' as ActivityType,
      timestamp: new Date(now.getTime() - 13 * 60 * 60 * 1000),
      location: 'Ana İstasyon',
      description: 'Düşük batarya nedeniyle iniş yapıldı',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '8',
      droneId: 'DRN-004',
      droneName: 'Delta-4',
      activityType: 'takeoff' as ActivityType,
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      location: 'Doğu Bölgesi',
      description: 'Rutin devriye için kalkış yapıldı',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '9',
      droneId: 'DRN-002',
      droneName: 'Beta-2',
      activityType: 'signalLoss' as ActivityType,
      timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000),
      location: 'Güney Bölgesi - Sektör 9',
      description: 'Geçici sinyal kaybı yaşandı (45 saniye)',
      severity: 'medium' as 'low' | 'medium' | 'high'
    },
    {
      id: '10',
      droneId: 'DRN-004',
      droneName: 'Delta-4',
      activityType: 'patrol' as ActivityType,
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000),
      location: 'Doğu Bölgesi - Sektör 2',
      description: 'Termal tarama gerçekleştiriliyor',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '11',
      droneId: 'DRN-002',
      droneName: 'Beta-2',
      activityType: 'landing' as ActivityType,
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      location: 'Ana İstasyon',
      description: 'Görev tamamlandı, iniş yapıldı',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '12',
      droneId: 'DRN-005',
      droneName: 'Epsilon-5',
      activityType: 'takeoff' as ActivityType,
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      location: 'Batı Bölgesi',
      description: 'Gece devriyesi için kalkış yapıldı',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '13',
      droneId: 'DRN-004',
      droneName: 'Delta-4',
      activityType: 'alert' as ActivityType,
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      location: 'Doğu Bölgesi - Sınır Hattı',
      description: 'Şüpheli hareket tespit edildi',
      severity: 'high' as 'low' | 'medium' | 'high'
    },
    {
      id: '14',
      droneId: 'DRN-005',
      droneName: 'Epsilon-5',
      activityType: 'patrol' as ActivityType,
      timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      location: 'Batı Bölgesi - Sektör 5',
      description: 'Perimeter kontrolü devam ediyor',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: '15',
      droneId: 'DRN-004',
      droneName: 'Delta-4',
      activityType: 'landing' as ActivityType,
      timestamp: new Date(now.getTime() - 30 * 60 * 1000),
      location: 'Yardımcı İstasyon 2',
      description: 'Görev tamamlandı, iniş yapıldı',
      severity: 'low' as 'low' | 'medium' | 'high'
    }
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // En son aktiviteler en üstte
};

// Zaman formatını düzenleme
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('tr-TR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

// Tarih formatını düzenleme
const formatDate = (date: Date) => {
  return date.toLocaleDateString('tr-TR', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric' 
  });
};

// Aktiviteleri günlere göre gruplandırma
const groupActivitiesByDay = (activities: DroneActivity[]) => {
  const groups: { [key: string]: DroneActivity[] } = {};
  
  activities.forEach(activity => {
    const dateKey = formatDate(activity.timestamp);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(activity);
  });
  
  return groups;
};

// Drone Aktivite Zaman Çizelgesi bileşeni
const DroneActivityTimeline: React.FC = () => {
  const activities = generateDroneActivities();
  const groupedActivities = groupActivitiesByDay(activities);
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Drone Aktivite Zaman Çizelgesi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <div key={date} className="space-y-4">
              <div className="sticky top-0 bg-background z-10 py-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {date}
                </h3>
              </div>
              
              <div className="space-y-4">
                {dayActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.activityType)}
                    </div>
                    
                    <div className="flex-grow space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {activity.droneName}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {activity.droneId}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(activity.timestamp)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`${getSeverityColor(activity.severity)}`}>
                          {getActivityTitle(activity.activityType)}
                        </Badge>
                        {activity.location && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DroneActivityTimeline; 