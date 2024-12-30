import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import googleTheme from "@settings/Theme";

import "@styles/app.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <CssBaseline />
      <ThemeProvider theme={googleTheme}>
        <App />
      </ThemeProvider>
    </>
  </React.StrictMode>
);
