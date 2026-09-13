import TaskCard from './TaskCard';

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

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({
  tasks,
  onCompleteTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={() => onCompleteTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
    </div>
  );
}
