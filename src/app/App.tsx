import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProviders } from "./providers";
import { router } from "./router";

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "bg-white text-gray-900 border border-gray-200 shadow-lg rounded-xl font-medium",
          success: {
            iconTheme: { primary: "#22c55e", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
    </AppProviders>
  );
}

export default App;
