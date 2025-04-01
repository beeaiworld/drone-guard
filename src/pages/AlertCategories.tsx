import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, MapPin, Shield, Bell, Settings, BarChart3, Activity, TrendingUp, TrendingDown, Radio, Camera, Users, Lock, Wifi, Radar } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const categoryDetails = {
  anomaly: {
    title: "Anomali Tespiti",
    description: "Sistem davranışlarında tespit edilen anormal durumlar",
    icon: AlertTriangle,
    color: "bg-yellow-500",
    subCategories: [
      {
        id: "sensor",
        name: "Sensör Anomalileri",
        icon: Activity,
        count: 12,
        trend: "+5%",
        trendUp: true
      },
      {
        id: "camera",
        name: "Kamera Anomalileri",
        icon: Camera,
        count: 8,
        trend: "-2%",
        trendUp: false
      },
      {
        id: "behavior",
        name: "Davranış Anomalileri",
        icon: Users,
        count: 15,
        trend: "+8%",
        trendUp: true
      }
    ]
  },
  gps: {
    title: "GPS Tehditleri",
    description: "GPS sinyalleri ve konumlandırma ile ilgili tehditler",
    icon: MapPin,
    color: "bg-blue-500",
    subCategories: [
      {
        id: "spoofing",
        name: "GPS Spoofing",
        icon: Radio,
        count: 5,
        trend: "+2%",
        trendUp: true
      },
      {
        id: "jamming",
        name: "Sinyal Karıştırma",
        icon: Wifi,
        count: 3,
        trend: "-1%",
        trendUp: false
      },
      {
        id: "interference",
        name: "Sinyal Girişimi",
        icon: Radar,
        count: 7,
        trend: "+3%",
        trendUp: true
      }
    ]
  },
  threat: {
    title: "Güvenlik Tehditleri",
    description: "Fiziksel ve siber güvenlik tehditleri",
    icon: Shield,
    color: "bg-red-500",
    subCategories: [
      {
        id: "physical",
        name: "Fiziksel Tehditler",
        icon: Users,
        count: 10,
        trend: "+4%",
        trendUp: true
      },
      {
        id: "cyber",
        name: "Siber Tehditler",
        icon: Lock,
        count: 6,
        trend: "-3%",
        trendUp: false
      },
      {
        id: "drone",
        name: "İzinsiz Drone",
        icon: Radio,
        count: 9,
        trend: "+6%",
        trendUp: true
      }
    ]
  }
};

// Alt kategori detayları için yeni tip tanımlamaları
interface SubCategoryDetail {
  description: string;
  commonCauses: string[];
  recommendedActions: string[];
  relatedSystems: string[];
}

const subCategoryDetails: Record<string, SubCategoryDetail> = {
  // Anomali alt kategorileri
  sensor: {
    description: "Sensör sistemlerinde tespit edilen anormal okumalar ve davranışlar",
    commonCauses: [
      "Sensör kalibrasyonu bozulması",
      "Çevresel faktörler",
      "Donanım arızaları"
    ],
    recommendedActions: [
      "Sensör kalibrasyonu kontrolü",
      "Fiziksel hasar kontrolü",
      "Veri analizi ve karşılaştırma"
    ],
    relatedSystems: [
      "Hareket sensörleri",
      "Sıcaklık sensörleri",
      "Basınç sensörleri"
    ]
  },
  camera: {
    description: "Kamera sistemlerinde tespit edilen görüntü ve kayıt anomalileri",
    commonCauses: [
      "Kamera lens kirlenmesi",
      "Bağlantı sorunları",
      "Yazılım hataları"
    ],
    recommendedActions: [
      "Kamera temizliği",
      "Bağlantı kontrolü",
      "Yazılım güncellemesi"
    ],
    relatedSystems: [
      "Güvenlik kameraları",
      "Termal kameralar",
      "PTZ kameralar"
    ]
  },
  behavior: {
    description: "Sistem kullanıcılarının davranışlarında tespit edilen anormallikler",
    commonCauses: [
      "Yetkisiz erişim denemeleri",
      "Şüpheli hareket kalıpları",
      "Olağandışı kullanım zamanları"
    ],
    recommendedActions: [
      "Kullanıcı yetki kontrolü",
      "Davranış analizi",
      "Güvenlik protokolü gözden geçirme"
    ],
    relatedSystems: [
      "Erişim kontrol sistemi",
      "Personel takip sistemi",
      "Güvenlik logları"
    ]
  },
  // GPS alt kategorileri
  spoofing: {
    description: "GPS sinyallerinin sahte konumlarla değiştirilmesi tehdidi",
    commonCauses: [
      "Sinyal karıştırıcılar",
      "Sahte GPS vericileri",
      "Siber saldırılar"
    ],
    recommendedActions: [
      "Sinyal şifreleme kontrolü",
      "Konum doğrulama",
      "Yedek navigasyon sistemleri"
    ],
    relatedSystems: [
      "GPS alıcıları",
      "Navigasyon sistemleri",
      "Konum doğrulama sistemleri"
    ]
  },
  jamming: {
    description: "GPS sinyallerinin kasıtlı olarak engellenme tehdidi",
    commonCauses: [
      "Elektronik karıştırıcılar",
      "Güçlü RF kaynakları",
      "Coğrafi engeller"
    ],
    recommendedActions: [
      "Sinyal gücü analizi",
      "Alternatif navigasyon",
      "Karıştırıcı tespiti"
    ],
    relatedSystems: [
      "Sinyal algılayıcılar",
      "RF monitörler",
      "Yedek sistemler"
    ]
  },
  interference: {
    description: "GPS sinyallerinde oluşan girişim ve bozulmalar",
    commonCauses: [
      "Atmosferik koşullar",
      "Elektronik cihazlar",
      "Yapısal engeller"
    ],
    recommendedActions: [
      "Sinyal kalitesi analizi",
      "Çevresel faktör kontrolü",
      "Sistem optimizasyonu"
    ],
    relatedSystems: [
      "Sinyal filtreleme",
      "Kalite monitörleri",
      "Anten sistemleri"
    ]
  },
  // Tehdit alt kategorileri
  physical: {
    description: "Fiziksel güvenlik tehditleri ve ihlalleri",
    commonCauses: [
      "İzinsiz giriş denemeleri",
      "Vandalizm",
      "Ekipman hırsızlığı"
    ],
    recommendedActions: [
      "Güvenlik devriyesi",
      "Kamera kontrolü",
      "Erişim log analizi"
    ],
    relatedSystems: [
      "Giriş kontrol sistemleri",
      "CCTV sistemleri",
      "Hareket sensörleri"
    ]
  },
  cyber: {
    description: "Siber güvenlik tehditleri ve saldırıları",
    commonCauses: [
      "Kötücül yazılımlar",
      "Şifre kırma denemeleri",
      "DDoS saldırıları"
    ],
    recommendedActions: [
      "Güvenlik duvarı kontrolü",
      "Log analizi",
      "Sistem güncellemesi"
    ],
    relatedSystems: [
      "Güvenlik duvarı",
      "IDS/IPS sistemleri",
      "Log sunucuları"
    ]
  },
  drone: {
    description: "İzinsiz drone aktiviteleri ve tehditleri",
    commonCauses: [
      "Yasak bölge ihlalleri",
      "Casusluk faaliyetleri",
      "Kargo taşıma denemeleri"
    ],
    recommendedActions: [
      "Drone tespit sistemi kontrolü",
      "Hava sahası taraması",
      "Karşı önlem aktivasyonu"
    ],
    relatedSystems: [
      "Drone tespit radarları",
      "RF sinyal algılayıcılar",
      "Drone savar sistemleri"
    ]
  }
};

export default function AlertCategories() {
  const [selectedCategory, setSelectedCategory] = useState("anomaly");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  
  // Seçili kategori için toplam uyarı sayısı
  const getTotalAlerts = (category: string) => {
    return categoryDetails[category as keyof typeof categoryDetails].subCategories.reduce(
      (total, sub) => total + sub.count, 
      0
    );
  };

  // Alt kategori için ilerleme yüzdesi
  const getProgressPercentage = (subCategory: { count: number }, category: string) => {
    const total = getTotalAlerts(category);
    return (subCategory.count / total) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className="pl-64 pt-16 p-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Uyarı Kategorileri</h1>
              <p className="text-muted-foreground">
                Kategori bazlı uyarı dağılımları ve istatistikler
              </p>
            </div>
          </div>

          {/* Kategori Özet Kartları */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-8">
            {Object.entries(categoryDetails).map(([key, category]) => (
              <Card key={key} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${category.color} bg-opacity-20`}>
                        <category.icon className={`w-5 h-5 ${category.color.replace('bg-', 'text-')}`} />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <Badge variant="outline">{getTotalAlerts(key)} Uyarı</Badge>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.subCategories.map(sub => (
                      <div key={sub.id} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <sub.icon className="w-4 h-4 text-muted-foreground" />
                            <span>{sub.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{sub.count}</span>
                            <Badge variant={sub.trendUp ? "default" : "destructive"} className="text-xs">
                              {sub.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {sub.trend}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={getProgressPercentage(sub, key)} className="h-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detaylı Kategori Görünümü */}
          <Tabs value={selectedCategory} onValueChange={(value) => {
            setSelectedCategory(value);
            setSelectedSubCategory(null);
          }} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              {Object.entries(categoryDetails).map(([key, category]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(categoryDetails).map(([key, category]) => (
              <TabsContent key={key} value={key} className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${category.color} bg-opacity-20`}>
                        <category.icon className={`w-6 h-6 ${category.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                      {category.subCategories.map(sub => (
                        <Card 
                          key={sub.id} 
                          className={`cursor-pointer transition-all ${
                            selectedSubCategory === sub.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setSelectedSubCategory(sub.id)}
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <sub.icon className="w-5 h-5 text-muted-foreground" />
                                <CardTitle className="text-base">{sub.name}</CardTitle>
                              </div>
                              <Badge variant={sub.trendUp ? "default" : "destructive"} className="text-xs">
                                {sub.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {sub.trend}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold mb-2">{sub.count}</div>
                            <Progress value={getProgressPercentage(sub, key)} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-2">
                              Toplam uyarıların {getProgressPercentage(sub, key).toFixed(1)}%'i
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Alt Kategori Detay Kartı */}
                {selectedSubCategory && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {category.subCategories.find(sub => sub.id === selectedSubCategory)?.name} Detayları
                      </CardTitle>
                      <CardDescription>
                        {subCategoryDetails[selectedSubCategory].description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Yaygın Nedenler</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-4 space-y-1">
                              {subCategoryDetails[selectedSubCategory].commonCauses.map((cause, index) => (
                                <li key={index} className="text-sm">{cause}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Önerilen Aksiyonlar</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-4 space-y-1">
                              {subCategoryDetails[selectedSubCategory].recommendedActions.map((action, index) => (
                                <li key={index} className="text-sm">{action}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">İlgili Sistemler</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-4 space-y-1">
                              {subCategoryDetails[selectedSubCategory].relatedSystems.map((system, index) => (
                                <li key={index} className="text-sm">{system}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
} 