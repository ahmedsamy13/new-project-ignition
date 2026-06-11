import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui";

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h2 className="text-3xl font-bold text-gray-900">Welcome to React Enterprise</h2>
        <p className="mt-4 text-lg text-gray-600">
          A scalable, production-ready boilerplate using Feature-Sliced Design.
        </p>
        
        <div className="mt-8 flex gap-4">
          <Link to={ROUTES.EXAMPLES}>
            <Button size="lg">View Examples</Button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="outline" size="lg">Documentation</Button>
          </a>
        </div>
      </section>
      
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-blue-50 p-6">
          <h3 className="font-semibold text-blue-900">Feature-Sliced Design</h3>
          <p className="mt-2 text-sm text-blue-700">Strictly modular architecture for scalable codebases.</p>
        </div>
        <div className="rounded-xl bg-green-50 p-6">
          <h3 className="font-semibold text-green-900">React Query + Zustand</h3>
          <p className="mt-2 text-sm text-green-700">The perfect pair for server and client state management.</p>
        </div>
        <div className="rounded-xl bg-purple-50 p-6">
          <h3 className="font-semibold text-purple-900">Tailwind CSS 4</h3>
          <p className="mt-2 text-sm text-purple-700">Lightning fast, zero-config styling engine.</p>
        </div>
      </section>
    </div>
  );
}
