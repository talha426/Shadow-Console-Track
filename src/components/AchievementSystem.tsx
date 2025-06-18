import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Lock, Star, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Achievement, Task } from '@/types';
import { getAvailableAchievements, checkAchievements } from '@/utils/xpSystem';

interface AchievementSystemProps {
  tasks: Task[];
  totalXP: number;
  onNewAchievement?: (achievement: Achievement) => void;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({
  tasks,
  totalXP,
  onNewAchievement
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  useEffect(() => {
    // Load achievements from localStorage or initialize
    const savedAchievements = localStorage.getItem('shadowconsole_achievements');
    let currentAchievements: Achievement[];

    if (savedAchievements) {
      currentAchievements = JSON.parse(savedAchievements);
    } else {
      currentAchievements = getAvailableAchievements();
    }

    // Check for new achievements
    const updatedAchievements = checkAchievements(tasks, currentAchievements);

    // Find newly unlocked achievements
    const newlyUnlocked = updatedAchievements.filter(
      (achievement, index) =>
      achievement.unlocked &&
      !currentAchievements[index]?.unlocked
    );

    // Notify about new achievements
    newlyUnlocked.forEach((achievement) => {
      if (onNewAchievement) {
        onNewAchievement(achievement);
      }
    });

    setAchievements(updatedAchievements);
    localStorage.setItem('shadowconsole_achievements', JSON.stringify(updatedAchievements));
  }, [tasks, totalXP, onNewAchievement]);

  const filteredAchievements = achievements.filter((achievement) => {
    switch (filter) {
      case 'unlocked':
        return achievement.unlocked;
      case 'locked':
        return !achievement.unlocked;
      default:
        return true;
    }
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = totalCount > 0 ? unlockedCount / totalCount * 100 : 0;

  const AchievementCard: React.FC<{achievement: Achievement;}> = ({ achievement }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative group" data-id="exxjcai3e" data-path="src/components/AchievementSystem.tsx">

        <Card className={`${
        achievement.unlocked ?
        'bg-gradient-to-br from-green-900/30 to-green-900/30 border-green-500/50' :
        'bg-gray-800/50 border-gray-700'} hover:border-gray-600 transition-all cursor-pointer overflow-hidden`
        } data-id="i04i3j8c4" data-path="src/components/AchievementSystem.tsx">
          
          {/* Glow effect for unlocked achievements */}
          {achievement.unlocked &&
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-600/10 rounded-lg" data-id="10csiz5cs" data-path="src/components/AchievementSystem.tsx" />
          }
          
          <CardContent className="p-4" data-id="xq3nd9imt" data-path="src/components/AchievementSystem.tsx">
            <div className="flex items-start gap-3" data-id="h76wlrxf6" data-path="src/components/AchievementSystem.tsx">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              achievement.unlocked ?
              'bg-gradient-to-br from-green-500 to-green-500 text-white' :
              'bg-gray-700 text-gray-400'}`
              } data-id="rgz1h7sx6" data-path="src/components/AchievementSystem.tsx">
                {achievement.unlocked ?
                <span className="text-xl" data-id="fjxn1ggu7" data-path="src/components/AchievementSystem.tsx">{achievement.icon}</span> :

                <Lock className="w-5 h-5" data-id="ogafjlvqu" data-path="src/components/AchievementSystem.tsx" />
                }
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0" data-id="vuw9vlj2c" data-path="src/components/AchievementSystem.tsx">
                <div className="flex items-center gap-2 mb-1" data-id="jm760vohx" data-path="src/components/AchievementSystem.tsx">
                  <h3 className={`font-semibold text-sm ${
                  achievement.unlocked ? 'text-green-400' : 'text-gray-300'}`
                  } data-id="yhtdbimbx" data-path="src/components/AchievementSystem.tsx">
                    {achievement.title}
                  </h3>
                  {achievement.unlocked &&
                  <Trophy className="w-4 h-4 text-green-400" data-id="bq2abbcdl" data-path="src/components/AchievementSystem.tsx" />
                  }
                </div>
                
                <p className={`text-xs mb-2 ${
                achievement.unlocked ? 'text-gray-300' : 'text-gray-500'}`
                } data-id="dzki4doe3" data-path="src/components/AchievementSystem.tsx">
                  {achievement.description}
                </p>
                
                <div className="flex items-center justify-between" data-id="90miegm2w" data-path="src/components/AchievementSystem.tsx">
                  <Badge
                    variant={achievement.unlocked ? 'default' : 'secondary'}
                    className="text-xs" data-id="okt79igmi" data-path="src/components/AchievementSystem.tsx">

                    +{achievement.xpReward} XP
                  </Badge>
                  
                  {achievement.unlocked && achievement.unlockedAt &&
                  <span className="text-xs text-gray-400" data-id="3r0k5ak1b" data-path="src/components/AchievementSystem.tsx">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </span>
                  }
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Shimmer effect for unlocked achievements */}
          {achievement.unlocked &&
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear'
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" data-id="8h4k49rfk" data-path="src/components/AchievementSystem.tsx" />

          }
        </Card>
      </motion.div>);

  };

  return (
    <Card className="bg-gray-800/80 border-gray-700/50" data-id="fnlqajr19" data-path="src/components/AchievementSystem.tsx">
      <CardHeader data-id="78fw64c4u" data-path="src/components/AchievementSystem.tsx">
        <div className="flex items-center justify-between" data-id="ig23uiakx" data-path="src/components/AchievementSystem.tsx">
          <CardTitle className="text-white flex items-center gap-2" data-id="8fjg7aiec" data-path="src/components/AchievementSystem.tsx">
            <Award className="w-5 h-5 text-green-400" data-id="4x30d9o5o" data-path="src/components/AchievementSystem.tsx" />
            Shadow Achievements
          </CardTitle>
          <Badge variant="outline" className="text-green-400 border-green-400" data-id="yxxoqiked" data-path="src/components/AchievementSystem.tsx">
            {unlockedCount}/{totalCount}
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2" data-id="w1yjf4i13" data-path="src/components/AchievementSystem.tsx">
          <div className="flex items-center justify-between text-xs" data-id="5ob7hknoo" data-path="src/components/AchievementSystem.tsx">
            <span className="text-gray-400" data-id="052r6frpw" data-path="src/components/AchievementSystem.tsx">Completion Progress</span>
            <span className="text-green-400" data-id="024e4tnig" data-path="src/components/AchievementSystem.tsx">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress
            value={completionPercentage}
            className="h-2 bg-gray-700" data-id="oip67bmq7" data-path="src/components/AchievementSystem.tsx" />

        </div>
      </CardHeader>
      
      <CardContent data-id="bujja9lss" data-path="src/components/AchievementSystem.tsx">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4" data-id="68xlk4dmb" data-path="src/components/AchievementSystem.tsx">
          {(['all', 'unlocked', 'locked'] as const).map((filterType) =>
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            filter === filterType ?
            'bg-green-600 text-white' :
            'bg-gray-700 text-gray-400 hover:bg-gray-600'}`
            } data-id="cfqowgjte" data-path="src/components/AchievementSystem.tsx">

              {filterType === 'all' ? 'All' :
            filterType === 'unlocked' ? 'Unlocked' : 'Locked'}
            </button>
          )}
        </div>
        
        {/* Achievement Grid */}
        <div className="grid gap-3" data-id="qsf4ofq8u" data-path="src/components/AchievementSystem.tsx">
          {filteredAchievements.length > 0 ?
          filteredAchievements.map((achievement) =>
          <AchievementCard key={achievement.id} achievement={achievement} data-id="keva2lrbp" data-path="src/components/AchievementSystem.tsx" />
          ) :

          <div className="text-center py-8 text-gray-500" data-id="czbxeh0t6" data-path="src/components/AchievementSystem.tsx">
              <Star className="w-8 h-8 mx-auto mb-2 opacity-50" data-id="fghn5uzld" data-path="src/components/AchievementSystem.tsx" />
              <p className="text-sm" data-id="bi68omuu8" data-path="src/components/AchievementSystem.tsx">No achievements in this category yet</p>
            </div>
          }
        </div>
      </CardContent>
    </Card>);

};

export default AchievementSystem;