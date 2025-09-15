import { useState, useEffect } from "react";
import { Bell, Train, Clock, AlertTriangle, CheckCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface TrainStats {
  totalActive: number;
  onTimePercentage: number;
  delayedCount: number;
  avgDelay: number;
  passengerLoad: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  read: boolean;
}

export const NavigationBar = () => {
  const [trainStats, setTrainStats] = useState<TrainStats>({
    totalActive: 347,
    onTimePercentage: 78,
    delayedCount: 23,
    avgDelay: 8.5,
    passengerLoad: 85
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Signal Failure - Dadar Junction',
      message: 'Technical issue affecting Central Line services. Estimated resolution: 15 minutes.',
      priority: 'critical',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      title: 'Heavy Passenger Load Alert',
      message: 'CSTM platform 1-3 approaching maximum capacity during peak hours.',
      priority: 'high',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      title: 'Track Maintenance Complete',
      message: 'Scheduled maintenance between Kurla-Ghatkopar completed ahead of schedule.',
      priority: 'medium',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      read: true
    },
    {
      id: '4',
      title: 'Weather Advisory',
      message: 'Heavy rainfall expected. Potential delays on Harbour Line services.',
      priority: 'medium',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      read: false
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrainStats(prev => ({
        totalActive: prev.totalActive + Math.floor(Math.random() * 6) - 3,
        onTimePercentage: Math.max(65, Math.min(95, prev.onTimePercentage + Math.floor(Math.random() * 6) - 3)),
        delayedCount: Math.max(0, prev.delayedCount + Math.floor(Math.random() * 4) - 2),
        avgDelay: Math.max(0, +(prev.avgDelay + (Math.random() * 2 - 1)).toFixed(1)),
        passengerLoad: Math.max(60, Math.min(100, prev.passengerLoad + Math.floor(Math.random() * 6) - 3))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getStatusColor = (percentage: number) => {
    if (percentage >= 85) return "text-success";
    if (percentage >= 70) return "text-warning";
    return "text-destructive";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return "text-destructive";
      case 'high': return "text-warning";
      case 'medium': return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return AlertTriangle;
      case 'high': return Clock;
      case 'medium': return Bell;
      default: return CheckCircle;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left - App Title */}
        <div className="flex items-center space-x-3">
          <Train className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Railway Control</h1>
        </div>

        {/* Center - Active Train Statistics */}
        <div className="hidden md:flex items-center space-x-6">
          <Card className="px-4 py-2 bg-card/80">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Train className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {trainStats.totalActive} Active
                </span>
              </div>
              
              <Separator orientation="vertical" className="h-4" />
              
              <div className="flex items-center space-x-2">
                <CheckCircle className={`h-4 w-4 ${getStatusColor(trainStats.onTimePercentage)}`} />
                <span className={`text-sm font-medium ${getStatusColor(trainStats.onTimePercentage)}`}>
                  {trainStats.onTimePercentage}% On Time
                </span>
              </div>
              
              <Separator orientation="vertical" className="h-4" />
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-foreground">
                  {trainStats.delayedCount} Delayed
                </span>
              </div>

              <Separator orientation="vertical" className="h-4" />
              
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {trainStats.passengerLoad}% Load
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Mobile Stats - Condensed */}
        <div className="md:hidden flex items-center space-x-3">
          <Badge variant="outline" className="bg-primary/10">
            <Train className="h-3 w-3 mr-1" />
            {trainStats.totalActive}
          </Badge>
          <Badge variant="outline" className={`${getStatusColor(trainStats.onTimePercentage)} border-current/20`}>
            {trainStats.onTimePercentage}%
          </Badge>
        </div>

        {/* Right - Notifications */}
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">{unreadCount} unread notifications</p>
              </div>
              <ScrollArea className="h-96">
                <div className="p-2 space-y-1">
                  {notifications.map((notification) => {
                    const PriorityIcon = getPriorityIcon(notification.priority);
                    return (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-md cursor-pointer transition-colors hover:bg-muted/50 ${
                          !notification.read ? 'bg-muted/20' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <PriorityIcon className={`h-4 w-4 mt-0.5 ${getPriorityColor(notification.priority)}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium truncate ${
                                !notification.read ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="h-2 w-2 bg-primary rounded-full ml-2 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};