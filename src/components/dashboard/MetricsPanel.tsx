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

export const MetricsPanel = () => {
  return (
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
  );
};