import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ErrorBoundaryProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ErrorBoundaryProvider>
    </ThemeProvider>
  );
}
