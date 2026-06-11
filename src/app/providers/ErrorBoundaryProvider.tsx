import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/ui";

export function ErrorBoundaryProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.href = "/";
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
