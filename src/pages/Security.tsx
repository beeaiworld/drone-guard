import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  FileText, 
  Settings, 
  Search,
  Filter,
  BarChart4,
  Activity,
  ArrowUp,
  Info,
  ArrowDown
} from 'lucide-react';

const Security = () => {
  const [activeTab, setActiveTab] = useState("system-security");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className="pl-64 pt-16 p-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Güvenlik Yönetimi</h1>
            <p className="text-muted-foreground mt-1">
              Sistem güvenliği, politikalar ve tehdit analizi
            </p>
          </div>

          <Tabs defaultValue="system-security" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="system-security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Sistem Güvenliği</span>
              </TabsTrigger>
              <TabsTrigger value="security-policies" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Güvenlik Politikaları</span>
              </TabsTrigger>
              <TabsTrigger value="security-events" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Güvenlik Olayları</span>
              </TabsTrigger>
              <TabsTrigger value="threat-analysis" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Tehdit Analizi</span>
              </TabsTrigger>
            </TabsList>

            {/* Sistem Güvenliği Sekmesi */}
            <TabsContent value="system-security" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Komut Doğrulama Durumu */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Komut Doğrulama Durumu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">İmza Doğrulama</span>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Yetki Kontrolü</span>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Komut Sınırlaması</span>
                        <Badge className="bg-amber-100 text-amber-800">Kısmi</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Zaman Aşımı Kontrolü</span>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tekrar Koruması</span>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Davranış Analizi */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Davranış Analizi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Anomali Tespiti</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Hareket Analizi</span>
                          <span className="text-sm font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Komut Örüntüleri</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Operatör Davranışı</span>
                          <span className="text-sm font-medium">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Erişim Kontrolü */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Erişim Kontrolü
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Aktif Kullanıcılar</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Yönetici Hesapları</span>
                        <span className="font-medium">2</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Son Erişim Reddi</span>
                        <span className="text-sm text-muted-foreground">2 saat önce</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Başarısız Giriş Denemeleri</span>
                        <Badge className="bg-red-100 text-red-800">12</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">2FA Durumu</span>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Güvenlik Durumu Grafiği */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <BarChart4 className="h-5 w-5 text-primary" />
                    Güvenlik Durumu Zaman Çizelgesi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed rounded-md">
                    <div className="text-center">
                      <BarChart4 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Güvenlik Durumu Grafiği</h3>
                      <p className="text-muted-foreground mb-4 max-w-md">
                        Sistem güvenlik durumunun zaman içindeki değişimini gösteren grafik burada görüntülenecek.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Güvenlik Politikaları Sekmesi */}
            <TabsContent value="security-policies" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="lg:col-span-3">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Güvenlik Politikaları Yapılandırması
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Politikaları Dışa Aktar
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Politikaları İçe Aktar
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Değişiklikleri Kaydet
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Drone güvenlik sisteminin davranışını belirleyen politikaları yapılandırın. Değişiklikler, kaydedildikten sonra tüm drone filosuna uygulanacaktır.
                      </p>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <h3 className="font-medium">Politika Durumu</h3>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <h3 className="font-medium">Son Güncelleme</h3>
                        <span className="text-sm text-muted-foreground">12 Mart 2023, 14:32</span>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <h3 className="font-medium">Güncelleyen</h3>
                        <span className="text-sm text-muted-foreground">Admin Kullanıcı</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Erişim Kontrol Politikaları */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Erişim Kontrol Politikaları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="password-policy" className="text-sm font-medium">Şifre Politikası</label>
                          <select id="password-policy" className="text-sm p-1 border rounded">
                            <option value="high">Yüksek Güvenlik</option>
                            <option value="medium" selected>Orta Güvenlik</option>
                            <option value="low">Düşük Güvenlik</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Şifre karmaşıklığı ve yenileme gereksinimlerini belirler.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="session-timeout" className="text-sm font-medium">Oturum Zaman Aşımı</label>
                          <select id="session-timeout" className="text-sm p-1 border rounded">
                            <option value="15">15 dakika</option>
                            <option value="30" selected>30 dakika</option>
                            <option value="60">60 dakika</option>
                            <option value="120">2 saat</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Kullanıcı hareketsizliğinde oturumun sonlandırılma süresi.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="2fa-requirement" className="text-sm font-medium">2FA Zorunluluğu</label>
                          <div className="flex items-center">
                            <input type="checkbox" id="2fa-requirement" className="mr-2" checked />
                            <span className="text-sm">Aktif</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">Tüm kullanıcılar için iki faktörlü kimlik doğrulama zorunluluğu.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="login-attempts" className="text-sm font-medium">Maksimum Giriş Denemesi</label>
                          <select id="login-attempts" className="text-sm p-1 border rounded">
                            <option value="3">3 deneme</option>
                            <option value="5" selected>5 deneme</option>
                            <option value="10">10 deneme</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Hesap kilitlenmeden önce izin verilen başarısız giriş denemesi sayısı.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Drone Komut Politikaları */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Drone Komut Politikaları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="command-validation" className="text-sm font-medium">Komut Doğrulama</label>
                          <select id="command-validation" className="text-sm p-1 border rounded">
                            <option value="strict" selected>Sıkı</option>
                            <option value="normal">Normal</option>
                            <option value="relaxed">Esnek</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Drone komutlarının doğrulama seviyesini belirler.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="command-timeout" className="text-sm font-medium">Komut Zaman Aşımı</label>
                          <select id="command-timeout" className="text-sm p-1 border rounded">
                            <option value="5">5 saniye</option>
                            <option value="10" selected>10 saniye</option>
                            <option value="30">30 saniye</option>
                            <option value="60">60 saniye</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Komutların geçerlilik süresi.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="command-replay" className="text-sm font-medium">Komut Tekrar Koruması</label>
                          <div className="flex items-center">
                            <input type="checkbox" id="command-replay" className="mr-2" checked />
                            <span className="text-sm">Aktif</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">Aynı komutun tekrar kullanılmasını engeller.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="emergency-override" className="text-sm font-medium">Acil Durum Geçersiz Kılma</label>
                          <select id="emergency-override" className="text-sm p-1 border rounded">
                            <option value="admin">Sadece Yöneticiler</option>
                            <option value="operators" selected>Operatörler</option>
                            <option value="all">Tüm Kullanıcılar</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Acil durumlarda güvenlik politikalarını geçersiz kılabilecek kullanıcıları belirler.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Veri Güvenliği Politikaları */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Veri Güvenliği Politikaları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="data-encryption" className="text-sm font-medium">Veri Şifreleme</label>
                          <select id="data-encryption" className="text-sm p-1 border rounded">
                            <option value="aes256" selected>AES-256</option>
                            <option value="aes128">AES-128</option>
                            <option value="none">Şifreleme Yok</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Drone ve kontrol merkezi arasındaki veri iletişimi şifreleme standardı.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="data-retention" className="text-sm font-medium">Veri Saklama Süresi</label>
                          <select id="data-retention" className="text-sm p-1 border rounded">
                            <option value="30">30 gün</option>
                            <option value="90" selected>90 gün</option>
                            <option value="180">180 gün</option>
                            <option value="365">1 yıl</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Operasyonel verilerin saklanma süresi.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="data-backup" className="text-sm font-medium">Otomatik Yedekleme</label>
                          <select id="data-backup" className="text-sm p-1 border rounded">
                            <option value="daily" selected>Günlük</option>
                            <option value="weekly">Haftalık</option>
                            <option value="monthly">Aylık</option>
                            <option value="none">Yedekleme Yok</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">Sistem verilerinin otomatik yedeklenme sıklığı.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="data-anonymization" className="text-sm font-medium">Veri Anonimleştirme</label>
                          <div className="flex items-center">
                            <input type="checkbox" id="data-anonymization" className="mr-2" checked />
                            <span className="text-sm">Aktif</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">Hassas verilerin raporlarda ve analizlerde anonimleştirilmesi.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Tehdit Yanıt Politikaları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label htmlFor="anomaly-response" className="text-sm font-medium">Anomali Tespit Yanıtı</label>
                            <select id="anomaly-response" className="text-sm p-1 border rounded">
                              <option value="alert">Sadece Uyarı</option>
                              <option value="restrict" selected>Kısıtlama</option>
                              <option value="lockdown">Tam Kilitleme</option>
                            </select>
                          </div>
                          <p className="text-xs text-muted-foreground">Anomali tespitinde sistemin vereceği otomatik yanıt.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label htmlFor="gps-spoofing" className="text-sm font-medium">GPS Sahteciliği Yanıtı</label>
                            <select id="gps-spoofing" className="text-sm p-1 border rounded">
                              <option value="alert">Sadece Uyarı</option>
                              <option value="fallback" selected>Yedek Navigasyona Geç</option>
                              <option value="return">Üsse Dön</option>
                            </select>
                          </div>
                          <p className="text-xs text-muted-foreground">GPS sahteciliği tespit edildiğinde drone davranışı.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label htmlFor="signal-jamming" className="text-sm font-medium">Sinyal Karıştırma Yanıtı</label>
                            <select id="signal-jamming" className="text-sm p-1 border rounded">
                              <option value="alert">Sadece Uyarı</option>
                              <option value="frequency-hop">Frekans Atla</option>
                              <option value="return" selected>Üsse Dön</option>
                            </select>
                          </div>
                          <p className="text-xs text-muted-foreground">Sinyal karıştırma tespit edildiğinde drone davranışı.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label htmlFor="unauthorized-access" className="text-sm font-medium">Yetkisiz Erişim Yanıtı</label>
                            <select id="unauthorized-access" className="text-sm p-1 border rounded">
                              <option value="alert">Sadece Uyarı</option>
                              <option value="block" selected>Erişimi Engelle</option>
                              <option value="lockdown">Sistemi Kilitle</option>
                            </select>
                          </div>
                          <p className="text-xs text-muted-foreground">Yetkisiz erişim girişimlerinde sistem yanıtı.</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Otomatik Yanıt Eşikleri</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="anomaly-threshold" className="text-sm">Anomali Tespit Eşiği</label>
                            <div className="flex items-center">
                              <input 
                                type="range" 
                                id="anomaly-threshold" 
                                min="0" 
                                max="100" 
                                value="75" 
                                className="w-full mr-2"
                              />
                              <span className="text-sm">75%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Anomali tespiti için güven eşiği.</p>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="threat-threshold" className="text-sm">Tehdit Yanıt Eşiği</label>
                            <div className="flex items-center">
                              <input 
                                type="range" 
                                id="threat-threshold" 
                                min="0" 
                                max="100" 
                                value="85" 
                                className="w-full mr-2"
                              />
                              <span className="text-sm">85%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Otomatik tehdit yanıtı için güven eşiği.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">Varsayılanlara Sıfırla</Button>
                <Button variant="outline">İptal</Button>
                <Button>Değişiklikleri Kaydet</Button>
              </div>
            </TabsContent>

            {/* Güvenlik Olayları Sekmesi */}
            <TabsContent value="security-events" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Güvenlik Olayları Zaman Çizelgesi
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Olaylarda ara..." 
                        className="px-3 py-1 text-sm border rounded-md pr-8 w-48"
                      />
                      <Search className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    </div>
                    <select className="text-sm p-1 border rounded-md">
                      <option value="all">Tüm Olaylar</option>
                      <option value="critical">Kritik</option>
                      <option value="warning">Uyarı</option>
                      <option value="info">Bilgi</option>
                    </select>
                    <select className="text-sm p-1 border rounded-md">
                      <option value="today">Bugün</option>
                      <option value="week">Son 7 Gün</option>
                      <option value="month" selected>Son 30 Gün</option>
                      <option value="custom">Özel Aralık</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrele
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Zaman Çizelgesi */}
                    <div className="relative">
                      {/* Zaman Çizgisi */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                      
                      {/* Bugün */}
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 mr-3">
                            <span className="text-xs font-medium">15</span>
                          </div>
                          <h3 className="font-medium">Bugün</h3>
                        </div>
                        
                        <div className="ml-11 space-y-4">
                          {/* Olay 1 */}
                          <div className="p-3 rounded-lg border bg-red-50 border-red-200">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                                <h4 className="font-medium text-red-700">Yetkisiz Erişim Girişimi</h4>
                              </div>
                              <Badge className="bg-red-100 text-red-800">Kritik</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Drone kontrol sistemine yetkisiz erişim girişimi tespit edildi. IP: 192.168.1.45
                            </p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>15 Mart 2023, 14:32:15</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">Detaylar</Button>
                            </div>
                          </div>
                          
                          {/* Olay 2 */}
                          <div className="p-3 rounded-lg border bg-amber-50 border-amber-200">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                                <h4 className="font-medium text-amber-700">GPS Sinyal Anomalisi</h4>
                              </div>
                              <Badge className="bg-amber-100 text-amber-800">Uyarı</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              DRN-003 (Gamma-3) drone'unda GPS sinyal anomalisi tespit edildi. Yedek navigasyon sistemine geçildi.
                            </p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>15 Mart 2023, 10:17:42</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">Detaylar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dün */}
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 mr-3">
                            <span className="text-xs font-medium">14</span>
                          </div>
                          <h3 className="font-medium">Dün</h3>
                        </div>
                        
                        <div className="ml-11 space-y-4">
                          {/* Olay 3 */}
                          <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                <h4 className="font-medium text-blue-700">Sistem Güncellemesi</h4>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800">Bilgi</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Güvenlik politikaları güncellendi. Değişiklikler tüm drone filosuna uygulandı.
                            </p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>14 Mart 2023, 16:45:03</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">Detaylar</Button>
                            </div>
                          </div>
                          
                          {/* Olay 4 */}
                          <div className="p-3 rounded-lg border bg-amber-50 border-amber-200">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                                <h4 className="font-medium text-amber-700">Batarya Seviyesi Düşük</h4>
                              </div>
                              <Badge className="bg-amber-100 text-amber-800">Uyarı</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              DRN-005 (Epsilon-5) drone'u kritik batarya seviyesine ulaştı. Otomatik olarak üsse dönüş başlatıldı.
                            </p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>14 Mart 2023, 11:23:57</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">Detaylar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Önceki Günler */}
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 mr-3">
                            <span className="text-xs font-medium">13</span>
                          </div>
                          <h3 className="font-medium">13 Mart 2023</h3>
                        </div>
                        
                        <div className="ml-11 space-y-4">
                          {/* Olay 5 */}
                          <div className="p-3 rounded-lg border bg-red-50 border-red-200">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                                <h4 className="font-medium text-red-700">Sinyal Karıştırma Tespit Edildi</h4>
                              </div>
                              <Badge className="bg-red-100 text-red-800">Kritik</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Kuzey bölgesinde sinyal karıştırma tespit edildi. Etkilenen dronlar: DRN-001, DRN-004. Frekans değişikliği uygulandı.
                            </p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>13 Mart 2023, 09:12:38</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">Detaylar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sayfalama */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Toplam 27 olay gösteriliyor (1-5 arası)
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" disabled>Önceki</Button>
                        <Button variant="outline" size="sm" className="bg-primary/10">1</Button>
                        <Button variant="outline" size="sm">2</Button>
                        <Button variant="outline" size="sm">3</Button>
                        <Button variant="outline" size="sm">Sonraki</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tehdit Analizi Sekmesi */}
            <TabsContent value="threat-analysis" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Tehdit Özeti Kartı */}
                <Card className="lg:col-span-3">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Tehdit Analizi Özeti
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Tehdit raporlarında ara..." 
                          className="px-3 py-1 text-sm border rounded-md pr-8 w-48"
                        />
                        <Search className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <select className="text-sm p-1 border rounded-md">
                        <option value="all">Tüm Tehditler</option>
                        <option value="high">Yüksek Risk</option>
                        <option value="medium">Orta Risk</option>
                        <option value="low">Düşük Risk</option>
                      </select>
                      <select className="text-sm p-1 border rounded-md">
                        <option value="today">Bugün</option>
                        <option value="week">Son 7 Gün</option>
                        <option value="month" selected>Son 30 Gün</option>
                        <option value="custom">Özel Aralık</option>
                      </select>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Rapor Oluştur
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      {/* Toplam Tehdit Sayısı */}
                      <div className="bg-background border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Toplam Tehdit</p>
                            <h3 className="text-2xl font-semibold">47</h3>
                          </div>
                          <div className="p-2 bg-red-100 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          </div>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="text-red-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            12%
                          </span>
                          <span className="text-muted-foreground ml-2">son 7 günde</span>
                        </div>
                      </div>
                      
                      {/* Yüksek Riskli Tehditler */}
                      <div className="bg-background border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Yüksek Risk</p>
                            <h3 className="text-2xl font-semibold">8</h3>
                          </div>
                          <div className="p-2 bg-red-100 rounded-full">
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="text-red-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            25%
                          </span>
                          <span className="text-muted-foreground ml-2">son 7 günde</span>
                        </div>
                      </div>
                      
                      {/* Orta Riskli Tehditler */}
                      <div className="bg-background border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Orta Risk</p>
                            <h3 className="text-2xl font-semibold">24</h3>
                          </div>
                          <div className="p-2 bg-amber-100 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="text-amber-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            8%
                          </span>
                          <span className="text-muted-foreground ml-2">son 7 günde</span>
                        </div>
                      </div>
                      
                      {/* Düşük Riskli Tehditler */}
                      <div className="bg-background border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Düşük Risk</p>
                            <h3 className="text-2xl font-semibold">15</h3>
                          </div>
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Info className="h-5 w-5 text-blue-500" />
                          </div>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="text-green-500 flex items-center">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            5%
                          </span>
                          <span className="text-muted-foreground ml-2">son 7 günde</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tehdit Dağılımı Grafiği */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-4">Tehdit Türleri Dağılımı</h3>
                        <div className="h-64 flex items-center justify-center">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="relative w-48 h-48">
                              {/* Pasta Grafik Simülasyonu */}
                              <div className="absolute inset-0 rounded-full border-8 border-red-400" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}></div>
                              <div className="absolute inset-0 rounded-full border-8 border-amber-400" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 0 100%, 0 50%)' }}></div>
                              <div className="absolute inset-0 rounded-full border-8 border-blue-400" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}></div>
                              <div className="absolute inset-0 rounded-full border-8 border-green-400" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0)' }}></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-medium">47</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-400 rounded-sm mr-2"></div>
                            <span className="text-xs">GPS Sahteciliği (32%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-amber-400 rounded-sm mr-2"></div>
                            <span className="text-xs">Sinyal Karıştırma (28%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-400 rounded-sm mr-2"></div>
                            <span className="text-xs">Yetkisiz Erişim (25%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-400 rounded-sm mr-2"></div>
                            <span className="text-xs">Diğer (15%)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-4">Tehdit Trendi (Son 30 Gün)</h3>
                        <div className="h-64 flex items-center justify-center">
                          {/* Çizgi Grafik Simülasyonu */}
                          <div className="w-full h-full relative">
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
                            <div className="absolute top-0 bottom-0 left-0 w-px bg-border"></div>
                            
                            {/* Yüksek Risk Çizgisi */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 border-t border-red-400 bg-gradient-to-b from-red-100/50 to-transparent"></div>
                            
                            {/* Orta Risk Çizgisi */}
                            <div className="absolute bottom-0 left-0 right-0 h-24 border-t border-amber-400 bg-gradient-to-b from-amber-100/50 to-transparent"></div>
                            
                            {/* Düşük Risk Çizgisi */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-blue-400 bg-gradient-to-b from-blue-100/50 to-transparent"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-400 rounded-sm mr-2"></div>
                            <span className="text-xs">Yüksek Risk</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-amber-400 rounded-sm mr-2"></div>
                            <span className="text-xs">Orta Risk</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-400 rounded-sm mr-2"></div>
                            <span className="text-xs">Düşük Risk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Tehdit Raporları Tablosu */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Tehdit Analizi Raporları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">ID</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Tehdit Türü</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Risk Seviyesi</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Etkilenen Drone</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Tarih</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">Durum</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-2">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="hover:bg-muted/30">
                          <td className="p-2 text-sm">THR-001</td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                              <span className="text-sm">GPS Sahteciliği</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge className="bg-red-100 text-red-800">Yüksek</Badge>
                          </td>
                          <td className="p-2 text-sm">DRN-003 (Gamma-3)</td>
                          <td className="p-2 text-sm">15 Mart 2023, 10:17</td>
                          <td className="p-2">
                            <Badge className="bg-amber-100 text-amber-800">İnceleniyor</Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4 mr-1" />
                              Detaylar
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30">
                          <td className="p-2 text-sm">THR-002</td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                              <span className="text-sm">Sinyal Karıştırma</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge className="bg-amber-100 text-amber-800">Orta</Badge>
                          </td>
                          <td className="p-2 text-sm">DRN-001 (Alpha-1)</td>
                          <td className="p-2 text-sm">13 Mart 2023, 09:12</td>
                          <td className="p-2">
                            <Badge className="bg-green-100 text-green-800">Çözüldü</Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4 mr-1" />
                              Detaylar
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30">
                          <td className="p-2 text-sm">THR-003</td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                              <span className="text-sm">Yetkisiz Erişim</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge className="bg-red-100 text-red-800">Yüksek</Badge>
                          </td>
                          <td className="p-2 text-sm">Kontrol Merkezi</td>
                          <td className="p-2 text-sm">15 Mart 2023, 14:32</td>
                          <td className="p-2">
                            <Badge className="bg-red-100 text-red-800">Aktif Tehdit</Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4 mr-1" />
                              Detaylar
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30">
                          <td className="p-2 text-sm">THR-004</td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-blue-500 mr-2" />
                              <span className="text-sm">Batarya Anomalisi</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge className="bg-blue-100 text-blue-800">Düşük</Badge>
                          </td>
                          <td className="p-2 text-sm">DRN-005 (Epsilon-5)</td>
                          <td className="p-2 text-sm">14 Mart 2023, 11:23</td>
                          <td className="p-2">
                            <Badge className="bg-green-100 text-green-800">Çözüldü</Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4 mr-1" />
                              Detaylar
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30">
                          <td className="p-2 text-sm">THR-005</td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                              <span className="text-sm">Komut Doğrulama Hatası</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge className="bg-amber-100 text-amber-800">Orta</Badge>
                          </td>
                          <td className="p-2 text-sm">DRN-002 (Beta-2)</td>
                          <td className="p-2 text-sm">12 Mart 2023, 16:45</td>
                          <td className="p-2">
                            <Badge className="bg-amber-100 text-amber-800">İnceleniyor</Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4 mr-1" />
                              Detaylar
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Sayfalama */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">
                      Toplam 47 tehdit raporu (1-5 arası)
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" disabled>Önceki</Button>
                      <Button variant="outline" size="sm" className="bg-primary/10">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">Sonraki</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tehdit Detayları ve Önerilen Aksiyonlar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Önerilen Güvenlik Aksiyonları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">GPS Sahteciliği Önlemleri</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Son 7 günde GPS sahteciliği tehditleri %25 artış gösterdi. Aşağıdaki önlemleri almanız önerilir:
                          </p>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Tüm dronelarda GPS doğrulama protokollerini etkinleştirin</li>
                            <li>Yedek navigasyon sistemlerini test edin</li>
                            <li>Şüpheli GPS sinyalleri için alarm eşiklerini düşürün</li>
                            <li>Drone operatörlerine GPS sahteciliği konusunda eğitim verin</li>
                          </ul>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm" className="mr-2">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Uygulandı
                            </Button>
                            <Button size="sm">
                              <Shield className="h-4 w-4 mr-1" />
                              Şimdi Uygula
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Sinyal Karıştırma Önlemleri</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Kuzey bölgesinde sinyal karıştırma tehditleri tespit edildi. Aşağıdaki önlemleri almanız önerilir:
                          </p>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Frekans atlamalı iletişim protokollerini etkinleştirin</li>
                            <li>Sinyal gücü eşiklerini ayarlayın</li>
                            <li>Etkilenen bölgede drone operasyonlarını sınırlayın</li>
                            <li>Alternatif iletişim kanallarını test edin</li>
                          </ul>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm" className="mr-2">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Uygulandı
                            </Button>
                            <Button size="sm">
                              <Shield className="h-4 w-4 mr-1" />
                              Şimdi Uygula
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Info className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Genel Güvenlik Tavsiyeleri</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Sistem güvenliğini artırmak için aşağıdaki genel önlemleri düzenli olarak uygulayın:
                          </p>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Tüm drone yazılımlarını güncel tutun</li>
                            <li>Güvenlik politikalarını düzenli olarak gözden geçirin</li>
                            <li>Operatör eğitimlerini periyodik olarak tekrarlayın</li>
                            <li>Güvenlik testlerini aylık olarak gerçekleştirin</li>
                            <li>Olay müdahale planlarını güncelleyin ve test edin</li>
                          </ul>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              Detaylı Kılavuz
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Security; 