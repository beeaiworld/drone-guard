
import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { time: '00:00', value: 85 },
  { time: '04:00', value: 88 },
  { time: '08:00', value: 92 },
  { time: '12:00', value: 98 },
  { time: '16:00', value: 95 },
  { time: '20:00', value: 90 },
  { time: '24:00', value: 87 },
];

const config = {
  area: {
    theme: {
      light: '#3b82f6',
      dark: '#60a5fa',
    },
  },
};

const SecurityChart = () => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={config.area.theme.light} stopOpacity={0.2} />
              <stop offset="100%" stopColor={config.area.theme.light} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={config.area.theme.light}
            fill="url(#gradient)"
            strokeWidth={2}
          />
          <XAxis dataKey="time" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecurityChart;
