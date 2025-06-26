import Loader from "@/components/Loader";

export default function LoadingTaskView() {
  return (
    <main className="min-h-screen  bg-gray-900 flex justify-center items-center">
      <Loader />
    </main>
  );
}
