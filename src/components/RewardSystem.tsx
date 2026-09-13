import { useState, useEffect } from 'react';

interface RewardSystemProps {
  points: number;
  level: number;
  streak: number;
  completedTasks: number;
  totalTasks: number;
}

export default function RewardSystem({
  points,
  level,
  streak,
  completedTasks,
  totalTasks,
}: RewardSystemProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  const pointsForNextLevel = level * 100;
  const progressPercent = (points % pointsForNextLevel) / pointsForNextLevel * 100;

  // Badge system
  const badges = [
    {
      id: 'first-task',
      name: 'First Step',
      description: 'Complete your first task',
      icon: '🎯',
      condition: completedTasks >= 1,
    },
    {
      id: 'five-tasks',
      name: 'Rising Star',
      description: 'Complete 5 tasks',
      icon: '⭐',
      condition: completedTasks >= 5,
    },
    {
      id: 'ten-tasks',
      name: 'Achiever',
      description: 'Complete 10 tasks',
      icon: '🏆',
      condition: completedTasks >= 10,
    },
    {
      id: 'twenty-tasks',
      name: 'Master',
      description: 'Complete 20 tasks',
      icon: '👑',
      condition: completedTasks >= 20,
    },
    {
      id: 'streak-three',
      name: 'On Fire',
      description: 'Maintain 3-task streak',
      icon: '🔥',
      condition: streak >= 3,
    },
    {
      id: 'streak-ten',
      name: 'Unstoppable',
      description: 'Maintain 10-task streak',
      icon: '⚡',
      condition: streak >= 10,
    },
    {
      id: 'perfect-day',
      name: 'Perfect Day',
      description: 'Complete all tasks today',
      icon: '✨',
      condition: totalTasks > 0 && completedTasks === totalTasks && totalTasks >= 3,
    },
    {
      id: 'level-five',
      name: 'Rising Legend',
      description: 'Reach level 5',
      icon: '🌟',
      condition: level >= 5,
    },
  ];

  useEffect(() => {
    const newBadges = badges
      .filter(b => b.condition)
      .map(b => b.id);
    
    const addedBadges = newBadges.filter(b => !unlockedBadges.includes(b));
    
    if (addedBadges.length > 0) {
      setUnlockedBadges(newBadges);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [completedTasks, streak, level, totalTasks]);

  const unlockedCount = badges.filter(b => b.condition).length;

  // Recommendations
  const getRecommendations = () => {
    const recs = [];
    if (streak < 3) recs.push('Build a 3-task streak to unlock "On Fire" 🔥');
    if (completedTasks < 10) recs.push(`Complete ${10 - completedTasks} more tasks to reach "Achiever" 🏆`);
    if (level < 5) recs.push(`Earn ${pointsForNextLevel - (points % pointsForNextLevel)} more points to level up 📈`);
    if (totalTasks > 0 && completedTasks < totalTasks) recs.push('Complete all tasks today for "Perfect Day" ✨');
    return recs.length > 0 ? recs : ['You\'re dominating! Keep the momentum going! 💪'];
  };

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Level Progress */}
      <div className="p-6 rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
        <div className="text-center mb-4">
          <p className="text-purple-300/60 text-sm font-semibold uppercase tracking-wider mb-2">
            Current Level
          </p>
          <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
            {level}
          </div>
          <p className="text-white/60 text-sm">
            {points % pointsForNextLevel} / {pointsForNextLevel} to Level {level + 1}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-3 border border-purple-400/30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full shadow-lg shadow-purple-500/50"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/30 backdrop-blur-sm text-center">
          <p className="text-blue-300/60 text-xs font-bold uppercase mb-2 tracking-wider">Points</p>
          <p className="text-3xl font-black text-blue-400">{points}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-400/30 backdrop-blur-sm text-center">
          <p className="text-red-300/60 text-xs font-bold uppercase mb-2 tracking-wider">🔥 Streak</p>
          <p className="text-3xl font-black text-red-400">{streak}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/30 backdrop-blur-sm text-center">
          <p className="text-green-300/60 text-xs font-bold uppercase mb-2 tracking-wider">Done</p>
          <p className="text-3xl font-black text-green-400">{completedTasks}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-400/30 backdrop-blur-sm text-center">
          <p className="text-yellow-300/60 text-xs font-bold uppercase mb-2 tracking-wider">Badges</p>
          <p className="text-3xl font-black text-yellow-400">{unlockedCount}/8</p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="p-4 rounded-xl border border-yellow-400/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm">
        <p className="text-yellow-300/80 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="text-2xl">🏅</span> Badges ({unlockedCount}/8)
        </p>
        <div className="grid grid-cols-4 gap-2">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-3 rounded-lg text-center transition-all duration-300 ${
                badge.condition
                  ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border border-yellow-400/60 scale-100'
                  : 'bg-white/5 border border-white/10 opacity-50 scale-95'
              }`}
              title={badge.description}
            >
              <div className="text-2xl mb-1">{badge.icon}</div>
              <p className="text-xs font-bold text-white/80">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4 rounded-xl border border-green-400/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm">
        <p className="text-green-300/80 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span> Next Goals
        </p>
        <ul className="space-y-2">
          {getRecommendations().map((rec, idx) => (
            <li key={idx} className="text-sm text-green-200/80 flex items-start gap-2">
              <span className="text-lg">→</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Motivational Quote */}
      <div className="p-4 rounded-xl border border-pink-400/30 bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm">
        <p className="text-center text-white/80 italic text-sm">
          "{level <= 2 ? 'Every great empire starts with a single action. You\'re on your way!' : level <= 5 ? 'You\'re building momentum! The path to mastery is clear.' : 'You are a force of nature. Keep dominating! 👑'}"
        </p>
      </div>
    </div>
  );
}
