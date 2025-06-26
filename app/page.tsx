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
  const [filter, setFilter] = useState<
    "all" | "pending" | "completed" | "failed"
  >("all");

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
              toast.dismiss(t.id);
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

  const filteredTasks = tasks
    .filter((task) =>
      filter === "all" ? true : task.status.toLowerCase() === filter
    )
    .sort(
      (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    );

  const total = tasks.length;
  const completed = tasks.filter(
    (task) => task.status.toLowerCase() === "completed"
  ).length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <Link
          href="/tasks/new"
          className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-blue-900 text-sm transition w-fit"
        >
          + Add New Task
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-4 text-sm text-gray-300 ">
        ✅ {completed} done / 🧮 {total} total
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "pending", "completed", "failed"].map((status) => (
          <button
            key={status}
            onClick={() =>
              setFilter(status as "all" | "pending" | "completed" | "failed")
            }
            className={`px-4 py-2 rounded-md border text-sm capitalize transition ${
              filter === status
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 border-gray-300 text-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Loader / Tasks */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <p className="text-lg">No {filter} tasks found</p>
          <p className="text-sm">Try adding or changing filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
