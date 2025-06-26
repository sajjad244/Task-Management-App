"use client";

import {useState} from "react";
import toast from "react-hot-toast";

type Task = {
  title: string;
  description: string;
  status: string;
  due_date: string;
};

type Props = {
  initialValues: Task;
  onSubmit: (task: Task) => Promise<unknown>;
  submitText?: string;
  successMessage?: string;
};

export default function TaskForm({
  initialValues,
  onSubmit,
  submitText = "Submit",
  successMessage = "Task saved successfully!",
}: Props) {
  const [task, setTask] = useState<Task>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({...task, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(task);
      toast.success(successMessage);

      // Form reset after toast fired
      setTask(initialValues);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to save task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6"
      >
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          placeholder="Task Title"
          required
          disabled={isSubmitting}
          autoComplete="off"
        />

        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 h-28 resize-none focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          placeholder="Task Description"
          required
          disabled={isSubmitting}
        />

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          disabled={isSubmitting}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          required
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : submitText}
        </button>
      </form>
    </>
  );
}
