import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Train, Activity } from "lucide-react";

// Generate initial data for passenger flow
const generatePassengerData = () => {
  const hours = [];
  const baseTime = new Date();
  baseTime.setHours(6, 0, 0, 0);
  
  for (let i = 0; i < 18; i++) {
    const time = new Date(baseTime);
    time.setHours(6 + i);
    
    // Mumbai peak hours simulation
    let passengers = 50000;
    if (i >= 2 && i <= 4) passengers = Math.random() * 50000 + 150000; // Morning peak
    else if (i >= 12 && i <= 15) passengers = Math.random() * 40000 + 140000; // Evening peak
    else passengers = Math.random() * 30000 + 40000;
    
    hours.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      passengers: Math.floor(passengers),
      central: Math.floor(passengers * 0.4),
      western: Math.floor(passengers * 0.35),
      harbour: Math.floor(passengers * 0.25),
    });
  }
  return hours;
};

// Network performance data
const generatePerformanceData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i.toString().padStart(2, '0')}:00`,
      onTime: Math.random() * 20 + 75,
      delayed: Math.random() * 15 + 5,
      cancelled: Math.random() * 5 + 1,
    });
  }
  return data;
};

// Line utilization data
const lineUtilizationData = [
  { name: 'Central Line', value: 96, color: '#ef4444' },
  { name: 'Western Line', value: 91, color: '#f59e0b' },
  { name: 'Harbour Line', value: 84, color: '#10b981' },
  { name: 'Trans-Harbour', value: 72, color: '#3b82f6' },
];

export const LiveCharts = () => {
  const [passengerData, setPassengerData] = useState(generatePassengerData());
  const [performanceData, setPerformanceData] = useState(generatePerformanceData());
  const [liveMetrics, setLiveMetrics] = useState({
    totalPassengers: 0,
    avgDelay: 0,
    networkLoad: 0,
  });

  // Update data every 5 seconds to simulate real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setPassengerData(generatePassengerData());
      setPerformanceData(generatePerformanceData());
      
      // Update live metrics
      setLiveMetrics({
        totalPassengers: Math.floor(Math.random() * 100000 + 600000),
        avgDelay: Math.floor(Math.random() * 5 + 3),
        networkLoad: Math.floor(Math.random() * 10 + 85),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Metrics Row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-surface border-border shadow-control">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Passengers</p>
                <p className="text-2xl font-bold text-foreground">{liveMetrics.totalPassengers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-operational" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-surface border-border shadow-control">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Delay</p>
                <p className="text-2xl font-bold text-foreground">{liveMetrics.avgDelay} min</p>
              </div>
              <Activity className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-surface border-border shadow-control">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Load</p>
                <p className="text-2xl font-bold text-foreground">{liveMetrics.networkLoad}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-critical" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Passenger Flow Chart */}
        <Card className="bg-gradient-surface border-border shadow-control">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Users className="h-5 w-5 text-operational" />
              <span>Live Passenger Flow</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={passengerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="central" 
                  stackId="1" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.6}
                  name="Central Line"
                />
                <Area 
                  type="monotone" 
                  dataKey="western" 
                  stackId="1" 
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.6}
                  name="Western Line"
                />
                <Area 
                  type="monotone" 
                  dataKey="harbour" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                  name="Harbour Line"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Network Performance */}
        <Card className="bg-gradient-surface border-border shadow-control">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Activity className="h-5 w-5 text-operational" />
              <span>Performance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="onTime" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="On Time %"
                />
                <Line 
                  type="monotone" 
                  dataKey="delayed" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Delayed %"
                />
                <Line 
                  type="monotone" 
                  dataKey="cancelled" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Cancelled %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Line Utilization */}
        <Card className="bg-gradient-surface border-border shadow-control">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Train className="h-5 w-5 text-operational" />
              <span>Line Utilization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={lineUtilizationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {lineUtilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Station Load */}
        <Card className="bg-gradient-surface border-border shadow-control col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-operational" />
              <span>Major Station Load</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { station: "CSTM", load: 94, capacity: 100 },
                { station: "Thane", load: 87, capacity: 100 },
                { station: "Kalyan", load: 91, capacity: 100 },
                { station: "Andheri", load: 89, capacity: 100 },
                { station: "Borivali", load: 76, capacity: 100 },
                { station: "Panvel", load: 82, capacity: 100 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="station" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="load" fill="#ef4444" name="Current Load %" />
                <Bar dataKey="capacity" fill="#10b981" fillOpacity={0.3} name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};