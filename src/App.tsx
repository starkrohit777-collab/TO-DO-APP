import { useState, useEffect } from 'react';
import TaskManager from './components/TaskManager';
import RewardSystem from './components/RewardSystem';
import Header from './components/Header';

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [totalPointsEarned, setTotalPointsEarned] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Load data from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('egoTodos');
    const savedStats = localStorage.getItem('egoStats');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setStreakCount(stats.streak || 0);
      setTotalPointsEarned(stats.points || 0);
      setCurrentLevel(stats.level || 1);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('egoTodos', JSON.stringify(tasks));
    localStorage.setItem('egoStats', JSON.stringify({
      streak: streakCount,
      points: totalPointsEarned,
      level: currentLevel
    }));
  }, [tasks, streakCount, totalPointsEarned, currentLevel]);

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null }
        : task
    ));

    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      const points = task.priority === 'high' ? 50 : task.priority === 'medium' ? 30 : 10;
      setTotalPointsEarned(prev => prev + points);
      setStreakCount(prev => prev + 1);
      
      // Level up every 5 completed tasks
      if ((streakCount + 1) % 5 === 0) {
        setCurrentLevel(prev => prev + 1);
      }
    } else if (task && task.completed) {
      const points = task.priority === 'high' ? 50 : task.priority === 'medium' ? 30 : 10;
      setTotalPointsEarned(prev => Math.max(0, prev - points));
      setStreakCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleAddTask = (newTask: any) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.completed) {
      const points = task.priority === 'high' ? 50 : task.priority === 'medium' ? 30 : 10;
      setTotalPointsEarned(prev => Math.max(0, prev - points));
      setStreakCount(prev => Math.max(0, prev - 1));
    }
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header 
          streakCount={streakCount}
          totalPoints={totalPointsEarned}
          currentLevel={currentLevel}
          completionRate={completionRate}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Task Manager */}
            <div className="lg:col-span-2">
              <TaskManager
                tasks={tasks}
                onAddTask={handleAddTask}
                onCompleteTask={handleTaskComplete}
                onDeleteTask={handleDeleteTask}
              />
            </div>

            {/* Reward System Sidebar */}
            <div className="lg:col-span-1">
              <RewardSystem
                points={totalPointsEarned}
                level={currentLevel}
                streak={streakCount}
                completedTasks={completedTasks}
                totalTasks={tasks.length}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
