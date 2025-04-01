import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, FileText, Eye, CheckCircle, AlertCircle, XCircle, FileCheck, Clock } from 'lucide-react';
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

// Audit log item component
const AuditLogItem = ({ 
  action, 
  timestamp, 
  user, 
  status 
}: { 
  action: string; 
  timestamp: string; 
  user: string; 
  status: 'secure' | 'warning' | 'critical';
}) => {
  return (
    <div className="flex items-center justify-between p-2 border-b last:border-0">
      <div>
        <p className="text-sm font-medium">{action}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{timestamp}</span>
          <span>•</span>
          <span>{user}</span>
        </div>
      </div>
      <StatusIndicator status={status} />
    </div>
  );
};

// Data Protection Panel component
const DataProtectionPanel = () => {
  // Data classification metrics
  const dataClassificationMetrics = {
    title: "Veri Sınıflandırma",
    metrics: [
      { 
        title: "Sınıflandırılmış Veri", 
        value: "95.3%", 
        status: "secure" as const, 
        icon: <FileText className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Hassas Veri Oranı", 
        value: "32.7%", 
        status: "secure" as const, 
        icon: <FileText className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Sınıflandırılmamış Veri", 
        value: "4.7%", 
        status: "warning" as const, 
        icon: <AlertCircle className="h-4 w-4 text-primary" /> 
      }
    ]
  };

  // Privacy filters metrics
  const privacyFiltersMetrics = {
    title: "Gizlilik Filtreleri",
    metrics: [
      { 
        title: "Aktif Filtreler", 
        value: "8/8", 
        status: "secure" as const, 
        icon: <Eye className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Filtrelenen Veri Akışı", 
        value: "100%", 
        status: "secure" as const, 
        icon: <CheckCircle className="h-4 w-4 text-primary" /> 
      },
      { 
        title: "Gizlilik İhlalleri", 
        value: "0", 
        status: "secure" as const, 
        icon: <CheckCircle className="h-4 w-4 text-primary" /> 
      }
    ]
  };

  // Audit log entries
  const auditLogEntries = [
    {
      action: "Veri Şifreleme Kontrolü",
      timestamp: "10:45:23",
      user: "System",
      status: "secure" as const
    },
    {
      action: "Hassas Veri Erişimi",
      timestamp: "09:32:17",
      user: "admin@droneops.com",
      status: "secure" as const
    },
    {
      action: "Gizlilik Filtresi Güncellemesi",
      timestamp: "08:15:42",
      user: "security@droneops.com",
      status: "secure" as const
    },
    {
      action: "Sınıflandırılmamış Veri Tespiti",
      timestamp: "07:22:05",
      user: "System",
      status: "warning" as const
    }
  ];

  // Overall data protection score
  const overallProtectionScore = 97;

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Data Protection Panel</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lock className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Overall Protection Score</p>
            <Badge variant={overallProtectionScore > 90 ? "default" : overallProtectionScore > 70 ? "secondary" : "destructive"} className={overallProtectionScore > 90 ? "bg-green-500" : overallProtectionScore > 70 ? "bg-yellow-500" : ""}>
              {overallProtectionScore}%
            </Badge>
          </div>
          <Progress value={overallProtectionScore} className="h-2" />
        </div>

        <div className="space-y-6">
          {/* Data Classification Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{dataClassificationMetrics.title}</h3>
            <div className="space-y-3">
              {dataClassificationMetrics.metrics.map((metric, index) => (
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

          {/* Privacy Filters Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{privacyFiltersMetrics.title}</h3>
            <div className="space-y-3">
              {privacyFiltersMetrics.metrics.map((metric, index) => (
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

          {/* Audit Log Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Denetim Günlüğü</h3>
            <div className="border rounded-md overflow-hidden">
              {auditLogEntries.map((entry, index) => (
                <AuditLogItem 
                  key={index}
                  action={entry.action}
                  timestamp={entry.timestamp}
                  user={entry.user}
                  status={entry.status}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataProtectionPanel; 