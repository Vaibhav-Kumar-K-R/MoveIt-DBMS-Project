import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./AppRoutes.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Number of retry attempts on failure (default is 3)
      refetchOnWindowFocus: false, // Prevent refetching when window regains focus
      staleTime: 60000, // Data stays fresh for 60 seconds
      cacheTime: 300000, // Data is cached for 5 minutes
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster closeButton richColors />
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
