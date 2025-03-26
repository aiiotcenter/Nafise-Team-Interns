import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import "./index.css";
import App from "./App"; // Import the App component

const container = document.getElementById("root"); // Get the root element
if (container) {
  const root = createRoot(container); // Create a root
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}