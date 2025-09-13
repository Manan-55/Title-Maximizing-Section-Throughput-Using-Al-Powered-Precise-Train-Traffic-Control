import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, AlertCircle, X } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "Critical",
    title: "Signal Failure",
    message: "Signal S-142 not responding. Manual operation required.",
    time: "2 min ago",
    section: "A2"
  },
  {
    id: 2,
    type: "Warning",
    title: "Weather Alert",
    message: "Heavy fog expected. Reduce speed limits by 20%.",
    time: "15 min ago",
    section: "All"
  },
  {
    id: 3,
    type: "Info",
    title: "Maintenance Window",
    message: "Scheduled maintenance on A4 starting 16:00.",
    time: "1 hour ago",
    section: "A4"
  }
];

export const AlertsPanel = () => {
  return (
    <Card className="bg-gradient-surface border-border shadow-control">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-critical" />
            <span>System Alerts</span>
          </div>
          <Badge variant="outline" className="bg-critical/10 text-critical border-critical/20">
            {alerts.filter(a => a.type === "Critical").length} Critical
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border ${
              alert.type === "Critical"
                ? "border-critical/30 bg-critical/5"
                : alert.type === "Warning"
                ? "border-warning/30 bg-warning/5"
                : "border-border bg-card/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2 flex-1">
                {alert.type === "Critical" && <AlertTriangle className="h-4 w-4 text-critical mt-0.5" />}
                {alert.type === "Warning" && <AlertCircle className="h-4 w-4 text-warning mt-0.5" />}
                {alert.type === "Info" && <Info className="h-4 w-4 text-operational mt-0.5" />}
                
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{alert.title}</p>
                    <Badge
                      variant="outline"
                      className="text-xs bg-muted/20 text-muted-foreground border-muted/30"
                    >
                      {alert.section}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-border">
          <Button variant="outline" className="w-full" size="sm">
            View All Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};