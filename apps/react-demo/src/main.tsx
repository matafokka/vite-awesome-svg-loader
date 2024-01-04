import "ui/styles.scss";
import { initImageSizeAdjustment } from "ui/image-size-adjustment";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles.scss";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

initImageSizeAdjustment();