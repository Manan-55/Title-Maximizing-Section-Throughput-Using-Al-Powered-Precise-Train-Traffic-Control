import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, Train, AlertTriangle } from "lucide-react";

const metrics = [
  {
    label: "Section Throughput",
    value: "87.5%",
    change: "+2.3%",
    icon: TrendingUp,
    status: "operational" as const
  },
  {
    label: "Avg Delay",
    value: "4.2 min",
    change: "-0.8 min",
    icon: Clock,
    status: "success" as const
  },
  {
    label: "Active Trains",
    value: "23",
    change: "+3",
    icon: Train,
    status: "operational" as const
  },
  {
    label: "Critical Alerts",
    value: "2",
    change: "0",
    icon: AlertTriangle,
    status: "warning" as const
  }
];

const additionalMetrics = [
  {
    label: "Platform Utilization",
    value: "76.8%",
    change: "+4.1%",
    status: "operational" as const
  },
  {
    label: "Signal Response Time",
    value: "0.8s",
    change: "-0.2s",
    status: "success" as const
  },
  {
    label: "Track Occupancy",
    value: "12/18",
    change: "+2",
    status: "operational" as const
  },
  {
    label: "Energy Efficiency",
    value: "92.3%",
    change: "+1.5%",
    status: "success" as const
  },
  {
    label: "Schedule Adherence",
    value: "94.7%",
    change: "+3.2%",
    status: "success" as const
  },
  {
    label: "Peak Hour Load",
    value: "156%",
    change: "+12%",
    status: "warning" as const
  }
];

export const MetricsPanel = () => {
  const allMetrics = [...metrics, ...additionalMetrics];
  
  return (
    <div className="space-y-4">
      {/* Primary Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="bg-gradient-surface border-border shadow-control">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className={`text-xs ${
                    metric.status === 'success' ? 'text-success' :
                    metric.status === 'operational' ? 'text-operational' :
                    metric.status === 'warning' ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {metric.change} from last hour
                  </p>
                </div>
                <metric.icon className={`h-8 w-8 ${
                  metric.status === 'success' ? 'text-success' :
                  metric.status === 'operational' ? 'text-operational' :
                  metric.status === 'warning' ? 'text-warning' : 'text-muted-foreground'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-6 gap-3">
        {additionalMetrics.map((metric) => (
          <Card key={metric.label} className="bg-gradient-surface border-border shadow-control">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-lg font-bold text-foreground">{metric.value}</p>
                <p className={`text-xs ${
                  metric.status === 'success' ? 'text-success' :
                  metric.status === 'operational' ? 'text-operational' :
                  metric.status === 'warning' ? 'text-warning' : 'text-muted-foreground'
                }`}>
                  {metric.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};