import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
