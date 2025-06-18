import React, { useState } from 'react';
import { Task } from '@/types';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Target, Calendar, Clock, Filter, Zap } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StatBoardProps {
  tasks: Task[];
}

const StatBoard: React.FC<StatBoardProps> = ({ tasks }) => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | '3month'>('month');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Get filtered date range
  const getDateRange = () => {
    const now = new Date();
    switch (timeFilter) {
      case 'week':
        return { start: startOfWeek(now), end: endOfWeek(now) };
      case 'month':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case '3month':
        return { start: startOfMonth(subMonths(now, 2)), end: endOfMonth(now) };
      default:
        return { start: startOfMonth(now), end: endOfMonth(now) };
    }
  };

  const { start: dateStart, end: dateEnd } = getDateRange();

  // Filter tasks by date and category
  const filteredTasks = tasks.filter((task) => {
    const taskDate = task.completedAt || task.createdAt;
    const inDateRange = taskDate >= dateStart && taskDate <= dateEnd;
    const inCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return inDateRange && inCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(tasks.map((task) => task.category)));

  // Productivity over time data
  const productivityData = (() => {
    const days = eachDayOfInterval({ start: dateStart, end: dateEnd });
    return days.map((day) => {
      const dayTasks = filteredTasks.filter((task) => {
        const taskDate = task.completedAt || task.createdAt;
        return format(taskDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      });
      const completed = dayTasks.filter((t) => t.status === 'Completed').length;
      const total = dayTasks.length;
      const score = total > 0 ? completed / total * 100 : 0;
      const xp = dayTasks.filter((t) => t.status === 'Completed').reduce((sum, t) => sum + t.xpValue, 0);

      return {
        date: format(day, 'MMM dd'),
        score: Math.round(score),
        completed,
        total,
        xp
      };
    });
  })();

  // Category distribution data
  const categoryData = categories.map((category) => {
    const categoryTasks = filteredTasks.filter((task) => task.category === category);
    const completedTasks = categoryTasks.filter((task) => task.status === 'Completed');
    const totalXP = completedTasks.reduce((sum, task) => sum + task.xpValue, 0);

    return {
      name: category,
      completed: completedTasks.length,
      total: categoryTasks.length,
      xp: totalXP,
      percentage: categoryTasks.length > 0 ? completedTasks.length / categoryTasks.length * 100 : 0
    };
  });

  // Weekly completion data
  const weeklyData = (() => {
    const weeks = [];
    const current = new Date(dateEnd);
    const weeksToShow = timeFilter === 'week' ? 4 : timeFilter === 'month' ? 8 : 12;

    for (let i = 0; i < weeksToShow; i++) {
      const weekStart = startOfWeek(current);
      const weekEnd = endOfWeek(current);

      const weekTasks = filteredTasks.filter((task) => {
        const taskDate = task.completedAt || task.createdAt;
        return taskDate >= weekStart && taskDate <= weekEnd;
      });

      const completed = weekTasks.filter((t) => t.status === 'Completed').length;
      const inProgress = weekTasks.filter((t) => t.status === 'In Progress').length;
      const notStarted = weekTasks.filter((t) => t.status === 'Not Started').length;

      weeks.unshift({
        week: format(weekStart, 'MMM dd'),
        completed,
        inProgress,
        notStarted,
        total: weekTasks.length
      });

      current.setDate(current.getDate() - 7);
    }

    return weeks;
  })();

  // Priority distribution
  const priorityData = ['S', 'A', 'B', 'C', 'D', 'E'].map((priority) => {
    const priorityTasks = filteredTasks.filter((task) => task.priority === priority);
    const completed = priorityTasks.filter((task) => task.status === 'Completed').length;

    return {
      priority: `${priority}-Rank`,
      completed,
      total: priorityTasks.length,
      percentage: priorityTasks.length > 0 ? completed / priorityTasks.length * 100 : 0
    };
  }).filter((item) => item.total > 0);

  // Stats summary
  const totalCompleted = filteredTasks.filter((t) => t.status === 'Completed').length;
  const totalXP = filteredTasks.filter((t) => t.status === 'Completed').reduce((sum, t) => sum + t.xpValue, 0);
  const avgCompletionRate = filteredTasks.length > 0 ? totalCompleted / filteredTasks.length * 100 : 0;
  const avgXPPerTask = totalCompleted > 0 ? totalXP / totalCompleted : 0;

  const COLORS = ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];

  return (
    <div className="space-y-6" data-id="ha9gfunbu" data-path="src/components/StatBoard.tsx">
      {/* Header */}
      <div className="flex items-center justify-between" data-id="fbk9c3wua" data-path="src/components/StatBoard.tsx">
        <div data-id="lexs0hktu" data-path="src/components/StatBoard.tsx">
          <h1 className="text-3xl font-bold orbitron text-white mb-2" data-id="dppre7i7f" data-path="src/components/StatBoard.tsx">StatBoard</h1>
          <p className="text-gray-300" data-id="ctow70m68" data-path="src/components/StatBoard.tsx">Advanced productivity analytics and insights</p>
        </div>
        <div className="flex items-center space-x-4" data-id="yzfb380rj" data-path="src/components/StatBoard.tsx">
          <div className="flex items-center space-x-2" data-id="s45d5y3z8" data-path="src/components/StatBoard.tsx">
            <Filter className="w-4 h-4 text-gray-400" data-id="tziaj3ljc" data-path="src/components/StatBoard.tsx" />
            <Select value={timeFilter} onValueChange={(value: 'week' | 'month' | '3month') => setTimeFilter(value)} data-id="487uwtnv4" data-path="src/components/StatBoard.tsx">
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white" data-id="100y7xk9g" data-path="src/components/StatBoard.tsx">
                <SelectValue data-id="vjf9vk5jn" data-path="src/components/StatBoard.tsx" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600" data-id="uehnp3tbf" data-path="src/components/StatBoard.tsx">
                <SelectItem value="week" data-id="srn0exa9e" data-path="src/components/StatBoard.tsx">This Week</SelectItem>
                <SelectItem value="month" data-id="0gc2hv0fs" data-path="src/components/StatBoard.tsx">This Month</SelectItem>
                <SelectItem value="3month" data-id="ziiyhy7hh" data-path="src/components/StatBoard.tsx">3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter} data-id="tntvb8xvh" data-path="src/components/StatBoard.tsx">
            <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white" data-id="wl0adkbn4" data-path="src/components/StatBoard.tsx">
              <SelectValue placeholder="Category" data-id="ebf19hks1" data-path="src/components/StatBoard.tsx" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600" data-id="iglwvmdll" data-path="src/components/StatBoard.tsx">
              <SelectItem value="all" data-id="vwgnxzqh3" data-path="src/components/StatBoard.tsx">All Categories</SelectItem>
              {categories.map((category) =>
              <SelectItem key={category} value={category} data-id="pe0om3pgz" data-path="src/components/StatBoard.tsx">{category}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-id="ki7ymulh3" data-path="src/components/StatBoard.tsx">
        <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="86jk60by7" data-path="src/components/StatBoard.tsx">
          <div className="flex items-center justify-between mb-4" data-id="hy9znbw49" data-path="src/components/StatBoard.tsx">
            <div className="p-3 rounded-lg bg-green-600/20" data-id="cmxo0hy42" data-path="src/components/StatBoard.tsx">
              <Target className="w-6 h-6 text-green-400" data-id="9t6g4o9po" data-path="src/components/StatBoard.tsx" />
            </div>
            <div className="text-right" data-id="pwuu40acj" data-path="src/components/StatBoard.tsx">
              <div className="text-2xl font-bold orbitron text-green-300" data-id="hrbbluvb8" data-path="src/components/StatBoard.tsx">
                {avgCompletionRate.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400" data-id="xnbtv5wn4" data-path="src/components/StatBoard.tsx">Avg Completion</div>
            </div>
          </div>
        </div>

        <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="egzo52gvq" data-path="src/components/StatBoard.tsx">
          <div className="flex items-center justify-between mb-4" data-id="9nrzil6ya" data-path="src/components/StatBoard.tsx">
            <div className="p-3 rounded-lg bg-green-500/20" data-id="4pxkzy9ia" data-path="src/components/StatBoard.tsx">
              <Zap className="w-6 h-6 text-green-400" data-id="ujv2ncaso" data-path="src/components/StatBoard.tsx" />
            </div>
            <div className="text-right" data-id="k4j75x776" data-path="src/components/StatBoard.tsx">
              <div className="text-2xl font-bold orbitron text-green-300 xp-glow" data-id="my6ffussp" data-path="src/components/StatBoard.tsx">
                {totalXP}
              </div>
              <div className="text-xs text-gray-400" data-id="9fgxasr5w" data-path="src/components/StatBoard.tsx">Total XP Earned</div>
            </div>
          </div>
        </div>

        <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="tp3wl3lyu" data-path="src/components/StatBoard.tsx">
          <div className="flex items-center justify-between mb-4" data-id="7yq6g5tp6" data-path="src/components/StatBoard.tsx">
            <div className="p-3 rounded-lg bg-green-500/20" data-id="7jcltalvm" data-path="src/components/StatBoard.tsx">
              <TrendingUp className="w-6 h-6 text-green-400" data-id="f9mvw776u" data-path="src/components/StatBoard.tsx" />
            </div>
            <div className="text-right" data-id="kzcuvx050" data-path="src/components/StatBoard.tsx">
              <div className="text-2xl font-bold orbitron text-green-300" data-id="xc3wukeub" data-path="src/components/StatBoard.tsx">
                {avgXPPerTask.toFixed(0)}
              </div>
              <div className="text-xs text-gray-400" data-id="0g7bkx23e" data-path="src/components/StatBoard.tsx">Avg XP/Task</div>
            </div>
          </div>
        </div>

        <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="qxlb56if8" data-path="src/components/StatBoard.tsx">
          <div className="flex items-center justify-between mb-4" data-id="10jdqjyxy" data-path="src/components/StatBoard.tsx">
            <div className="p-3 rounded-lg bg-green-500/20" data-id="n8sysbaoq" data-path="src/components/StatBoard.tsx">
              <Clock className="w-6 h-6 text-green-400" data-id="6g2fbxx6h" data-path="src/components/StatBoard.tsx" />
            </div>
            <div className="text-right" data-id="j3dmrtq47" data-path="src/components/StatBoard.tsx">
              <div className="text-2xl font-bold orbitron text-green-300" data-id="hkszk27wv" data-path="src/components/StatBoard.tsx">
                {totalCompleted}
              </div>
              <div className="text-xs text-gray-400" data-id="m00a6inxw" data-path="src/components/StatBoard.tsx">Tasks Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="9s910v25f" data-path="src/components/StatBoard.tsx">
        {/* Productivity Score Over Time */}
        <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="orlx681t4" data-path="src/components/StatBoard.tsx">
          <h3 className="text-xl font-semibold orbitron text-white mb-6" data-id="0o3w106nh" data-path="src/components/StatBoard.tsx">Productivity Score</h3>
          <ResponsiveContainer width="100%" height={300} data-id="52nuwzp5q" data-path="src/components/StatBoard.tsx">
            <LineChart data={productivityData} data-id="sd10nccxx" data-path="src/components/StatBoard.tsx">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" data-id="wjl6r3iha" data-path="src/components/StatBoard.tsx" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} data-id="bw9a3bfsy" data-path="src/components/StatBoard.tsx" />
              <YAxis stroke="#9CA3AF" fontSize={12} data-id="9qtt0a8za" data-path="src/components/StatBoard.tsx" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #6B7280',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value, name) => [
                name === 'score' ? `${value}%` : value,
                name === 'score' ? 'Score' : name === 'xp' ? 'XP Earned' : 'Completed']} data-id="w00cbbdq1" data-path="src/components/StatBoard.tsx" />


              <Line
                type="monotone"
                dataKey="score"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }} data-id="9ef3ge54o" data-path="src/components/StatBoard.tsx" />

            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="510ybadhy" data-path="src/components/StatBoard.tsx">
          <h3 className="text-xl font-semibold orbitron text-white mb-6" data-id="vbpj5k7gj" data-path="src/components/StatBoard.tsx">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300} data-id="dibedvpnv" data-path="src/components/StatBoard.tsx">
            <PieChart data-id="va6i8unnj" data-path="src/components/StatBoard.tsx">
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="completed"
                label={({ name, percentage }) => `${name}: ${percentage.toFixed(0)}%`} data-id="m8h63sdxx" data-path="src/components/StatBoard.tsx">

                {categoryData.map((entry, index) =>
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} data-id="rh8khzmt4" data-path="src/components/StatBoard.tsx" />
                )}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #6B7280',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value, name) => [value, 'Completed Tasks']} data-id="ebmqcv5va" data-path="src/components/StatBoard.tsx" />

            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Task Completion */}
        <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="tr24hln8a" data-path="src/components/StatBoard.tsx">
          <h3 className="text-xl font-semibold orbitron text-white mb-6" data-id="rd3984vub" data-path="src/components/StatBoard.tsx">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300} data-id="zv0b38ex5" data-path="src/components/StatBoard.tsx">
            <BarChart data={weeklyData} data-id="jzqwm5tsj" data-path="src/components/StatBoard.tsx">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" data-id="mjgwb7lo6" data-path="src/components/StatBoard.tsx" />
              <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} data-id="b4qoun101" data-path="src/components/StatBoard.tsx" />
              <YAxis stroke="#9CA3AF" fontSize={12} data-id="vky04736g" data-path="src/components/StatBoard.tsx" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #6B7280',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} data-id="ug85h833i" data-path="src/components/StatBoard.tsx" />

              <Legend data-id="2brkoaine" data-path="src/components/StatBoard.tsx" />
              <Bar dataKey="completed" stackId="a" fill="#10B981" name="Completed" data-id="m02aujf9g" data-path="src/components/StatBoard.tsx" />
              <Bar dataKey="inProgress" stackId="a" fill="#F59E0B" name="In Progress" data-id="i7v0whfbg" data-path="src/components/StatBoard.tsx" />
              <Bar dataKey="notStarted" stackId="a" fill="#6B7280" name="Not Started" data-id="csfkhdlui" data-path="src/components/StatBoard.tsx" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Analysis */}
        <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="ef4pdjwzm" data-path="src/components/StatBoard.tsx">
          <h3 className="text-xl font-semibold orbitron text-white mb-6" data-id="4ai62kar6" data-path="src/components/StatBoard.tsx">Priority Analysis</h3>
          <ResponsiveContainer width="100%" height={300} data-id="e8xne6v12" data-path="src/components/StatBoard.tsx">
            <BarChart data={priorityData} layout="horizontal" data-id="uevwyd2ie" data-path="src/components/StatBoard.tsx">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" data-id="ctgoppk53" data-path="src/components/StatBoard.tsx" />
              <XAxis type="number" stroke="#9CA3AF" fontSize={12} data-id="1uvzhf9xt" data-path="src/components/StatBoard.tsx" />
              <YAxis dataKey="priority" type="category" stroke="#9CA3AF" fontSize={12} width={80} data-id="bpd9qaqs4" data-path="src/components/StatBoard.tsx" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #6B7280',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value, name) => [value, name === 'completed' ? 'Completed' : 'Total']} data-id="l2o2iylde" data-path="src/components/StatBoard.tsx" />

              <Bar dataKey="completed" fill="#10B981" data-id="knpwzcvn0" data-path="src/components/StatBoard.tsx" />
              <Bar dataKey="total" fill="#374151" data-id="7bqgy6d7k" data-path="src/components/StatBoard.tsx" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="zw6da59xd" data-path="src/components/StatBoard.tsx">
        <h3 className="text-xl font-semibold orbitron text-white mb-6" data-id="fgw6cu0ng" data-path="src/components/StatBoard.tsx">Category Breakdown</h3>
        <div className="overflow-x-auto" data-id="6exei1iza" data-path="src/components/StatBoard.tsx">
          <table className="w-full" data-id="xase1g965" data-path="src/components/StatBoard.tsx">
            <thead data-id="vehtwf6k9" data-path="src/components/StatBoard.tsx">
              <tr className="border-b border-gray-700" data-id="jyhe6c41p" data-path="src/components/StatBoard.tsx">
                <th className="text-left py-3 px-4 text-gray-300 font-medium" data-id="bqiztleyf" data-path="src/components/StatBoard.tsx">Category</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium" data-id="l0hy1yv0e" data-path="src/components/StatBoard.tsx">Completed</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium" data-id="cjwvar0l6" data-path="src/components/StatBoard.tsx">Total</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium" data-id="z5catt0tu" data-path="src/components/StatBoard.tsx">Rate</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium" data-id="f0w1zqxqe" data-path="src/components/StatBoard.tsx">XP Earned</th>
              </tr>
            </thead>
            <tbody data-id="vcbzz6zfe" data-path="src/components/StatBoard.tsx">
              {categoryData.map((category, index) =>
              <tr key={category.name} className="border-b border-gray-800 hover:bg-gray-800/30" data-id="dfm4hwi4c" data-path="src/components/StatBoard.tsx">
                  <td className="py-3 px-4" data-id="ihzx3ypxa" data-path="src/components/StatBoard.tsx">
                    <div className="flex items-center space-x-3" data-id="p8dp3byr5" data-path="src/components/StatBoard.tsx">
                      <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} data-id="o08penzca" data-path="src/components/StatBoard.tsx" />

                      <span className="text-white font-medium" data-id="16kmue5cg" data-path="src/components/StatBoard.tsx">{category.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4 text-green-400 font-mono" data-id="zvd1aky23" data-path="src/components/StatBoard.tsx">
                    {category.completed}
                  </td>
                  <td className="text-center py-3 px-4 text-gray-300 font-mono" data-id="68avn1m2v" data-path="src/components/StatBoard.tsx">
                    {category.total}
                  </td>
                  <td className="text-center py-3 px-4" data-id="a9gqoslyf" data-path="src/components/StatBoard.tsx">
                    <span className={`font-mono ${
                  category.percentage >= 80 ? 'text-green-400' :
                  category.percentage >= 60 ? 'text-yellow-400' :
                  'text-red-400'}`
                  } data-id="slsas2fjx" data-path="src/components/StatBoard.tsx">
                      {category.percentage.toFixed(1)}%
                    </span>
                  </td>
                  <td className="text-center py-3 px-4 text-green-400 font-mono xp-glow" data-id="pz4hy0lv2" data-path="src/components/StatBoard.tsx">
                    {category.xp}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

};

export default StatBoard;