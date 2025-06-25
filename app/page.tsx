"use client";

import {useEffect, useState} from "react";
import TaskCard from "../components/TaskCard";
import Loader from "@/components/Loader";

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

  const handleDelete = async (id: string) => {
    try {
      await fetch(
        `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`,
        {
          method: "DELETE",
        }
      );
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📋 Task Dashboard</h1>
        <a
          href="/tasks/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition"
        >
          + Add New Task
        </a>
      </div>

      {tasks.length === 0 ? (
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
