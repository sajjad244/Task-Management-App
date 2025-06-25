"use client";

import {useState} from "react";
import TaskCard from "../components/TaskCard";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

const dummyTasks: Task[] = [
  {
    id: "1",
    title: "Learn Next.js",
    description: "Build task manager UI",
    due_date: "2025-06-30",
    status: "pending",
  },
  {
    id: "2",
    title: "Style with Tailwind",
    description: "Polish the frontend",
    due_date: "2025-07-02",
    status: "completed",
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-red-500">Task Dashboard</h1>
      <div className="mb-4">
        <a
          href="/tasks/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          + Add New Task
        </a>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
}
