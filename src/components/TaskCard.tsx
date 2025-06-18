
import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Star, Crown, Zap, Target, Edit, Trash2 } from 'lucide-react';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { calculateTaskXP, getPriorityColor, getStatusColor } from '@/utils/xpSystem';
import { format, isValid } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onStatusChange?: (taskId: string, status: Task['status']) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onStartFocus?: (task: Task) => void;
  onClick?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStatusChange = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onStartFocus,
  onClick
}) => {
  const priorityColor = getPriorityColor(task.priority);
  const statusColor = getStatusColor(task.status);
  const xpValue = calculateTaskXP(task);
  const isUrgentMission = task.priority === 'urgent';

  const isOverdue = task.dueDate &&
  isValid(new Date(task.dueDate)) &&
  new Date(task.dueDate) < new Date() &&
  task.status !== 'completed';

  const dueDate = task.dueDate && isValid(new Date(task.dueDate)) ?
  format(new Date(task.dueDate), 'MMM dd, yyyy') :
  'No due date';

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '⏳';
      default:
        return '⭕';
    }
  };

  const getNextStatus = (): Task['status'] => {
    switch (task.status) {
      case 'pending':
        return 'in-progress';
      case 'in-progress':
        return 'completed';
      case 'completed':
        return 'pending';
      default:
        return 'pending';
    }
  };

  const getStatusAction = () => {
    switch (task.status) {
      case 'pending':
        return 'Start';
      case 'in-progress':
        return 'Complete';
      case 'completed':
        return 'Reset';
      default:
        return 'Start';
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(task);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
      onClick={handleCardClick} data-id="9p9ohbh1k" data-path="src/components/TaskCard.tsx">

      <div className={`
        relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border transition-all duration-300
        ${task.status === 'completed' ?
      'border-green-500/50 bg-green-900/10' :
      isOverdue ?
      'border-red-500/50 bg-red-900/10' :
      'border-slate-700 hover:border-slate-600'}
        ${isUrgentMission ? 'shadow-lg shadow-red-500/20' : ''}
      `} data-id="opjk1c7ab" data-path="src/components/TaskCard.tsx">
        
        {/* Urgent Mission Glow Effect */}
        {isUrgentMission &&
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-xl pointer-events-none" data-id="146z4xzhk" data-path="src/components/TaskCard.tsx" />
        }
        
        {/* Priority Indicator */}
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
          style={{ backgroundColor: priorityColor }} data-id="vfag4ra5v" data-path="src/components/TaskCard.tsx" />


        {/* Header */}
        <div className="flex items-start justify-between mb-3" data-id="lc4juqxqy" data-path="src/components/TaskCard.tsx">
          <div className="flex-1 min-w-0" data-id="73kjo5g7x" data-path="src/components/TaskCard.tsx">
            <div className="flex items-center gap-2 mb-1" data-id="9e26xm3c3" data-path="src/components/TaskCard.tsx">
              <h3 className={`font-semibold text-white truncate ${
              task.status === 'completed' ? 'line-through opacity-75' : ''}`
              } data-id="rba2tsppr" data-path="src/components/TaskCard.tsx">
                {task.title}
              </h3>
              
              {isUrgentMission &&
              <Crown className="w-4 h-4 text-red-400 flex-shrink-0" data-id="jjw9wxpyn" data-path="src/components/TaskCard.tsx" />
              }
            </div>
            
            <p className={`text-sm text-gray-400 line-clamp-2 ${
            task.status === 'completed' ? 'line-through opacity-75' : ''}`
            } data-id="ycj90xmdt" data-path="src/components/TaskCard.tsx">
              {task.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-3" data-id="ybtexrczp" data-path="src/components/TaskCard.tsx">
            <Badge
              variant="secondary"
              className="text-xs"
              style={{ backgroundColor: `${priorityColor}20`, color: priorityColor }} data-id="o17o1fj7e" data-path="src/components/TaskCard.tsx">

              {isUrgentMission ? '🚨 URGENT' : task.priority.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Task Details */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs" data-id="r5ztvzbm8" data-path="src/components/TaskCard.tsx">
          <div className="flex items-center gap-2 text-gray-400" data-id="n51b8gj6c" data-path="src/components/TaskCard.tsx">
            <Calendar className="w-3 h-3" data-id="1hsv4oxdi" data-path="src/components/TaskCard.tsx" />
            <span className={isOverdue ? 'text-red-400' : ''} data-id="4flatgrkf" data-path="src/components/TaskCard.tsx">
              {dueDate}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400" data-id="2awadkmel" data-path="src/components/TaskCard.tsx">
            <Star className="w-3 h-3" data-id="oh5vy4vhn" data-path="src/components/TaskCard.tsx" />
            <span data-id="u3mngb8ql" data-path="src/components/TaskCard.tsx">{task.category}</span>
          </div>
        </div>

        {/* XP Value and Status */}
        <div className="flex items-center justify-between mb-4" data-id="dd6ssq69n" data-path="src/components/TaskCard.tsx">
          <div className="flex items-center gap-2" data-id="htzy7ypnq" data-path="src/components/TaskCard.tsx">
            <div className="flex items-center gap-1" data-id="trofw57w8" data-path="src/components/TaskCard.tsx">
              <span className="text-lg" data-id="ezjzu89ip" data-path="src/components/TaskCard.tsx">{getStatusIcon()}</span>
              <span
                className="text-sm font-medium"
                style={{ color: statusColor }} data-id="l91pxexdj" data-path="src/components/TaskCard.tsx">

                {task.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
          isUrgentMission ? 'bg-red-500/20' : 'bg-cyan-500/20'}`
          } data-id="45qn1yebc" data-path="src/components/TaskCard.tsx">
            <Zap className={`w-3 h-3 ${isUrgentMission ? 'text-red-400' : 'text-cyan-400'}`} data-id="kq3mm7kd7" data-path="src/components/TaskCard.tsx" />
            <span className={`text-xs font-medium ${isUrgentMission ? 'text-red-400' : 'text-cyan-400'}`} data-id="ha4ed48ae" data-path="src/components/TaskCard.tsx">
              +{xpValue} XP
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2" data-id="pdw24rm61" data-path="src/components/TaskCard.tsx">
          <Button
            size="sm"
            onClick={(e) => handleButtonClick(e, () => onStatusChange(task.id, getNextStatus()))}
            className={`flex-1 ${
            task.status === 'completed' ?
            'bg-gray-600 hover:bg-gray-700' :
            isUrgentMission ?
            'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600' :
            'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600'} text-white text-xs font-medium`
            } data-id="gps56otxv" data-path="src/components/TaskCard.tsx">

            {getStatusAction()}
          </Button>
          
          {task.status !== 'completed' && onStartFocus &&
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => handleButtonClick(e, () => onStartFocus(task))}
            className="border-slate-600 text-gray-400 hover:bg-slate-700 text-xs px-2" data-id="vyw74cl2g" data-path="src/components/TaskCard.tsx">

              <Target className="w-3 h-3" data-id="b5qx7thqt" data-path="src/components/TaskCard.tsx" />
            </Button>
          }
          
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => handleButtonClick(e, () => onEdit(task))}
            className="border-slate-600 text-gray-400 hover:bg-slate-700 text-xs px-2" data-id="tjgvln1c9" data-path="src/components/TaskCard.tsx">

            <Edit className="w-3 h-3" data-id="wb776cwp3" data-path="src/components/TaskCard.tsx" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={(e) => handleButtonClick(e, () => onDelete(task.id))}
            className="border-slate-600 text-gray-400 hover:bg-red-700 hover:text-red-300 text-xs px-2" data-id="ceolf0d9y" data-path="src/components/TaskCard.tsx">

            <Trash2 className="w-3 h-3" data-id="foly2j61l" data-path="src/components/TaskCard.tsx" />
          </Button>
        </div>

        {/* Overdue Warning */}
        {isOverdue &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-2" data-id="gsvy8ciiq" data-path="src/components/TaskCard.tsx">

            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" data-id="ixlbfcim0" data-path="src/components/TaskCard.tsx" />
          </motion.div>
        }
      </div>
    </motion.div>);

};

export default TaskCard;