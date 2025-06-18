
import React from 'react';
import { Task, PlayerData } from '@/types';
import { Target, Trophy, Zap, Calendar, TrendingUp, Clock } from 'lucide-react';
import { getRankInfo, calculateStreak, getWeeklyXP } from '@/utils/xpSystem';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from 'date-fns';

interface DashboardProps {
  tasks: Task[];
  playerData: PlayerData;
  onTaskClick?: (task: Task) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  tasks = [],
  playerData,
  onTaskClick = () => {}
}) => {
  const totalXP = playerData?.totalXP || 0;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;

  const overdueTasks = tasks.filter((task) =>
  task.status !== 'completed' &&
  task.dueDate &&
  new Date(task.dueDate) < new Date()
  ).length;

  const completionRate = tasks.length > 0 ? completedTasks / tasks.length * 100 : 0;
  const currentStreak = playerData?.currentStreak || 0;
  const weeklyXP = getWeeklyXP(tasks);
  const rankInfo = getRankInfo(totalXP);

  // Weekly activity chart data
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const weeklyActivity = weekDays.map((day) => {
    const dayTasks = tasks.filter((task) =>
    task.completedAt &&
    format(new Date(task.completedAt), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    return {
      day: format(day, 'EEE'),
      completed: dayTasks.length,
      xp: dayTasks.reduce((sum, task) => sum + (task.xpReward || 0), 0),
      isToday: isToday(day)
    };
  });

  const upcomingTasks = tasks.
  filter((task) => task.status !== 'completed').
  sort((a, b) => {
    const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
    return aDate - bDate;
  }).
  slice(0, 5);

  const currentTime = new Date();

  return (
    <div className="p-6 space-y-6" data-id="0xwc42pym" data-path="src/components/Dashboard.tsx">
      {/* Header */}
      <div className="flex items-center justify-between" data-id="24v49m99y" data-path="src/components/Dashboard.tsx">
        <div data-id="93lhij55v" data-path="src/components/Dashboard.tsx">
          <h1 className="text-3xl font-bold text-white mb-2" data-id="fuzxw6mom" data-path="src/components/Dashboard.tsx">🎯 Command Center</h1>
          <p className="text-gray-300" data-id="tpmqhkv10" data-path="src/components/Dashboard.tsx">Welcome back, {playerData?.name || 'Shadow Operative'}. Your mission stats await.</p>
        </div>
        <div className="text-right" data-id="zxafie7sf" data-path="src/components/Dashboard.tsx">
          <div className="text-sm text-gray-400" data-id="mzvj1i8ky" data-path="src/components/Dashboard.tsx">Current Time</div>
          <div className="text-lg font-mono text-purple-300" data-id="6zu5sxttj" data-path="src/components/Dashboard.tsx">
            {format(currentTime, 'HH:mm:ss')}
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-id="ee9skat4g" data-path="src/components/Dashboard.tsx">
        <div className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-lg" data-id="ivpgiecfg" data-path="src/components/Dashboard.tsx">
          <div className="flex items-center justify-between mb-4" data-id="nb62ah0ug" data-path="src/components/Dashboard.tsx">
            <div className="p-3 rounded-lg bg-purple-600/20" data-id="eywrsqm4t" data-path="src/components/Dashboard.tsx">
              <Trophy className="w-6 h-6 text-purple-400" data-id="8lsd7r2le" data-path="src/components/Dashboard.tsx" />
            </div>
            <div className="text-right" data-id="5n4a7crge" data-path="src/components/Dashboard.tsx">
              <div className="text-2xl font-bold text-purple-300" data-id="rjbgem3x2" data-path="src/components/Dashboard.tsx">
                {rankInfo.rank}
              </div>
              <div className="text-xs text-gray-400" data-id="v7zb40ru2" data-path="src/components/Dashboard.tsx">Current Rank</div>
            </div>
          </div>
          <div className="mb-3" data-id="wkt3w4uot" data-path="src/components/Dashboard.tsx">
            <div className="flex justify-between text-sm mb-1" data-id="opkb0npyx" data-path="src/components/Dashboard.tsx">
              <span className="text-gray-300" data-id="z1j5r7mfm" data-path="src/components/Dashboard.tsx">Progress</span>
              <span className="text-purple-300" data-id="52d3uto5e" data-path="src/components/Dashboard.tsx">{rankInfo.currentXP}/{rankInfo.nextLevelXP}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2" data-id="l03rvjy6p" data-path="src/components/Dashboard.tsx">
              <div
                className="bg-gradient-to-r from-purple-600 to-cyan-400 h-2 rounded-full"
                style={{ width: `${rankInfo.currentXP / rankInfo.nextLevelXP * 100}%` }} data-id="6bc7mqb44" data-path="src/components/Dashboard.tsx" />

            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-lg" data-id="1b5th4hok" data-path="src/components/Dashboard.tsx">
          <div className="flex items-center justify-between mb-4" data-id="sydbudh4c" data-path="src/components/Dashboard.tsx">
            <div className="p-3 rounded-lg bg-cyan-500/20" data-id="qxe5aakst" data-path="src/components/Dashboard.tsx">
              <Zap className="w-6 h-6 text-cyan-400" data-id="z6qvcgca7" data-path="src/components/Dashboard.tsx" />
            </div>
            <div className="text-right" data-id="bvlk1okxw" data-path="src/components/Dashboard.tsx">
              <div className="text-2xl font-bold text-cyan-300" data-id="xnju7jinr" data-path="src/components/Dashboard.tsx">
                {totalXP}
              </div>
              <div className="text-xs text-gray-400" data-id="cuzu5cz7z" data-path="src/components/Dashboard.tsx">Total XP</div>
            </div>
          </div>
          <div className="text-sm text-gray-300" data-id="oxy7ypjip" data-path="src/components/Dashboard.tsx">
            <span className="text-cyan-300" data-id="jep7zhdz4" data-path="src/components/Dashboard.tsx">+{weeklyXP}</span> this week
          </div>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-lg" data-id="rmk3rupfl" data-path="src/components/Dashboard.tsx">
          <div className="flex items-center justify-between mb-4" data-id="81wmggmt6" data-path="src/components/Dashboard.tsx">
            <div className="p-3 rounded-lg bg-green-500/20" data-id="m8gebqi21" data-path="src/components/Dashboard.tsx">
              <Target className="w-6 h-6 text-green-400" data-id="2424wqveh" data-path="src/components/Dashboard.tsx" />
            </div>
            <div className="text-right" data-id="9x4u027bb" data-path="src/components/Dashboard.tsx">
              <div className="text-2xl font-bold text-green-300" data-id="3o2fb8a33" data-path="src/components/Dashboard.tsx">
                {completionRate.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400" data-id="142j1k3ak" data-path="src/components/Dashboard.tsx">Completion Rate</div>
            </div>
          </div>
          <div className="text-sm text-gray-300" data-id="ce4yl4kux" data-path="src/components/Dashboard.tsx">
            {completedTasks}/{tasks.length} missions completed
          </div>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-lg" data-id="ou0d6qdyz" data-path="src/components/Dashboard.tsx">
          <div className="flex items-center justify-between mb-4" data-id="lnysl71en" data-path="src/components/Dashboard.tsx">
            <div className="p-3 rounded-lg bg-yellow-500/20" data-id="levud3483" data-path="src/components/Dashboard.tsx">
              <TrendingUp className="w-6 h-6 text-yellow-400" data-id="mzm5oaryj" data-path="src/components/Dashboard.tsx" />
            </div>
            <div className="text-right" data-id="tdmexvwqg" data-path="src/components/Dashboard.tsx">
              <div className="text-2xl font-bold text-yellow-300" data-id="2wfmqgnh0" data-path="src/components/Dashboard.tsx">
                {currentStreak}
              </div>
              <div className="text-xs text-gray-400" data-id="y241a9x7o" data-path="src/components/Dashboard.tsx">Day Streak</div>
            </div>
          </div>
          <div className="text-sm text-gray-300" data-id="3hc17bitp" data-path="src/components/Dashboard.tsx">
            {currentStreak > 0 ? 'Keep it up!' : 'Start your streak today'}
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-lg" data-id="u5x05urn2" data-path="src/components/Dashboard.tsx">
        <h3 className="text-xl font-semibold text-white mb-6" data-id="gb2k34anh" data-path="src/components/Dashboard.tsx">📊 Weekly Activity</h3>
        <div className="grid grid-cols-7 gap-4" data-id="g2ixeyq4r" data-path="src/components/Dashboard.tsx">
          {weeklyActivity.map((day, index) =>
          <div key={index} className="text-center" data-id="kj5dju21s" data-path="src/components/Dashboard.tsx">
              <div className="text-sm text-gray-400 mb-2" data-id="9f2zz3eia" data-path="src/components/Dashboard.tsx">{day.day}</div>
              <div className={`h-16 rounded-lg flex items-end justify-center p-2 ${
            day.isToday ?
            'bg-gradient-to-t from-purple-600/30 to-purple-400/10 border border-purple-500/50' :
            'bg-gray-700/30'}`
            } data-id="ytyhdjxnx" data-path="src/components/Dashboard.tsx">
                <div className="text-center" data-id="p6pmyzj9l" data-path="src/components/Dashboard.tsx">
                  <div className="text-lg font-bold text-white" data-id="dubnn72jg" data-path="src/components/Dashboard.tsx">{day.completed}</div>
                  <div className="text-xs text-purple-300" data-id="8fkrj2xfl" data-path="src/components/Dashboard.tsx">{day.xp} XP</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mission Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="rstcubq8e" data-path="src/components/Dashboard.tsx">
        {/* Quick Stats */}
        <div className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-lg" data-id="h16wtqcw6" data-path="src/components/Dashboard.tsx">
          <h3 className="text-xl font-semibold text-white mb-6" data-id="e36g4kwx8" data-path="src/components/Dashboard.tsx">📋 Mission Status</h3>
          <div className="space-y-4" data-id="w0b4d0og2" data-path="src/components/Dashboard.tsx">
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20" data-id="ja61anovb" data-path="src/components/Dashboard.tsx">
              <div className="flex items-center space-x-3" data-id="sowd5bqaw" data-path="src/components/Dashboard.tsx">
                <Clock className="w-5 h-5 text-yellow-400" data-id="vilw0mykh" data-path="src/components/Dashboard.tsx" />
                <span className="text-white" data-id="0y7sukbfp" data-path="src/components/Dashboard.tsx">Pending</span>
              </div>
              <span className="text-xl font-bold text-yellow-400" data-id="yb8fsko1g" data-path="src/components/Dashboard.tsx">{pendingTasks}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20" data-id="c3jdrl6yc" data-path="src/components/Dashboard.tsx">
              <div className="flex items-center space-x-3" data-id="yvgdsqsil" data-path="src/components/Dashboard.tsx">
                <Clock className="w-5 h-5 text-blue-400" data-id="fe0zlib8x" data-path="src/components/Dashboard.tsx" />
                <span className="text-white" data-id="et6cjs6pv" data-path="src/components/Dashboard.tsx">In Progress</span>
              </div>
              <span className="text-xl font-bold text-blue-400" data-id="lgjydxkvl" data-path="src/components/Dashboard.tsx">{inProgressTasks}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20" data-id="1xy4n3zup" data-path="src/components/Dashboard.tsx">
              <div className="flex items-center space-x-3" data-id="z3a49bd6i" data-path="src/components/Dashboard.tsx">
                <Target className="w-5 h-5 text-green-400" data-id="7lv2ny9kf" data-path="src/components/Dashboard.tsx" />
                <span className="text-white" data-id="gcgk45dmz" data-path="src/components/Dashboard.tsx">Completed</span>
              </div>
              <span className="text-xl font-bold text-green-400" data-id="ejztrnell" data-path="src/components/Dashboard.tsx">{completedTasks}</span>
            </div>

            {overdueTasks > 0 &&
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20" data-id="dh5yfu0r7" data-path="src/components/Dashboard.tsx">
                <div className="flex items-center space-x-3" data-id="ntx6rfrsa" data-path="src/components/Dashboard.tsx">
                  <Calendar className="w-5 h-5 text-red-400" data-id="iqvq6m51c" data-path="src/components/Dashboard.tsx" />
                  <span className="text-white" data-id="g1r3e2osh" data-path="src/components/Dashboard.tsx">Overdue</span>
                </div>
                <span className="text-xl font-bold text-red-400" data-id="0kc9odex9" data-path="src/components/Dashboard.tsx">{overdueTasks}</span>
              </div>
            }
          </div>
        </div>

        {/* Upcoming Missions */}
        <div className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-lg" data-id="kh8fgvumx" data-path="src/components/Dashboard.tsx">
          <h3 className="text-xl font-semibold text-white mb-6" data-id="ovrjslxho" data-path="src/components/Dashboard.tsx">🎯 Upcoming Missions</h3>
          <div className="space-y-3" data-id="c2tbgzddn" data-path="src/components/Dashboard.tsx">
            {upcomingTasks.length === 0 ?
            <div className="text-center py-8 text-gray-400" data-id="iqcsll107" data-path="src/components/Dashboard.tsx">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" data-id="2dere9l99" data-path="src/components/Dashboard.tsx" />
                <p data-id="wrr2z3le3" data-path="src/components/Dashboard.tsx">No upcoming missions</p>
              </div> :

            upcomingTasks.map((task) =>
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() => onTaskClick(task)} data-id="x3okbwdoo" data-path="src/components/Dashboard.tsx">

                  <div data-id="kji0gm6fy" data-path="src/components/Dashboard.tsx">
                    <div className="font-medium text-white" data-id="z1gcsxtyk" data-path="src/components/Dashboard.tsx">{task.title}</div>
                    <div className="text-sm text-gray-400" data-id="79z70c151" data-path="src/components/Dashboard.tsx">
                      {task.dueDate ? `Due ${format(new Date(task.dueDate), 'MMM dd')}` : 'No due date'} • {task.category}
                    </div>
                  </div>
                  <div className="text-right" data-id="eqmik1wg7" data-path="src/components/Dashboard.tsx">
                    <div className="text-purple-300 font-mono text-sm" data-id="w5bafeuip" data-path="src/components/Dashboard.tsx">{task.xpReward || 50} XP</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                task.priority === 'urgent' ? 'text-red-400 bg-red-400/10' :
                task.priority === 'high' ? 'text-yellow-400 bg-yellow-400/10' :
                'text-purple-400 bg-purple-400/10'}`
                } data-id="jckd702km" data-path="src/components/Dashboard.tsx">
                      {task.priority}
                    </div>
                  </div>
                </div>
            )
            }
          </div>
        </div>
      </div>
    </div>);

};

export default Dashboard;