// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./assets/styles/reset.css";
import "./assets/styles/fonts.css";
import "./assets/styles/root.css";
import { BrowserRouter } from "react-router";
import "./utils/i18n.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
