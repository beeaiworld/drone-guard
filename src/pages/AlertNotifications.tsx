import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Phone, 
  Settings, 
  Smartphone, 
  Volume2, 
  AlertTriangle,
  Clock,
  Users,
  Shield,
  MapPin
} from "lucide-react";

// Örnek bildirim verileri
const notificationHistory = [
  {
    id: 1,
    title: "Yüksek Öncelikli Uyarı",
    message: "Güney kapısında izinsiz giriş tespit edildi",
    type: "alert",
    severity: "high",
    time: "10 dakika önce",
    status: "delivered",
    channels: ["email", "sms", "push"]
  },
  {
    id: 2,
    title: "GPS Sinyal Kaybı",
    message: "Drone 3'te GPS sinyal kaybı tespit edildi",
    type: "warning",
    severity: "medium",
    time: "30 dakika önce",
    status: "delivered",
    channels: ["email", "push"]
  },
  {
    id: 3,
    title: "Perimeter İhlali",
    message: "Batı bölgesinde perimeter ihlali",
    type: "alert",
    severity: "high",
    time: "1 saat önce",
    status: "delivered",
    channels: ["sms", "push"]
  },
  {
    id: 4,
    title: "Sistem Güncellemesi",
    message: "Drone güvenlik sistemi başarıyla güncellendi",
    type: "info",
    severity: "low",
    time: "2 saat önce",
    status: "delivered",
    channels: ["email"]
  }
];

const notificationChannels = [
  {
    id: "email",
    name: "Email Bildirimleri",
    icon: <Mail className="h-4 w-4" />,
    description: "Önemli uyarılar için email bildirimleri",
    config: {
      address: "guvenlik@sirket.com",
      frequency: "instant"
    }
  },
  {
    id: "sms",
    name: "SMS Bildirimleri",
    icon: <MessageSquare className="h-4 w-4" />,
    description: "Acil durumlar için SMS bildirimleri",
    config: {
      phone: "+90 555 XXX XX XX",
      frequency: "high_priority"
    }
  },
  {
    id: "push",
    name: "Push Bildirimleri",
    icon: <Bell className="h-4 w-4" />,
    description: "Anlık mobil uygulama bildirimleri",
    config: {
      device: "Tüm Cihazlar",
      frequency: "all"
    }
  },
  {
    id: "desktop",
    name: "Masaüstü Bildirimleri",
    icon: <Volume2 className="h-4 w-4" />,
    description: "Kontrol merkezi masaüstü bildirimleri",
    config: {
      sound: true,
      frequency: "all"
    }
  }
];

const notificationPreferences = {
  priorities: {
    high: true,
    medium: true,
    low: false
  },
  categories: {
    security: true,
    system: true,
    maintenance: false
  },
  schedule: {
    workHours: true,
    afterHours: true,
    weekends: true
  }
};

// Severity Badge renklerini belirleyen fonksiyon
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high": return "bg-destructive text-destructive-foreground";
    case "medium": return "bg-orange-500 text-white";
    case "low": return "bg-blue-500 text-white";
    default: return "bg-secondary text-secondary-foreground";
  }
};

export default function AlertNotifications() {
  const [activeTab, setActiveTab] = useState("settings");
  const [channelStates, setChannelStates] = useState(
    notificationChannels.reduce((acc, channel) => ({
      ...acc,
      [channel.id]: true
    }), {})
  );

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bildirim Yönetimi</h1>
          <p className="text-muted-foreground">Bildirim ayarlarını yapılandırın ve geçmişi görüntüleyin</p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Gelişmiş Ayarlar
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Bildirim Ayarları
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Bildirim Geçmişi
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Bildirim Tercihleri
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <div className="grid gap-4 md:grid-cols-2">
            {notificationChannels.map((channel) => (
              <Card key={channel.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      {channel.icon}
                      <span className="ml-2">{channel.name}</span>
                    </CardTitle>
                    <Switch
                      checked={channelStates[channel.id]}
                      onCheckedChange={(checked) => 
                        setChannelStates(prev => ({...prev, [channel.id]: checked}))
                      }
                    />
                  </div>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {channel.id === "email" && (
                    <div className="space-y-2">
                      <Label>Email Adresi</Label>
                      <Input 
                        placeholder="ornek@sirket.com" 
                        defaultValue={channel.config.address}
                      />
                    </div>
                  )}
                  {channel.id === "sms" && (
                    <div className="space-y-2">
                      <Label>Telefon Numarası</Label>
                      <Input 
                        placeholder="+90 5XX XXX XX XX" 
                        defaultValue={channel.config.phone}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Bildirim Sıklığı</Label>
                    <Select defaultValue={channel.config.frequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sıklık seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">Anlık</SelectItem>
                        <SelectItem value="high_priority">Sadece Yüksek Öncelikli</SelectItem>
                        <SelectItem value="all">Tümü</SelectItem>
                        <SelectItem value="digest">Günlük Özet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Geçmişi</CardTitle>
              <CardDescription>Son gönderilen bildirimlerin listesi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationHistory.map((notification) => (
                <Alert key={notification.id} className="relative">
                  <div className="flex items-start">
                    {notification.type === "alert" ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : notification.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                    ) : (
                      <Bell className="h-5 w-5 text-blue-500" />
                    )}
                    <div className="ml-3 flex-1">
                      <AlertTitle className="flex items-center text-sm font-semibold">
                        {notification.title}
                        <Badge className={`ml-2 ${getSeverityColor(notification.severity)}`}>
                          {notification.severity === "high" ? "Yüksek" : 
                           notification.severity === "medium" ? "Orta" : "Düşük"}
                        </Badge>
                      </AlertTitle>
                      <AlertDescription>
                        <p className="mt-1 text-sm">{notification.message}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            {notification.channels.includes("email") && <Mail className="h-3 w-3" />}
                            {notification.channels.includes("sms") && <MessageSquare className="h-3 w-3" />}
                            {notification.channels.includes("push") && <Bell className="h-3 w-3" />}
                          </div>
                          <span>{notification.time}</span>
                        </div>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Öncelik Tercihleri
                </CardTitle>
                <CardDescription>Hangi öncelik seviyesindeki bildirimleri almak istiyorsunuz?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor("high")}>Yüksek</Badge>
                    <Label>Yüksek Öncelikli Bildirimler</Label>
                  </div>
                  <Switch defaultChecked={notificationPreferences.priorities.high} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor("medium")}>Orta</Badge>
                    <Label>Orta Öncelikli Bildirimler</Label>
                  </div>
                  <Switch defaultChecked={notificationPreferences.priorities.medium} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor("low")}>Düşük</Badge>
                    <Label>Düşük Öncelikli Bildirimler</Label>
                  </div>
                  <Switch defaultChecked={notificationPreferences.priorities.low} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Kategori Tercihleri
                </CardTitle>
                <CardDescription>Hangi kategorilerdeki bildirimleri almak istiyorsunuz?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <Label>Güvenlik Bildirimleri</Label>
                  </div>
                  <Switch defaultChecked={notificationPreferences.categories.security} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <Label>Sistem Bildirimleri</Label>
                  </div>
                  <Switch defaultChecked={notificationPreferences.categories.system} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <Label>Bakım Bildirimleri</Label>
                  </div>
                  <Switch defaultChecked={notificationPreferences.categories.maintenance} />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Zaman Tercihleri
                </CardTitle>
                <CardDescription>Ne zaman bildirim almak istiyorsunuz?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Mesai Saatleri (09:00-18:00)</Label>
                      <Switch defaultChecked={notificationPreferences.schedule.workHours} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Hafta içi normal çalışma saatlerinde
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Mesai Dışı</Label>
                      <Switch defaultChecked={notificationPreferences.schedule.afterHours} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Akşam ve gece saatlerinde
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Hafta Sonu</Label>
                      <Switch defaultChecked={notificationPreferences.schedule.weekends} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cumartesi ve Pazar günleri
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  Tercihleri Kaydet
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 