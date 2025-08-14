import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { TanstackReactQuery } from "./lib/tanstack-react-query";

import Home from "./components/pages/home";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackReactQuery>
      <Home />
      <Toaster theme="dark" expand/>
    </TanstackReactQuery>
  </StrictMode>
);
