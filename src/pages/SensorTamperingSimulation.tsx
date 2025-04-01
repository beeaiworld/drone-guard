import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity,
  AlertTriangle, 
  Shield, 
  Thermometer,
  Waves,
  Zap,
  Eye,
  Battery,
  Radio
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  sensorType: 'TEMPERATURE' | 'HUMIDITY' | 'MOTION' | 'VOLTAGE' | 'SIGNAL';
  tamperType: 'INJECTION' | 'JAMMING' | 'DRIFT' | 'PHYSICAL';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

const SensorTamperingSimulation = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [detectionRate, setDetectionRate] = useState(0);
  const [sensorData, setSensorData] = useState<any[]>([]);

  // Örnek senaryolar
  const scenarios: SimulationScenario[] = [
    {
      id: 'temp_drift',
      name: 'Sıcaklık Sensörü Sapması',
      description: 'Kademeli sıcaklık sensörü kalibrasyonu sapması simülasyonu',
      sensorType: 'TEMPERATURE',
      tamperType: 'DRIFT',
      severity: 'MEDIUM'
    },
    {
      id: 'motion_inject',
      name: 'Hareket Sensörü Manipülasyonu',
      description: 'Sahte hareket verisi enjeksiyonu simülasyonu',
      sensorType: 'MOTION',
      tamperType: 'INJECTION',
      severity: 'HIGH'
    },
    {
      id: 'signal_jam',
      name: 'Sinyal Karıştırma',
      description: 'RF sinyal karıştırma simülasyonu',
      sensorType: 'SIGNAL',
      tamperType: 'JAMMING',
      severity: 'HIGH'
    }
  ];

  const startSimulation = () => {
    if (!activeScenario) return;
    setIsSimulating(true);
    // Simülasyon başlatma mantığı
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    // Simülasyon durdurma mantığı
  };

  return (
    <div className="p-6">
      {/* Başlık ve Durum */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sensör Kurcalama Simülasyonu</h1>
          <p className="text-muted-foreground">
            Sensör güvenliği testleri ve tehdit simülasyonu
          </p>
        </div>
        <Badge 
          variant={isSimulating ? "destructive" : "default"}
          className="text-lg"
        >
          {isSimulating ? "Simülasyon Aktif" : "Hazır"}
        </Badge>
      </div>

      {/* Senaryo Seçimi */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Senaryo Seçimi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select
              value={activeScenario?.id}
              onValueChange={(value) => 
                setActiveScenario(scenarios.find(s => s.id === value) || null)
              }
            >
              <option value="">Senaryo Seçin</option>
              {scenarios.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </Select>

            {activeScenario && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Senaryo Detayları</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {activeScenario.description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium">Sensör Tipi:</span>
                    <Badge className="ml-2">{activeScenario.sensorType}</Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Kurcalama Tipi:</span>
                    <Badge className="ml-2">{activeScenario.tamperType}</Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Şiddet:</span>
                    <Badge 
                      variant={
                        activeScenario.severity === 'HIGH' ? 'destructive' :
                        activeScenario.severity === 'MEDIUM' ? 'secondary' : 
                        'default'
                      }
                      className="ml-2"
                    >
                      {activeScenario.severity}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={stopSimulation}
                disabled={!isSimulating}
              >
                Durdur
              </Button>
              <Button
                onClick={startSimulation}
                disabled={!activeScenario || isSimulating}
              >
                Simülasyonu Başlat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simülasyon İzleme */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sensör Verileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Sensör Verileri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="realtime">
              <TabsList>
                <TabsTrigger value="realtime">Gerçek Zamanlı</TabsTrigger>
                <TabsTrigger value="analysis">Analiz</TabsTrigger>
              </TabsList>
              <TabsContent value="realtime">
                <div className="h-[300px] border rounded-lg p-4">
                  {/* Gerçek zamanlı veri grafiği */}
                </div>
              </TabsContent>
              <TabsContent value="analysis">
                <div className="h-[300px] border rounded-lg p-4">
                  {/* Analiz grafiği */}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tespit Durumu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Tespit Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert variant={detectionRate > 80 ? 'default' : 'destructive'}>
                <AlertTitle>Tespit Oranı</AlertTitle>
                <AlertDescription>
                  <div className="mt-2">
                    <Progress value={detectionRate} className="h-2" />
                    <div className="flex justify-between mt-1 text-sm">
                      <span>{detectionRate}% Başarı</span>
                      <span>{100 - detectionRate}% Kaçırma</span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Tepki Süresi</div>
                  <div className="text-2xl font-bold">245ms</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Yanlış Alarm</div>
                  <div className="text-2xl font-bold">2%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Güvenlik Önerileri */}
        <Card>
          <CardHeader>
            <CardTitle>Güvenlik Önerileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertTitle>Kalibrasyon Kontrolü</AlertTitle>
                <AlertDescription>
                  Düzenli kalibrasyon kontrolleri yapılmalı
                </AlertDescription>
              </Alert>
              <Alert>
                <Shield className="w-4 h-4" />
                <AlertTitle>Fiziksel Güvenlik</AlertTitle>
                <AlertDescription>
                  Sensör erişim kontrolü güçlendirilmeli
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Sistem Sağlığı */}
        <Card>
          <CardHeader>
            <CardTitle>Sistem Sağlığı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Sinyal Gücü
                </span>
                <Badge variant="default">98%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  Batarya Durumu
                </span>
                <Badge variant="secondary">75%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  İşlemci Yükü
                </span>
                <Badge>45%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorTamperingSimulation; 