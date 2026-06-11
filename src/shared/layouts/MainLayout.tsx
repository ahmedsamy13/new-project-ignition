import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/shared/ui";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="flex items-center justify-between border-b bg-white dark:bg-gray-900 dark:border-gray-800 px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Enterprise App</h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
