import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Context from "./Components/utils/Context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <App />
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  </Context>
);
