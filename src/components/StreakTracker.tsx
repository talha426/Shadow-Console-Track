import React from 'react';
import { motion } from 'motion/react';
import { Flame, Calendar, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';
import { calculateStreak } from '@/utils/xpSystem';

interface StreakTrackerProps {
  tasks: Task[];
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ tasks }) => {
  const currentStreak = calculateStreak(tasks);
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  // Calculate streak history for the last 30 days
  const today = new Date();
  const streakHistory = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toDateString();

    const hasCompletedTask = completedTasks.some((task) => {
      const completedDate = new Date(task.completedAt || task.dueDate);
      return completedDate.toDateString() === dateString;
    });

    streakHistory.push({
      date: date,
      hasTask: hasCompletedTask,
      dayName: date.toLocaleDateString('en', { weekday: 'short' }),
      dayNumber: date.getDate()
    });
  }

  // Calculate best streak
  let bestStreak = 0;
  let currentCount = 0;

  for (const day of streakHistory) {
    if (day.hasTask) {
      currentCount++;
      bestStreak = Math.max(bestStreak, currentCount);
    } else {
      currentCount = 0;
    }
  }

  // Calculate weekly completion rate
  const lastWeek = streakHistory.slice(-7);
  const weeklyCompletionRate = lastWeek.filter((day) => day.hasTask).length / 7 * 100;

  return (
    <Card className="bg-gray-800/80 border-gray-700/50" data-id="bld35p7eu" data-path="src/components/StreakTracker.tsx">
      <CardHeader data-id="b1fisomfg" data-path="src/components/StreakTracker.tsx">
        <CardTitle className="text-white flex items-center gap-2" data-id="i8wqquyy3" data-path="src/components/StreakTracker.tsx">
          <Flame className="w-5 h-5 text-orange-400" data-id="c7sb622v7" data-path="src/components/StreakTracker.tsx" />
          Productivity Streak
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6" data-id="fegtmjsw2" data-path="src/components/StreakTracker.tsx">
        {/* Current Streak Display */}
        <div className="text-center" data-id="xv6qh9boj" data-path="src/components/StreakTracker.tsx">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative" data-id="r489ut952" data-path="src/components/StreakTracker.tsx">

            <div className="w-32 h-32 mx-auto mb-4 relative" data-id="93yt34agj" data-path="src/components/StreakTracker.tsx">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-red-500 opacity-20" data-id="743ia8kiq" data-path="src/components/StreakTracker.tsx"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center" data-id="bpphg4xzi" data-path="src/components/StreakTracker.tsx">
                <div className="text-center" data-id="m4ulrxlhn" data-path="src/components/StreakTracker.tsx">
                  <div className="text-3xl font-bold text-white" data-id="apclku1ot" data-path="src/components/StreakTracker.tsx">{currentStreak}</div>
                  <div className="text-xs text-orange-200" data-id="1slee50as" data-path="src/components/StreakTracker.tsx">Days</div>
                </div>
              </div>
              {currentStreak > 0 &&
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-orange-400 border-t-transparent" data-id="56ycr61ou" data-path="src/components/StreakTracker.tsx" />

              }
            </div>
          </motion.div>
          
          <h3 className="text-xl font-semibold text-white mb-2" data-id="ys4og5anq" data-path="src/components/StreakTracker.tsx">
            {currentStreak === 0 ? 'Start Your Streak!' :
            currentStreak === 1 ? 'Great Start!' :
            currentStreak < 7 ? 'Building Momentum!' :
            currentStreak < 30 ? 'On Fire!' :
            'Legendary Streak!'}
          </h3>
          
          <p className="text-gray-400 text-sm" data-id="b3dmwmhvh" data-path="src/components/StreakTracker.tsx">
            {currentStreak === 0 ?
            'Complete a task today to start your streak' :
            `Keep it up! You're ${currentStreak} day${currentStreak !== 1 ? 's' : ''} strong`
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4" data-id="ak6pbguz0" data-path="src/components/StreakTracker.tsx">
          <div className="text-center p-3 rounded-lg bg-gray-700/30" data-id="fbpij3cst" data-path="src/components/StreakTracker.tsx">
            <div className="text-lg font-bold text-orange-400" data-id="brjf6uyyb" data-path="src/components/StreakTracker.tsx">{bestStreak}</div>
            <div className="text-xs text-gray-400" data-id="e0vyvqquw" data-path="src/components/StreakTracker.tsx">Best Streak</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-gray-700/30" data-id="i3evbrus0" data-path="src/components/StreakTracker.tsx">
            <div className="text-lg font-bold text-green-400" data-id="t8dab9hs1" data-path="src/components/StreakTracker.tsx">{weeklyCompletionRate.toFixed(0)}%</div>
            <div className="text-xs text-gray-400" data-id="qr1n3l9u7" data-path="src/components/StreakTracker.tsx">This Week</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-gray-700/30" data-id="955kz1nj2" data-path="src/components/StreakTracker.tsx">
            <div className="text-lg font-bold text-blue-400" data-id="nqj9ytue5" data-path="src/components/StreakTracker.tsx">{completedTasks.length}</div>
            <div className="text-xs text-gray-400" data-id="8w574r6lr" data-path="src/components/StreakTracker.tsx">Total Tasks</div>
          </div>
        </div>

        {/* Streak Calendar */}
        <div data-id="qm3c3rl75" data-path="src/components/StreakTracker.tsx">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2" data-id="kiqs23eij" data-path="src/components/StreakTracker.tsx">
            <Calendar className="w-4 h-4" data-id="qxr4mq55y" data-path="src/components/StreakTracker.tsx" />
            Last 30 Days
          </h4>
          
          <div className="grid grid-cols-7 gap-1 mb-2" data-id="cwtvchfs1" data-path="src/components/StreakTracker.tsx">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) =>
            <div key={index} className="text-center text-xs text-gray-400 py-1" data-id="30ayp7ldl" data-path="src/components/StreakTracker.tsx">
                {day}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-7 gap-1" data-id="hletikyzw" data-path="src/components/StreakTracker.tsx">
            {streakHistory.map((day, index) => {
              const isToday = day.date.toDateString() === today.toDateString();

              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className={`
                    aspect-square rounded-md flex items-center justify-center text-xs font-medium
                    border transition-all duration-200 hover:scale-110
                    ${day.hasTask ?
                  'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-400 shadow-lg' :
                  'bg-gray-700/50 text-gray-400 border-gray-600'}
                    ${
                  isToday ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-800' : ''}
                  `}
                  title={`${day.date.toLocaleDateString()} - ${day.hasTask ? 'Completed' : 'No tasks'}`} data-id="k25xsf1s9" data-path="src/components/StreakTracker.tsx">

                  {day.dayNumber}
                </motion.div>);

            })}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20" data-id="iukayuucq" data-path="src/components/StreakTracker.tsx">
          <div className="flex items-center justify-center gap-2 mb-2" data-id="73cspffnq" data-path="src/components/StreakTracker.tsx">
            <Target className="w-4 h-4 text-orange-400" data-id="b9i1ie8mc" data-path="src/components/StreakTracker.tsx" />
            <span className="text-sm font-medium text-orange-300" data-id="rm91usfq0" data-path="src/components/StreakTracker.tsx">
              {currentStreak >= 7 ? 'Streak Master!' :
              currentStreak >= 3 ? 'Keep it up!' :
              'Start your journey!'}
            </span>
          </div>
          
          <p className="text-xs text-gray-400" data-id="n2uiwtp59" data-path="src/components/StreakTracker.tsx">
            {currentStreak === 0 ?
            'Every master was once a disaster. Start today!' :
            currentStreak < 7 ?
            'Consistency is key. You\'re building great habits!' :
            currentStreak < 30 ?
            'You\'re in the zone! This streak is impressive!' :
            'Legendary dedication! You\'re an inspiration!'
            }
          </p>
        </div>

        {/* Streak Milestones */}
        <div data-id="opvewx0zw" data-path="src/components/StreakTracker.tsx">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2" data-id="284yaxsy8" data-path="src/components/StreakTracker.tsx">
            <TrendingUp className="w-4 h-4" data-id="nru7sapwi" data-path="src/components/StreakTracker.tsx" />
            Milestones
          </h4>
          
          <div className="space-y-2" data-id="r9c64oq0l" data-path="src/components/StreakTracker.tsx">
            {[
            { days: 3, title: 'Getting Started', reward: '50 XP' },
            { days: 7, title: 'Week Warrior', reward: '150 XP' },
            { days: 14, title: 'Fortnight Fighter', reward: '300 XP' },
            { days: 30, title: 'Monthly Master', reward: '500 XP' },
            { days: 100, title: 'Century Champion', reward: '1000 XP' }].
            map((milestone) => {
              const achieved = currentStreak >= milestone.days;
              const isNext = !achieved && bestStreak < milestone.days;

              return (
                <div
                  key={milestone.days}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border transition-all
                    ${achieved ?
                  'bg-green-500/10 border-green-500/30 text-green-300' :
                  isNext ?
                  'bg-orange-500/10 border-orange-500/30 text-orange-300' :
                  'bg-gray-700/30 border-gray-600 text-gray-400'}
                  `
                  } data-id="v50fygxcz" data-path="src/components/StreakTracker.tsx">

                  <div className="flex items-center gap-3" data-id="y2a39wjkv" data-path="src/components/StreakTracker.tsx">
                    <div className={`w-2 h-2 rounded-full ${achieved ? 'bg-green-400' : 'bg-gray-500'}`} data-id="38g1nm7o5" data-path="src/components/StreakTracker.tsx" />
                    <div data-id="tr8pi9kjg" data-path="src/components/StreakTracker.tsx">
                      <div className="font-medium" data-id="73ihhfj1g" data-path="src/components/StreakTracker.tsx">{milestone.title}</div>
                      <div className="text-xs opacity-70" data-id="wd21ehjl9" data-path="src/components/StreakTracker.tsx">{milestone.days} days</div>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className={achieved ? 'border-green-400 text-green-400' : ''} data-id="0y2wzckm8" data-path="src/components/StreakTracker.tsx">
                    {milestone.reward}
                  </Badge>
                </div>);

            })}
          </div>
        </div>
      </CardContent>
    </Card>);

};

export default StreakTracker;