import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Filter, Settings, X, Info, Check, MessageSquare, AlertTriangle, History, Maximize, Radio, MapPin, Shield, BarChart3 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useToast } from "@/components/ui/use-toast";
import { isToday, isYesterday, isWithinInterval, subDays, subMonths, parseISO } from "date-fns";

// Örnek uyarı verileri
const alertsData = [
  { 
    id: 1, 
    title: "İzinsiz Giriş", 
    description: "Güney kapısında izinsiz giriş tespit edildi", 
    severity: "high", 
    time: "10:24", 
    status: "active",
    category: "threat",
    solution: "Güvenlik personelini alana yönlendir, kamera kayıtlarını izle",
    location: "Güney Kapısı" 
  },
  { 
    id: 2, 
    title: "Perimeter İhlali", 
    description: "Batı tarafında perimeter ihlali", 
    severity: "medium", 
    time: "09:15", 
    status: "active",
    category: "anomaly", 
    solution: "Sensör verilerini kontrol et, çevre kameralarından teyit et",
    location: "Batı Çevre Duvarı"
  },
  { 
    id: 3, 
    title: "Drone Tespit", 
    description: "İzinsiz drone uçuşu tespit edildi", 
    severity: "high", 
    time: "Yesterday", 
    status: "resolved", 
    category: "threat",
    solution: "Drone savar sistemini aktive et, drone'u takip et",
    location: "Kuzey-Batı Hava Sahası"
  },
  { 
    id: 4, 
    title: "Kamera Arızası", 
    description: "Kuzey bölge kamera 3 çevrimdışı", 
    severity: "low", 
    time: "Yesterday", 
    status: "resolved", 
    category: "anomaly",
    solution: "Teknik ekibe bildir, yedek kamerayı aktive et",
    location: "Kuzey Çevre Duvarı"
  },
  { 
    id: 5, 
    title: "Hareket Algılama", 
    description: "Depo alanında hareket algılandı", 
    severity: "medium", 
    time: "2 days ago", 
    status: "resolved", 
    category: "anomaly",
    solution: "Vardiya çizelgesini kontrol et, depo kameralarını izle",
    location: "Ana Depo"
  },
  { 
    id: 6, 
    title: "GPS Sinyal Kaybı", 
    description: "Drone 2'de GPS sinyal kaybı", 
    severity: "high", 
    time: "3 days ago", 
    status: "resolved", 
    category: "gps",
    solution: "Manuel kontrol moduna geç, drone'u güvenli alana indir",
    location: "Doğu Sektörü"
  },
  { 
    id: 7, 
    title: "GPS Paraziti", 
    description: "GPS koordinatlarında tutarsızlık", 
    severity: "high", 
    time: "4 days ago", 
    status: "resolved", 
    category: "gps",
    solution: "Yedek navigasyon sistemine geç, parazit kaynağını belirle",
    location: "Merkez Alan"
  }
];

// Severity Badge renklerini belirleyen fonksiyon
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high": return "bg-destructive text-destructive-foreground";
    case "medium": return "bg-orange-500 text-white";
    case "low": return "bg-blue-500 text-white";
    default: return "bg-secondary text-secondary-foreground";
  }
};

// Status Badge renklerini belirleyen fonksiyon
const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-red-500 text-white";
    case "resolved": return "bg-green-500 text-white";
    default: return "bg-secondary text-secondary-foreground";
  }
};

// Kategori ikonunu belirleyen fonksiyon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "anomaly": return <AlertTriangle className="h-4 w-4 mr-1" />;
    case "gps": return <MapPin className="h-4 w-4 mr-1" />;
    case "threat": return <Shield className="h-4 w-4 mr-1" />;
    default: return <Info className="h-4 w-4 mr-1" />;
  }
};

export default function Alerts() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState("active");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Filtreler için genişletilmiş state
  const [filters, setFilters] = useState({
    severity: "all",
    category: "all",
    dateRange: "all", // yeni: tarih aralığı filtresi
    location: "all",  // yeni: konum filtresi
    lastApplied: null as string | null // son uygulama zamanı
  });

  // Ayarlar için state
  const [alertSettings, setAlertSettings] = useState({
    notifications: {
      email: false,
      sms: false,
      push: false
    },
    priorities: {
      high: true,
      medium: true,
      low: false
    },
    contactInfo: {
      email: "",
      phone: ""
    }
  });

  // URL parametrelerini işle
  useEffect(() => {
    // Tab parametresi
    if (searchParams.get("tab") === "history") {
      setSelectedTab("history");
    }

    // Filter parametresi
    if (searchParams.get("filter") === "true") {
      setFilterOpen(true);
    }

    // Settings parametresi
    if (searchParams.get("settings") === "true") {
      setSettingsOpen(true);
    }
  }, [searchParams]);

  // Uyarıları filtreleme
  const filteredAlerts = alertsData.filter(alert => {
    // Tab filtresi
    if (selectedTab === "active" && alert.status !== "active") return false;
    if (selectedTab === "history" && alert.status !== "resolved") return false;
    
    // Severity filtresi
    if (filters.severity !== "all" && alert.severity !== filters.severity) return false;
    
    // Kategori filtresi
    if (filters.category !== "all" && alert.category !== filters.category) return false;

    // Konum filtresi
    if (filters.location !== "all") {
      const locationMap: { [key: string]: string[] } = {
        north: ["Kuzey Çevre Duvarı", "Kuzey-Batı Hava Sahası"],
        south: ["Güney Kapısı"],
        east: ["Doğu Sektörü"],
        west: ["Batı Çevre Duvarı"],
        center: ["Merkez Alan", "Ana Depo"]
      };
      
      if (!locationMap[filters.location].some(loc => alert.location.includes(loc))) {
        return false;
      }
    }

    // Tarih filtresi
    if (filters.dateRange !== "all") {
      const alertDate = parseISO(alert.time);
      const now = new Date();

      switch (filters.dateRange) {
        case "today":
          if (!isToday(alertDate)) return false;
          break;
        case "yesterday":
          if (!isYesterday(alertDate)) return false;
          break;
        case "lastWeek":
          if (!isWithinInterval(alertDate, { 
            start: subDays(now, 7), 
            end: now 
          })) return false;
          break;
        case "lastMonth":
          if (!isWithinInterval(alertDate, { 
            start: subMonths(now, 1), 
            end: now 
          })) return false;
          break;
      }
    }
    
    return true;
  });

  // Ayarları localStorage'a kaydet
  const saveSettings = () => {
    try {
      localStorage.setItem('alertSettings', JSON.stringify(alertSettings));
      toast({
        title: "Ayarlar Kaydedildi",
        description: "Uyarı yapılandırma ayarlarınız başarıyla güncellendi.",
      });
      setSettingsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
      });
    }
  };

  // Ayarları localStorage'dan yükle
  useEffect(() => {
    const savedSettings = localStorage.getItem('alertSettings');
    if (savedSettings) {
      setAlertSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Filtreleri localStorage'a kaydet
  const saveFilters = () => {
    try {
      localStorage.setItem('alertFilters', JSON.stringify({
        ...filters,
        lastApplied: new Date().toISOString()
      }));
      toast({
        title: "Filtreler Kaydedildi",
        description: "Uyarı filtreleme tercihleriniz başarıyla güncellendi.",
      });
      setFilterOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Filtreler kaydedilirken bir hata oluştu.",
      });
    }
  };

  // Filtreleri localStorage'dan yükle
  useEffect(() => {
    const savedFilters = localStorage.getItem('alertFilters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className="pl-64 pt-16 p-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Uyarı Yönetimi</h1>
              <p className="text-muted-foreground">
                Tüm uyarıları görüntüleyin ve yönetin
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setFilterOpen(true)}>
                <Filter className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/alerts/categories'}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Kategori Görünümü
              </Button>
              <Button>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Yeni Uyarı
              </Button>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Toplam Uyarı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alertsData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Aktif Uyarılar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alertsData.filter(a => a.status === "active").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Yüksek Öncelikli</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alertsData.filter(a => a.severity === "high").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Çözülen Uyarılar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alertsData.filter(a => a.status === "resolved").length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList className="grid w-full max-w-sm grid-cols-2">
              <TabsTrigger value="active">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Aktif Uyarılar
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" />
                Uyarı Geçmişi
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Aktif Uyarılar</CardTitle>
                  <CardDescription>Sistemdeki aktif/çözüm bekleyen uyarılar</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>Son güncellenme: Bugün 11:30</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Öncelik</TableHead>
                        <TableHead>Zaman</TableHead>
                        <TableHead>Konum</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.id}</TableCell>
                          <TableCell>{alert.title}</TableCell>
                          <TableCell>{alert.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center">
                              {getCategoryIcon(alert.category)}
                              {alert.category === "anomaly" ? "Anomali" : 
                               alert.category === "gps" ? "GPS" : 
                               alert.category === "threat" ? "Tehdit" : "Diğer"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity === "high" ? "Yüksek" : alert.severity === "medium" ? "Orta" : "Düşük"}
                            </Badge>
                          </TableCell>
                          <TableCell>{alert.time}</TableCell>
                          <TableCell>{alert.location}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setSelectedAlert(alert);
                                  setShowDetails(true);
                                }}
                              >
                                <Maximize className="h-3 w-3 mr-1" />
                                Detay
                              </Button>
                              {alert.status === "active" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Çöz
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Uyarı Geçmişi</CardTitle>
                  <CardDescription>Çözümlenmiş uyarılar</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>Son güncellenme: Bugün 11:30</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Öncelik</TableHead>
                        <TableHead>Çözüm Zamanı</TableHead>
                        <TableHead>Konum</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlerts.map((alert) => (
                        <TableRow key={alert.id} className="opacity-80">
                          <TableCell className="font-medium">{alert.id}</TableCell>
                          <TableCell>{alert.title}</TableCell>
                          <TableCell>{alert.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center">
                              {getCategoryIcon(alert.category)}
                              {alert.category === "anomaly" ? "Anomali" : 
                               alert.category === "gps" ? "GPS" : 
                               alert.category === "threat" ? "Tehdit" : "Diğer"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity === "high" ? "Yüksek" : alert.severity === "medium" ? "Orta" : "Düşük"}
                            </Badge>
                          </TableCell>
                          <TableCell>{alert.time}</TableCell>
                          <TableCell>{alert.location}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setSelectedAlert(alert);
                                setShowDetails(true);
                              }}
                            >
                              <Info className="h-3 w-3 mr-1" />
                              Detay
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Uyarı Detayları ve Çözüm Önerileri Modalı */}
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  {selectedAlert && (
                    <>
                      <Badge className={`mr-2 ${getSeverityColor(selectedAlert.severity)}`}>
                        {selectedAlert.severity === "high" ? "Yüksek" : selectedAlert.severity === "medium" ? "Orta" : "Düşük"}
                      </Badge>
                      {selectedAlert.title}
                    </>
                  )}
                </DialogTitle>
              </DialogHeader>
              
              {selectedAlert && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Uyarı Detayları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold">Açıklama</Label>
                        <p className="text-sm">{selectedAlert.description}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold">Konum</Label>
                        <p className="text-sm">{selectedAlert.location}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold">Kategori</Label>
                        <Badge variant="outline" className="flex items-center mt-1">
                          {getCategoryIcon(selectedAlert.category)}
                          {selectedAlert.category === "anomaly" ? "Anomali" : 
                           selectedAlert.category === "gps" ? "GPS" : 
                           selectedAlert.category === "threat" ? "Tehdit" : "Diğer"}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold">Oluşturulma Zamanı</Label>
                        <p className="text-sm">{selectedAlert.time}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold">Durum</Label>
                        <Badge className={`mt-1 ${getStatusColor(selectedAlert.status)}`}>
                          {selectedAlert.status === "active" ? "Aktif" : "Çözüldü"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Çözüm Önerileri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold">Önerilen Aksiyon</Label>
                        <Alert className="mt-1">
                          <AlertTitle className="text-sm font-semibold">Öneri</AlertTitle>
                          <AlertDescription className="text-sm">{selectedAlert.solution}</AlertDescription>
                        </Alert>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-semibold">İlgili Personel</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline">Güvenlik Ekibi</Badge>
                          <Badge variant="outline">Teknik Destek</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-semibold mb-1 block">Yorumlar</Label>
                        <div className="bg-muted p-2 rounded-md text-sm">
                          <p className="font-semibold text-xs">Sistem</p>
                          <p className="text-xs">Uyarı oluşturuldu ve ilgili personele bildirim gönderildi.</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {selectedAlert.status === "active" ? (
                        <Button className="w-full">
                          <Check className="mr-2 h-4 w-4" />
                          Bu Uyarıyı Çöz
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Yorum Ekle
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Filtre Modalı */}
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Uyarıları Filtrele</DialogTitle>
                <DialogDescription>
                  Görüntülemek istediğiniz uyarıları filtrelemek için kriterleri seçin.
                  {filters.lastApplied && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Son güncelleme: {new Date(filters.lastApplied).toLocaleString('tr-TR')}
                    </p>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="severity">Öncelik</Label>
                  <Select 
                    value={filters.severity} 
                    onValueChange={(value) => setFilters({...filters, severity: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Öncelik seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="high">Yüksek</SelectItem>
                      <SelectItem value="medium">Orta</SelectItem>
                      <SelectItem value="low">Düşük</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => setFilters({...filters, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="anomaly">Anomali</SelectItem>
                      <SelectItem value="gps">GPS</SelectItem>
                      <SelectItem value="threat">Tehdit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dateRange">Tarih Aralığı</Label>
                  <Select 
                    value={filters.dateRange} 
                    onValueChange={(value) => setFilters({...filters, dateRange: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tarih aralığı seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="today">Bugün</SelectItem>
                      <SelectItem value="yesterday">Dün</SelectItem>
                      <SelectItem value="lastWeek">Son 1 Hafta</SelectItem>
                      <SelectItem value="lastMonth">Son 1 Ay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Konum</Label>
                  <Select 
                    value={filters.location} 
                    onValueChange={(value) => setFilters({...filters, location: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Konum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="north">Kuzey Bölgesi</SelectItem>
                      <SelectItem value="south">Güney Bölgesi</SelectItem>
                      <SelectItem value="east">Doğu Bölgesi</SelectItem>
                      <SelectItem value="west">Batı Bölgesi</SelectItem>
                      <SelectItem value="center">Merkez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setFilters({
                      severity: "all",
                      category: "all",
                      dateRange: "all",
                      location: "all",
                      lastApplied: null
                    });
                    toast({
                      title: "Filtreler Sıfırlandı",
                      description: "Tüm filtreler varsayılan değerlerine döndürüldü.",
                    });
                  }}
                >
                  Sıfırla
                </Button>
                <Button type="button" onClick={saveFilters}>
                  Uygula ve Kaydet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Ayarlar Modalı */}
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Uyarı Yapılandırması</DialogTitle>
                <DialogDescription>
                  Uyarı tercihlerinizi ve bildirim ayarlarınızı yapılandırın.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Bildirim Tercihleri</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="email" 
                      checked={alertSettings.notifications.email}
                      onCheckedChange={(checked) => 
                        setAlertSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked === true }
                        }))
                      }
                    />
                    <Label htmlFor="email" className="text-sm">Email Bildirimleri</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sms" 
                      checked={alertSettings.notifications.sms}
                      onCheckedChange={(checked) => 
                        setAlertSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, sms: checked === true }
                        }))
                      }
                    />
                    <Label htmlFor="sms" className="text-sm">SMS Bildirimleri</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="push" 
                      checked={alertSettings.notifications.push}
                      onCheckedChange={(checked) => 
                        setAlertSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, push: checked === true }
                        }))
                      }
                    />
                    <Label htmlFor="push" className="text-sm">Push Bildirimleri</Label>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Öncelik Eşikleri</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="high" 
                      checked={alertSettings.priorities.high}
                      onCheckedChange={(checked) => 
                        setAlertSettings(prev => ({
                          ...prev,
                          priorities: { ...prev.priorities, high: checked === true }
                        }))
                      }
                    />
                    <Label htmlFor="high" className="text-sm">Yüksek Öncelikli Uyarılar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="medium" 
                      checked={alertSettings.priorities.medium}
                      onCheckedChange={(checked) => 
                        setAlertSettings(prev => ({
                          ...prev,
                          priorities: { ...prev.priorities, medium: checked === true }
                        }))
                      }
                    />
                    <Label htmlFor="medium" className="text-sm">Orta Öncelikli Uyarılar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="low" 
                      checked={alertSettings.priorities.low}
                      onCheckedChange={(checked) => 
                        setAlertSettings(prev => ({
                          ...prev,
                          priorities: { ...prev.priorities, low: checked === true }
                        }))
                      }
                    />
                    <Label htmlFor="low" className="text-sm">Düşük Öncelikli Uyarılar</Label>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="notification-email">Bildirim Email Adresi</Label>
                  <Input 
                    id="notification-email" 
                    placeholder="ornek@sirket.com" 
                    value={alertSettings.contactInfo.email}
                    onChange={(e) => 
                      setAlertSettings(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, email: e.target.value }
                      }))
                    }
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="notification-phone">Bildirim Telefon Numarası</Label>
                  <Input 
                    id="notification-phone" 
                    placeholder="+90 5XX XXX XX XX" 
                    value={alertSettings.contactInfo.phone}
                    onChange={(e) => 
                      setAlertSettings(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, phone: e.target.value }
                      }))
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={saveSettings}>
                  Kaydet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
} 