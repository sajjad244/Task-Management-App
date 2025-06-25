type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

type Props = {
  task: Task;
  onDelete?: (id: string) => void;
};

export default function TaskCard({task, onDelete}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="text-xs mt-2 text-gray-500">
        <p>Status: {task.status}</p>
        <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
      </div>
      <div className="mt-3 flex gap-4">
        <a
          href={`/tasks/${task.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View
        </a>
        <a
          href={`/tasks/${task.id}/edit`}
          className="text-green-600 hover:underline text-sm"
        >
          Edit
        </a>
        {onDelete && (
          <button
            className="text-red-500 text-sm hover:underline"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
