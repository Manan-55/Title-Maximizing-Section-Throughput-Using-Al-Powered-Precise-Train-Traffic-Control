import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, XCircle, Clock } from "lucide-react";

const recommendations = [
  {
    id: 1,
    type: "Priority Optimization",
    action: "Route 12951 via A1→A3 to avoid congestion",
    confidence: 94,
    impact: "Reduce delay by 3-5 minutes",
    urgency: "high"
  },
  {
    id: 2,
    type: "Platform Allocation",
    action: "Move 56478 to Platform 2 for faster departure",
    confidence: 87,
    impact: "Improve throughput by 8%",
    urgency: "medium"
  },
  {
    id: 3,
    type: "Holding Strategy",
    action: "Hold 52184 in A5 until 15:20",
    confidence: 91,
    impact: "Clear path for express services",
    urgency: "low"
  }
];

export const AIRecommendations = () => {
  return (
    <Card className="bg-gradient-surface border-border shadow-control">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Brain className="h-5 w-5 text-operational" />
          <span>AI Recommendations</span>
          <Badge variant="outline" className="bg-operational/10 text-operational border-operational/20 ml-auto">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-lg border border-border bg-card/30 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={
                  rec.urgency === "high"
                    ? "bg-critical/10 text-critical border-critical/20"
                    : rec.urgency === "medium"
                    ? "bg-warning/10 text-warning border-warning/20"
                    : "bg-success/10 text-success border-success/20"
                }
              >
                {rec.type}
              </Badge>
              <div className="text-xs text-muted-foreground">
                {rec.confidence}% confidence
              </div>
            </div>

            <p className="text-sm text-foreground font-medium">{rec.action}</p>
            
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{rec.impact}</span>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-success/10 text-success border-success/20 hover:bg-success/20 flex-1"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Apply
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-muted/10 text-muted-foreground border-muted/20 hover:bg-muted/20 flex-1"
              >
                <XCircle className="h-3 w-3 mr-1" />
                Dismiss
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-border">
          <Button variant="outline" className="w-full" size="sm">
            View Scenario Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};