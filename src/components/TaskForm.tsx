import { useState } from 'react';

interface TaskFormProps {
  onAddTask: (task: any) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');

  const categories = ['General', 'Work', 'Personal', 'Health', 'Learning', 'Fitness', 'Social'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Give your task a commanding title!');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    onAddTask(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('General');
    setDueDate('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl font-bold text-white text-lg uppercase tracking-wider shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transform hover:scale-105 transition duration-200 flex items-center justify-center gap-2"
      >
        <span className="text-2xl">⚡</span>
        Add New Conquest
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl border border-purple-500/50 shadow-2xl shadow-purple-500/30 max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            New Task
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-white/60 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wider">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What will you conquer?"
              className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details of your mission..."
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition resize-none"
            />
          </div>

          {/* Priority & Category Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wider">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition font-semibold"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition font-semibold"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wider">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition duration-200 mt-6"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
