import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Feedback from "./components/Feedback";
import { HashRouter, Routes, Route } from "react-router";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
