import { useState, useEffect } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsPanel } from "./MetricsPanel";
import { SectionOverview } from "./SectionOverview";
import { TrainStatusPanel } from "./TrainStatusPanel";
import { AIRecommendations } from "./AIRecommendations";
import { AlertsPanel } from "./AlertsPanel";

export const TrafficControlDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentTime={currentTime} />
      
      <div className="container mx-auto p-6 grid grid-cols-12 gap-6">
        {/* Top Metrics Row */}
        <div className="col-span-12">
          <MetricsPanel />
        </div>

        {/* Main Content Grid */}
        <div className="col-span-8 space-y-6">
          <SectionOverview />
          <TrainStatusPanel />
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-6">
          <AIRecommendations />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
};