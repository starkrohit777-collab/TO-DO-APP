import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    high: 'from-red-500 to-orange-500',
    medium: 'from-yellow-500 to-yellow-400',
    low: 'from-green-500 to-emerald-500',
  };

  const priorityEmoji = {
    high: '🔥',
    medium: '⚡',
    low: '💚',
  };

  const categoryEmoji: Record<string, string> = {
    General: '📋',
    Work: '💼',
    Personal: '👤',
    Health: '💪',
    Learning: '📚',
    Fitness: '🏃',
    Social: '👥',
  };

  const getDaysUntilDue = () => {
    if (!task.dueDate) return null;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntilDue();
  const isOverdue = daysUntil !== null && daysUntil < 0 && !task.completed;
  const isUrgent = daysUntil !== null && daysUntil <= 1 && daysUntil >= 0 && !task.completed;

  return (
    <div
      className={`relative group transition-all duration-300 ${isHovered ? 'transform -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      {isHovered && (
        <div className={`absolute inset-0 bg-gradient-to-r ${priorityColors[task.priority]} rounded-xl blur opacity-30 -z-10`}></div>
      )}

      <div className={`relative p-5 rounded-xl border transition-all duration-300 backdrop-blur-sm ${
        task.completed
          ? 'bg-white/5 border-white/10'
          : `bg-gradient-to-r ${priorityColors[task.priority]}/10 border-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-400/40`
      }`}>
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={onComplete}
            className={`mt-1 flex-shrink-0 w-7 h-7 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
              task.completed
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 shadow-lg shadow-green-500/50'
                : 'border-white/30 hover:border-white/60 hover:bg-white/10'
            }`}
          >
            {task.completed && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <h3 className={`text-lg font-bold transition-all duration-200 ${
                  task.completed
                    ? 'text-white/50 line-through'
                    : 'text-white'
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 ${
                    task.completed
                      ? 'text-white/30'
                      : 'text-white/70'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>

              {/* Priority Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap bg-gradient-to-r ${priorityColors[task.priority]} text-white shadow-lg`}>
                {priorityEmoji[task.priority]} {task.priority.toUpperCase()}
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 flex-wrap mt-3">
              {/* Category */}
              <span className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full text-white/80">
                {categoryEmoji[task.category]} {task.category}
              </span>

              {/* Due Date */}
              {task.dueDate && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  isOverdue
                    ? 'bg-red-500/30 text-red-200 border border-red-400/50'
                    : isUrgent
                    ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
                    : 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                }`}>
                  📅 {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : daysUntil === -1 ? 'Overdue by 1 day' : daysUntil && daysUntil < 0 ? `Overdue by ${Math.abs(daysUntil)} days` : `In ${daysUntil} days`}
                </span>
              )}

              {/* Completion Info */}
              {task.completed && (
                <span className="text-xs font-semibold bg-green-500/30 text-green-200 px-3 py-1 rounded-full border border-green-400/50">
                  ✨ Completed
                </span>
              )}
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={onDelete}
            className="flex-shrink-0 p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/20 transition-colors duration-200"
            title="Delete task"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
