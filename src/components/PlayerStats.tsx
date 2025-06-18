import React from 'react';
import { motion } from 'motion/react';
import { User, Zap, Trophy, Target, Calendar, TrendingUp, Award, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Task } from '@/types';
import { getLevelInfo, getRankInfo, calculateTaskXP, calculateStreak, getWeeklyXP } from '@/utils/xpSystem';

interface PlayerStatsProps {
  tasks: Task[];
  totalXP: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ tasks, totalXP }) => {
  const levelInfo = getLevelInfo(totalXP);
  const rankInfo = getRankInfo(totalXP);
  const streak = calculateStreak(tasks);
  const weeklyXP = getWeeklyXP(tasks);

  const completedTasks = tasks.filter((task) => task.status === 'completed');
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? completedTasks.length / totalTasks * 100 : 0;

  // Calculate productivity score (combination of completion rate, streak, and recent activity)
  const recentTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return taskDate >= weekAgo;
  });

  const productivityScore = Math.min(
    Math.round(
      completionRate * 0.4 +
      Math.min(streak, 30) * 2 +
      Math.min(recentTasks.length, 20) * 1.5
    ),
    100
  );

  // Get player titles based on achievements
  const getPlayerTitles = () => {
    const titles = [];

    if (streak >= 30) titles.push('Streak Master');
    if (completedTasks.length >= 100) titles.push('Century Club');
    if (totalXP >= 1000) titles.push('XP Collector');
    if (productivityScore >= 90) titles.push('Productivity Pro');
    if (levelInfo.level >= 10) titles.push('Level Legend');

    return titles.length > 0 ? titles : ['Rookie Shadow'];
  };

  const playerTitles = getPlayerTitles();

  // Category breakdown
  const categoryStats = Object.entries(
    tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = { total: 0, completed: 0 };
      }
      acc[task.category].total++;
      if (task.status === 'completed') {
        acc[task.category].completed++;
      }
      return acc;
    }, {} as Record<string, {total: number;completed: number;}>)
  ).map(([category, stats]) => ({
    category,
    ...stats,
    rate: stats.total > 0 ? stats.completed / stats.total * 100 : 0
  }));

  // Priority breakdown
  const priorityStats = ['Boss', 'High', 'Medium', 'Low'].map((priority) => {
    const priorityTasks = tasks.filter((task) => task.priority === priority);
    const completed = priorityTasks.filter((task) => task.status === 'completed').length;
    return {
      priority,
      total: priorityTasks.length,
      completed,
      rate: priorityTasks.length > 0 ? completed / priorityTasks.length * 100 : 0
    };
  }).filter((stat) => stat.total > 0);

  return (
    <div className="space-y-6" data-id="5039gd873" data-path="src/components/PlayerStats.tsx">
      {/* Header */}
      <div className="flex items-center justify-between" data-id="6fakk8ftv" data-path="src/components/PlayerStats.tsx">
        <div data-id="tszqzx16z" data-path="src/components/PlayerStats.tsx">
          <h1 className="text-3xl font-bold orbitron text-white mb-2" data-id="ek8vtr839" data-path="src/components/PlayerStats.tsx">Player Profile</h1>
          <p className="text-gray-300" data-id="fk80gpmbn" data-path="src/components/PlayerStats.tsx">Your complete productivity statistics and achievements</p>
        </div>
        <div className="text-right" data-id="onhulvt6c" data-path="src/components/PlayerStats.tsx">
          <div className="text-sm text-gray-400" data-id="0b1jhsyae" data-path="src/components/PlayerStats.tsx">Productivity Score</div>
          <div className={`text-2xl font-bold orbitron ${
          productivityScore >= 80 ? 'text-green-400' :
          productivityScore >= 60 ? 'text-yellow-400' :
          'text-red-400'}`
          } data-id="1rdykyk4o" data-path="src/components/PlayerStats.tsx">
            {productivityScore}/100
          </div>
        </div>
      </div>

      {/* Player Card */}
      <Card className="bg-gray-800/80 border-gray-700/50" data-id="vyk46uoai" data-path="src/components/PlayerStats.tsx">
        <CardContent className="p-8" data-id="l4xvs8h19" data-path="src/components/PlayerStats.tsx">
          <div className="flex items-center gap-6 mb-6" data-id="f9ygphygk" data-path="src/components/PlayerStats.tsx">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl font-bold text-white" data-id="kba9f8r0h" data-path="src/components/PlayerStats.tsx">
              {levelInfo.level}
            </div>
            
            {/* Player Info */}
            <div className="flex-1" data-id="c9o9cao6y" data-path="src/components/PlayerStats.tsx">
              <div className="flex items-center gap-3 mb-2" data-id="zb2a72vev" data-path="src/components/PlayerStats.tsx">
                <h2 className="text-2xl font-bold text-white" data-id="8fkogmr5d" data-path="src/components/PlayerStats.tsx">Shadow Operative</h2>
                <Badge variant="outline" className="text-green-400 border-green-400" data-id="xil7xxk44" data-path="src/components/PlayerStats.tsx">
                  Level {levelInfo.level}
                </Badge>
                <Badge variant="outline" className="text-purple-400 border-purple-400" data-id="nirf846g1" data-path="src/components/PlayerStats.tsx">
                  {rankInfo.rank}
                </Badge>
              </div>
              
              {/* Player Titles */}
              <div className="flex flex-wrap gap-2 mb-3" data-id="a40r40d94" data-path="src/components/PlayerStats.tsx">
                {playerTitles.map((title, index) =>
                <Badge key={index} variant="secondary" className="text-xs" data-id="1gettmtqm" data-path="src/components/PlayerStats.tsx">
                    {title}
                  </Badge>
                )}
              </div>
              
              {/* XP Progress */}
              <div className="space-y-2" data-id="d33efkczb" data-path="src/components/PlayerStats.tsx">
                <div className="flex justify-between text-sm" data-id="qmyfpt9zo" data-path="src/components/PlayerStats.tsx">
                  <span className="text-gray-300" data-id="mbari57yr" data-path="src/components/PlayerStats.tsx">Level Progress</span>
                  <span className="text-green-400" data-id="eibvrb1vj" data-path="src/components/PlayerStats.tsx">
                    {levelInfo.currentXP} / {levelInfo.xpToNext} XP
                  </span>
                </div>
                <Progress value={levelInfo.progress} className="h-2" data-id="i1i93j0p3" data-path="src/components/PlayerStats.tsx" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-id="45sijun77" data-path="src/components/PlayerStats.tsx">
            <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20" data-id="hcmim2ies" data-path="src/components/PlayerStats.tsx">
              <Zap className="w-6 h-6 mx-auto mb-2 text-green-400" data-id="l1d0napd4" data-path="src/components/PlayerStats.tsx" />
              <div className="text-xl font-bold text-green-400" data-id="j0j5hdcxv" data-path="src/components/PlayerStats.tsx">{totalXP.toLocaleString()}</div>
              <div className="text-xs text-gray-400" data-id="gifqsbyjg" data-path="src/components/PlayerStats.tsx">Total XP</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20" data-id="780m83wid" data-path="src/components/PlayerStats.tsx">
              <Target className="w-6 h-6 mx-auto mb-2 text-blue-400" data-id="ghdje7a8d" data-path="src/components/PlayerStats.tsx" />
              <div className="text-xl font-bold text-blue-400" data-id="bisixk44a" data-path="src/components/PlayerStats.tsx">{completedTasks.length}</div>
              <div className="text-xs text-gray-400" data-id="orms8p0go" data-path="src/components/PlayerStats.tsx">Completed</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20" data-id="9ij4tc38c" data-path="src/components/PlayerStats.tsx">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-yellow-400" data-id="de4woqqla" data-path="src/components/PlayerStats.tsx" />
              <div className="text-xl font-bold text-yellow-400" data-id="wmyc95u6h" data-path="src/components/PlayerStats.tsx">{streak}</div>
              <div className="text-xs text-gray-400" data-id="ascc1q8vb" data-path="src/components/PlayerStats.tsx">Day Streak</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20" data-id="117v4qa7j" data-path="src/components/PlayerStats.tsx">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-purple-400" data-id="8q1kqligv" data-path="src/components/PlayerStats.tsx" />
              <div className="text-xl font-bold text-purple-400" data-id="7uro54epr" data-path="src/components/PlayerStats.tsx">{completionRate.toFixed(1)}%</div>
              <div className="text-xs text-gray-400" data-id="99veoql4l" data-path="src/components/PlayerStats.tsx">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="ye8mgzt1q" data-path="src/components/PlayerStats.tsx">
        {/* Performance Metrics */}
        <Card className="bg-gray-800/80 border-gray-700/50" data-id="nqvu15a9t" data-path="src/components/PlayerStats.tsx">
          <CardHeader data-id="hpf7d4k3h" data-path="src/components/PlayerStats.tsx">
            <CardTitle className="text-white flex items-center gap-2" data-id="w1av21ljz" data-path="src/components/PlayerStats.tsx">
              <TrendingUp className="w-5 h-5 text-green-400" data-id="gms1174y6" data-path="src/components/PlayerStats.tsx" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="whx2e4tjz" data-path="src/components/PlayerStats.tsx">
            <div className="flex justify-between items-center" data-id="oixqv3sz8" data-path="src/components/PlayerStats.tsx">
              <span className="text-gray-300" data-id="v5p5j9l83" data-path="src/components/PlayerStats.tsx">Weekly XP</span>
              <span className="text-green-400 font-mono" data-id="xs4eccuu7" data-path="src/components/PlayerStats.tsx">{weeklyXP}</span>
            </div>
            <div className="flex justify-between items-center" data-id="8yazjblrf" data-path="src/components/PlayerStats.tsx">
              <span className="text-gray-300" data-id="ejcnxhi5y" data-path="src/components/PlayerStats.tsx">Average XP/Task</span>
              <span className="text-green-400 font-mono" data-id="k8soo5tkz" data-path="src/components/PlayerStats.tsx">
                {completedTasks.length > 0 ? Math.round(totalXP / completedTasks.length) : 0}
              </span>
            </div>
            <div className="flex justify-between items-center" data-id="f7dotoz3z" data-path="src/components/PlayerStats.tsx">
              <span className="text-gray-300" data-id="10pgmuldo" data-path="src/components/PlayerStats.tsx">Tasks This Week</span>
              <span className="text-blue-400 font-mono" data-id="r4doqip8v" data-path="src/components/PlayerStats.tsx">{recentTasks.length}</span>
            </div>
            <div className="flex justify-between items-center" data-id="r25ocyr8j" data-path="src/components/PlayerStats.tsx">
              <span className="text-gray-300" data-id="x14pkhx50" data-path="src/components/PlayerStats.tsx">Best Streak</span>
              <span className="text-yellow-400 font-mono" data-id="ya319kj29" data-path="src/components/PlayerStats.tsx">{streak} days</span>
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="bg-gray-800/80 border-gray-700/50" data-id="f39tt1v5a" data-path="src/components/PlayerStats.tsx">
          <CardHeader data-id="jgrqr1ila" data-path="src/components/PlayerStats.tsx">
            <CardTitle className="text-white flex items-center gap-2" data-id="wkq4t8aq5" data-path="src/components/PlayerStats.tsx">
              <Award className="w-5 h-5 text-green-400" data-id="kvy5508r8" data-path="src/components/PlayerStats.tsx" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent data-id="dzxw8lb79" data-path="src/components/PlayerStats.tsx">
            <div className="space-y-3" data-id="gcd7qh2fj" data-path="src/components/PlayerStats.tsx">
              {categoryStats.map((category) =>
              <div key={category.category} className="space-y-2" data-id="bq5wcc29j" data-path="src/components/PlayerStats.tsx">
                  <div className="flex justify-between text-sm" data-id="hz9169q85" data-path="src/components/PlayerStats.tsx">
                    <span className="text-gray-300" data-id="z3p75htue" data-path="src/components/PlayerStats.tsx">{category.category}</span>
                    <span className="text-gray-400" data-id="qtlaodkyv" data-path="src/components/PlayerStats.tsx">
                      {category.completed}/{category.total} ({category.rate.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={category.rate} className="h-2" data-id="gcl8zz2c0" data-path="src/components/PlayerStats.tsx" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card className="bg-gray-800/80 border-gray-700/50" data-id="xffe44ypa" data-path="src/components/PlayerStats.tsx">
          <CardHeader data-id="ne9c057fu" data-path="src/components/PlayerStats.tsx">
            <CardTitle className="text-white flex items-center gap-2" data-id="hipp6bqg1" data-path="src/components/PlayerStats.tsx">
              <Crown className="w-5 h-5 text-green-400" data-id="mceanvqc7" data-path="src/components/PlayerStats.tsx" />
              Priority Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent data-id="u6nb83ep4" data-path="src/components/PlayerStats.tsx">
            <div className="space-y-4" data-id="clvw2l3ut" data-path="src/components/PlayerStats.tsx">
              {priorityStats.map((priority) =>
              <div key={priority.priority} className="flex items-center justify-between" data-id="g4gz38gii" data-path="src/components/PlayerStats.tsx">
                  <div className="flex items-center gap-3" data-id="h40eaztu3" data-path="src/components/PlayerStats.tsx">
                    <Badge variant="outline" className={`
                      ${priority.priority === 'Boss' ? 'border-purple-400 text-purple-400' :
                  priority.priority === 'High' ? 'border-red-400 text-red-400' :
                  priority.priority === 'Medium' ? 'border-yellow-400 text-yellow-400' :
                  'border-green-400 text-green-400'}
                    `} data-id="cs8om0phf" data-path="src/components/PlayerStats.tsx">
                      {priority.priority}
                    </Badge>
                    <span className="text-gray-300 text-sm" data-id="5fc1xil29" data-path="src/components/PlayerStats.tsx">
                      {priority.completed}/{priority.total}
                    </span>
                  </div>
                  <span className={`font-mono text-sm ${
                priority.rate >= 80 ? 'text-green-400' :
                priority.rate >= 60 ? 'text-yellow-400' :
                'text-red-400'}`
                } data-id="x3jmflmr3" data-path="src/components/PlayerStats.tsx">
                    {priority.rate.toFixed(0)}%
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800/80 border-gray-700/50" data-id="msoswtmfa" data-path="src/components/PlayerStats.tsx">
          <CardHeader data-id="reb1o6s3h" data-path="src/components/PlayerStats.tsx">
            <CardTitle className="text-white flex items-center gap-2" data-id="tw60w19mr" data-path="src/components/PlayerStats.tsx">
              <Calendar className="w-5 h-5 text-green-400" data-id="1o6fsdmef" data-path="src/components/PlayerStats.tsx" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent data-id="112lrb32q" data-path="src/components/PlayerStats.tsx">
            <div className="space-y-3" data-id="cssltpbs9" data-path="src/components/PlayerStats.tsx">
              {tasks.
              filter((task) => task.status === 'completed').
              slice(0, 5).
              map((task) =>
              <div key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-700/30" data-id="ms9perfpp" data-path="src/components/PlayerStats.tsx">
                    <div className="flex-1 min-w-0" data-id="efulejmn5" data-path="src/components/PlayerStats.tsx">
                      <div className="font-medium text-white text-sm truncate" data-id="8qc8h44wl" data-path="src/components/PlayerStats.tsx">
                        {task.title}
                      </div>
                      <div className="text-xs text-gray-400" data-id="vquqoptg1" data-path="src/components/PlayerStats.tsx">
                        {new Date(task.completedAt || task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs" data-id="tsfztyd22" data-path="src/components/PlayerStats.tsx">
                      +{calculateTaskXP(task)} XP
                    </Badge>
                  </div>
              )
              }
              
              {completedTasks.length === 0 &&
              <div className="text-center py-4 text-gray-500" data-id="53zxkm49v" data-path="src/components/PlayerStats.tsx">
                  <Target className="w-8 h-8 mx-auto mb-2 opacity-50" data-id="pnj9lxdj9" data-path="src/components/PlayerStats.tsx" />
                  <p className="text-sm" data-id="4e7gke73h" data-path="src/components/PlayerStats.tsx">No completed tasks yet</p>
                </div>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default PlayerStats;