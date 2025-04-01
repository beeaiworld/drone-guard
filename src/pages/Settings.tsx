import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { User, Bell, Moon, Sun, Globe, Shield, Key, Mail, Phone, Languages, Palette, Database, Lock, Drone, Save, Server, Upload, Download } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

interface UserSettings {
  profile: {
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    desktop: boolean;
    alerts: {
      high: boolean;
      medium: boolean;
      low: boolean;
    };
  };
  appearance: {
    theme: string;
    language: string;
    timezone: string;
    density: string;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    lastLogin: string;
    loginHistory: Array<{
      date: string;
      device: string;
      location: string;
    }>;
  };
  system: {
    dataRetention: number;
    autoBackup: boolean;
    backupFrequency: string;
    dataProtection: {
      encryption: boolean;
      anonymization: boolean;
      dataSharing: boolean;
    };
    securityPolicies: {
      passwordExpiry: number;
      loginAttempts: number;
      ipWhitelist: boolean;
    };
    droneConfig: {
      maxAltitude: number;
      maxDistance: number;
      autoReturn: boolean;
      emergencyLanding: boolean;
    };
  };
}

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@sirket.com",
      phone: "+90 555 123 4567",
      role: "Güvenlik Yöneticisi",
      avatar: "/avatars/user.png"
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      desktop: true,
      alerts: {
        high: true,
        medium: true,
        low: false
      }
    },
    appearance: {
      theme: "system",
      language: "tr",
      timezone: "Europe/Istanbul",
      density: "comfortable"
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30,
      lastLogin: "2024-03-15 09:30",
      loginHistory: [
        {
          date: "2024-03-15 09:30",
          device: "Chrome / Windows",
          location: "İstanbul, TR"
        },
        {
          date: "2024-03-14 17:45",
          device: "Safari / MacOS",
          location: "İstanbul, TR"
        }
      ]
    },
    system: {
      dataRetention: 90,
      autoBackup: true,
      backupFrequency: "daily",
      dataProtection: {
        encryption: true,
        anonymization: true,
        dataSharing: false
      },
      securityPolicies: {
        passwordExpiry: 90,
        loginAttempts: 3,
        ipWhitelist: true
      },
      droneConfig: {
        maxAltitude: 120,
        maxDistance: 500,
        autoReturn: true,
        emergencyLanding: true
      }
    }
  });

  // Ayarları localStorage'dan yükle
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Ayarları kaydet
  const saveSettings = () => {
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings));
      toast({
        title: "Ayarlar Kaydedildi",
        description: "Kullanıcı ayarlarınız başarıyla güncellendi.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className="pl-64 pt-16 p-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
              <p className="text-muted-foreground">
                Kullanıcı tercihlerinizi ve sistem ayarlarınızı yönetin
              </p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Bildirimler
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Görünüm
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Güvenlik
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Sistem
              </TabsTrigger>
            </TabsList>

            {/* Profil Ayarları */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profil Ayarları</CardTitle>
                  <CardDescription>
                    Kişisel bilgilerinizi ve hesap detaylarınızı yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={settings.profile.avatar} />
                      <AvatarFallback>AY</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">Fotoğrafı Değiştir</Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, GIF veya PNG. Max 2MB.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input
                        id="name"
                        value={settings.profile.name}
                        onChange={(e) => setSettings({
                          ...settings,
                          profile: { ...settings.profile, name: e.target.value }
                        })}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => setSettings({
                          ...settings,
                          profile: { ...settings.profile, email: e.target.value }
                        })}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={settings.profile.phone}
                        onChange={(e) => setSettings({
                          ...settings,
                          profile: { ...settings.profile, phone: e.target.value }
                        })}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Rol</Label>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{settings.profile.role}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Rol değişiklikleri için sistem yöneticinize başvurun
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bildirim Ayarları */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Bildirim Ayarları</CardTitle>
                  <CardDescription>
                    Bildirim tercihlerinizi ve uyarı ayarlarınızı özelleştirin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Bildirim Kanalları</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="email-notifications">Email Bildirimleri</Label>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={settings.notifications.email}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, email: checked }
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="push-notifications">Push Bildirimleri</Label>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={settings.notifications.push}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, push: checked }
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="sms-notifications">SMS Bildirimleri</Label>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={settings.notifications.sms}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, sms: checked }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Uyarı Öncelikleri</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="high-priority">Yüksek Öncelikli Uyarılar</Label>
                        <Switch
                          id="high-priority"
                          checked={settings.notifications.alerts.high}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              alerts: { ...settings.notifications.alerts, high: checked }
                            }
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="medium-priority">Orta Öncelikli Uyarılar</Label>
                        <Switch
                          id="medium-priority"
                          checked={settings.notifications.alerts.medium}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              alerts: { ...settings.notifications.alerts, medium: checked }
                            }
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="low-priority">Düşük Öncelikli Uyarılar</Label>
                        <Switch
                          id="low-priority"
                          checked={settings.notifications.alerts.low}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              alerts: { ...settings.notifications.alerts, low: checked }
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Görünüm Ayarları */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Görünüm Ayarları</CardTitle>
                  <CardDescription>
                    Arayüz tercihlerinizi ve görsel ayarlarınızı özelleştirin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="theme">Tema</Label>
                      <Select
                        value={settings.appearance.theme}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, theme: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              Açık Tema
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              Koyu Tema
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Palette className="h-4 w-4" />
                              Sistem Teması
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="language">Dil</Label>
                      <Select
                        value={settings.appearance.language}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, language: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tr">Türkçe</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="timezone">Saat Dilimi</Label>
                      <Select
                        value={settings.appearance.timezone}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, timezone: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Istanbul">İstanbul (GMT+3)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="density">Görünüm Yoğunluğu</Label>
                      <Select
                        value={settings.appearance.density}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, density: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Sıkışık</SelectItem>
                          <SelectItem value="comfortable">Rahat</SelectItem>
                          <SelectItem value="spacious">Geniş</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Güvenlik Ayarları */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Güvenlik Ayarları</CardTitle>
                  <CardDescription>
                    Hesap güvenliği ve erişim ayarlarınızı yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>İki Faktörlü Doğrulama</Label>
                        <p className="text-sm text-muted-foreground">
                          Hesabınıza ekstra güvenlik katmanı ekleyin
                        </p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactor}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          security: { ...settings.security, twoFactor: checked }
                        })}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Son Oturum Açma Bilgileri</h3>
                      <div className="space-y-4">
                        {settings.security.loginHistory.map((login, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{login.device}</p>
                              <p className="text-xs text-muted-foreground">{login.location}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{login.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Oturum Ayarları</h3>
                      <div className="grid gap-2">
                        <Label htmlFor="session-timeout">Oturum Zaman Aşımı (dakika)</Label>
                        <Input
                          id="session-timeout"
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sistem Ayarları */}
            <TabsContent value="system">
              <div className="grid gap-6">
                {/* Sistem Yapılandırması */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sistem Yapılandırması</CardTitle>
                    <CardDescription>
                      Temel sistem ayarlarını ve veri saklama politikalarını yönetin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="data-retention">Veri Saklama Süresi (gün)</Label>
                        <Input
                          id="data-retention"
                          type="number"
                          value={settings.system.dataRetention}
                          onChange={(e) => setSettings({
                            ...settings,
                            system: { 
                              ...settings.system,
                              dataRetention: parseInt(e.target.value)
                            }
                          })}
                        />
                        <p className="text-sm text-muted-foreground">
                          Sistem verilerinin saklanacağı maksimum süre
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Veri Koruma ve Gizlilik */}
                <Card>
                  <CardHeader>
                    <CardTitle>Veri Koruma ve Gizlilik</CardTitle>
                    <CardDescription>
                      Veri güvenliği ve gizlilik ayarlarını yapılandırın
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Veri Şifreleme</Label>
                          <p className="text-sm text-muted-foreground">
                            Tüm sistem verilerini uçtan uca şifrele
                          </p>
                        </div>
                        <Switch
                          checked={settings.system.dataProtection.encryption}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              dataProtection: {
                                ...settings.system.dataProtection,
                                encryption: checked
                              }
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Veri Anonimleştirme</Label>
                          <p className="text-sm text-muted-foreground">
                            Hassas verileri otomatik anonimleştir
                          </p>
                        </div>
                        <Switch
                          checked={settings.system.dataProtection.anonymization}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              dataProtection: {
                                ...settings.system.dataProtection,
                                anonymization: checked
                              }
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Veri Paylaşımı</Label>
                          <p className="text-sm text-muted-foreground">
                            Üçüncü taraflarla veri paylaşımına izin ver
                          </p>
                        </div>
                        <Switch
                          checked={settings.system.dataProtection.dataSharing}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              dataProtection: {
                                ...settings.system.dataProtection,
                                dataSharing: checked
                              }
                            }
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Güvenlik Politikaları */}
                <Card>
                  <CardHeader>
                    <CardTitle>Güvenlik Politikaları</CardTitle>
                    <CardDescription>
                      Sistem güvenlik politikalarını yapılandırın
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="password-expiry">Şifre Geçerlilik Süresi (gün)</Label>
                        <Input
                          id="password-expiry"
                          type="number"
                          value={settings.system.securityPolicies.passwordExpiry}
                          onChange={(e) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              securityPolicies: {
                                ...settings.system.securityPolicies,
                                passwordExpiry: parseInt(e.target.value)
                              }
                            }
                          })}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="login-attempts">Maksimum Giriş Denemesi</Label>
                        <Input
                          id="login-attempts"
                          type="number"
                          value={settings.system.securityPolicies.loginAttempts}
                          onChange={(e) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              securityPolicies: {
                                ...settings.system.securityPolicies,
                                loginAttempts: parseInt(e.target.value)
                              }
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>IP Whitelist</Label>
                          <p className="text-sm text-muted-foreground">
                            Sadece güvenilir IP adreslerinden erişime izin ver
                          </p>
                        </div>
                        <Switch
                          checked={settings.system.securityPolicies.ipWhitelist}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              securityPolicies: {
                                ...settings.system.securityPolicies,
                                ipWhitelist: checked
                              }
                            }
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Drone Yapılandırma */}
                <Card>
                  <CardHeader>
                    <CardTitle>Drone Yapılandırma</CardTitle>
                    <CardDescription>
                      Drone operasyon parametrelerini yapılandırın
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="max-altitude">Maksimum Yükseklik (metre)</Label>
                        <Input
                          id="max-altitude"
                          type="number"
                          value={settings.system.droneConfig.maxAltitude}
                          onChange={(e) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              droneConfig: {
                                ...settings.system.droneConfig,
                                maxAltitude: parseInt(e.target.value)
                              }
                            }
                          })}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="max-distance">Maksimum Mesafe (metre)</Label>
                        <Input
                          id="max-distance"
                          type="number"
                          value={settings.system.droneConfig.maxDistance}
                          onChange={(e) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              droneConfig: {
                                ...settings.system.droneConfig,
                                maxDistance: parseInt(e.target.value)
                              }
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Otomatik Dönüş</Label>
                          <p className="text-sm text-muted-foreground">
                            Düşük pil durumunda otomatik üsse dön
                          </p>
                        </div>
                        <Switch
                          checked={settings.system.droneConfig.autoReturn}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              droneConfig: {
                                ...settings.system.droneConfig,
                                autoReturn: checked
                              }
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Acil İniş</Label>
                          <p className="text-sm text-muted-foreground">
                            Kritik durumlarda güvenli iniş protokolü
                          </p>
                        </div>
                        <Switch
                          checked={settings.system.droneConfig.emergencyLanding}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              droneConfig: {
                                ...settings.system.droneConfig,
                                emergencyLanding: checked
                              }
                            }
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Yedekleme ve Geri Yükleme */}
                <Card>
                  <CardHeader>
                    <CardTitle>Yedekleme ve Geri Yükleme</CardTitle>
                    <CardDescription>
                      Sistem yedekleme ve geri yükleme ayarlarını yapılandırın
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Otomatik Yedekleme</Label>
                          <p className="text-sm text-muted-foreground">
                            Düzenli sistem yedeklemesi
                          </p>
                        </div>
                        <Switch
                          checked={settings.system.autoBackup}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              autoBackup: checked
                            }
                          })}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="backup-frequency">Yedekleme Sıklığı</Label>
                        <Select
                          value={settings.system.backupFrequency}
                          onValueChange={(value) => setSettings({
                            ...settings,
                            system: {
                              ...settings.system,
                              backupFrequency: value
                            }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Saatlik</SelectItem>
                            <SelectItem value="daily">Günlük</SelectItem>
                            <SelectItem value="weekly">Haftalık</SelectItem>
                            <SelectItem value="monthly">Aylık</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-4">
                        <Button className="flex-1" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Manuel Yedekleme
                        </Button>
                        <Button className="flex-1" variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Yedekten Geri Yükle
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button onClick={saveSettings}>
              Ayarları Kaydet
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 