import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, FileWarning, Zap, Lock, Eye, Radio, Wifi, ExternalLink } from 'lucide-react';

// Olay türleri
type EventType = 'intrusion' | 'authentication' | 'dataAccess' | 'systemFailure' | 'signalInterference' | 'malware' | 'unauthorized';

// Olay verisi için tip tanımı
interface SecurityEvent {
  id: string;
  eventType: EventType;
  timestamp: Date;
  description: string;
  source: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'resolved' | 'investigating';
}

// Olay türüne göre ikon belirleme
const getEventIcon = (type: EventType) => {
  switch (type) {
    case 'intrusion':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'authentication':
      return <Lock className="h-5 w-5 text-amber-500" />;
    case 'dataAccess':
      return <Eye className="h-5 w-5 text-blue-500" />;
    case 'systemFailure':
      return <Zap className="h-5 w-5 text-purple-500" />;
    case 'signalInterference':
      return <Radio className="h-5 w-5 text-orange-500" />;
    case 'malware':
      return <FileWarning className="h-5 w-5 text-red-500" />;
    case 'unauthorized':
      return <ExternalLink className="h-5 w-5 text-red-500" />;
  }
};

// Olay türüne göre başlık belirleme
const getEventTitle = (type: EventType) => {
  switch (type) {
    case 'intrusion':
      return 'İzinsiz Giriş';
    case 'authentication':
      return 'Kimlik Doğrulama';
    case 'dataAccess':
      return 'Veri Erişimi';
    case 'systemFailure':
      return 'Sistem Hatası';
    case 'signalInterference':
      return 'Sinyal Karışması';
    case 'malware':
      return 'Zararlı Yazılım';
    case 'unauthorized':
      return 'Yetkisiz Erişim';
  }
};

// Önem derecesine göre renk belirleme
const getSeverityColor = (severity: 'critical' | 'high' | 'medium' | 'low') => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    case 'high':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
    case 'medium':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
    case 'low':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
  }
};

// Durum rengini belirleme
const getStatusColor = (status: 'active' | 'resolved' | 'investigating') => {
  switch (status) {
    case 'active':
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    case 'resolved':
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    case 'investigating':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
  }
};

// Durum başlığını belirleme
const getStatusTitle = (status: 'active' | 'resolved' | 'investigating') => {
  switch (status) {
    case 'active':
      return 'Aktif';
    case 'resolved':
      return 'Çözüldü';
    case 'investigating':
      return 'İnceleniyor';
  }
};

// Örnek güvenlik olayları oluşturma
const generateSecurityEvents = (): SecurityEvent[] => {
  const now = new Date();
  
  return [
    {
      id: 'SEC-001',
      eventType: 'intrusion' as EventType,
      timestamp: new Date(now.getTime() - 35 * 60 * 1000),
      description: 'Güney bölgesinde izinsiz giriş tespit edildi',
      source: 'Perimeter Sensörü B-12',
      severity: 'high' as 'critical' | 'high' | 'medium' | 'low',
      status: 'investigating' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-002',
      eventType: 'authentication' as EventType,
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      description: 'Başarısız yönetici girişi denemeleri (5 deneme)',
      source: 'Kontrol Paneli',
      severity: 'medium' as 'critical' | 'high' | 'medium' | 'low',
      status: 'resolved' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-003',
      eventType: 'signalInterference' as EventType,
      timestamp: new Date(now.getTime() - 45 * 60 * 1000),
      description: 'Drone-4 kontrol sinyalinde karışma tespit edildi',
      source: 'Sinyal Monitörü',
      severity: 'high' as 'critical' | 'high' | 'medium' | 'low',
      status: 'active' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-004',
      eventType: 'dataAccess' as EventType,
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      description: 'Hassas veri dosyalarına yetkisiz erişim girişimi',
      source: 'Veri Güvenliği Modülü',
      severity: 'critical' as 'critical' | 'high' | 'medium' | 'low',
      status: 'resolved' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-005',
      eventType: 'systemFailure' as EventType,
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      description: 'Yedek güç sistemi geçici kesinti yaşadı',
      source: 'Güç Yönetim Sistemi',
      severity: 'medium' as 'critical' | 'high' | 'medium' | 'low',
      status: 'resolved' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-006',
      eventType: 'malware' as EventType,
      timestamp: new Date(now.getTime() - 15 * 60 * 1000),
      description: 'Şüpheli dosya aktivitesi tespit edildi',
      source: 'Güvenlik Tarayıcısı',
      severity: 'high' as 'critical' | 'high' | 'medium' | 'low',
      status: 'investigating' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-007',
      eventType: 'unauthorized' as EventType,
      timestamp: new Date(now.getTime() - 25 * 60 * 1000),
      description: 'Drone-2 için yetkisiz komut girişimi',
      source: 'Komut Doğrulama Sistemi',
      severity: 'critical' as 'critical' | 'high' | 'medium' | 'low',
      status: 'active' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-008',
      eventType: 'intrusion' as EventType,
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      description: 'Doğu bölgesinde hareket algılandı',
      source: 'Hareket Sensörü E-05',
      severity: 'low' as 'critical' | 'high' | 'medium' | 'low',
      status: 'resolved' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-009',
      eventType: 'authentication' as EventType,
      timestamp: new Date(now.getTime() - 30 * 60 * 1000),
      description: 'Kullanıcı hesabı geçici olarak kilitlendi',
      source: 'Kullanıcı Yönetimi',
      severity: 'low' as 'critical' | 'high' | 'medium' | 'low',
      status: 'resolved' as 'active' | 'resolved' | 'investigating'
    },
    {
      id: 'SEC-010',
      eventType: 'signalInterference' as EventType,
      timestamp: new Date(now.getTime() - 10 * 60 * 1000),
      description: 'GPS sinyalinde anormallik tespit edildi',
      source: 'GPS Monitörü',
      severity: 'high' as 'critical' | 'high' | 'medium' | 'low',
      status: 'investigating' as 'active' | 'resolved' | 'investigating'
    }
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // En son olaylar en üstte
};

// Olayları kategorilere göre gruplandırma
const categorizeEvents = (events: SecurityEvent[]) => {
  const categories: { [key: string]: number } = {
    intrusion: 0,
    authentication: 0,
    dataAccess: 0,
    systemFailure: 0,
    signalInterference: 0,
    malware: 0,
    unauthorized: 0
  };
  
  events.forEach(event => {
    categories[event.eventType]++;
  });
  
  return categories;
};

// Olayları durumlarına göre gruplandırma
const categorizeByStatus = (events: SecurityEvent[]) => {
  const statuses: { [key: string]: number } = {
    active: 0,
    resolved: 0,
    investigating: 0
  };
  
  events.forEach(event => {
    statuses[event.status]++;
  });
  
  return statuses;
};

// Olayları önem derecesine göre gruplandırma
const categorizeBySeverity = (events: SecurityEvent[]) => {
  const severities: { [key: string]: number } = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  };
  
  events.forEach(event => {
    severities[event.severity]++;
  });
  
  return severities;
};

// Zaman formatını düzenleme
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('tr-TR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

// Güvenlik Olayları Özeti bileşeni
const SecurityEventsSummary: React.FC = () => {
  const events = generateSecurityEvents();
  const categories = categorizeEvents(events);
  const statuses = categorizeByStatus(events);
  const severities = categorizeBySeverity(events);
  
  // Toplam olay sayısı
  const totalEvents = events.length;
  
  // Aktif olayların yüzdesi
  const activePercentage = Math.round((statuses.active / totalEvents) * 100);
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Güvenlik Olayları Özeti
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="summary">Özet</TabsTrigger>
            <TabsTrigger value="categories">Kategoriler</TabsTrigger>
            <TabsTrigger value="events">Son Olaylar</TabsTrigger>
          </TabsList>
          
          {/* Özet Sekmesi */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Toplam Olay</h3>
                  <span className="text-2xl font-bold">{totalEvents}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Son 24 saat</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Aktif Olaylar</h3>
                  <span className="text-2xl font-bold text-red-500">{statuses.active}</span>
                </div>
                <div className="space-y-2">
                  <Progress value={activePercentage} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Toplam olayların %{activePercentage}'i</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Kritik Olaylar</h3>
                  <span className="text-2xl font-bold text-red-500">{severities.critical}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge className={getSeverityColor('critical')}>Kritik</Badge>
                  <Badge className={getSeverityColor('high')}>Yüksek</Badge>
                  <span className="text-muted-foreground">Öncelikli müdahale gerektirir</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border">
                <h3 className="text-sm font-medium mb-4">Durum Dağılımı</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Badge className={getStatusColor('active')}>Aktif</Badge>
                      </span>
                      <span>{statuses.active}</span>
                    </div>
                    <Progress value={(statuses.active / totalEvents) * 100} className="h-2 bg-gray-100" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Badge className={getStatusColor('investigating')}>İnceleniyor</Badge>
                      </span>
                      <span>{statuses.investigating}</span>
                    </div>
                    <Progress value={(statuses.investigating / totalEvents) * 100} className="h-2 bg-gray-100" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Badge className={getStatusColor('resolved')}>Çözüldü</Badge>
                      </span>
                      <span>{statuses.resolved}</span>
                    </div>
                    <Progress value={(statuses.resolved / totalEvents) * 100} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-border">
                <h3 className="text-sm font-medium mb-4">Önem Derecesi Dağılımı</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Badge className={getSeverityColor('critical')}>Kritik</Badge>
                      </span>
                      <span>{severities.critical}</span>
                    </div>
                    <Progress value={(severities.critical / totalEvents) * 100} className="h-2 bg-gray-100" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Badge className={getSeverityColor('high')}>Yüksek</Badge>
                      </span>
                      <span>{severities.high}</span>
                    </div>
                    <Progress value={(severities.high / totalEvents) * 100} className="h-2 bg-gray-100" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Badge className={getSeverityColor('medium')}>Orta</Badge>
                      </span>
                      <span>{severities.medium}</span>
                    </div>
                    <Progress value={(severities.medium / totalEvents) * 100} className="h-2 bg-gray-100" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Badge className={getSeverityColor('low')}>Düşük</Badge>
                      </span>
                      <span>{severities.low}</span>
                    </div>
                    <Progress value={(severities.low / totalEvents) * 100} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Kategoriler Sekmesi */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Object.entries(categories).map(([category, count]) => (
                <div key={category} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    {getEventIcon(category as EventType)}
                    <h3 className="text-sm font-medium">{getEventTitle(category as EventType)}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{count}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((count / totalEvents) * 100)}% toplam
                    </span>
                  </div>
                  <Progress value={(count / totalEvents) * 100} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Son Olaylar Sekmesi */}
          <TabsContent value="events" className="space-y-4">
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getEventIcon(event.eventType)}
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">
                          {getEventTitle(event.eventType)}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {event.id}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(event.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(event.severity)}>
                        {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusTitle(event.status)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm">
                      {event.description}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      Kaynak: {event.source}
                    </div>
                  </div>
                </div>
              ))}
              
              {events.length > 5 && (
                <div className="flex justify-center">
                  <button className="text-sm text-primary hover:underline">
                    Tüm olayları görüntüle ({events.length})
                  </button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SecurityEventsSummary; 