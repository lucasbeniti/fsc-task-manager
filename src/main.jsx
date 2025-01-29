import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskDetailsPage from "./pages/TaskDetails.jsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: "brand-dark-blue",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
