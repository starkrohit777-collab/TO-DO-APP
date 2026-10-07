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

interface TaskDetailsProps {
  task: Task | undefined;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Task not found 🎯</p>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-bold"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="mb-6 text-purple-300 hover:text-white font-semibold"
        >
          ← Back to Tasks
        </button>

        <div className="p-8 rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-sm shadow-2xl">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-purple-300 text-sm font-bold uppercase tracking-wider mb-2">
                {task.category}
              </p>
              <h1 className="text-4xl font-black">{task.title}</h1>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 font-bold uppercase text-xs">
              {task.priority}
            </span>
          </div>

          <p className="text-white/70 text-lg leading-relaxed">
            {task.description || 'No description added for this task.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/40 text-xs uppercase font-bold mb-1">Due Date</p>
              <p className="font-semibold">{task.dueDate || 'No due date'}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/40 text-xs uppercase font-bold mb-1">Status</p>
              <p className="font-semibold">{task.completed ? '✅ Completed' : '⚡ Active'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
