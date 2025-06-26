"use client";

import {useState} from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";

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

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formatted = date.toISOString().split("T")[0];
      setTask({...task, due_date: formatted});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(task);
      toast.success(successMessage);
      setTask(initialValues);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to save task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 text-gray-800 dark:text-white"
    >
      {/* Title */}
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-md px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          placeholder="Task Title"
          required
          disabled={isSubmitting}
          autoComplete="off"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-md px-4 py-3 h-28 resize-none focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          placeholder="Task Description"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-semibold">Status</label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-md px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          disabled={isSubmitting}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="block mb-1 font-semibold">Due Date</label>
        <DatePicker
          selected={task.due_date ? new Date(task.due_date) : null}
          onChange={handleDateChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-md px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a due date"
          disabled={isSubmitting}
        />
      </div>

      {/* Submit */}
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
  );
}
