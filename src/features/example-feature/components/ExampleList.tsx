import { useExamples } from "../hooks";
import { ExampleCard } from "./ExampleCard";
import { Spinner } from "@/shared/ui";

export function ExampleList() {
  const { data, isLoading, isError, error } = useExamples();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    throw error; // Will be caught by ExampleErrorBoundary
  }

  if (!data?.data.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-500">
        No examples found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((example) => (
        <ExampleCard key={example.id} example={example} />
      ))}
    </div>
  );
}
