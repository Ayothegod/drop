// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { SocketProvider } from "./lib/context/useSocketContext.tsx";
import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "../shared/components/ui/toaster.tsx";
import { ThemeProvider } from "../shared/lib/hook/useTheme.tsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {/* <SocketProvider> */}
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
      <Toaster />
      {/* </SocketProvider> */}
    </ThemeProvider>
  </HelmetProvider>
);
