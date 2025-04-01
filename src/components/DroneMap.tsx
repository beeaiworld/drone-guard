import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Layers, Target, Shield, Battery, Signal, AlertTriangle, Map as MapIcon } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Drone tipi tanımı
interface Drone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  batteryLevel: number;
  signalStrength: number;
  status: 'active' | 'idle' | 'returning' | 'maintenance';
  lastUpdated: Date;
  mission?: string;
  isAnomalous?: boolean;
}

// Güvenli bölge tipi tanımı
interface SafeZone {
  id: string;
  name: string;
  type: 'circle' | 'polygon';
  coordinates: number[][];
  color: string;
}

// Örnek drone verileri
const generateDrones = (): Drone[] => {
  return [
    {
      id: 'DRN-001',
      name: 'Alpha-1',
      latitude: 39.7667,
      longitude: 30.5256,
      altitude: 120,
      speed: 25,
      batteryLevel: 78,
      signalStrength: 92,
      status: 'active',
      lastUpdated: new Date(),
      mission: 'Perimeter Patrol'
    },
    {
      id: 'DRN-002',
      name: 'Beta-2',
      latitude: 39.7722,
      longitude: 30.5156,
      altitude: 150,
      speed: 18,
      batteryLevel: 65,
      signalStrength: 88,
      status: 'active',
      lastUpdated: new Date(),
      mission: 'Surveillance'
    },
    {
      id: 'DRN-003',
      name: 'Gamma-3',
      latitude: 39.7612,
      longitude: 30.5334,
      altitude: 100,
      speed: 0,
      batteryLevel: 45,
      signalStrength: 76,
      status: 'idle',
      lastUpdated: new Date(),
      mission: 'Standby'
    },
    {
      id: 'DRN-004',
      name: 'Delta-4',
      latitude: 39.7752,
      longitude: 30.5104,
      altitude: 200,
      speed: 32,
      batteryLevel: 82,
      signalStrength: 94,
      status: 'active',
      lastUpdated: new Date(),
      mission: 'Threat Assessment'
    },
    {
      id: 'DRN-005',
      name: 'Epsilon-5',
      latitude: 39.7582,
      longitude: 30.5384,
      altitude: 90,
      speed: 15,
      batteryLevel: 23,
      signalStrength: 68,
      status: 'returning',
      lastUpdated: new Date(),
      mission: 'Return to Base',
      isAnomalous: true
    }
  ];
};

// Örnek güvenli bölgeler
const generateSafeZones = (): SafeZone[] => {
  return [
    {
      id: 'ZONE-001',
      name: 'Ana Üs',
      type: 'circle',
      coordinates: [[39.7667, 30.5256, 500]], // merkez lat, lng ve yarıçap (metre)
      color: '#10b981' // yeşil
    },
    {
      id: 'ZONE-002',
      name: 'Kuzey Perimetresi',
      type: 'polygon',
      coordinates: [
        [39.7752, 30.5104],
        [39.7762, 30.5154],
        [39.7742, 30.5204],
        [39.7732, 30.5154]
      ],
      color: '#3b82f6' // mavi
    },
    {
      id: 'ZONE-003',
      name: 'Güney Sınırı',
      type: 'polygon',
      coordinates: [
        [39.7582, 30.5284],
        [39.7572, 30.5334],
        [39.7562, 30.5284],
        [39.7572, 30.5234]
      ],
      color: '#f59e0b' // amber
    }
  ];
};

// Batarya seviyesine göre renk belirleme
const getBatteryColor = (level: number) => {
  if (level > 70) return 'text-green-500';
  if (level > 30) return 'text-amber-500';
  return 'text-red-500';
};

// Sinyal gücüne göre renk belirleme
const getSignalColor = (strength: number) => {
  if (strength > 80) return 'text-green-500';
  if (strength > 50) return 'text-amber-500';
  return 'text-red-500';
};

// Drone durumuna göre badge rengi belirleme
const getStatusBadge = (status: 'active' | 'idle' | 'returning' | 'maintenance') => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>;
    case 'idle':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Beklemede</Badge>;
    case 'returning':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Dönüyor</Badge>;
    case 'maintenance':
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Bakımda</Badge>;
  }
};

// Drone Map bileşeni
const DroneMap: React.FC = () => {
  const [drones, setDrones] = useState<Drone[]>(generateDrones());
  const [safeZones, setSafeZones] = useState<SafeZone[]>(generateSafeZones());
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'terrain' | 'hybrid'>('satellite');
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [showAnomalies, setShowAnomalies] = useState(true);
  
  // Harita yükleme durumu
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Harita referansı
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Marker ve katman grupları
  const droneMarkersRef = useRef<{ [key: string]: L.Marker }>({});
  const safeZonesLayersRef = useRef<{ [key: string]: L.Circle | L.Polygon }>({});
  
  // Harita yükleme simülasyonu
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
      console.log("Harita yükleme durumu: true");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Harita oluşturma
  useEffect(() => {
    if (mapLoaded && mapContainerRef.current && !mapRef.current) {
      console.log("Harita oluşturuluyor...");
      
      // Leaflet CSS'in yüklendiğinden emin ol
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
      
      // Harita oluştur
      try {
        const map = L.map(mapContainerRef.current, {
          zoomControl: true,
          attributionControl: true,
          scrollWheelZoom: true,
          maxZoom: 19,
          minZoom: 3
        }).setView([39.7667, 30.5256], 14);
        
        // Harita referansını kaydet
        mapRef.current = map;
        
        // Harita katmanını ekle - önce katmanı ekleyelim
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
          detectRetina: true
        }).addTo(map);
        
        console.log("Harita başarıyla oluşturuldu");
        
        // Dronları ve güvenli bölgeleri ekle
        setTimeout(() => {
          updateDroneMarkers();
          updateSafeZones();
          
          // Tüm dronları görecek şekilde haritayı ayarla
          const bounds = L.latLngBounds(drones.map(drone => [drone.latitude, drone.longitude]));
          map.fitBounds(bounds, { padding: [50, 50] });
          console.log("Dronlar ve güvenli bölgeler eklendi");
        }, 500);
      } catch (error) {
        console.error("Harita oluşturulurken hata oluştu:", error);
        setMapLoaded(false);
        // 2 saniye sonra tekrar dene
        setTimeout(() => setMapLoaded(true), 2000);
      }
      
      return () => {
        // Temizlik
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, [mapLoaded]);
  
  // Harita katmanını güncelleme
  const updateMapLayer = (map: L.Map, view: 'satellite' | 'terrain' | 'hybrid') => {
    const tileLayerUrls = {
      satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      terrain: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      hybrid: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
    };
    
    const attributions = {
      satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      terrain: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      hybrid: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    };
    
    // Mevcut katmanları temizle
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    // Yeni katmanı ekle
    try {
      L.tileLayer(tileLayerUrls[view], {
        attribution: attributions[view],
        maxZoom: 19,
        detectRetina: true
      }).addTo(map);
    } catch (error) {
      console.error("Harita katmanı yüklenirken hata oluştu:", error);
      // Yedek olarak OpenStreetMap kullan
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);
    }
  };
  
  // Harita görünümünü değiştirme işlevi
  const handleMapViewChange = (view: 'satellite' | 'terrain' | 'hybrid') => {
    setMapView(view);
    
    if (mapRef.current) {
      try {
        const tileLayerUrls = {
          satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          terrain: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          hybrid: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
        };
        
        const attributions = {
          satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          terrain: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          hybrid: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
        };
        
        // Mevcut katmanları temizle
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.TileLayer) {
            mapRef.current!.removeLayer(layer);
          }
        });
        
        // Yeni katmanı ekle
        L.tileLayer(tileLayerUrls[view], {
          attribution: attributions[view],
          maxZoom: 19,
          detectRetina: true
        }).addTo(mapRef.current);
        
        console.log(`Harita görünümü değiştirildi: ${view}`);
      } catch (error) {
        console.error("Harita katmanı değiştirilirken hata oluştu:", error);
        // Yedek olarak OpenStreetMap kullan
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(mapRef.current);
      }
    }
  };
  
  // Drone seçme işlevi
  const handleDroneSelect = (drone: Drone) => {
    setSelectedDrone(drone);
    
    // Haritada drone'a odaklan
    if (mapRef.current && droneMarkersRef.current[drone.id]) {
      mapRef.current.setView([drone.latitude, drone.longitude], 15);
      droneMarkersRef.current[drone.id].openPopup();
    }
  };
  
  // Drone için özel ikon oluşturma
  const createDroneIcon = (isAnomalous: boolean = false) => {
    return L.divIcon({
      className: 'custom-drone-icon',
      html: `<div class="w-8 h-8 rounded-full flex items-center justify-center ${isAnomalous ? 'bg-red-500' : 'bg-primary'} text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  };
  
  // Drone işaretçilerini güncelleme
  const updateDroneMarkers = () => {
    if (!mapRef.current) return;
    
    // Mevcut işaretçileri temizle
    Object.values(droneMarkersRef.current).forEach(marker => {
      marker.remove();
    });
    droneMarkersRef.current = {};
    
    // Yeni işaretçileri ekle
    drones.filter(drone => !drone.isAnomalous || showAnomalies).forEach(drone => {
      const marker = L.marker([drone.latitude, drone.longitude], {
        icon: createDroneIcon(drone.isAnomalous)
      }).addTo(mapRef.current!);
      
      // Popup içeriği
      const popupContent = document.createElement('div');
      popupContent.className = 'p-2';
      popupContent.innerHTML = `
        <h3 class="font-medium text-sm">${drone.name}</h3>
        <p class="text-xs text-muted-foreground">ID: ${drone.id}</p>
        <div class="mt-2 grid grid-cols-2 gap-1 text-xs">
          <div>Batarya: ${drone.batteryLevel}%</div>
          <div>Sinyal: ${drone.signalStrength}%</div>
          <div>Yükseklik: ${drone.altitude}m</div>
          <div>Hız: ${drone.speed} km/h</div>
        </div>
        <div class="mt-2 text-xs">
          <strong>Görev:</strong> ${drone.mission || 'Belirtilmemiş'}
        </div>
      `;
      
      // Status badge ekle
      const statusDiv = document.createElement('div');
      statusDiv.className = 'mt-1';
      const badgeClass = drone.status === 'active' 
        ? 'bg-green-100 text-green-800' 
        : drone.status === 'idle' 
          ? 'bg-blue-100 text-blue-800' 
          : drone.status === 'returning' 
            ? 'bg-amber-100 text-amber-800' 
            : 'bg-purple-100 text-purple-800';
      
      const statusText = drone.status === 'active' 
        ? 'Aktif' 
        : drone.status === 'idle' 
          ? 'Beklemede' 
          : drone.status === 'returning' 
            ? 'Dönüyor' 
            : 'Bakımda';
      
      statusDiv.innerHTML = `<span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${badgeClass}">${statusText}</span>`;
      popupContent.insertBefore(statusDiv, popupContent.querySelector('.mt-2'));
      
      marker.bindPopup(popupContent);
      
      // Tıklama olayı
      marker.on('click', () => {
        setSelectedDrone(drone);
      });
      
      // Referansı kaydet
      droneMarkersRef.current[drone.id] = marker;
    });
  };
  
  // Güvenli bölgeleri güncelleme
  const updateSafeZones = () => {
    if (!mapRef.current) return;
    
    // Mevcut katmanları temizle
    Object.values(safeZonesLayersRef.current).forEach(layer => {
      layer.remove();
    });
    safeZonesLayersRef.current = {};
    
    // Güvenli bölgeleri gösterme durumunu kontrol et
    if (!showSafeZones) return;
    
    // Yeni katmanları ekle
    safeZones.forEach(zone => {
      let layer: L.Circle | L.Polygon;
      
      if (zone.type === 'circle') {
        const [lat, lng, radius] = zone.coordinates[0];
        layer = L.circle([lat, lng], {
          radius,
          color: zone.color,
          fillColor: zone.color,
          fillOpacity: 0.2,
          weight: 3,
          dashArray: '5, 5',
          className: 'animated-border'
        }).addTo(mapRef.current!);
      } else {
        layer = L.polygon(zone.coordinates as [number, number][], {
          color: zone.color,
          fillColor: zone.color,
          fillOpacity: 0.2,
          weight: 3,
          dashArray: '5, 5',
          className: 'animated-border'
        }).addTo(mapRef.current!);
      }
      
      // Popup içeriği
      const popupContent = document.createElement('div');
      popupContent.className = 'p-2';
      popupContent.innerHTML = `
        <h3 class="font-medium text-sm">${zone.name}</h3>
        <p class="text-xs text-muted-foreground">Güvenli Bölge</p>
      `;
      
      layer.bindPopup(popupContent);
      
      // Referansı kaydet
      safeZonesLayersRef.current[zone.id] = layer;
    });
  };
  
  // Güvenli bölgeleri gösterme/gizleme durumu değiştiğinde
  useEffect(() => {
    updateSafeZones();
  }, [showSafeZones]);
  
  // Anomalileri gösterme/gizleme durumu değiştiğinde
  useEffect(() => {
    updateDroneMarkers();
  }, [showAnomalies]);
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <MapIcon className="h-5 w-5" />
            Drone Haritası
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`${showSafeZones ? 'bg-primary/10' : ''}`}
              onClick={() => setShowSafeZones(!showSafeZones)}
            >
              <Shield className="h-4 w-4 mr-2" />
              Güvenli Bölgeler
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`${showAnomalies ? 'bg-primary/10' : ''}`}
              onClick={() => setShowAnomalies(!showAnomalies)}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Anomaliler
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Harita Alanı - Tam Genişlik */}
        <div className="relative rounded-lg border border-border overflow-hidden" style={{ height: '700px' }}>
          {!mapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Harita yükleniyor...</p>
              </div>
            </div>
          ) : (
            <div ref={mapContainerRef} className="h-full w-full"></div>
          )}
        </div>
        
        {/* Alt Panel - Harita Katmanları ve Aktif Dronlar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Harita Katmanları */}
          <div className="md:col-span-1">
            <div className="p-4 rounded-lg border border-border">
              <h3 className="text-sm font-medium mb-3">Harita Katmanları</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full justify-start ${mapView === 'satellite' ? 'bg-primary/10' : ''}`}
                  onClick={() => handleMapViewChange('satellite')}
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Uydu Görünümü
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full justify-start ${mapView === 'terrain' ? 'bg-primary/10' : ''}`}
                  onClick={() => handleMapViewChange('terrain')}
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Arazi Görünümü
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full justify-start ${mapView === 'hybrid' ? 'bg-primary/10' : ''}`}
                  onClick={() => handleMapViewChange('hybrid')}
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Hibrit Görünüm
                </Button>
              </div>
            </div>
          </div>
          
          {/* Aktif Dronlar */}
          <div className="md:col-span-4">
            <div className="p-4 rounded-lg border border-border">
              <h3 className="text-sm font-medium mb-3">Aktif Dronlar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {drones.map(drone => (
                  <div 
                    key={drone.id}
                    className={`p-3 rounded-lg border ${selectedDrone?.id === drone.id ? 'border-primary bg-primary/5' : 'border-border'} cursor-pointer hover:bg-accent/50 transition-colors`}
                    onClick={() => handleDroneSelect(drone)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className={`h-4 w-4 ${drone.isAnomalous ? 'text-red-500' : 'text-primary'}`} />
                        <h4 className="font-medium">{drone.name}</h4>
                      </div>
                      {getStatusBadge(drone.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Battery className={`h-3 w-3 ${getBatteryColor(drone.batteryLevel)}`} />
                        <span>{drone.batteryLevel}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Signal className={`h-3 w-3 ${getSignalColor(drone.signalStrength)}`} />
                        <span>{drone.signalStrength}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span>{drone.altitude}m</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapIcon className="h-3 w-3" />
                        <span>{drone.speed} km/h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Seçili Drone Detayları */}
        {selectedDrone && (
          <div className="p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium mb-3">Drone Detayları: {selectedDrone.name}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">ID</p>
                <p className="font-medium">{selectedDrone.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Durum</p>
                <div>{getStatusBadge(selectedDrone.status)}</div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Görev</p>
                <p className="font-medium">{selectedDrone.mission || 'Belirtilmemiş'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Son Güncelleme</p>
                <p className="font-medium">{selectedDrone.lastUpdated.toLocaleTimeString()}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Enlem</p>
                <p className="font-medium">{selectedDrone.latitude.toFixed(4)}°</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Boylam</p>
                <p className="font-medium">{selectedDrone.longitude.toFixed(4)}°</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Yükseklik</p>
                <p className="font-medium">{selectedDrone.altitude} m</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Hız</p>
                <p className="font-medium">{selectedDrone.speed} km/h</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Batarya</p>
                <p className={`font-medium ${getBatteryColor(selectedDrone.batteryLevel)}`}>
                  {selectedDrone.batteryLevel}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Sinyal Gücü</p>
                <p className={`font-medium ${getSignalColor(selectedDrone.signalStrength)}`}>
                  {selectedDrone.signalStrength}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Anomali</p>
                <p className="font-medium">
                  {selectedDrone.isAnomalous ? (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Tespit Edildi
                    </span>
                  ) : (
                    <span className="text-green-500">Yok</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Rota Göster
              </Button>
              <Button variant="outline" size="sm">
                Komut Gönder
              </Button>
              <Button variant="default" size="sm">
                Canlı İzle
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DroneMap; 