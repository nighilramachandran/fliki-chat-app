import React from "react";

import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals.js";
import { PrivateRoutes } from "./Routes";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import darkTheme from "./styles/theme/DarkTheme.ts";
const root = ReactDOM.createRoot(document.getElementById("root"));
const darkThem = createTheme(darkTheme);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkThem}>
      <CssBaseline enableColorScheme />
      <PrivateRoutes />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
