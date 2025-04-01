import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
  richColors
  duration={5000}
  expand
  toastOptions={{
    style: {
      background: "#1E293B", // Dark Background
      color: "#F8FAFC", // Light Text
      borderRadius: "12px",
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
      padding: "18px 22px", // Bigger padding for a larger feel
      fontSize: "18px", // Increased font size
      fontWeight: "600",
    },
    closeButton: true,
    className: "border border-gray-700",
  }}
/>

    </Provider>
  </StrictMode>
);
