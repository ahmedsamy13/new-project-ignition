import { ExampleList, ExampleErrorBoundary } from "@/features/example-feature";
import { Button } from "@/shared/ui";

export function ExampleListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Examples</h2>
          <p className="text-gray-500">Manage your example entities here.</p>
        </div>
        <Button>Create Example</Button>
      </div>

      <ExampleErrorBoundary>
        <ExampleList />
      </ExampleErrorBoundary>
    </div>
  );
}
