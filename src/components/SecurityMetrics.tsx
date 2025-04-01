
import { Activity, AlertTriangle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SecurityChart from './SecurityChart';

const metrics = [
  {
    title: "System Integrity",
    value: "98.2%",
    description: "Command validation rate",
    trend: "+2.1%",
    color: "text-green-500",
    icon: ShieldCheck
  },
  {
    title: "Anomaly Score",
    value: "0.15",
    description: "Last 24 hours",
    trend: "-0.05",
    color: "text-blue-500",
    icon: Activity
  },
  {
    title: "Threat Level",
    value: "Low",
    description: "Current status",
    trend: "Stable",
    color: "text-green-500",
    icon: AlertTriangle
  }
];

export const SecurityMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
              <div className={`flex items-center ${metric.color}`}>
                <span className="text-sm">{metric.trend}</span>
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
