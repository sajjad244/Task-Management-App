type Params = {
  params: {
    id: string;
  };
};

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

async function getTask(id: string): Promise<Task> {
  const res = await fetch(
    `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`,
    {cache: "no-store"}
  );
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}

export default async function ViewTask({params}: Params) {
  const task = await getTask(params.id);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-pink-50 flex items-center justify-center px-4 py-10">
      <section className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-8 sm:p-12 md:p-16">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center">
          Task Details
        </h1>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-lg font-semibold text-gray-700">Title:</h2>
            <p className="mt-1 sm:mt-0 text-gray-900 text-base sm:text-lg">
              {task.title}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Description:
            </h2>
            <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-lg font-semibold text-gray-700">Status:</h2>
            <span
              className={`mt-1 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                task.status.toLowerCase() === "completed"
                  ? "bg-green-100 text-green-800"
                  : task.status.toLowerCase() === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-lg font-semibold text-gray-700">Due Date:</h2>
            <p className="mt-1 sm:mt-0 text-gray-900 text-base">
              {new Date(task.due_date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
