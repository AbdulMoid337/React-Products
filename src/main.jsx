import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Context from "./Components/utils/Context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Context>
      <BrowserRouter>
        <App />
        <ToastContainer position="bottom-right" autoClose={5000} />
      </BrowserRouter>
    </Context>
  </StrictMode>
);
