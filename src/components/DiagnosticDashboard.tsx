
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Monitor,
  Zap } from
'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { errorHandler, SystemError, DiagnosticLog } from '@/utils/errorHandler';
import { storageManager } from '@/utils/storageManager';
import { missionManager } from '@/utils/missionManager';
import { useToast } from '@/hooks/use-toast';

const DiagnosticDashboard: React.FC = () => {
  const [errors, setErrors] = useState<SystemError[]>([]);
  const [diagnostics, setDiagnostics] = useState<DiagnosticLog[]>([]);
  const [systemHealth, setSystemHealth] = useState(errorHandler.getSystemHealth());
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDiagnosticData();

    // Update every 30 seconds
    const interval = setInterval(loadDiagnosticData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDiagnosticData = () => {
    setErrors(errorHandler.getErrors());
    setDiagnostics(errorHandler.getDiagnostics());
    setSystemHealth(errorHandler.getSystemHealth());
  };

  const handleSystemRecheck = async () => {
    setIsRunningCheck(true);
    try {
      const success = await missionManager.recheckSystemState();
      if (success) {
        toast({
          title: "System Recheck Complete",
          description: "All systems have been validated and repaired if needed.",
          duration: 3000
        });
      } else {
        toast({
          title: "System Recheck Failed",
          description: "Some issues were detected during the system check.",
          variant: "destructive",
          duration: 5000
        });
      }
    } finally {
      setIsRunningCheck(false);
      loadDiagnosticData();
    }
  };

  const handleRegenerateQuests = async () => {
    const success = await missionManager.regenerateQuests();
    if (success) {
      toast({
        title: "Quests Regenerated",
        description: "New daily and weekly quests have been generated.",
        duration: 3000
      });
    }
  };

  const handleExportData = async () => {
    try {
      const data = await storageManager.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `task-warrior-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: "Your data has been exported successfully.",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data.",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const handleClearLogs = () => {
    errorHandler.clearLogs();
    loadDiagnosticData();
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'HEALTHY':return 'text-green-500';
      case 'WARNING':return 'text-yellow-500';
      case 'CRITICAL':return 'text-red-500';
      default:return 'text-gray-500';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'HEALTHY':return <CheckCircle className="w-5 h-5" data-id="a946aieuz" data-path="src/components/DiagnosticDashboard.tsx" />;
      case 'WARNING':return <AlertTriangle className="w-5 h-5" data-id="ij3crioff" data-path="src/components/DiagnosticDashboard.tsx" />;
      case 'CRITICAL':return <XCircle className="w-5 h-5" data-id="nilq6ssbe" data-path="src/components/DiagnosticDashboard.tsx" />;
      default:return <Monitor className="w-5 h-5" data-id="lg5jfcqji" data-path="src/components/DiagnosticDashboard.tsx" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW':return 'bg-blue-500';
      case 'MEDIUM':return 'bg-yellow-500';
      case 'HIGH':return 'bg-orange-500';
      case 'CRITICAL':return 'bg-red-500';
      default:return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6" data-id="rfhpn4pyk" data-path="src/components/DiagnosticDashboard.tsx">
      <div className="flex items-center justify-between" data-id="flhgzb1j6" data-path="src/components/DiagnosticDashboard.tsx">
        <div data-id="1jv0l1yoo" data-path="src/components/DiagnosticDashboard.tsx">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" data-id="etrlfj8op" data-path="src/components/DiagnosticDashboard.tsx">
            System Diagnostics
          </h2>
          <p className="text-gray-600 dark:text-gray-400" data-id="anp4ht4fv" data-path="src/components/DiagnosticDashboard.tsx">
            Monitor system health and troubleshoot issues
          </p>
        </div>
        <div className="flex space-x-2" data-id="vfnwkzvl0" data-path="src/components/DiagnosticDashboard.tsx">
          <Button
            onClick={handleSystemRecheck}
            disabled={isRunningCheck}
            variant="outline"
            size="sm" data-id="752iwa9ia" data-path="src/components/DiagnosticDashboard.tsx">

            <RefreshCw className={`w-4 h-4 mr-2 ${isRunningCheck ? 'animate-spin' : ''}`} data-id="j2tz1nwkz" data-path="src/components/DiagnosticDashboard.tsx" />
            {isRunningCheck ? 'Checking...' : 'System Recheck'}
          </Button>
          <Button onClick={handleExportData} variant="outline" size="sm" data-id="6ppn8lhc2" data-path="src/components/DiagnosticDashboard.tsx">
            <Download className="w-4 h-4 mr-2" data-id="79cs5go5p" data-path="src/components/DiagnosticDashboard.tsx" />
            Export Data
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="kfj6gjk7k" data-path="src/components/DiagnosticDashboard.tsx">
        <Card data-id="ze2kez22h" data-path="src/components/DiagnosticDashboard.tsx">
          <CardContent className="p-6" data-id="grmo5z90t" data-path="src/components/DiagnosticDashboard.tsx">
            <div className="flex items-center space-x-2" data-id="5fhe9y0el" data-path="src/components/DiagnosticDashboard.tsx">
              <div className={getHealthColor(systemHealth.status)} data-id="4o0yhweg1" data-path="src/components/DiagnosticDashboard.tsx">
                {getHealthIcon(systemHealth.status)}
              </div>
              <div data-id="4zul4ayjk" data-path="src/components/DiagnosticDashboard.tsx">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400" data-id="ymcyfi6it" data-path="src/components/DiagnosticDashboard.tsx">
                  System Status
                </p>
                <p className={`text-lg font-bold ${getHealthColor(systemHealth.status)}`} data-id="cljpo8169" data-path="src/components/DiagnosticDashboard.tsx">
                  {systemHealth.status}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="oylnc1pdo" data-path="src/components/DiagnosticDashboard.tsx">
          <CardContent className="p-6" data-id="ibr62cgmg" data-path="src/components/DiagnosticDashboard.tsx">
            <div className="flex items-center space-x-2" data-id="f0ujfy11s" data-path="src/components/DiagnosticDashboard.tsx">
              <XCircle className="w-5 h-5 text-red-500" data-id="4kv1qnmhm" data-path="src/components/DiagnosticDashboard.tsx" />
              <div data-id="q20pipsgq" data-path="src/components/DiagnosticDashboard.tsx">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400" data-id="ikvnjjulz" data-path="src/components/DiagnosticDashboard.tsx">
                  Critical Errors
                </p>
                <p className="text-lg font-bold text-red-500" data-id="xyxl5lzu9" data-path="src/components/DiagnosticDashboard.tsx">
                  {systemHealth.criticalErrors}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="miwda4fnb" data-path="src/components/DiagnosticDashboard.tsx">
          <CardContent className="p-6" data-id="s7jvzc17v" data-path="src/components/DiagnosticDashboard.tsx">
            <div className="flex items-center space-x-2" data-id="7iwh9app2" data-path="src/components/DiagnosticDashboard.tsx">
              <AlertTriangle className="w-5 h-5 text-yellow-500" data-id="se0fqu94y" data-path="src/components/DiagnosticDashboard.tsx" />
              <div data-id="4ze1sl676" data-path="src/components/DiagnosticDashboard.tsx">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400" data-id="m5b251t6c" data-path="src/components/DiagnosticDashboard.tsx">
                  Recent Failures
                </p>
                <p className="text-lg font-bold text-yellow-500" data-id="negbgg9za" data-path="src/components/DiagnosticDashboard.tsx">
                  {systemHealth.recentFailures}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="q2lco4glh" data-path="src/components/DiagnosticDashboard.tsx">
          <CardContent className="p-6" data-id="18djonct6" data-path="src/components/DiagnosticDashboard.tsx">
            <div className="flex items-center space-x-2" data-id="fcnutc8q4" data-path="src/components/DiagnosticDashboard.tsx">
              <Activity className="w-5 h-5 text-blue-500" data-id="6pg9smrxz" data-path="src/components/DiagnosticDashboard.tsx" />
              <div data-id="cbn1p4oqs" data-path="src/components/DiagnosticDashboard.tsx">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400" data-id="vfquu3rl0" data-path="src/components/DiagnosticDashboard.tsx">
                  Uptime
                </p>
                <p className="text-lg font-bold text-blue-500" data-id="0xpa6aqop" data-path="src/components/DiagnosticDashboard.tsx">
                  {systemHealth.uptime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Diagnostics */}
      <Card data-id="dy6e6xomn" data-path="src/components/DiagnosticDashboard.tsx">
        <CardHeader data-id="97xb0gbmc" data-path="src/components/DiagnosticDashboard.tsx">
          <CardTitle data-id="8xq7i2ami" data-path="src/components/DiagnosticDashboard.tsx">System Diagnostics</CardTitle>
          <CardDescription data-id="7ptey7edb" data-path="src/components/DiagnosticDashboard.tsx">
            View detailed error logs and diagnostic information
          </CardDescription>
        </CardHeader>
        <CardContent data-id="dmwv9b12l" data-path="src/components/DiagnosticDashboard.tsx">
          <Tabs defaultValue="errors" className="w-full" data-id="8tven9d72" data-path="src/components/DiagnosticDashboard.tsx">
            <TabsList data-id="tavyo5dhc" data-path="src/components/DiagnosticDashboard.tsx">
              <TabsTrigger value="errors" data-id="fqti8jpjs" data-path="src/components/DiagnosticDashboard.tsx">
                Error Log ({errors.length})
              </TabsTrigger>
              <TabsTrigger value="diagnostics" data-id="osxcfeoi6" data-path="src/components/DiagnosticDashboard.tsx">
                Diagnostics ({diagnostics.length})
              </TabsTrigger>
              <TabsTrigger value="actions" data-id="4jrervsvx" data-path="src/components/DiagnosticDashboard.tsx">
                System Actions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="errors" className="space-y-4" data-id="kaqzcvfwk" data-path="src/components/DiagnosticDashboard.tsx">
              <div className="flex justify-between items-center" data-id="vex9sh8ec" data-path="src/components/DiagnosticDashboard.tsx">
                <p className="text-sm text-gray-600 dark:text-gray-400" data-id="3je4a2xfs" data-path="src/components/DiagnosticDashboard.tsx">
                  Recent system errors and issues
                </p>
                <Button onClick={handleClearLogs} variant="outline" size="sm" data-id="08b1wctz7" data-path="src/components/DiagnosticDashboard.tsx">
                  <Trash2 className="w-4 h-4 mr-2" data-id="m4cicjb6e" data-path="src/components/DiagnosticDashboard.tsx" />
                  Clear Logs
                </Button>
              </div>
              
              <ScrollArea className="h-96" data-id="msl1x621i" data-path="src/components/DiagnosticDashboard.tsx">
                <div className="space-y-2" data-id="ba7vo2n5b" data-path="src/components/DiagnosticDashboard.tsx">
                  {errors.length === 0 ?
                  <div className="text-center py-8 text-gray-500" data-id="0hhsk6b6j" data-path="src/components/DiagnosticDashboard.tsx">
                      <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" data-id="fuc4wm62z" data-path="src/components/DiagnosticDashboard.tsx" />
                      <p data-id="zkj3wehoa" data-path="src/components/DiagnosticDashboard.tsx">No errors detected! System is running smoothly.</p>
                    </div> :

                  errors.map((error) =>
                  <motion.div
                    key={error.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg space-y-2" data-id="p78dz78aq" data-path="src/components/DiagnosticDashboard.tsx">

                        <div className="flex items-center justify-between" data-id="3vlm4geb7" data-path="src/components/DiagnosticDashboard.tsx">
                          <div className="flex items-center space-x-2" data-id="txav0pjdp" data-path="src/components/DiagnosticDashboard.tsx">
                            <Badge className={getSeverityColor(error.severity)} data-id="fkssgo8xn" data-path="src/components/DiagnosticDashboard.tsx">
                              {error.severity}
                            </Badge>
                            <Badge variant="outline" data-id="9ieri7am0" data-path="src/components/DiagnosticDashboard.tsx">{error.type}</Badge>
                          </div>
                          <p className="text-xs text-gray-500" data-id="stnrr4wuk" data-path="src/components/DiagnosticDashboard.tsx">
                            {error.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <p className="font-medium" data-id="0dmb7w6e1" data-path="src/components/DiagnosticDashboard.tsx">{error.message}</p>
                        {error.context &&
                    <details className="text-sm text-gray-600" data-id="knu1ctnpd" data-path="src/components/DiagnosticDashboard.tsx">
                            <summary className="cursor-pointer" data-id="v8lvbybwd" data-path="src/components/DiagnosticDashboard.tsx">Context</summary>
                            <pre className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs overflow-x-auto" data-id="2aqjt8iad" data-path="src/components/DiagnosticDashboard.tsx">
                              {JSON.stringify(error.context, null, 2)}
                            </pre>
                          </details>
                    }
                      </motion.div>
                  )
                  }
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="diagnostics" className="space-y-4" data-id="e3xw06so4" data-path="src/components/DiagnosticDashboard.tsx">
              <p className="text-sm text-gray-600 dark:text-gray-400" data-id="2bn9cgyjq" data-path="src/components/DiagnosticDashboard.tsx">
                System diagnostic logs and performance metrics
              </p>
              
              <ScrollArea className="h-96" data-id="y93pkfe4c" data-path="src/components/DiagnosticDashboard.tsx">
                <div className="space-y-2" data-id="shfaboy9q" data-path="src/components/DiagnosticDashboard.tsx">
                  {diagnostics.slice(0, 50).map((log) =>
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 border rounded space-y-1" data-id="jz6i6u2ue" data-path="src/components/DiagnosticDashboard.tsx">

                      <div className="flex items-center justify-between" data-id="31yw7ih87" data-path="src/components/DiagnosticDashboard.tsx">
                        <div className="flex items-center space-x-2" data-id="ut0gbq4ka" data-path="src/components/DiagnosticDashboard.tsx">
                          <Badge
                          variant={log.status === 'SUCCESS' ? 'default' :
                          log.status === 'WARNING' ? 'secondary' : 'destructive'} data-id="vohgilnja" data-path="src/components/DiagnosticDashboard.tsx">

                            {log.status}
                          </Badge>
                          <span className="font-medium text-sm" data-id="dhh4igy0v" data-path="src/components/DiagnosticDashboard.tsx">{log.action}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500" data-id="tr68g6niq" data-path="src/components/DiagnosticDashboard.tsx">
                          {log.duration &&
                        <span data-id="nvdp0d7sv" data-path="src/components/DiagnosticDashboard.tsx">{log.duration}ms</span>
                        }
                          <span data-id="1oh6oumiy" data-path="src/components/DiagnosticDashboard.tsx">{log.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                      {Object.keys(log.details).length > 0 &&
                    <details className="text-xs text-gray-600" data-id="x0ox7a69k" data-path="src/components/DiagnosticDashboard.tsx">
                          <summary className="cursor-pointer" data-id="l0kgdyyha" data-path="src/components/DiagnosticDashboard.tsx">Details</summary>
                          <pre className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded overflow-x-auto" data-id="96ql3kboa" data-path="src/components/DiagnosticDashboard.tsx">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                    }
                    </motion.div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4" data-id="ovc9f93fd" data-path="src/components/DiagnosticDashboard.tsx">
              <p className="text-sm text-gray-600 dark:text-gray-400" data-id="43yvob4hz" data-path="src/components/DiagnosticDashboard.tsx">
                System maintenance and recovery actions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="r7s1ge3zx" data-path="src/components/DiagnosticDashboard.tsx">
                <Card data-id="ylktj3o0b" data-path="src/components/DiagnosticDashboard.tsx">
                  <CardHeader data-id="8yiu8xbup" data-path="src/components/DiagnosticDashboard.tsx">
                    <CardTitle className="text-lg" data-id="9s0wvi0oz" data-path="src/components/DiagnosticDashboard.tsx">Quest Management</CardTitle>
                    <CardDescription data-id="34q7v2ao5" data-path="src/components/DiagnosticDashboard.tsx">
                      Manage and regenerate system quests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2" data-id="g0o6d3lrx" data-path="src/components/DiagnosticDashboard.tsx">
                    <Button onClick={handleRegenerateQuests} className="w-full" data-id="gx4hsswld" data-path="src/components/DiagnosticDashboard.tsx">
                      <Zap className="w-4 h-4 mr-2" data-id="gq6cbff1u" data-path="src/components/DiagnosticDashboard.tsx" />
                      Regenerate Quests
                    </Button>
                    <p className="text-xs text-gray-500" data-id="9ouql5jh3" data-path="src/components/DiagnosticDashboard.tsx">
                      Creates new daily and weekly quests based on current progress
                    </p>
                  </CardContent>
                </Card>

                <Card data-id="1ddhf2yc2" data-path="src/components/DiagnosticDashboard.tsx">
                  <CardHeader data-id="kuzd3ochv" data-path="src/components/DiagnosticDashboard.tsx">
                    <CardTitle className="text-lg" data-id="jhnyv27tl" data-path="src/components/DiagnosticDashboard.tsx">Data Management</CardTitle>
                    <CardDescription data-id="hg9btkk42" data-path="src/components/DiagnosticDashboard.tsx">
                      Export, import, and manage system data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2" data-id="uqptr6400" data-path="src/components/DiagnosticDashboard.tsx">
                    <div className="flex space-x-2" data-id="ke5ls2cfv" data-path="src/components/DiagnosticDashboard.tsx">
                      <Button onClick={handleExportData} variant="outline" className="flex-1" data-id="3biardoz5" data-path="src/components/DiagnosticDashboard.tsx">
                        <Download className="w-4 h-4 mr-2" data-id="2xkc7z7j5" data-path="src/components/DiagnosticDashboard.tsx" />
                        Export
                      </Button>
                      <Button variant="outline" className="flex-1" data-id="vt0do511s" data-path="src/components/DiagnosticDashboard.tsx">
                        <Upload className="w-4 h-4 mr-2" data-id="ai46umbuy" data-path="src/components/DiagnosticDashboard.tsx" />
                        Import
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500" data-id="97unnq12k" data-path="src/components/DiagnosticDashboard.tsx">
                      Backup and restore your data
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>);

};

export default DiagnosticDashboard;