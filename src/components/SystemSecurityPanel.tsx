import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, Lock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

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

// System Security Panel component
const SystemSecurityPanel = () => {
  // Command validation metrics
  const commandValidationMetrics = {
    title: "Komut Doğrulama Durumu",
    metrics: [
      { 
        title: "Doğrulama Oranı", 
        value: "98.2%", 
        status: "secure" as const, 
        icon: <CheckCircle className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Reddedilen Komutlar", 
        value: "12", 
        status: "warning" as const, 
        icon: <AlertCircle className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Şüpheli Komutlar", 
        value: "3", 
        status: "warning" as const, 
        icon: <AlertCircle className="h-4 w-4 text-primary" /> 
      }
    ]
  };

  // Behavior analysis metrics
  const behaviorAnalysisMetrics = {
    title: "Davranış Analizi",
    metrics: [
      { 
        title: "Normal Davranış", 
        value: "95.7%", 
        status: "secure" as const, 
        icon: <Activity className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Anomali Skoru", 
        value: "0.15", 
        status: "secure" as const, 
        icon: <Activity className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Şüpheli Aktiviteler", 
        value: "7", 
        status: "warning" as const, 
        icon: <AlertCircle className="h-4 w-4 text-primary" /> 
      }
    ]
  };

  // Access control metrics
  const accessControlMetrics = {
    title: "Erişim Kontrolü",
    metrics: [
      { 
        title: "Yetkilendirme Durumu", 
        value: "Aktif", 
        status: "secure" as const, 
        icon: <Lock className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Başarısız Giriş Denemeleri", 
        value: "5", 
        status: "warning" as const, 
        icon: <AlertCircle className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Erişim İhlalleri", 
        value: "0", 
        status: "secure" as const, 
        icon: <CheckCircle className="h-4 w-4 text-primary" /> 
      }
    ]
  };

  // Overall security score
  const overallSecurityScore = 92;

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">System Security Panel</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Shield className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Overall Security Score</p>
            <Badge variant={overallSecurityScore > 90 ? "default" : overallSecurityScore > 70 ? "secondary" : "destructive"} className={overallSecurityScore > 90 ? "bg-green-500" : overallSecurityScore > 70 ? "bg-yellow-500" : ""}>
              {overallSecurityScore}%
            </Badge>
          </div>
          <Progress value={overallSecurityScore} className="h-2" />
        </div>

        <div className="space-y-6">
          {/* Command Validation Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{commandValidationMetrics.title}</h3>
            <div className="space-y-3">
              {commandValidationMetrics.metrics.map((metric, index) => (
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

          {/* Behavior Analysis Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{behaviorAnalysisMetrics.title}</h3>
            <div className="space-y-3">
              {behaviorAnalysisMetrics.metrics.map((metric, index) => (
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

          {/* Access Control Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{accessControlMetrics.title}</h3>
            <div className="space-y-3">
              {accessControlMetrics.metrics.map((metric, index) => (
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

export default SystemSecurityPanel; 