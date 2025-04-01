import React, { useState, useEffect } from 'react';
import { useCommandProcessor } from '@/hooks/useCommandProcessor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CommandType, CommandPriority, CommandStatus, DroneCommand } from '@/lib/commands/types';
import { Shield, AlertTriangle, Check, X, Clock, Play, Terminal } from 'lucide-react';

const CommandCenter = () => {
  const {
    sendCommand,
    isProcessing,
    lastCommandStatus,
    error,
    getCommandHistory,
    getQueueLength
  } = useCommandProcessor();

  const [commandHistory, setCommandHistory] = useState<DroneCommand[]>([]);
  const [queueLength, setQueueLength] = useState(0);

  useEffect(() => {
    // Update command history and queue length periodically
    const interval = setInterval(() => {
      setCommandHistory(getCommandHistory(20));
      setQueueLength(getQueueLength());
    }, 1000);

    return () => clearInterval(interval);
  }, [getCommandHistory, getQueueLength]);

  const getStatusBadge = (status: CommandStatus) => {
    const variants: Record<CommandStatus, { color: string; icon: React.ReactNode }> = {
      [CommandStatus.PENDING]: { color: 'default', icon: <Clock className="w-4 h-4" /> },
      [CommandStatus.VALIDATED]: { color: 'secondary', icon: <Check className="w-4 h-4" /> },
      [CommandStatus.EXECUTING]: { color: 'warning', icon: <Play className="w-4 h-4" /> },
      [CommandStatus.COMPLETED]: { color: 'success', icon: <Check className="w-4 h-4" /> },
      [CommandStatus.FAILED]: { color: 'destructive', icon: <X className="w-4 h-4" /> },
      [CommandStatus.REJECTED]: { color: 'destructive', icon: <AlertTriangle className="w-4 h-4" /> }
    };

    const { color, icon } = variants[status];
    return (
      <Badge variant={color as any} className="flex items-center gap-1">
        {icon}
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: CommandPriority) => {
    const variants: Record<CommandPriority, string> = {
      [CommandPriority.LOW]: 'default',
      [CommandPriority.MEDIUM]: 'secondary',
      [CommandPriority.HIGH]: 'warning',
      [CommandPriority.CRITICAL]: 'destructive'
    };

    return (
      <Badge variant={variants[priority] as any}>
        {CommandPriority[priority]}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Command Center</h1>
          <p className="text-muted-foreground">
            Monitor and manage drone command processing
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg">
            Queue: {queueLength}
          </Badge>
          {isProcessing && (
            <Badge variant="secondary" className="animate-pulse">
              Processing...
            </Badge>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Command History</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
          <TabsTrigger value="queue">Command Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Command History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Command ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commandHistory.map((command) => (
                    <TableRow key={command.commandId}>
                      <TableCell className="font-mono">{command.commandId.slice(0, 8)}</TableCell>
                      <TableCell>{command.type}</TableCell>
                      <TableCell>{getPriorityBadge(command.priority)}</TableCell>
                      <TableCell>{getStatusBadge(command.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{command.source.type}</span>
                          <span className="text-sm text-muted-foreground">{command.source.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(command.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Threat Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Current Threat Level</span>
                    <Badge variant="warning">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Security Events (24h)</span>
                    <span className="font-bold">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Failed Commands</span>
                    <span className="font-bold text-destructive">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authorization Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Authorized Commands</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rejected Commands</span>
                    <span className="font-bold text-red-600">11%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Processor Status</span>
                    <Badge variant="success">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Response Time</span>
                    <span className="font-bold">124ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Command Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Queue Length</span>
                  <Badge>{queueLength}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Processing Status</span>
                  <Badge variant={isProcessing ? 'warning' : 'success'}>
                    {isProcessing ? 'Processing' : 'Ready'}
                  </Badge>
                </div>
                {lastCommandStatus && (
                  <div className="flex items-center justify-between">
                    <span>Last Command Status</span>
                    {getStatusBadge(lastCommandStatus)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommandCenter; 