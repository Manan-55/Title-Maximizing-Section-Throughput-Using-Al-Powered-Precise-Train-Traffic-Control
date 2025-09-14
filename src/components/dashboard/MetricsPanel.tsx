import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, Train, AlertTriangle } from "lucide-react";

const metrics = [
  {
    label: "Mumbai Network Load",
    value: "94.2%",
    change: "+5.1%",
    icon: TrendingUp,
    status: "warning" as const
  },
  {
    label: "Peak Hour Delay",
    value: "6.8 min",
    change: "+1.2 min",
    icon: Clock,
    status: "warning" as const
  },
  {
    label: "Active Trains",
    value: "847",
    change: "+23",
    icon: Train,
    status: "operational" as const
  },
  {
    label: "Signal Failures",
    value: "3",
    change: "+1",
    icon: AlertTriangle,
    status: "warning" as const
  }
];

const additionalMetrics = [
  {
    label: "CSTM Platform Load",
    value: "89.4%",
    change: "+8.2%",
    status: "warning" as const
  },
  {
    label: "Western Line Flow",
    value: "91.2%",
    change: "+4.5%",
    status: "operational" as const
  },
  {
    label: "Central Line Load",
    value: "96.8%",
    change: "+7.1%",
    status: "warning" as const
  },
  {
    label: "Harbour Line",
    value: "83.5%",
    change: "+2.8%",
    status: "operational" as const
  },
  {
    label: "Passenger Throughput",
    value: "7.2M",
    change: "+450K",
    status: "operational" as const
  },
  {
    label: "Freight Movement",
    value: "2.4K TEU",
    change: "+180",
    status: "success" as const
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
                    metric.status === 'operational' ? 'text-operational' :
                    metric.status === 'warning' ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {metric.change} from last hour
                  </p>
                </div>
                <metric.icon className={`h-8 w-8 ${
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