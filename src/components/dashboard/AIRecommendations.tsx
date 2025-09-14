import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Brain, CheckCircle, XCircle, Clock, Info } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const recommendations = [
  {
    id: 1,
    type: "Priority Optimization",
    action: "Route 12951 via A1→A3 to avoid congestion",
    confidence: 94,
    impact: "Reduce delay by 3-5 minutes",
    urgency: "high",
    timeToImplement: "2 min"
  },
  {
    id: 2,
    type: "Platform Allocation",
    action: "Move 56478 to Platform 2 for faster departure",
    confidence: 87,
    impact: "Improve throughput by 8%",
    urgency: "medium",
    timeToImplement: "5 min"
  },
  {
    id: 3,
    type: "Holding Strategy",
    action: "Hold 52184 in A5 until 15:20",
    confidence: 91,
    impact: "Clear path for express services",
    urgency: "low",
    timeToImplement: "Immediate"
  },
  {
    id: 4,
    type: "Speed Optimization",
    action: "Increase 11077 speed limit to 80 km/h in A8",
    confidence: 88,
    impact: "Recover 8 minutes delay",
    urgency: "high",
    timeToImplement: "1 min"
  },
  {
    id: 5,
    type: "Signal Timing",
    action: "Extend green phase for A2→A3 by 30 seconds",
    confidence: 92,
    impact: "Reduce waiting time by 12%",
    urgency: "medium",
    timeToImplement: "3 min"
  },
  {
    id: 6,
    type: "Energy Management",
    action: "Optimize regenerative braking for 19024",
    confidence: 85,
    impact: "Save 15% energy consumption",
    urgency: "low",
    timeToImplement: "7 min"
  }
];

export const AIRecommendations = () => {
  const [appliedRecs, setAppliedRecs] = useState<number[]>([]);
  const [dismissedRecs, setDismissedRecs] = useState<number[]>([]);

  const handleApply = (rec: typeof recommendations[0]) => {
    setAppliedRecs(prev => [...prev, rec.id]);
    toast.success(`Applied: ${rec.type}`, {
      description: `${rec.action} - Expected: ${rec.impact}`
    });
  };

  const handleDismiss = (rec: typeof recommendations[0]) => {
    setDismissedRecs(prev => [...prev, rec.id]);
    toast.info(`Dismissed: ${rec.type}`, {
      description: "Recommendation removed from queue"
    });
  };

  const activeRecommendations = recommendations.filter(
    rec => !appliedRecs.includes(rec.id) && !dismissedRecs.includes(rec.id)
  );

  return (
    <Card className="bg-gradient-surface border-border shadow-control">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Brain className="h-5 w-5 text-operational" />
          <span className="hidden sm:inline">AI Recommendations</span>
          <span className="sm:hidden">AI Recs</span>
          <Badge variant="outline" className="bg-operational/10 text-operational border-operational/20 ml-auto">
            {activeRecommendations.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
        {activeRecommendations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">All recommendations processed</p>
          </div>
        ) : (
          activeRecommendations.map((rec) => (
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
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span className="hidden sm:inline">{rec.impact}</span>
                  <span className="sm:hidden">{rec.impact.split(' ').slice(0, 3).join(' ')}</span>
                </div>
                <span>ETA: {rec.timeToImplement}</span>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-success/10 text-success border-success/20 hover:bg-success/20 flex-1"
                  onClick={() => handleApply(rec)}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Apply</span>
                  <span className="sm:hidden">✓</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-muted/10 text-muted-foreground border-muted/20 hover:bg-muted/20 flex-1"
                  onClick={() => handleDismiss(rec)}
                >
                  <XCircle className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Dismiss</span>
                  <span className="sm:hidden">✗</span>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-2"
                    >
                      <Info className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{rec.type} - Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Recommended Action</h4>
                        <p className="text-sm text-muted-foreground">{rec.action}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Expected Impact</h4>
                        <p className="text-sm text-muted-foreground">{rec.impact}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Confidence</h4>
                          <p className="text-sm text-muted-foreground">{rec.confidence}%</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Implementation Time</h4>
                          <p className="text-sm text-muted-foreground">{rec.timeToImplement}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Urgency Level</h4>
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
                          {rec.urgency.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        )}

        <div className="pt-2 border-t border-border">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size="sm">
                <span className="hidden sm:inline">View Scenario Analysis</span>
                <span className="sm:hidden">Scenarios</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>AI Scenario Analysis</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Current analysis shows optimal throughput with these recommendations applied:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-medium text-success">Best Case Scenario</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• 15% improvement in throughput</li>
                      <li>• 8 minutes average delay reduction</li>
                      <li>• 92% on-time performance</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-medium text-warning">Current Trajectory</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• 3% throughput decline</li>
                      <li>• 12 minutes average delay</li>
                      <li>• 78% on-time performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};