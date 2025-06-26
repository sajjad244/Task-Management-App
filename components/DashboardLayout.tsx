"use client";

import {useState} from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen ">
      {/* Sidebar */}
      <aside className="bg-gray-900 border-r shadow-2xl px-6 py-8 hidden md:block">
        <h1 className="text-xl font-bold text-indigo-700 mb-6">
          📋 Task Manager
        </h1>
        <nav className="space-y-4 text-sm">
          <Link href="/" className="text-indigo-600 hover:underline block">
            🏠 Dashboard
          </Link>
          <Link
            href="/tasks/new"
            className="text-indigo-600 hover:underline block"
          >
            ➕ Add Task
          </Link>
        </nav>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 bg-white h-full p-6 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-xl font-bold text-indigo-700 mb-6">
              📋 Task Manager
            </h1>
            <nav className="space-y-4 text-sm">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="text-indigo-600 hover:underline block"
              >
                🏠 Dashboard
              </Link>
              <Link
                href="/tasks/new"
                onClick={() => setSidebarOpen(false)}
                className="text-indigo-600 hover:underline block"
              >
                ➕ Add Task
              </Link>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full">
        {/* Mobile Topbar */}
        <div className="md:hidden p-4 border-b flex items-center justify-between bg-white shadow-sm sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-indigo-600 text-xl"
          >
            ☰
          </button>
          <h1 className="text-base font-semibold text-indigo-700">
            Task Manager
          </h1>
        </div>

        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
