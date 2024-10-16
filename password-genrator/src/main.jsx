import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ExamInfo from "./ExamInfo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ExamInfo />
  </StrictMode>
);
