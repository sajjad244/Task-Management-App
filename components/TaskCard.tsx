"use client";

import {AiOutlineEye, AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";

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
    <div
      className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm
      mb-4 max-w-md w-full mx-auto
      hover:shadow-lg hover:scale-[1.02] transition-transform duration-200
      flex flex-col
      min-h-[220px]"
    >
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

      <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-grow">
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

      <div className="flex flex-wrap gap-3 text-sm mt-auto">
        <a
          href={`/tasks/${task.id}`}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-2 py-1 rounded transition"
        >
          <AiOutlineEye size={16} />
          View
        </a>
        <a
          href={`/tasks/${task.id}/edit`}
          className="flex items-center gap-1 text-green-600 hover:text-green-800 hover:bg-green-100 px-2 py-1 rounded transition"
        >
          <AiOutlineEdit size={16} />
          Edit
        </a>
        {onDelete && (
          <button
            className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-100 px-2 py-1 rounded transition"
            onClick={() => onDelete(task.id)}
          >
            <AiOutlineDelete size={16} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
