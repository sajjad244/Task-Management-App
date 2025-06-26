/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {use, useEffect, useState} from "react";
import TaskForm from "../../../../components/TaskForm";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

type Task = {
  title: string;
  description: string;
  status: string;
  due_date: string;
};

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditTask({params}: Params) {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // unwrap params promise using React's use()
  const {id} = use(params);

  const fetchTask = async () => {
    try {
      const res = await fetch(
        `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`
      );
      const data = await res.json();
      if (!data?.id) throw new Error("Invalid Task");
      setTask(data);
    } catch (error) {
      toast.error("Failed to load task.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdate = async (updatedTask: Task) => {
    try {
      const res = await fetch(
        `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      toast.dismiss();
      toast.success("Task updated successfully!");
      router.push(`/tasks/${id}`);
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!task) {
    return (
      <div className="text-center text-red-500 py-10">Task not found.</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">
        ✏️ Edit Task #{id}
      </h1>
      <TaskForm
        initialValues={task}
        onSubmit={handleUpdate}
        submitText="Update Task"
        successMessage="Task updated successfully!"
      />
    </div>
  );
}
