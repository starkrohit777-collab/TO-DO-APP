import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

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

interface TaskManagerProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskManager({
  tasks,
  onAddTask,
  onCompleteTask,
  onDeleteTask,
}: TaskManagerProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'created'>('priority');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const activeTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Task Form */}
      <TaskForm onAddTask={onAddTask} />

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg border border-purple-400/30 backdrop-blur-sm">
          <p className="text-purple-300/60 text-sm font-semibold mb-1">Total Tasks</p>
          <p className="text-3xl font-black text-purple-300">{tasks.length}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg border border-blue-400/30 backdrop-blur-sm">
          <p className="text-blue-300/60 text-sm font-semibold mb-1">Active</p>
          <p className="text-3xl font-black text-blue-300">{activeTasks}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg border border-green-400/30 backdrop-blur-sm">
          <p className="text-green-300/60 text-sm font-semibold mb-1">Completed</p>
          <p className="text-3xl font-black text-green-300">{completedTasks}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your conquests... 🔍"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition backdrop-blur-sm"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider transition ${
                  filter === f
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white/90'
                }`}
              >
                {f === 'all' ? '📋 All' : f === 'active' ? '⚡ Active' : '✅ Completed'}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/20 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition"
          >
            <option value="priority">⭐ Priority</option>
            <option value="dueDate">📅 Due Date</option>
            <option value="created">🕒 Newest</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {sortedTasks.length > 0 ? (
        <TaskList
          tasks={sortedTasks}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
        />
      ) : (
        <div className="text-center py-12 px-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="text-4xl mb-3">🎯</div>
          <p className="text-white/70 font-semibold mb-2">
            {tasks.length === 0 ? "No tasks yet. Add one to dominate!" : "No tasks match your search."}
          </p>
          <p className="text-white/40 text-sm">
            {tasks.length === 0 ? "Build your empire one task at a time." : "Try a different search term."}
          </p>
        </div>
      )}
    </div>
  );
}
