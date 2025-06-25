type Params = {
  params: {
    id: string;
  };
};

export default function ViewTask({params}: Params) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Task Details</h1>
      <p>
        <strong>Title:</strong> Dummy Task {params.id}
      </p>
      <p>
        <strong>Description:</strong> This is a dummy task for testing.
      </p>
      <p>
        <strong>Status:</strong> Pending
      </p>
      <p>
        <strong>Due Date:</strong> 2025-07-01
      </p>
    </div>
  );
}
