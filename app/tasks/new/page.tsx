"use client";

import TaskForm from "../../../components/TaskForm";

export default function AddTask() {
  const handleCreate = (task: unknown) => {
    console.log("New task submitted:", task);
    // 🔜 Future API POST
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Add New Task</h1>
      <TaskForm
        initialValues={{
          title: "",
          description: "",
          status: "pending",
          due_date: "",
        }}
        onSubmit={handleCreate}
        submitText="Create Task"
        successMessage="Task added successfully!"
      />
    </div>
  );
}
