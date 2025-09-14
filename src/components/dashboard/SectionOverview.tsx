import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";

const trackSections = [
  { id: "CSTM", name: "Chhatrapati Shivaji Terminus", status: "busy", occupancy: 4, capacity: 6, length: "2.1 km", signals: 12 },
  { id: "KYN", name: "Kalyan Junction", status: "operational", occupancy: 3, capacity: 5, length: "1.8 km", signals: 8 },
  { id: "TNA", name: "Thane Station", status: "busy", occupancy: 2, capacity: 3, length: "0.8 km", signals: 6 },
  { id: "BVI", name: "Borivali Yard", status: "operational", occupancy: 1, capacity: 3, length: "1.2 km", signals: 4 },
  { id: "ADH", name: "Andheri Complex", status: "busy", occupancy: 3, capacity: 3, length: "1.5 km", signals: 9 },
  { id: "PNVL", name: "Panvel Junction", status: "operational", occupancy: 2, capacity: 4, length: "2.3 km", signals: 7 },
  { id: "LTT", name: "Lokmanya Tilak Terminus", status: "operational", occupancy: 2, capacity: 4, length: "1.9 km", signals: 8 },
  { id: "VR", name: "Virar Terminal", status: "operational", occupancy: 1, capacity: 2, length: "0.9 km", signals: 3 },
  { id: "JNPT", name: "JNPT Freight Terminal", status: "maintenance", occupancy: 0, capacity: 2, length: "3.2 km", signals: 6 },
  { id: "IGP", name: "Igatpuri Ghat Section", status: "operational", occupancy: 1, capacity: 2, length: "4.1 km", signals: 5 },
  { id: "LNL", name: "Lonavala Junction", status: "operational", occupancy: 1, capacity: 3, length: "1.6 km", signals: 4 },
  { id: "PUNE", name: "Pune Junction", status: "busy", occupancy: 2, capacity: 3, length: "2.2 km", signals: 10 },
  { id: "BOR", name: "Boisar Section", status: "operational", occupancy: 1, capacity: 2, length: "1.4 km", signals: 3 },
  { id: "AMB", name: "Ambernath Junction", status: "operational", occupancy: 1, capacity: 2, length: "1.1 km", signals: 4 },
  { id: "BCT", name: "Mumbai Central", status: "busy", occupancy: 3, capacity: 4, length: "1.8 km", signals: 11 }
];

export const SectionOverview = () => {
  return (
    <Card className="bg-gradient-surface border-border shadow-control">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <MapPin className="h-5 w-5 text-operational" />
          <span>Section Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {trackSections.map((section) => (
            <div
              key={section.id}
              className="flex flex-col space-y-2 p-3 rounded-lg border border-border bg-muted/20"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm font-semibold text-foreground">
                  {section.id}
                </div>
                <Badge
                  variant="outline"
                  className={
                    section.status === "operational"
                      ? "bg-operational/10 text-operational border-operational/20 text-xs"
                      : section.status === "busy"
                      ? "bg-warning/10 text-warning border-warning/20 text-xs"
                      : "bg-muted/10 text-muted-foreground border-muted/20 text-xs"
                  }
                >
                  {section.status}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm font-medium text-foreground">{section.name}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>{section.occupancy}/{section.capacity} trains</span>
                  <span>{section.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{section.signals} signals</span>
                  <span>{Math.round((section.occupancy / section.capacity) * 100)}% util</span>
                </div>
              </div>
              
              <div className="flex space-x-1">
                {Array.from({ length: section.capacity }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded ${
                      i < section.occupancy
                        ? section.status === "operational"
                          ? "bg-operational"
                          : section.status === "busy"
                          ? "bg-warning"
                          : "bg-muted"
                        : "bg-muted/30 border border-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center space-x-2 text-sm">
            <ArrowRight className="h-4 w-4 text-operational" />
            <span className="text-foreground font-medium">Next Optimization:</span>
            <span className="text-muted-foreground">Platform reallocation in 3 minutes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};