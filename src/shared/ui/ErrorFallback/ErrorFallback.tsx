import { Button } from "../Button";
import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6 text-center"
    >
      <h2 className="mb-2 text-xl font-semibold text-red-800">Something went wrong</h2>
      <pre className="mb-6 max-w-[600px] overflow-auto rounded bg-white p-4 text-sm text-red-600 shadow-sm">
        {error instanceof Error ? error.message : String(error)}
      </pre>
      <Button variant="danger" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}
