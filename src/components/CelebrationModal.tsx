import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLevelInfo, getRankInfo, calculateTaskXP } from '@/utils/xpSystem';
import { Task } from '@/types';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedTask: Task | null;
  totalXP: number;
  newAchievements?: any[];
  questsCompleted?: any[];
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  completedTask,
  totalXP,
  newAchievements = [],
  questsCompleted = []
}) => {
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowEffects(true);
      const timer = setTimeout(() => setShowEffects(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!completedTask) return null;

  const xpGained = calculateTaskXP(completedTask);
  const levelInfo = getLevelInfo(totalXP);
  const rankInfo = getRankInfo(levelInfo.level);
  const isBossMission = completedTask.priority === 'Boss';

  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <AnimatePresence data-id="kwm0mdbwg" data-path="src/components/CelebrationModal.tsx">
      {isOpen &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-id="xnq5uej3y" data-path="src/components/CelebrationModal.tsx">

          {/* Particle Effects */}
          {showEffects &&
        <div className="absolute inset-0 pointer-events-none" data-id="xfv81lkji" data-path="src/components/CelebrationModal.tsx">
              {particles.map((i) =>
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: "50vw",
              y: "50vh"
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut"
            }}
            className={`absolute w-2 h-2 rounded-full ${isBossMission ? 'bg-purple-400' : 'bg-cyan-400'}`} data-id="u4nx1u4bq" data-path="src/components/CelebrationModal.tsx" />

          )}
            </div>
        }

          {/* Main Modal */}
          <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`relative max-w-md w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border ${
          isBossMission ?
          'border-purple-500/50 shadow-2xl shadow-purple-500/25' :
          'border-cyan-500/50 shadow-2xl shadow-cyan-500/25'}`
          } data-id="gbz3x7d5e" data-path="src/components/CelebrationModal.tsx">

            {/* Close Button */}
            <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white" data-id="fhx4ac2jk" data-path="src/components/CelebrationModal.tsx">

              <X className="h-4 w-4" data-id="tzmxhxd8q" data-path="src/components/CelebrationModal.tsx" />
            </Button>

            {/* Header */}
            <div className="text-center mb-6" data-id="xkunvoe4b" data-path="src/components/CelebrationModal.tsx">
              <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isBossMission ? 'bg-purple-500/20' : 'bg-cyan-500/20'}`
              } data-id="y5xcdim4s" data-path="src/components/CelebrationModal.tsx">

                {isBossMission ?
              <Crown className={`w-8 h-8 text-purple-400`} data-id="6pgdkxzpb" data-path="src/components/CelebrationModal.tsx" /> :

              <Star className={`w-8 h-8 text-cyan-400`} data-id="fy4k5gnyr" data-path="src/components/CelebrationModal.tsx" />
              }
              </motion.div>
              
              <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-2xl font-bold mb-2 ${
              isBossMission ? 'text-purple-400' : 'text-cyan-400'}`
              } data-id="5zt051s1q" data-path="src/components/CelebrationModal.tsx">

                {isBossMission ? '👑 BOSS DEFEATED!' : '🎉 MISSION COMPLETE!'}
              </motion.h2>
              
              <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-sm" data-id="ib4h8bksq" data-path="src/components/CelebrationModal.tsx">

                {completedTask.title}
              </motion.p>
            </div>

            {/* XP Gained */}
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-6" data-id="d9illbstr" data-path="src/components/CelebrationModal.tsx">

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            isBossMission ? 'bg-purple-500/20' : 'bg-cyan-500/20'}`
            } data-id="e9mdbi5kd" data-path="src/components/CelebrationModal.tsx">
                <Zap className={`w-5 h-5 ${isBossMission ? 'text-purple-400' : 'text-cyan-400'}`} data-id="xq1lrpm2h" data-path="src/components/CelebrationModal.tsx" />
                <span className="text-2xl font-bold text-white" data-id="rwze9sm47" data-path="src/components/CelebrationModal.tsx">+{xpGained} XP</span>
              </div>
            </motion.div>

            {/* Level Progress */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6" data-id="q89idfoty" data-path="src/components/CelebrationModal.tsx">

              <div className="flex items-center justify-between mb-2" data-id="gvb24l8t4" data-path="src/components/CelebrationModal.tsx">
                <span className="text-sm text-gray-400" data-id="03tdxt3c4" data-path="src/components/CelebrationModal.tsx">Level {levelInfo.level}</span>
                <span className="text-sm text-gray-400" data-id="zur8ud77d" data-path="src/components/CelebrationModal.tsx">
                  {Math.round(levelInfo.progress)}%
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden" data-id="y3mzomaea" data-path="src/components/CelebrationModal.tsx">
                <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelInfo.progress}%` }}
                transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                isBossMission ?
                'bg-gradient-to-r from-purple-500 to-purple-400' :
                'bg-gradient-to-r from-cyan-500 to-cyan-400'}`
                } data-id="965hur4k9" data-path="src/components/CelebrationModal.tsx" />

              </div>
            </motion.div>

            {/* Rank Display */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-6" data-id="zmd9j9tu7" data-path="src/components/CelebrationModal.tsx">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-gray-700 to-gray-600" data-id="xnyat6pga" data-path="src/components/CelebrationModal.tsx">
                <span className="text-xs text-gray-400" data-id="4gl3xzs1s" data-path="src/components/CelebrationModal.tsx">Shadow Rank:</span>
                <span
                className="font-bold text-sm"
                style={{ color: rankInfo.color }} data-id="xfa7gc2ba" data-path="src/components/CelebrationModal.tsx">

                  {rankInfo.rank} - {rankInfo.title}
                </span>
              </div>
            </motion.div>

            {/* New Achievements */}
            {newAchievements.length > 0 &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-4" data-id="kpbumrjwr" data-path="src/components/CelebrationModal.tsx">

                <h3 className="text-sm font-semibold text-yellow-400 mb-2" data-id="xxo5gohto" data-path="src/components/CelebrationModal.tsx">🏆 New Achievements!</h3>
                <div className="space-y-1" data-id="8flm1udu3" data-path="src/components/CelebrationModal.tsx">
                  {newAchievements.map((achievement, index) =>
              <div key={index} className="flex items-center gap-2 text-xs text-gray-300" data-id="1afltqego" data-path="src/components/CelebrationModal.tsx">
                      <span data-id="2wvuqr3gs" data-path="src/components/CelebrationModal.tsx">{achievement.icon}</span>
                      <span data-id="nqozgzynb" data-path="src/components/CelebrationModal.tsx">{achievement.title}</span>
                      <span className="text-yellow-400" data-id="zn440jv59" data-path="src/components/CelebrationModal.tsx">+{achievement.xpReward} XP</span>
                    </div>
              )}
                </div>
              </motion.div>
          }

            {/* Completed Quests */}
            {questsCompleted.length > 0 &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-4" data-id="jw38hxtpg" data-path="src/components/CelebrationModal.tsx">

                <h3 className="text-sm font-semibold text-green-400 mb-2" data-id="jn9t1bopb" data-path="src/components/CelebrationModal.tsx">📜 Quests Completed!</h3>
                <div className="space-y-1" data-id="6rmyz4ed6" data-path="src/components/CelebrationModal.tsx">
                  {questsCompleted.map((quest, index) =>
              <div key={index} className="flex items-center gap-2 text-xs text-gray-300" data-id="l240e0dbi" data-path="src/components/CelebrationModal.tsx">
                      <span data-id="9pm6mb40q" data-path="src/components/CelebrationModal.tsx">✅</span>
                      <span data-id="hz67xe7ha" data-path="src/components/CelebrationModal.tsx">{quest.title}</span>
                      <span className="text-green-400" data-id="55wjkc2jx" data-path="src/components/CelebrationModal.tsx">+{quest.xpReward} XP</span>
                    </div>
              )}
                </div>
              </motion.div>
          }

            {/* Continue Button */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }} data-id="gannrjpf6" data-path="src/components/CelebrationModal.tsx">

              <Button
              onClick={onClose}
              className={`w-full ${
              isBossMission ?
              'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600' :
              'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600'} text-white font-semibold`
              } data-id="yxs09lkc9" data-path="src/components/CelebrationModal.tsx">

                Continue Your Journey
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

};

export default CelebrationModal;