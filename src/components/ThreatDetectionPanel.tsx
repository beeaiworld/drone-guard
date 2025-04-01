import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Navigation, Radar, CheckCircle, AlertCircle, XCircle, MapPin, Activity, Zap, Clock } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

// Status indicator component
const StatusIndicator = ({ status }: { status: 'secure' | 'warning' | 'critical' }) => {
  const statusConfig = {
    secure: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10', text: 'Secure' },
    warning: { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10', text: 'Warning' },
    critical: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', text: 'Critical' },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 ${config.color} rounded-md p-1`}>
      <Icon className="h-4 w-4" />
      <span className="text-xs font-medium">{config.text}</span>
    </div>
  );
};

// Metric item component
const MetricItem = ({ 
  title, 
  value, 
  status, 
  icon 
}: { 
  title: string; 
  value: string | number; 
  status: 'secure' | 'warning' | 'critical';
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between mb-4 last:mb-0">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">Value: {value}</p>
        </div>
      </div>
      <StatusIndicator status={status} />
    </div>
  );
};

// Generate anomaly data for chart
const generateAnomalyData = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const baseValue = 0.15;
    const noise = Math.random() * 0.1 - 0.05;
    const spike = i === 15 ? 0.4 : 0; // Simulate an anomaly spike
    return {
      time: `${i.toString().padStart(2, '0')}:00`,
      value: Math.max(0, Math.min(1, baseValue + noise + spike)),
    };
  });
};

// Threat Detection Panel component
const ThreatDetectionPanel = () => {
  // Anomaly detection metrics
  const anomalyDetectionMetrics = {
    title: "Anomali Tespiti",
    metrics: [
      { 
        title: "Anomali Skoru", 
        value: "0.18", 
        status: "warning" as const, 
        icon: <Activity className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Davranış Sapmaları", 
        value: "3", 
        status: "warning" as const, 
        icon: <AlertCircle className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Tespit Hassasiyeti", 
        value: "92.5%", 
        status: "secure" as const, 
        icon: <Radar className="h-4 w-4 text-primary" /> 
      }
    ]
  };

  // GPS status metrics
  const gpsStatusMetrics = {
    title: "GPS Durumu",
    metrics: [
      { 
        title: "Sinyal Doğruluğu", 
        value: "99.2%", 
        status: "secure" as const, 
        icon: <Navigation className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "GPS Sahteciliği", 
        value: "Tespit Edilmedi", 
        status: "secure" as const, 
        icon: <CheckCircle className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Konum Sapması", 
        value: "0.8m", 
        status: "secure" as const, 
        icon: <MapPin className="h-4 w-4 text-primary" /> 
      }
    ]
  };

  // Threat indicators metrics
  const threatIndicatorsMetrics = {
    title: "Tehdit Göstergeleri",
    metrics: [
      { 
        title: "Aktif Tehditler", 
        value: "1", 
        status: "warning" as const, 
        icon: <AlertTriangle className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Tehdit Seviyesi", 
        value: "Düşük", 
        status: "warning" as const, 
        icon: <Zap className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Son Tehdit Tespiti", 
        value: "15 dk önce", 
        status: "warning" as const, 
        icon: <Clock className="h-4 w-4 text-primary" /> 
      }
    ]
  };

  // Anomaly data for chart
  const anomalyData = generateAnomalyData();

  // Overall threat level
  const overallThreatLevel = 28;

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Threat Detection Panel</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <AlertTriangle className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Overall Threat Level</p>
            <Badge variant={overallThreatLevel > 60 ? "destructive" : overallThreatLevel > 30 ? "secondary" : "default"} className={overallThreatLevel < 30 ? "bg-green-500" : overallThreatLevel < 60 ? "bg-yellow-500" : ""}>
              {overallThreatLevel}%
            </Badge>
          </div>
          <Progress value={overallThreatLevel} className="h-2" />
        </div>

        {/* Anomaly Chart */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Anomali Aktivitesi (24 Saat)</h3>
          <div className="h-[120px] w-full">
            <ResponsiveContainer>
              <AreaChart data={anomalyData}>
                <defs>
                  <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ec4899"
                  fill="url(#anomalyGradient)"
                  strokeWidth={2}
                />
                <XAxis dataKey="time" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} domain={[0, 1]} />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {/* Anomaly Detection Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{anomalyDetectionMetrics.title}</h3>
            <div className="space-y-3">
              {anomalyDetectionMetrics.metrics.map((metric, index) => (
                <MetricItem 
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  status={metric.status}
                  icon={metric.icon}
                />
              ))}
            </div>
          </div>

          {/* GPS Status Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{gpsStatusMetrics.title}</h3>
            <div className="space-y-3">
              {gpsStatusMetrics.metrics.map((metric, index) => (
                <MetricItem 
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  status={metric.status}
                  icon={metric.icon}
                />
              ))}
            </div>
          </div>

          {/* Threat Indicators Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{threatIndicatorsMetrics.title}</h3>
            <div className="space-y-3">
              {threatIndicatorsMetrics.metrics.map((metric, index) => (
                <MetricItem 
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  status={metric.status}
                  icon={metric.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatDetectionPanel; 