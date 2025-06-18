import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  Settings,
  Trophy,
  Zap,
  Star,
  Crown,
  Target,
  Calendar } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Task } from '@/types';
import { getLevelInfo, getRankInfo } from '@/utils/xpSystem';
import QuickSettings from '@/components/QuickSettings';
import SettingsModal from '@/components/SettingsModal';
import { useSettings } from '@/contexts/SettingsContext';

interface TopBarProps {
  tasks: Task[];
  totalXP: number;
  weeklyXP: number;
  onOpenTaskForm: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ tasks, totalXP, weeklyXP, onOpenTaskForm }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useSettings();

  const levelInfo = getLevelInfo(totalXP);
  const rankInfo = getRankInfo(totalXP);
  const completedToday = tasks.filter((t) =>
  t.status === 'completed' &&
  new Date(t.updatedAt).toDateString() === new Date().toDateString()
  ).length;

  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;

  return (
    <>
      <motion.div
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }} data-id="ph21any3b" data-path="src/components/TopBar.tsx">

        <div className="flex items-center gap-6" data-id="2vlyako6h" data-path="src/components/TopBar.tsx">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }} data-id="5ctxrtz3a" data-path="src/components/TopBar.tsx">

            <div className="relative" data-id="goocvo71u" data-path="src/components/TopBar.tsx">
              <Crown className="h-8 w-8 text-purple-600" data-id="7ialkr9py" data-path="src/components/TopBar.tsx" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }} data-id="86n2dogi3" data-path="src/components/TopBar.tsx" />

            </div>
            <div data-id="jgn290go0" data-path="src/components/TopBar.tsx">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" data-id="fuy3bil0k" data-path="src/components/TopBar.tsx">
                TaskMaster
              </h1>
              <p className="text-xs text-muted-foreground" data-id="uya6t4zcy" data-path="src/components/TopBar.tsx">Level {levelInfo.level} {rankInfo.name}</p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-4" data-id="ed4x2l5gd" data-path="src/components/TopBar.tsx">
            <motion.div
              className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full"
              whileHover={{ scale: 1.05 }} data-id="sfqxbubc6" data-path="src/components/TopBar.tsx">

              <Target className="h-4 w-4 text-green-600" data-id="l5nqdufq2" data-path="src/components/TopBar.tsx" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300" data-id="6mrbw30dh" data-path="src/components/TopBar.tsx">
                {completedToday} completed today
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full"
              whileHover={{ scale: 1.05 }} data-id="c1vn7538r" data-path="src/components/TopBar.tsx">

              <Calendar className="h-4 w-4 text-orange-600" data-id="jiqneihto" data-path="src/components/TopBar.tsx" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300" data-id="m5gtbyy8c" data-path="src/components/TopBar.tsx">
                {pendingTasks} pending
              </span>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-4" data-id="uqvqx6d2g" data-path="src/components/TopBar.tsx">
          {/* XP Progress */}
          <div className="hidden lg:flex items-center gap-3" data-id="37ywzakuj" data-path="src/components/TopBar.tsx">
            <div className="flex items-center gap-2" data-id="6j9rh97d1" data-path="src/components/TopBar.tsx">
              <Zap className="h-4 w-4 text-yellow-500" data-id="xk5djxenw" data-path="src/components/TopBar.tsx" />
              <span className="text-sm font-medium" data-id="gtuq4x048" data-path="src/components/TopBar.tsx">{totalXP.toLocaleString()} XP</span>
            </div>
            
            <div className="w-32" data-id="yjk5ty7de" data-path="src/components/TopBar.tsx">
              <div className="flex items-center justify-between mb-1" data-id="gmesayz37" data-path="src/components/TopBar.tsx">
                <span className="text-xs text-muted-foreground" data-id="f0udjrgij" data-path="src/components/TopBar.tsx">Level {levelInfo.level}</span>
                <span className="text-xs text-muted-foreground" data-id="cjv3ygddp" data-path="src/components/TopBar.tsx">{levelInfo.level + 1}</span>
              </div>
              <Progress
                value={levelInfo.progressPercent}
                className="h-2" data-id="31eecc6ow" data-path="src/components/TopBar.tsx" />

            </div>

            <Badge variant="secondary" className="text-xs" data-id="jt96xos7i" data-path="src/components/TopBar.tsx">
              <Star className="h-3 w-3 mr-1" data-id="x0myct28v" data-path="src/components/TopBar.tsx" />
              {rankInfo.name}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2" data-id="n9dvze4ya" data-path="src/components/TopBar.tsx">
            <QuickSettings data-id="fvalxdqyc" data-path="src/components/TopBar.tsx" />
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 relative"
              onClick={() => setShowSettings(true)} data-id="j9ufvwlh1" data-path="src/components/TopBar.tsx">

              <Settings className="h-4 w-4" data-id="jw401u9bz" data-path="src/components/TopBar.tsx" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 relative" data-id="l77gbdkls" data-path="src/components/TopBar.tsx">

              <Bell className="h-4 w-4" data-id="uimt20i98" data-path="src/components/TopBar.tsx" />
              {pendingTasks > 0 &&
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }} data-id="224askhev" data-path="src/components/TopBar.tsx" />

              }
            </Button>

            <Button
              onClick={onOpenTaskForm}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-4" data-id="ey025s7sg" data-path="src/components/TopBar.tsx">

              <Trophy className="h-4 w-4 mr-2" data-id="8uepaotx7" data-path="src/components/TopBar.tsx" />
              New Quest
            </Button>
          </div>
        </div>
      </motion.div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)} data-id="8s4zh4cuz" data-path="src/components/TopBar.tsx" />

    </>);

};

export default TopBar;