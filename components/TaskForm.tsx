"use client";

import {useState} from "react";
import Modal from "./Modal";

type Task = {
  title: string;
  description: string;
  status: string;
  due_date: string;
};

type Props = {
  initialValues: Task;
  onSubmit: (task: Task) => void;
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
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({...task, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    setShowModal(true); // show modal after submit
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Title"
          required
        />

        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Description"
          required
        />

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitText}
        </button>
      </form>

      {/* Modal shown after successful submit */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold text-center">{successMessage}</h2>
      </Modal>
    </>
  );
}
