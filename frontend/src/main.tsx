import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { OsintAuthProvider } from "@/osint/auth";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <OsintAuthProvider>
        <App />
      </OsintAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
