import {use} from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

type Params = {
  params: {
    id: string;
  };
};

// Fetch function
async function getTask(id: string): Promise<Task | null> {
  try {
    const res = await fetch(
      `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`,
      {cache: "no-store"}
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.id) return null;

    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export default function ViewTask({
  params,
}: {
  params: Promise<Params["params"]>;
}) {
  const {id} = use(params);
  const task = use(getTask(id));

  if (!task) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 p-6 rounded-md text-center shadow">
          <h1 className="text-xl font-bold mb-2">❌ Task Not Found</h1>
          <p className="text-sm">
            The task you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
      <section className="bg-gray-800 shadow-lg rounded-lg max-w-2xl w-full p-8 sm:p-12 md:p-16 text-gray-100">
        <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-8 text-center">
          Task Details
        </h1>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-lg font-semibold">Title:</h2>
            <p className="mt-1 sm:mt-0 text-base sm:text-lg">{task.title}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Description:</h2>
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-lg font-semibold">Status:</h2>
            <span
              className={`mt-1 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                task.status.toLowerCase() === "completed"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : task.status.toLowerCase() === "pending"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                  : task.status.toLowerCase() === "in progress"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                  : task.status.toLowerCase() === "failed"
                  ? "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100"
              }`}
            >
              {task.status}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-lg font-semibold">Due Date:</h2>
            <p className="mt-1 sm:mt-0 text-base">
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
