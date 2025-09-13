import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Train, Clock, MapPin, ArrowRight } from "lucide-react";

const trains = [
  {
    id: "12951",
    name: "Mumbai Rajdhani",
    type: "Express",
    priority: "High",
    status: "On Time",
    currentSection: "A1",
    nextSection: "A2",
    eta: "14:25",
    delay: 0
  },
  {
    id: "16340",
    name: "Chennai Express",
    type: "Express", 
    priority: "High",
    status: "Delayed",
    currentSection: "A3",
    nextSection: "A1",
    eta: "14:32",
    delay: 7
  },
  {
    id: "56478",
    name: "Local Passenger",
    type: "Local",
    priority: "Medium",
    status: "On Time",
    currentSection: "A2",
    nextSection: "A3",
    eta: "14:28",
    delay: 0
  },
  {
    id: "52184",
    name: "Goods Special",
    type: "Freight",
    priority: "Low",
    status: "Holding",
    currentSection: "A5",
    nextSection: "A4",
    eta: "15:15",
    delay: 0
  }
];

export const TrainStatusPanel = () => {
  return (
    <Card className="bg-gradient-surface border-border shadow-control">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center space-x-2">
            <Train className="h-5 w-5 text-operational" />
            <span>Active Trains</span>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trains.map((train) => (
            <div
              key={train.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="font-mono text-sm font-bold text-foreground">{train.id}</div>
                  <Badge
                    variant="outline"
                    className={
                      train.priority === "High"
                        ? "bg-critical/10 text-critical border-critical/20 text-xs"
                        : train.priority === "Medium"
                        ? "bg-warning/10 text-warning border-warning/20 text-xs"
                        : "bg-muted/10 text-muted-foreground border-muted/20 text-xs"
                    }
                  >
                    {train.priority}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{train.name}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{train.type}</span>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{train.currentSection}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span>{train.nextSection}</span>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm text-foreground">{train.eta}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={
                      train.status === "On Time"
                        ? "bg-success/10 text-success border-success/20"
                        : train.status === "Delayed"
                        ? "bg-critical/10 text-critical border-critical/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }
                  >
                    {train.status}
                    {train.delay > 0 && ` +${train.delay}m`}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};