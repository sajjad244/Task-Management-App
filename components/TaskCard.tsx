"use client";

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
  const statusColor =
    task.status === "completed"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm mb-4 border border-gray-200 hover:shadow-md transition duration-200 max-w-md w-full mx-auto">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-1">
          {task.title}
        </h2>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
        {task.description}
      </p>

      <p className="text-xs text-gray-500 mb-3">
        <span className="font-medium">Due:</span>{" "}
        {new Date(task.due_date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      <div className="flex flex-wrap gap-3 text-sm">
        <a
          href={`/tasks/${task.id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          View
        </a>
        <a
          href={`/tasks/${task.id}/edit`}
          className="text-green-600 hover:underline font-medium"
        >
          Edit
        </a>
        {onDelete && (
          <button
            className="text-red-500 hover:underline font-medium"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
