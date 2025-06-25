"use client";

import TaskForm from "../../../../components/TaskForm";

type Params = {
  params: {
    id: string;
  };
};

export default function EditTask({params}: Params) {
  const handleUpdate = (task: unknown) => {
    console.log(`Task #${params.id} updated:`, task);
    // 🔜 Future API PATCH
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Task #{params.id}</h1>
      <TaskForm
        initialValues={{
          title: "Dummy Title",
          description: "Edit description",
          status: "pending",
          due_date: "2025-07-01",
        }}
        onSubmit={handleUpdate}
        submitText="Update Task"
        successMessage="Task updated successfully!"
      />
    </div>
  );
}
