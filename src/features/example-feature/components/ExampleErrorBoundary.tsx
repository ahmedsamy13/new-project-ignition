import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/ui";
import { useQueryClient } from "@tanstack/react-query";
import { exampleKeys } from "../api/exampleApi";

export function ExampleErrorBoundary({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset query cache for this feature when "Try Again" is clicked
        queryClient.invalidateQueries({ queryKey: exampleKeys.all });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
