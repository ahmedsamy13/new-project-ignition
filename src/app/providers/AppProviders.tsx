import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ErrorBoundaryProvider>
  );
}
