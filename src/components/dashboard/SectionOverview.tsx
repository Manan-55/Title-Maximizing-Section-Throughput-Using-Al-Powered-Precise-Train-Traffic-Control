import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";

const trackSections = [
  { id: "A1", name: "Main Line North", status: "operational", occupancy: 2, capacity: 4 },
  { id: "A2", name: "Junction East", status: "busy", occupancy: 3, capacity: 3 },
  { id: "A3", name: "Platform 1-3", status: "operational", occupancy: 1, capacity: 3 },
  { id: "A4", name: "Goods Yard", status: "maintenance", occupancy: 0, capacity: 2 },
  { id: "A5", name: "Loop Line", status: "operational", occupancy: 1, capacity: 2 }
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
        <div className="grid grid-cols-2 gap-4">
          {trackSections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20"
            >
              <div className="flex items-center space-x-3">
                <div className="font-mono text-sm font-semibold text-foreground">
                  {section.id}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{section.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {section.occupancy}/{section.capacity} trains
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {Array.from({ length: section.capacity }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded ${
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
                <Badge
                  variant="outline"
                  className={
                    section.status === "operational"
                      ? "bg-operational/10 text-operational border-operational/20"
                      : section.status === "busy"
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-muted/10 text-muted-foreground border-muted/20"
                  }
                >
                  {section.status}
                </Badge>
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