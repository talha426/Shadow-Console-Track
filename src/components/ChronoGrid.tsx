import React, { useState } from 'react';
import { Task } from '@/types';
import { Calendar, ChevronLeft, ChevronRight, Plus, Target, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, startOfWeek, endOfWeek, addMonths, subMonths, getDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getPriorityColor, getStatusColor } from '@/utils/xpSystem';

interface ChronoGridProps {
  tasks: Task[];
  onAddTask?: () => void;
  onEditTask?: (task: Task) => void;
}

const ChronoGrid: React.FC<ChronoGridProps> = ({ tasks, onAddTask, onEditTask }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.endDate);
      return date >= taskStart && date <= taskEnd;
    });
  };

  const getDateStats = (date: Date) => {
    const dateTasks = getTasksForDate(date);
    const completed = dateTasks.filter((t) => t.status === 'Completed').length;
    const inProgress = dateTasks.filter((t) => t.status === 'In Progress').length;
    const overdue = dateTasks.filter((t) => t.status !== 'Completed' && new Date() > t.endDate).length;
    const totalXP = dateTasks.filter((t) => t.status === 'Completed').reduce((sum, t) => sum + t.xpValue, 0);

    return { total: dateTasks.length, completed, inProgress, overdue, totalXP };
  };

  const getDayClassName = (date: Date) => {
    const stats = getDateStats(date);
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isCurrentDay = isToday(date);

    let baseClass = 'relative p-2 h-24 border border-gray-700/30 cursor-pointer transition-all duration-200 hover:bg-gray-700/20';

    if (!isCurrentMonth) {
      baseClass += ' opacity-40 bg-gray-800/30';
    }

    if (isSelected) {
      baseClass += ' ring-2 ring-green-500 bg-green-500/10';
    } else if (isCurrentDay) {
      baseClass += ' ring-2 ring-cyan-500 bg-cyan-500/10';
    }

    if (stats.overdue > 0 && isCurrentMonth) {
      baseClass += ' bg-red-500/10 ring-1 ring-red-500/30';
    } else if (stats.completed > 0 && stats.completed === stats.total && isCurrentMonth) {
      baseClass += ' bg-green-500/10';
    } else if (stats.inProgress > 0 && isCurrentMonth) {
      baseClass += ' bg-yellow-500/10';
    }

    return baseClass;
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="space-y-6" data-id="gck9ytixv" data-path="src/components/ChronoGrid.tsx">
      {/* Header */}
      <div className="flex items-center justify-between" data-id="fkry2r4og" data-path="src/components/ChronoGrid.tsx">
        <div data-id="cog21tn6d" data-path="src/components/ChronoGrid.tsx">
          <h1 className="text-3xl font-bold orbitron text-white mb-2" data-id="d6bflt517" data-path="src/components/ChronoGrid.tsx">Chrono Grid</h1>
          <p className="text-gray-300" data-id="zp0vr31fr" data-path="src/components/ChronoGrid.tsx">Visualize your mission timeline across the multiverse</p>
        </div>
        {onAddTask &&
        <Button
          onClick={onAddTask}
          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600" data-id="diymr8cts" data-path="src/components/ChronoGrid.tsx">

            <Plus className="w-4 h-4 mr-2" data-id="5mdfrd61a" data-path="src/components/ChronoGrid.tsx" />
            New Mission
          </Button>
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="4ieaglypx" data-path="src/components/ChronoGrid.tsx">
        {/* Calendar */}
        <div className="lg:col-span-2 card-shadow bg-gray-800/80 border border-gray-700/50" data-id="qxbf80se2" data-path="src/components/ChronoGrid.tsx">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/30" data-id="e06brk9vr" data-path="src/components/ChronoGrid.tsx">
            <h2 className="text-xl font-semibold orbitron text-white" data-id="kdmx8j8rq" data-path="src/components/ChronoGrid.tsx">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-2" data-id="qtjam19tk" data-path="src/components/ChronoGrid.tsx">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700" data-id="3xqhtkkjn" data-path="src/components/ChronoGrid.tsx">

                <ChevronLeft className="w-4 h-4" data-id="14vc2rmzu" data-path="src/components/ChronoGrid.tsx" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="border-gray-600 text-gray-300 hover:bg-gray-700" data-id="c074m09zo" data-path="src/components/ChronoGrid.tsx">

                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700" data-id="aomzgdbcc" data-path="src/components/ChronoGrid.tsx">

                <ChevronRight className="w-4 h-4" data-id="mwbt39rl6" data-path="src/components/ChronoGrid.tsx" />
              </Button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-gray-700/30" data-id="6iz7moagx" data-path="src/components/ChronoGrid.tsx">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) =>
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-400 border-r border-gray-700/30 last:border-r-0" data-id="f8fdmkz9k" data-path="src/components/ChronoGrid.tsx">
                {day}
              </div>
            )}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7" data-id="z634thryv" data-path="src/components/ChronoGrid.tsx">
            {calendarDays.map((date, index) => {
              const stats = getDateStats(date);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();

              return (
                <div
                  key={index}
                  className={getDayClassName(date)}
                  onClick={() => setSelectedDate(date)} data-id="wm2zogh9p" data-path="src/components/ChronoGrid.tsx">

                  <div className="flex justify-between items-start mb-1" data-id="5dz9zqejw" data-path="src/components/ChronoGrid.tsx">
                    <span className={`text-sm font-medium ${
                    isCurrentMonth ? 'text-white' : 'text-gray-500'} ${
                    isToday(date) ? 'text-cyan-400 font-bold' : ''}`} data-id="cf1bke7qu" data-path="src/components/ChronoGrid.tsx">
                      {format(date, 'd')}
                    </span>
                    {stats.total > 0 &&
                    <div className="flex items-center space-x-1" data-id="pkphl160t" data-path="src/components/ChronoGrid.tsx">
                        {stats.overdue > 0 &&
                      <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" data-id="tplfb1gg7" data-path="src/components/ChronoGrid.tsx" />
                      }
                        {stats.completed > 0 && stats.completed === stats.total &&
                      <div className="w-2 h-2 rounded-full bg-green-400" data-id="h2227jw8z" data-path="src/components/ChronoGrid.tsx" />
                      }
                        {stats.inProgress > 0 &&
                      <div className="w-2 h-2 rounded-full bg-yellow-400" data-id="ev33pbvei" data-path="src/components/ChronoGrid.tsx" />
                      }
                      </div>
                    }
                  </div>
                  
                  {stats.total > 0 && isCurrentMonth &&
                  <div className="space-y-1" data-id="y35vctlj7" data-path="src/components/ChronoGrid.tsx">
                      <div className="text-xs text-gray-300" data-id="9gpt061yo" data-path="src/components/ChronoGrid.tsx">
                        {stats.total} mission{stats.total !== 1 ? 's' : ''}
                      </div>
                      {stats.totalXP > 0 &&
                    <div className="text-xs text-green-300 font-mono" data-id="pmftd09jc" data-path="src/components/ChronoGrid.tsx">
                          {stats.totalXP} XP
                        </div>
                    }
                      <div className="flex space-x-1" data-id="xs7ckb93q" data-path="src/components/ChronoGrid.tsx">
                        {stats.completed > 0 &&
                      <div className="w-full bg-green-500/20 h-1 rounded-full" data-id="y77znj6d0" data-path="src/components/ChronoGrid.tsx" />
                      }
                        {stats.inProgress > 0 &&
                      <div className="w-full bg-yellow-500/20 h-1 rounded-full" data-id="6g57ywkmh" data-path="src/components/ChronoGrid.tsx" />
                      }
                        {stats.overdue > 0 &&
                      <div className="w-full bg-red-500/20 h-1 rounded-full animate-pulse" data-id="kg5zc4vng" data-path="src/components/ChronoGrid.tsx" />
                      }
                      </div>
                    </div>
                  }
                </div>);

            })}
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="space-y-6" data-id="23i03lisu" data-path="src/components/ChronoGrid.tsx">
          {/* Selected Date Info */}
          <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="6jhxdelmw" data-path="src/components/ChronoGrid.tsx">
            <div className="p-6" data-id="8pc1msk8k" data-path="src/components/ChronoGrid.tsx">
              <div className="flex items-center space-x-3 mb-4" data-id="rdikpxwl7" data-path="src/components/ChronoGrid.tsx">
                <Calendar className="w-6 h-6 text-green-400" data-id="8xcsvup9d" data-path="src/components/ChronoGrid.tsx" />
                <h3 className="text-xl font-semibold orbitron text-white" data-id="2nhlkcxyi" data-path="src/components/ChronoGrid.tsx">
                  {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select a Date'}
                </h3>
              </div>
              
              {selectedDate &&
              <div className="space-y-3" data-id="nt70hmvze" data-path="src/components/ChronoGrid.tsx">
                  <div className="grid grid-cols-2 gap-4" data-id="j4zf5bcm2" data-path="src/components/ChronoGrid.tsx">
                    <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20" data-id="1ly04raqi" data-path="src/components/ChronoGrid.tsx">
                      <div className="text-2xl font-bold text-green-400" data-id="itabtbt7e" data-path="src/components/ChronoGrid.tsx">
                        {getDateStats(selectedDate).completed}
                      </div>
                      <div className="text-xs text-gray-400" data-id="13ljl811e" data-path="src/components/ChronoGrid.tsx">Completed</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20" data-id="n50pa0tl5" data-path="src/components/ChronoGrid.tsx">
                      <div className="text-2xl font-bold text-green-400" data-id="lqrczj0re" data-path="src/components/ChronoGrid.tsx">
                        {getDateStats(selectedDate).totalXP}
                      </div>
                      <div className="text-xs text-gray-400" data-id="jh2ba1ptf" data-path="src/components/ChronoGrid.tsx">XP Earned</div>
                    </div>
                  </div>
                  
                  {getDateStats(selectedDate).overdue > 0 &&
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 alert-glow" data-id="lbwj67bgp" data-path="src/components/ChronoGrid.tsx">
                      <div className="flex items-center space-x-2" data-id="yarkh7wuw" data-path="src/components/ChronoGrid.tsx">
                        <AlertCircle className="w-4 h-4 text-red-400" data-id="u7h0xgp5h" data-path="src/components/ChronoGrid.tsx" />
                        <span className="text-red-400 font-medium" data-id="wg1mbf97t" data-path="src/components/ChronoGrid.tsx">
                          {getDateStats(selectedDate).overdue} overdue mission{getDateStats(selectedDate).overdue !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                }
                </div>
              }
            </div>
          </div>

          {/* Mission List for Selected Date */}
          {selectedDate && selectedDateTasks.length > 0 &&
          <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="3txt9hje7" data-path="src/components/ChronoGrid.tsx">
              <div className="p-6" data-id="n0ofz6h62" data-path="src/components/ChronoGrid.tsx">
                <h4 className="text-lg font-semibold orbitron text-white mb-4" data-id="58h2mdadr" data-path="src/components/ChronoGrid.tsx">
                  Daily Missions
                </h4>
                <div className="space-y-3 max-h-96 overflow-y-auto" data-id="gk7eoikaq" data-path="src/components/ChronoGrid.tsx">
                  {selectedDateTasks.map((task) =>
                <div
                  key={task.id}
                  className="p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => onEditTask?.(task)} data-id="as0yetewq" data-path="src/components/ChronoGrid.tsx">

                      <div className="flex items-start justify-between mb-2" data-id="wcgqwmocf" data-path="src/components/ChronoGrid.tsx">
                        <h5 className="font-medium text-white truncate flex-1 mr-2" data-id="xfxioc61g" data-path="src/components/ChronoGrid.tsx">
                          {task.title}
                        </h5>
                        <Badge
                      variant="outline"
                      className={`text-xs ${getPriorityColor(task.priority)} border-current`} data-id="9s7uialoz" data-path="src/components/ChronoGrid.tsx">

                          {task.priority}-Rank
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between" data-id="6rsrabmo0" data-path="src/components/ChronoGrid.tsx">
                        <div className="flex items-center space-x-2" data-id="k3d6k7dds" data-path="src/components/ChronoGrid.tsx">
                          {task.status === 'Completed' ?
                      <CheckCircle className="w-4 h-4 text-green-400" data-id="0o72wwzo0" data-path="src/components/ChronoGrid.tsx" /> :
                      task.status === 'In Progress' ?
                      <Clock className="w-4 h-4 text-yellow-400" data-id="gkez74vnr" data-path="src/components/ChronoGrid.tsx" /> :

                      <Target className="w-4 h-4 text-gray-400" data-id="hyoe2tlpo" data-path="src/components/ChronoGrid.tsx" />
                      }
                          <span className={`text-xs ${getStatusColor(task.status)}`} data-id="ukjrvaabx" data-path="src/components/ChronoGrid.tsx">
                            {task.status}
                          </span>
                        </div>
                        <span className="text-xs text-green-300 font-mono" data-id="5s2p9ex4y" data-path="src/components/ChronoGrid.tsx">
                          {task.xpValue} XP
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-400 mt-2" data-id="wx4ukd36u" data-path="src/components/ChronoGrid.tsx">
                        {task.category} • {format(task.endDate, 'MMM dd')}
                      </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          }

          {/* Quick Stats */}
          <div className="card-shadow bg-gray-800/80 border border-gray-700/50" data-id="gnhktwpl4" data-path="src/components/ChronoGrid.tsx">
            <div className="p-6" data-id="2okjvens2" data-path="src/components/ChronoGrid.tsx">
              <h4 className="text-lg font-semibold orbitron text-white mb-4" data-id="hxn2km5f9" data-path="src/components/ChronoGrid.tsx">
                Month Overview
              </h4>
              <div className="space-y-3" data-id="zehq2vjrh" data-path="src/components/ChronoGrid.tsx">
                <div className="flex justify-between items-center" data-id="41vj5ekzr" data-path="src/components/ChronoGrid.tsx">
                  <span className="text-gray-300" data-id="755p292pt" data-path="src/components/ChronoGrid.tsx">Total Missions</span>
                  <span className="text-white font-mono" data-id="oihmuzhnf" data-path="src/components/ChronoGrid.tsx">
                    {tasks.filter((t) => {
                      const taskStart = new Date(t.startDate);
                      const taskEnd = new Date(t.endDate);
                      return taskStart <= monthEnd && taskEnd >= monthStart;
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between items-center" data-id="jxsbmf5h3" data-path="src/components/ChronoGrid.tsx">
                  <span className="text-gray-300" data-id="955rf3u8d" data-path="src/components/ChronoGrid.tsx">Completed</span>
                  <span className="text-green-400 font-mono" data-id="5joxvpjr7" data-path="src/components/ChronoGrid.tsx">
                    {tasks.filter((t) => {
                      const taskStart = new Date(t.startDate);
                      const taskEnd = new Date(t.endDate);
                      return taskStart <= monthEnd && taskEnd >= monthStart && t.status === 'Completed';
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between items-center" data-id="g305rgu7z" data-path="src/components/ChronoGrid.tsx">
                  <span className="text-gray-300" data-id="b6juub3jo" data-path="src/components/ChronoGrid.tsx">XP This Month</span>
                  <span className="text-green-400 font-mono xp-glow" data-id="ipghr9hf6" data-path="src/components/ChronoGrid.tsx">
                    {tasks.filter((t) => {
                      const taskStart = new Date(t.startDate);
                      const taskEnd = new Date(t.endDate);
                      return taskStart <= monthEnd && taskEnd >= monthStart && t.status === 'Completed';
                    }).reduce((sum, t) => sum + t.xpValue, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ChronoGrid;