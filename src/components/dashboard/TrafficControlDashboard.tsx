import { useState, useEffect } from "react";
import { NavigationBar } from "../navigation/NavigationBar";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsPanel } from "./MetricsPanel";
import { SectionOverview } from "./SectionOverview";
import { TrainStatusPanel } from "./TrainStatusPanel";
import { AIRecommendations } from "./AIRecommendations";
import { AlertsPanel } from "./AlertsPanel";
import { LiveCharts } from "./LiveCharts";
import { NetworkMap } from "./NetworkMap";

export const TrafficControlDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Top Metrics Row */}
        <MetricsPanel />
        
        {/* Charts and Visual Data */}
        <NetworkMap />

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5 space-y-6">
            <SectionOverview />
          </div>
          
          <div className="col-span-4 space-y-6">
            <LiveCharts />
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            <AIRecommendations />
            <AlertsPanel />
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1">
          <TrainStatusPanel />
        </div>
      </div>
    </div>
  );
};