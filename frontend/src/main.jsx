import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./i18n";
import { initAnalytics } from "./lib/analytics";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Initialize analytics after initial render
initAnalytics({
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  fbPixelId: import.meta.env.VITE_FB_PIXEL_ID,
});

