"use client";

import {useEffect, useState} from "react";
import TaskCard from "@/components/TaskCard";
import Loader from "@/components/Loader";
import Link from "next/link";
import toast from "react-hot-toast";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks"
        );
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = (id: string) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <span>Are you sure you want to delete?</span>
        <div className="flex justify-end gap-3">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // dismiss prompt
              const res = await fetch(
                `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`,
                {method: "DELETE"}
              );

              if (!res.ok) {
                toast.error("Failed to delete task");
                return;
              }

              setTasks((prev) => prev.filter((task) => task.id !== id));
              toast.success("Task deleted successfully!");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </span>
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-700">
          📋 Task Dashboard
        </h1>
        <Link
          href="/tasks/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition"
        >
          + Add New Task
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <p className="text-lg">No tasks found</p>
          <p className="text-sm">Start by adding a new task.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
