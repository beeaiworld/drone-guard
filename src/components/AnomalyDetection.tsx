
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

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

const AnomalyDetection = () => {
  const [data] = useState(generateAnomalyData());

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Anomaly Detection</CardTitle>
          <p className="text-sm text-muted-foreground">Real-time behavioral analysis</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Activity className="w-5 h-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer>
            <AreaChart data={data}>
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
      </CardContent>
    </Card>
  );
};

export default AnomalyDetection;
