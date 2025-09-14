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
    currentSection: "CSTM",
    nextSection: "KYN",
    eta: "14:25",
    delay: 0,
    speed: "110 km/h",
    passengers: 1200,
    route: "Mumbai CSTM - New Delhi"
  },
  {
    id: "12123",
    name: "Deccan Queen",
    type: "Express", 
    priority: "High",
    status: "On Time",
    currentSection: "PUNE",
    nextSection: "LNL",
    eta: "14:32",
    delay: 0,
    speed: "95 km/h",
    passengers: 850,
    route: "Mumbai CSTM - Pune Jn"
  },
  {
    id: "95001",
    name: "Andheri Local",
    type: "Local",
    priority: "Medium",
    status: "Delayed",
    currentSection: "BVI",
    nextSection: "ADH",
    eta: "14:28",
    delay: 3,
    speed: "65 km/h",
    passengers: 1800,
    route: "Churchgate - Andheri"
  },
  {
    id: "95203",
    name: "Virar Fast",
    type: "Local",
    priority: "High",
    status: "On Time",
    currentSection: "BOR",
    nextSection: "VR",
    eta: "14:35",
    delay: 0,
    speed: "80 km/h",
    passengers: 2100,
    route: "Mumbai Central - Virar"
  },
  {
    id: "95401",
    name: "Panvel Local",
    type: "Local",
    priority: "Medium",
    status: "Early",
    currentSection: "TNA",
    nextSection: "PNVL",
    eta: "14:26",
    delay: -2,
    speed: "70 km/h",
    passengers: 1950,
    route: "CSTM - Panvel"
  },
  {
    id: "12133",
    name: "Mumbai Express",
    type: "Express",
    priority: "High",
    status: "Delayed",
    currentSection: "KYN",
    nextSection: "IGP",
    eta: "14:45",
    delay: 12,
    speed: "60 km/h",
    passengers: 720,
    route: "Mumbai CSTM - Mangalore"
  },
  {
    id: "95601",
    name: "Thane Local",
    type: "Local",
    priority: "Medium",
    status: "On Time",
    currentSection: "KYN",
    nextSection: "TNA",
    eta: "14:30",
    delay: 0,
    speed: "75 km/h",
    passengers: 1650,
    route: "CSTM - Thane"
  },
  {
    id: "52101",
    name: "JNPT Freight",
    type: "Freight",
    priority: "Low",
    status: "Holding",
    currentSection: "JNPT",
    nextSection: "PNVL",
    eta: "15:30",
    delay: 0,
    speed: "0 km/h",
    passengers: 0,
    route: "JNPT - Kalamboli"
  },
  {
    id: "95801",
    name: "Badlapur Local",
    type: "Local",
    priority: "Medium",
    status: "On Time",
    currentSection: "KYN",
    nextSection: "AMB",
    eta: "14:40",
    delay: 0,
    speed: "68 km/h",
    passengers: 1580,
    route: "CSTM - Badlapur"
  },
  {
    id: "16345",
    name: "Netravati Express",
    type: "Express",
    priority: "High",
    status: "On Time",
    currentSection: "LTT",
    nextSection: "TNA",
    eta: "14:55",
    delay: 0,
    speed: "105 km/h",
    passengers: 980,
    route: "LTT - Mangalore"
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
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{train.speed}</span>
                    <span>•</span>
                    {train.passengers > 0 && <span>{train.passengers} pax</span>}
                    {train.passengers === 0 && <span>Freight</span>}
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