import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
