import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskDetailsPage from "./pages/TaskDetails.jsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TasksPage from "./pages/Tasks.jsx";
import HomePage from "./pages/Home.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/tasks",
    element: <TasksPage />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPage />,
  },
  {
    path: "/",
    element: <HomePage />,
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
