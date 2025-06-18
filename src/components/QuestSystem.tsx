import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Scroll, Calendar, Trophy, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Quest, Task } from '@/types';
import { generateDailyQuests, generateWeeklyQuests } from '@/utils/xpSystem';

interface QuestSystemProps {
  tasks: Task[];
  onQuestComplete?: (quest: Quest) => void;
}

const QuestSystem: React.FC<QuestSystemProps> = ({ tasks, onQuestComplete }) => {
  const [dailyQuests, setDailyQuests] = useState<Quest[]>([]);
  const [weeklyQuests, setWeeklyQuests] = useState<Quest[]>([]);

  useEffect(() => {
    // Load or generate quests
    const savedDaily = localStorage.getItem('shadowconsole_daily_quests');
    const savedWeekly = localStorage.getItem('shadowconsole_weekly_quests');

    const today = new Date().toDateString();
    const lastDailyReset = localStorage.getItem('shadowconsole_daily_reset');

    if (!savedDaily || lastDailyReset !== today) {
      const newDaily = generateDailyQuests();
      setDailyQuests(newDaily);
      localStorage.setItem('shadowconsole_daily_quests', JSON.stringify(newDaily));
      localStorage.setItem('shadowconsole_daily_reset', today);
    } else {
      setDailyQuests(JSON.parse(savedDaily));
    }

    if (!savedWeekly) {
      const newWeekly = generateWeeklyQuests();
      setWeeklyQuests(newWeekly);
      localStorage.setItem('shadowconsole_weekly_quests', JSON.stringify(newWeekly));
    } else {
      setWeeklyQuests(JSON.parse(savedWeekly));
    }
  }, []);

  useEffect(() => {
    // Update quest progress based on tasks
    updateQuestProgress();
  }, [tasks]);

  const updateQuestProgress = () => {
    const completedToday = tasks.filter((task) => {
      if (task.status !== 'completed') return false;
      const completedDate = new Date(task.completedAt || task.dueDate);
      const today = new Date();
      return completedDate.toDateString() === today.toDateString();
    });

    const completedThisWeek = tasks.filter((task) => {
      if (task.status !== 'completed') return false;
      const completedDate = new Date(task.completedAt || task.dueDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return completedDate >= weekAgo;
    });

    // Update daily quests
    const updatedDaily = dailyQuests.map((quest) => {
      let current = 0;

      switch (quest.id) {
        case 'daily_complete_3':
          current = completedToday.length;
          break;
        case 'daily_early_task':
          current = completedToday.some((task) => {
            const completedTime = new Date(task.completedAt || task.dueDate);
            return completedTime.getHours() < 10;
          }) ? 1 : 0;
          break;
        case 'daily_boss_mission':
          current = completedToday.filter((task) => task.priority === 'Boss').length;
          break;
      }

      const completed = current >= quest.target;
      if (completed && !quest.completed && onQuestComplete) {
        onQuestComplete(quest);
      }

      return { ...quest, current, completed };
    });

    // Update weekly quests
    const updatedWeekly = weeklyQuests.map((quest) => {
      let current = 0;

      switch (quest.id) {
        case 'weekly_streak':
          // This would need streak calculation from xpSystem
          current = 0; // Placeholder
          break;
        case 'weekly_missions':
          current = completedThisWeek.length;
          break;
        case 'weekly_categories':
          const categories = new Set(completedThisWeek.map((task) => task.category));
          current = categories.size;
          break;
      }

      const completed = current >= quest.target;
      if (completed && !quest.completed && onQuestComplete) {
        onQuestComplete(quest);
      }

      return { ...quest, current, completed };
    });

    setDailyQuests(updatedDaily);
    setWeeklyQuests(updatedWeekly);

    // Save updated quests
    localStorage.setItem('shadowconsole_daily_quests', JSON.stringify(updatedDaily));
    localStorage.setItem('shadowconsole_weekly_quests', JSON.stringify(updatedWeekly));
  };

  const QuestCard: React.FC<{quest: Quest;}> = ({ quest }) => {
    const progress = Math.min(quest.current / quest.target * 100, 100);
    const isExpired = new Date() > quest.expiresAt;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative" data-id="ugqq7d4a9" data-path="src/components/QuestSystem.tsx">

        <Card className={`bg-gray-800/80 border-gray-700/50 hover:border-gray-600 transition-all ${
        quest.completed ? 'border-green-500/50 bg-green-900/20' : ''} ${
        isExpired ? 'opacity-50' : ''}`} data-id="85hs10822" data-path="src/components/QuestSystem.tsx">
          <CardHeader className="pb-3" data-id="3h05impl2" data-path="src/components/QuestSystem.tsx">
            <div className="flex items-center justify-between" data-id="ygp84suvj" data-path="src/components/QuestSystem.tsx">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2" data-id="r8jr4owin" data-path="src/components/QuestSystem.tsx">
                {quest.type === 'daily' ? <Calendar className="w-4 h-4" data-id="f375vu3bb" data-path="src/components/QuestSystem.tsx" /> : <Trophy className="w-4 h-4" data-id="0c8stvf1f" data-path="src/components/QuestSystem.tsx" />}
                {quest.title}
              </CardTitle>
              <Badge variant={quest.completed ? 'default' : 'secondary'} className="text-xs" data-id="9xv6xv80y" data-path="src/components/QuestSystem.tsx">
                {quest.completed ? '✅' : `${quest.current}/${quest.target}`}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0" data-id="ofpyw8zu8" data-path="src/components/QuestSystem.tsx">
            <p className="text-xs text-gray-400 mb-3" data-id="4iklsn24e" data-path="src/components/QuestSystem.tsx">{quest.description}</p>
            
            <div className="space-y-2" data-id="d4bmrrbjs" data-path="src/components/QuestSystem.tsx">
              <div className="flex items-center justify-between text-xs" data-id="cirzcbo2i" data-path="src/components/QuestSystem.tsx">
                <span className="text-gray-500" data-id="d99lay9p8" data-path="src/components/QuestSystem.tsx">Progress</span>
                <span className="text-green-400 font-medium" data-id="2lj0xh1xi" data-path="src/components/QuestSystem.tsx">+{quest.xpReward} XP</span>
              </div>
              
              <Progress
                value={progress}
                className="h-2 bg-gray-700" data-id="1godus0c7" data-path="src/components/QuestSystem.tsx" />

              
              <div className="flex items-center justify-between text-xs text-gray-500" data-id="4b6c13bnh" data-path="src/components/QuestSystem.tsx">
                <span data-id="6n8yka5oa" data-path="src/components/QuestSystem.tsx">{quest.current} / {quest.target}</span>
                <div className="flex items-center gap-1" data-id="2k6mz5l0i" data-path="src/components/QuestSystem.tsx">
                  <Clock className="w-3 h-3" data-id="jsuk4ou17" data-path="src/components/QuestSystem.tsx" />
                  <span data-id="7dq65jfo8" data-path="src/components/QuestSystem.tsx">
                    {quest.type === 'daily' ? 'Today' : 'This Week'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          
          {quest.completed &&
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-600/10 rounded-lg pointer-events-none" data-id="pg1r0uxi2" data-path="src/components/QuestSystem.tsx" />
          }
        </Card>
      </motion.div>);

  };

  return (
    <Card className="bg-gray-800/80 border-gray-700/50" data-id="txbwtwy13" data-path="src/components/QuestSystem.tsx">
      <CardHeader data-id="gv9egwggn" data-path="src/components/QuestSystem.tsx">
        <CardTitle className="text-white flex items-center gap-2" data-id="zhnp9i73g" data-path="src/components/QuestSystem.tsx">
          <Scroll className="w-5 h-5 text-green-400" data-id="9883dow71" data-path="src/components/QuestSystem.tsx" />
          Quest Board
        </CardTitle>
      </CardHeader>
      
      <CardContent data-id="sbx1j7yph" data-path="src/components/QuestSystem.tsx">
        <Tabs defaultValue="daily" className="w-full" data-id="7l2z4c1le" data-path="src/components/QuestSystem.tsx">
          <TabsList className="grid w-full grid-cols-2 bg-gray-700/50" data-id="hpqgwae1q" data-path="src/components/QuestSystem.tsx">
            <TabsTrigger value="daily" className="text-white data-[state=active]:bg-gray-600/50" data-id="omcjdpss7" data-path="src/components/QuestSystem.tsx">
              Daily Quests
            </TabsTrigger>
            <TabsTrigger value="weekly" className="text-white data-[state=active]:bg-gray-600/50" data-id="uvugmhc6h" data-path="src/components/QuestSystem.tsx">
              Weekly Quests
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-4" data-id="wd4stmqa7" data-path="src/components/QuestSystem.tsx">
            <div className="space-y-3" data-id="luiw0kkv7" data-path="src/components/QuestSystem.tsx">
              {dailyQuests.map((quest) =>
              <QuestCard key={quest.id} quest={quest} data-id="3oin6oxbn" data-path="src/components/QuestSystem.tsx" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-4" data-id="j28jp4ucs" data-path="src/components/QuestSystem.tsx">
            <div className="space-y-3" data-id="8em0v6mvw" data-path="src/components/QuestSystem.tsx">
              {weeklyQuests.map((quest) =>
              <QuestCard key={quest.id} quest={quest} data-id="h4zv8h6ct" data-path="src/components/QuestSystem.tsx" />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>);

};

export default QuestSystem;