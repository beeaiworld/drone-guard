import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import MetricCard from '@/components/MetricCard';
import SecurityPanel from '@/components/SecurityPanel';
import SystemSecurityPanel from '@/components/SystemSecurityPanel';
import DataProtectionPanel from '@/components/DataProtectionPanel';
import ThreatDetectionPanel from '@/components/ThreatDetectionPanel';
import SystemPerformanceCharts from '@/components/SystemPerformanceCharts';
import DroneActivityTimeline from '@/components/DroneActivityTimeline';
import SecurityEventsSummary from '@/components/SecurityEventsSummary';
import { SecurityMetrics } from '@/components/SecurityMetrics';
import { Shield, Activity, Battery, Signal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className="pl-64 pt-16 p-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Security Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Real-time monitoring and security metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="System Security"
              value="98%"
              icon={<Shield className="w-6 h-6 text-primary" />}
              trend={{ value: 2.5, isPositive: true }}
            />
            <MetricCard
              title="Active Drones"
              value="12"
              icon={<Activity className="w-6 h-6 text-primary" />}
            />
            <MetricCard
              title="Battery Status"
              value="85%"
              icon={<Battery className="w-6 h-6 text-primary" />}
              trend={{ value: 1.2, isPositive: true }}
            />
            <MetricCard
              title="Signal Strength"
              value="4.8"
              icon={<Signal className="w-6 h-6 text-primary" />}
            />
          </div>

          <div className="mb-8">
            <SecurityMetrics />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <SystemSecurityPanel />
            <DataProtectionPanel />
            <ThreatDetectionPanel />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <SystemPerformanceCharts />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <SecurityEventsSummary />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <DroneActivityTimeline />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
