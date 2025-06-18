
import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Calendar,
  Trophy,
  Target,
  Award,
  Flame,
  Focus,
  User,
  Monitor,
  Activity } from
'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Command Center', color: 'text-blue-400' },
  { id: 'missions', icon: FileText, label: 'Mission Log', color: 'text-green-400' },
  { id: 'stats', icon: BarChart3, label: 'Statistics', color: 'text-purple-400' },
  { id: 'chrono', icon: Calendar, label: 'Chrono Grid', color: 'text-indigo-400' },
  { id: 'rank', icon: Trophy, label: 'Shadow Rank', color: 'text-yellow-400' },
  { id: 'quests', icon: Target, label: 'Quest System', color: 'text-red-400' },
  { id: 'achievements', icon: Award, label: 'Achievements', color: 'text-orange-400' },
  { id: 'streak', icon: Flame, label: 'Streak Tracker', color: 'text-red-500' },
  { id: 'focus', icon: Focus, label: 'Focus Mode', color: 'text-cyan-400' },
  { id: 'player', icon: User, label: 'Player Stats', color: 'text-pink-400' },
  { id: 'diagnostics', icon: Monitor, label: 'Diagnostics', color: 'text-amber-400' }];


  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-black/20 backdrop-blur-sm border-r border-gray-700/50 min-h-screen" data-id="p3ulxl1sq" data-path="src/components/Sidebar.tsx">

      <div className="p-6" data-id="rzzfzj854" data-path="src/components/Sidebar.tsx">
        <div className="flex items-center space-x-3 mb-8" data-id="q2ug3ifqy" data-path="src/components/Sidebar.tsx">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center" data-id="nlx3bk1p1" data-path="src/components/Sidebar.tsx">
            <Activity className="w-6 h-6 text-white" data-id="b8pamn37c" data-path="src/components/Sidebar.tsx" />
          </div>
          <div data-id="w1djj5cdk" data-path="src/components/Sidebar.tsx">
            <h1 className="text-xl font-bold text-white" data-id="3e5zpqdl3" data-path="src/components/Sidebar.tsx">Task Warrior</h1>
            <p className="text-sm text-gray-400" data-id="wswa5xp23" data-path="src/components/Sidebar.tsx">Mission Control</p>
          </div>
        </div>

        <nav className="space-y-2" data-id="yhfo8t6ht" data-path="src/components/Sidebar.tsx">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive ?
                'bg-white/10 text-white shadow-lg' :
                'text-gray-400 hover:text-white hover:bg-white/5'}`
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }} data-id="l9b7l3tf9" data-path="src/components/Sidebar.tsx">

                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} data-id="5knl5omeq" data-path="src/components/Sidebar.tsx" />
                <span className="font-medium" data-id="lljfdtinb" data-path="src/components/Sidebar.tsx">{item.label}</span>
              </motion.button>);

          })}
        </nav>
      </div>
    </motion.div>);

};

export default Sidebar;