import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/index.css";

// Enable MSW mocking if configured
async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS === "true") {
    // We dynamically import so MSW isn't bundled in production
    const { worker } = await import("../test/mocks/browser");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
