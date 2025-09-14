import { Clock, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  currentTime: Date;
}

export const DashboardHeader = ({ currentTime }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border bg-gradient-surface px-6 py-4 shadow-control">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-operational" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mumbai Railway Network Control</h1>
              <p className="text-sm text-muted-foreground">Central Railway • Western Railway • Harbour Line</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-success" />
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              System Active
            </Badge>
          </div>

          <div className="flex items-center space-x-2 text-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};