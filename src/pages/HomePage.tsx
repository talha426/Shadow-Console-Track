
import React, { useState, useEffect } from 'react';
import { Task, PlayerData } from '@/types';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Dashboard from '@/components/Dashboard';
import MissionLog from '@/components/MissionLog';
import StatBoard from '@/components/StatBoard';
import ChronoGrid from '@/components/ChronoGrid';
import ShadowRank from '@/components/ShadowRank';
import TaskFormDialog from '@/components/TaskFormDialog';
import CelebrationModal from '@/components/CelebrationModal';
import QuestSystem from '@/components/QuestSystem';
import AchievementSystem from '@/components/AchievementSystem';
import StreakTracker from '@/components/StreakTracker';
import FocusMode from '@/components/FocusMode';
import PlayerStats from '@/components/PlayerStats';
import DiagnosticDashboard from '@/components/DiagnosticDashboard';
import { calculateTaskXP, calculateStreak, getWeeklyXP, checkAchievements } from '@/utils/xpSystem';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/contexts/SettingsContext';
import { audioManager } from '@/utils/audioManager';
import { errorHandler } from '@/utils/errorHandler';
import { storageManager } from '@/utils/storageManager';
import { missionManager } from '@/utils/missionManager';

const HomePage: React.FC = () => {
  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [playerData, setPlayerData] = useState<PlayerData>({
    id: 'player_1',
    name: 'Shadow Operative',
    level: 1,
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    completedTasks: 0,
    createdAt: new Date(),
    rank: 'Novice'
  });

  // UI state
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [singleTaskView, setSingleTaskView] = useState<Task | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [celebrationData, setCelebrationData] = useState<any>(null);
  const [systemInitialized, setSystemInitialized] = useState(false);

  const { toast } = useToast();
  const { settings } = useSettings();

  // Initialize systems on component mount
  useEffect(() => {
    initializeSystems();
  }, []);

  const initializeSystems = async () => {
    try {
      // Set app start time for uptime tracking
      if (!localStorage.getItem('app_start_time')) {
        localStorage.setItem('app_start_time', new Date().toISOString());
      }

      // Load persisted error data
      errorHandler.loadPersistedData();

      // Initialize storage manager
      const storageInitialized = await storageManager.initialize();
      if (!storageInitialized) {
        throw new Error('Failed to initialize storage manager');
      }

      // Initialize mission manager
      const missionInitialized = await missionManager.initialize();
      if (!missionInitialized) {
        throw new Error('Failed to initialize mission manager');
      }

      // Load data from storage - with safe fallbacks
      const storedTasks = storageManager.getTasks() || [];
      const storedPlayerData = storageManager.getPlayerData();

      if (storedTasks.length > 0) {
        setTasks(storedTasks);
      }

      if (storedPlayerData) {
        setPlayerData(storedPlayerData);
      }

      setSystemInitialized(true);

      errorHandler.logDiagnostic({
        action: 'SYSTEM_INITIALIZATION',
        status: 'SUCCESS',
        details: {
          taskCount: storedTasks.length,
          playerLevel: storedPlayerData?.level || 1
        }
      });

      toast({
        title: "System Online",
        description: "All systems initialized successfully. Ready for missions.",
        duration: 3000
      });

    } catch (error) {
      errorHandler.logError({
        type: 'SYSTEM',
        message: 'System initialization failed',
        stack: error instanceof Error ? error.stack : undefined,
        severity: 'CRITICAL'
      });

      toast({
        title: "System Initialization Failed",
        description: "Some features may not work properly. Check diagnostics.",
        variant: "destructive",
        duration: 5000
      });

      // Still allow the app to work with default data
      setSystemInitialized(true);
    }
  };

  // Task management functions
  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask: Task = {
        ...taskData,
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date()
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      await storageManager.saveTasks(updatedTasks);

      if (settings.soundEnabled) {
        audioManager.playTaskCreated();
      }

      toast({
        title: "Mission Created",
        description: `"${newTask.title}" has been added to your mission log.`,
        duration: 2000
      });

      errorHandler.logDiagnostic({
        action: 'ADD_TASK',
        status: 'SUCCESS',
        details: {
          taskId: newTask.id,
          title: newTask.title,
          priority: newTask.priority
        }
      });
    } catch (error) {
      errorHandler.logError({
        type: 'MISSION_CREATION',
        message: 'Failed to create task',
        stack: error instanceof Error ? error.stack : undefined,
        severity: 'HIGH'
      });

      toast({
        title: "Mission Creation Failed",
        description: "Could not create the task. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      await storageManager.saveTasks(updatedTasks);

      errorHandler.logDiagnostic({
        action: 'UPDATE_TASK',
        status: 'SUCCESS',
        details: {
          taskId: updatedTask.id,
          status: updatedTask.status
        }
      });
    } catch (error) {
      errorHandler.logError({
        type: 'MISSION_CREATION',
        message: 'Failed to update task',
        severity: 'MEDIUM'
      });
    }
  };

  const completeTask = async (taskId: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const xpGained = calculateTaskXP(task);
      const updatedTask = {
        ...task,
        status: 'completed' as const,
        completedAt: new Date()
      };

      const updatedTasks = tasks.map((t) => t.id === taskId ? updatedTask : t);
      setTasks(updatedTasks);
      await storageManager.saveTasks(updatedTasks);

      // Update player data
      const newPlayerData = {
        ...playerData,
        totalXP: playerData.totalXP + xpGained,
        completedTasks: playerData.completedTasks + 1,
        currentStreak: calculateStreak(updatedTasks, playerData)
      };

      // Check for level up
      const newLevel = Math.floor(newPlayerData.totalXP / 1000) + 1;
      if (newLevel > playerData.level) {
        newPlayerData.level = newLevel;
        setCelebrationData({
          type: 'levelUp',
          newLevel,
          xpGained,
          taskTitle: task.title
        });
      }

      setPlayerData(newPlayerData);
      await storageManager.savePlayerData(newPlayerData);

      // Check achievements
      const newAchievements = checkAchievements(updatedTasks, newPlayerData);
      if (newAchievements.length > 0) {
        await storageManager.saveAchievements([
        ...storageManager.getAchievements(),
        ...newAchievements]
        );
      }

      if (settings.soundEnabled) {
        audioManager.playTaskCompleted();
      }

      toast({
        title: "Mission Completed!",
        description: `+${xpGained} XP earned from "${task.title}"`,
        duration: 3000
      });
    } catch (error) {
      errorHandler.logError({
        type: 'MISSION_CREATION',
        message: 'Failed to complete task',
        severity: 'MEDIUM'
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      await storageManager.saveTasks(updatedTasks);

      toast({
        title: "Mission Deleted",
        description: "Task has been removed from your mission log.",
        duration: 2000
      });
    } catch (error) {
      errorHandler.logError({
        type: 'MISSION_CREATION',
        message: 'Failed to delete task',
        severity: 'LOW'
      });
    }
  };

  // View management
  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSingleTaskView(null);
  };

  const handleTaskClick = (task: Task) => {
    setSingleTaskView(task);
    setActiveView('single-task');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  // Show loading screen if system not initialized
  if (!systemInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center" data-id="7plm4eo7a" data-path="src/pages/HomePage.tsx">
        <div className="text-center" data-id="gkdoxgs3d" data-path="src/pages/HomePage.tsx">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4" data-id="u8xpg0dp8" data-path="src/pages/HomePage.tsx"></div>
          <h2 className="text-xl font-semibold text-white mb-2" data-id="xw8gimtx8" data-path="src/pages/HomePage.tsx">Initializing Systems</h2>
          <p className="text-gray-300" data-id="3lhzqr4zi" data-path="src/pages/HomePage.tsx">Loading mission control...</p>
        </div>
      </div>);

  }

  // Render main interface
  const renderMainContent = () => {
    if (singleTaskView) {
      return (
        <div className="p-6" data-id="ukciujtaz" data-path="src/pages/HomePage.tsx">
          <button
            onClick={() => setActiveView('missions')}
            className="mb-4 text-purple-400 hover:text-purple-300 flex items-center" data-id="smaufgj87" data-path="src/pages/HomePage.tsx">

            ← Back to Mission Log
          </button>
          {/* Single task view content */}
          <div className="bg-gray-800 rounded-lg p-6" data-id="1fookihak" data-path="src/pages/HomePage.tsx">
            <h1 className="text-2xl font-bold text-white mb-4" data-id="loclbwz38" data-path="src/pages/HomePage.tsx">{singleTaskView.title}</h1>
            <p className="text-gray-300 mb-4" data-id="41kjp0lvf" data-path="src/pages/HomePage.tsx">{singleTaskView.description}</p>
            <div className="flex space-x-4" data-id="6cqo3a4sv" data-path="src/pages/HomePage.tsx">
              <button
                onClick={() => completeTask(singleTaskView.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                disabled={singleTaskView.status === 'completed'} data-id="6y98t2zha" data-path="src/pages/HomePage.tsx">

                {singleTaskView.status === 'completed' ? 'Completed' : 'Complete Mission'}
              </button>
              <button
                onClick={() => handleEditTask(singleTaskView)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" data-id="14gek1pzl" data-path="src/pages/HomePage.tsx">

                Edit Mission
              </button>
            </div>
          </div>
        </div>);

    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} playerData={playerData} onTaskClick={handleTaskClick} data-id="lctdixxrt" data-path="src/pages/HomePage.tsx" />;
      case 'missions':
        return <MissionLog
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onTaskComplete={completeTask}
          onTaskEdit={handleEditTask}
          onTaskDelete={deleteTask} data-id="2c2ksgdk7" data-path="src/pages/HomePage.tsx" />;

      case 'stats':
        return <StatBoard tasks={tasks} playerData={playerData} data-id="wbonv9nub" data-path="src/pages/HomePage.tsx" />;
      case 'chrono':
        return <ChronoGrid tasks={tasks} playerData={playerData} onTaskClick={handleTaskClick} data-id="w1oy04d91" data-path="src/pages/HomePage.tsx" />;
      case 'rank':
        return <ShadowRank tasks={tasks} playerData={playerData} data-id="gmto07t2l" data-path="src/pages/HomePage.tsx" />;
      case 'quests':
        return <QuestSystem tasks={tasks} playerData={playerData} data-id="hhw5bcdlx" data-path="src/pages/HomePage.tsx" />;
      case 'achievements':
        return <AchievementSystem tasks={tasks} playerData={playerData} data-id="ey2vlo9mj" data-path="src/pages/HomePage.tsx" />;
      case 'streak':
        return <StreakTracker tasks={tasks} playerData={playerData} data-id="s0w235eky" data-path="src/pages/HomePage.tsx" />;
      case 'focus':
        return <FocusMode data-id="1rrt570l7" data-path="src/pages/HomePage.tsx" />;
      case 'player':
        return <PlayerStats tasks={tasks} playerData={playerData} data-id="x23ctgzfu" data-path="src/pages/HomePage.tsx" />;
      case 'diagnostics':
        return <DiagnosticDashboard data-id="zjv0mq7tp" data-path="src/pages/HomePage.tsx" />;
      default:
        return <Dashboard tasks={tasks} playerData={playerData} onTaskClick={handleTaskClick} data-id="352c2kgp6" data-path="src/pages/HomePage.tsx" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" data-id="1q0qu5rp4" data-path="src/pages/HomePage.tsx">
      <div className="flex" data-id="1it1xc8s9" data-path="src/pages/HomePage.tsx">
        <Sidebar activeView={activeView} onViewChange={handleViewChange} data-id="8qes86erl" data-path="src/pages/HomePage.tsx" />
        
        <div className="flex-1 flex flex-col" data-id="72cfl7p8d" data-path="src/pages/HomePage.tsx">
          <TopBar
            playerData={playerData}
            weeklyXP={getWeeklyXP(tasks)}
            onCreateTask={() => setIsTaskFormOpen(true)} data-id="ael6ln18o" data-path="src/pages/HomePage.tsx" />

          
          <main className="flex-1 overflow-auto" data-id="gzsmoiinq" data-path="src/pages/HomePage.tsx">
            {renderMainContent()}
          </main>
        </div>
      </div>

      {/* Modals */}
      <TaskFormDialog
        isOpen={isTaskFormOpen}
        onOpenChange={setIsTaskFormOpen}
        onSubmit={(taskData) => {
          if (editingTask) {
            updateTask({ ...editingTask, ...taskData });
            setEditingTask(null);
          } else {
            addTask(taskData);
          }
          setIsTaskFormOpen(false);
        }}
        initialData={editingTask} data-id="q63qepgfi" data-path="src/pages/HomePage.tsx" />


      {celebrationData &&
      <CelebrationModal
        isOpen={!!celebrationData}
        onClose={() => setCelebrationData(null)}
        type={celebrationData.type}
        data={celebrationData} data-id="99uli0j9z" data-path="src/pages/HomePage.tsx" />

      }
    </div>);

};

export default HomePage;