import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NavbarTop from "./components/navbar.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <NavbarTop />
      <App />
    </BrowserRouter>
  </>
);
