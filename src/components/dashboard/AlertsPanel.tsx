import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, AlertCircle, X } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "Critical",
    title: "Platform Overcrowding",
    message: "CSTM Platform 1-3 at 140% capacity. Immediate crowd control needed.",
    time: "2 min ago",
    section: "CSTM",
    priority: "Urgent"
  },
  {
    id: 2,
    type: "Warning", 
    title: "Monsoon Impact",
    message: "Heavy rainfall affecting Thane-Kalyan section. Speed restrictions active.",
    time: "8 min ago",
    section: "TNA-KYN",
    priority: "High"
  },
  {
    id: 3,
    type: "Critical",
    title: "Signal Malfunction",
    message: "Automatic signaling failed at Andheri Junction. Manual control activated.",
    time: "5 min ago",
    section: "ADH",
    priority: "Urgent"
  },
  {
    id: 4,
    type: "Warning",
    title: "Power Supply Issue",
    message: "Reduced power supply on Western Line. Services may be delayed.",
    time: "12 min ago",
    section: "Western",
    priority: "High"
  },
  {
    id: 5,
    type: "Info",
    title: "JNPT Maintenance",
    message: "Scheduled maintenance at JNPT freight terminal from 16:00-18:00.",
    time: "1 hour ago",
    section: "JNPT",
    priority: "Medium"
  },
  {
    id: 6,
    type: "Warning",
    title: "Track Circuit Issue",
    message: "Intermittent track circuit failure detected between Borivali-Virar.",
    time: "18 min ago",
    section: "BVI-VR",
    priority: "High"
  },
  {
    id: 7,
    type: "Critical",
    title: "Overhead Wire Snag",
    message: "OHE wire entanglement near Lonavala. Single line working in effect.",
    time: "25 min ago",
    section: "LNL",
    priority: "Urgent"
  },
  {
    id: 8,
    type: "Info",
    title: "Additional Staff Deployed",
    message: "Extra crowd management staff deployed at Thane and Kalyan stations.",
    time: "30 min ago",
    section: "TNA-KYN",
    priority: "Low"
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