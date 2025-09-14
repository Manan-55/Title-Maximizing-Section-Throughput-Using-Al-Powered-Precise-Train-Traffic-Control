import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Train, AlertTriangle } from "lucide-react";

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'normal' | 'busy' | 'critical';
  trains: number;
  load: number;
}

interface TrainPosition {
  id: string;
  x: number;
  y: number;
  direction: number;
  line: string;
}

const stations: Station[] = [
  { id: "CSTM", name: "CSTM", x: 200, y: 150, status: 'critical', trains: 6, load: 94 },
  { id: "TNA", name: "Thane", x: 280, y: 80, status: 'busy', trains: 4, load: 87 },
  { id: "KYN", name: "Kalyan", x: 350, y: 100, status: 'busy', trains: 5, load: 91 },
  { id: "ADH", name: "Andheri", x: 120, y: 180, status: 'busy', trains: 3, load: 89 },
  { id: "BVI", name: "Borivali", x: 80, y: 120, status: 'normal', trains: 2, load: 76 },
  { id: "VR", name: "Virar", x: 40, y: 80, status: 'normal', trains: 2, load: 65 },
  { id: "PNVL", name: "Panvel", x: 260, y: 220, status: 'normal', trains: 3, load: 82 },
  { id: "LTT", name: "LTT", x: 180, y: 120, status: 'normal', trains: 2, load: 73 },
  { id: "BCT", name: "Mumbai Central", x: 160, y: 190, status: 'busy', trains: 4, load: 88 },
];

const initialTrains: TrainPosition[] = [
  { id: "12951", x: 220, y: 140, direction: 45, line: "central" },
  { id: "12123", x: 300, y: 110, direction: 180, line: "central" },
  { id: "95001", x: 140, y: 170, direction: 270, line: "western" },
  { id: "95203", x: 60, y: 100, direction: 90, line: "western" },
  { id: "95401", x: 240, y: 200, direction: 135, line: "harbour" },
];

export const NetworkMap = () => {
  const [trains, setTrains] = useState<TrainPosition[]>(initialTrains);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Animate trains movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setTrains(prevTrains => 
        prevTrains.map(train => ({
          ...train,
          x: train.x + Math.cos(train.direction * Math.PI / 180) * 2,
          y: train.y + Math.sin(train.direction * Math.PI / 180) * 2,
          // Keep trains within bounds and change direction at edges
          direction: train.x > 380 || train.x < 20 || train.y > 240 || train.y < 60 
            ? (train.direction + 180) % 360 
            : train.direction
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'busy': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const getLineColor = (line: string) => {
    switch (line) {
      case 'central': return '#ef4444';
      case 'western': return '#f59e0b';
      case 'harbour': return '#10b981';
      default: return '#3b82f6';
    }
  };

  return (
    <Card className="bg-gradient-surface border-border shadow-control">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-operational" />
            <span>Live Network Map</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentTime.toLocaleTimeString()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Map Background */}
          <svg width="400" height="260" className="border border-border rounded-lg bg-muted/10">
            {/* Railway Lines */}
            {/* Central Line */}
            <line x1="200" y1="150" x2="350" y2="100" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
            <line x1="200" y1="150" x2="280" y2="80" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
            
            {/* Western Line */}
            <line x1="160" y1="190" x2="120" y2="180" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
            <line x1="120" y1="180" x2="80" y2="120" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
            <line x1="80" y1="120" x2="40" y2="80" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
            
            {/* Harbour Line */}
            <line x1="200" y1="150" x2="260" y2="220" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
            
            {/* Stations */}
            {stations.map(station => (
              <g key={station.id}>
                <circle
                  cx={station.x}
                  cy={station.y}
                  r="8"
                  fill={getStatusColor(station.status)}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={station.x}
                  y={station.y - 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="hsl(var(--foreground))"
                  fontWeight="bold"
                >
                  {station.name}
                </text>
                <text
                  x={station.x}
                  y={station.y + 20}
                  textAnchor="middle"
                  fontSize="8"
                  fill="hsl(var(--muted-foreground))"
                >
                  {station.load}%
                </text>
              </g>
            ))}
            
            {/* Moving Trains */}
            {trains.map(train => (
              <g key={train.id}>
                <circle
                  cx={train.x}
                  cy={train.y}
                  r="4"
                  fill={getLineColor(train.line)}
                  stroke="white"
                  strokeWidth="1"
                >
                  <animate
                    attributeName="r"
                    values="4;6;4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x={train.x}
                  y={train.y - 8}
                  textAnchor="middle"
                  fontSize="6"
                  fill="hsl(var(--foreground))"
                  fontWeight="bold"
                >
                  {train.id}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">Busy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-critical rounded-full"></div>
              <span className="text-xs text-muted-foreground">Critical</span>
            </div>
            <div className="flex items-center space-x-2">
              <Train className="h-3 w-3 text-operational" />
              <span className="text-xs text-muted-foreground">Live Trains</span>
            </div>
          </div>
          
          {/* Status Summary */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-muted/20 rounded">
              <div className="text-lg font-bold text-foreground">{trains.length}</div>
              <div className="text-xs text-muted-foreground">Active Trains</div>
            </div>
            <div className="text-center p-2 bg-muted/20 rounded">
              <div className="text-lg font-bold text-warning">{stations.filter(s => s.status === 'busy').length}</div>
              <div className="text-xs text-muted-foreground">Busy Stations</div>
            </div>
            <div className="text-center p-2 bg-muted/20 rounded">
              <div className="text-lg font-bold text-critical">{stations.filter(s => s.status === 'critical').length}</div>
              <div className="text-xs text-muted-foreground">Critical Alerts</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
