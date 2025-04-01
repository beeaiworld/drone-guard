import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Database, Activity, Battery, Wifi, Server } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

// Generate CPU usage data
const generateCpuData = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const baseValue = 40;
    const noise = Math.random() * 30;
    const spike = i >= 9 && i <= 12 ? 20 : 0; // Simulate high usage during peak hours
    return {
      time: `${i.toString().padStart(2, '0')}:00`,
      usage: Math.min(100, Math.max(0, baseValue + noise + spike)),
    };
  });
};

// Generate memory usage data
const generateMemoryData = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const baseValue = 50;
    const noise = Math.random() * 20;
    const spike = i >= 9 && i <= 12 ? 15 : 0; // Simulate high usage during peak hours
    return {
      time: `${i.toString().padStart(2, '0')}:00`,
      usage: Math.min(100, Math.max(0, baseValue + noise + spike)),
    };
  });
};

// Generate network traffic data
const generateNetworkData = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const baseIncoming = 20 + (Math.random() * 10);
    const baseOutgoing = 15 + (Math.random() * 8);
    const spike = i >= 9 && i <= 12 ? 25 : 0; // Simulate high traffic during peak hours
    return {
      time: `${i.toString().padStart(2, '0')}:00`,
      incoming: Math.max(0, baseIncoming + (spike / 2) + (Math.random() * 5)),
      outgoing: Math.max(0, baseOutgoing + (spike / 3) + (Math.random() * 4)),
    };
  });
};

// Generate battery status data
const generateBatteryData = () => {
  return Array.from({ length: 12 }, (_, i) => {
    return {
      drone: `Drone ${i + 1}`,
      level: Math.max(10, Math.min(100, 85 - (Math.random() * i * 5))),
      status: i < 9 ? 'normal' : i === 9 ? 'warning' : 'critical',
    };
  });
};

// Generate system health data
const generateSystemHealthData = () => {
  return [
    { name: 'CPU', value: 42 },
    { name: 'Memory', value: 65 },
    { name: 'Disk', value: 38 },
    { name: 'Network', value: 27 },
    { name: 'Sensors', value: 18 },
  ];
};

// Get color based on status
const getStatusColor = (status: string) => {
  return status === 'normal' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444';
};

// Get color based on value
const getValueColor = (value: number) => {
  return value < 30 ? '#10b981' : value < 70 ? '#f59e0b' : '#ef4444';
};

// System Performance Charts component
const SystemPerformanceCharts = () => {
  const cpuData = generateCpuData();
  const memoryData = generateMemoryData();
  const networkData = generateNetworkData();
  const batteryData = generateBatteryData();
  const systemHealthData = generateSystemHealthData();

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Server className="h-5 w-5" />
          Sistem Performans Grafikleri
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cpu" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="cpu" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span className="hidden sm:inline">CPU Kullanımı</span>
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Bellek Kullanımı</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              <span className="hidden sm:inline">Ağ Trafiği</span>
            </TabsTrigger>
            <TabsTrigger value="battery" className="flex items-center gap-2">
              <Battery className="h-4 w-4" />
              <span className="hidden sm:inline">Batarya Durumu</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Sistem Sağlığı</span>
            </TabsTrigger>
          </TabsList>

          {/* CPU Usage Tab */}
          <TabsContent value="cpu" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">CPU Kullanımı (24 Saat)</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Ortalama:</span>
                <span>{Math.round(cpuData.reduce((acc, item) => acc + item.usage, 0) / cpuData.length)}%</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <AreaChart data={cpuData}>
                  <defs>
                    <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="usage" 
                    name="CPU Kullanımı (%)" 
                    stroke="#3b82f6" 
                    fill="url(#cpuGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* Memory Usage Tab */}
          <TabsContent value="memory" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Bellek Kullanımı (24 Saat)</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Ortalama:</span>
                <span>{Math.round(memoryData.reduce((acc, item) => acc + item.usage, 0) / memoryData.length)}%</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <AreaChart data={memoryData}>
                  <defs>
                    <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="usage" 
                    name="Bellek Kullanımı (%)" 
                    stroke="#8b5cf6" 
                    fill="url(#memoryGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* Network Traffic Tab */}
          <TabsContent value="network" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Ağ Trafiği (24 Saat)</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Toplam:</span>
                <span>
                  {Math.round(networkData.reduce((acc, item) => acc + item.incoming + item.outgoing, 0))} MB
                </span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={networkData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="incoming" 
                    name="Gelen Trafik (MB/s)" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="outgoing" 
                    name="Giden Trafik (MB/s)" 
                    stroke="#f43f5e" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* Battery Status Tab */}
          <TabsContent value="battery" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Drone Batarya Durumları</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Ortalama:</span>
                <span>
                  {Math.round(batteryData.reduce((acc, item) => acc + item.level, 0) / batteryData.length)}%
                </span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={batteryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="drone" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="level" 
                    name="Batarya Seviyesi (%)" 
                    radius={[4, 4, 0, 0]}
                  >
                    {batteryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="health" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Sistem Sağlığı Metrikleri</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Genel Durum:</span>
                <span className="text-green-500 font-medium">İyi</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={systemHealthData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Yük Seviyesi (%)" 
                    radius={[0, 4, 4, 0]}
                  >
                    {systemHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getValueColor(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SystemPerformanceCharts; 