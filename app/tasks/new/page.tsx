"use client";

import {useState} from "react";
import TaskForm from "../../../components/TaskForm";

type Task = {
  title: string;
  description: string;
  status: string;
  due_date: string;
};

export default function AddTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreate = async (task: Task) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(
        "https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      const data = await res.json();
      console.log("New task created:", data);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-indigo-600 mb-8 text-center">
        Add New Task
      </h1>

      <TaskForm
        initialValues={{
          title: "",
          description: "",
          status: "pending",
          due_date: "",
        }}
        onSubmit={handleCreate}
        submitText={loading ? "Creating..." : "Create Task"}
        successMessage={success ? "Task added successfully!" : ""}
      />

      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
