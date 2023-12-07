import React from "react";

import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals.js";
import { PrivateRoutes } from "./Routes";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import darkTheme from "./styles/theme/DarkTheme.ts";
import { SnackbarProvider } from "notistack";
const root = ReactDOM.createRoot(document.getElementById("root"));
const darkThem = createTheme(darkTheme);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkThem}>
      <SnackbarProvider
        maxSnack={2}
        data-testid="toastid"
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <CssBaseline enableColorScheme />
        <PrivateRoutes />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
