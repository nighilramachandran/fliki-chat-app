import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import DarkTheme from "./styles/theme/DarkTheme";
import { SnackbarProvider } from "notistack";
import { PrivateRoutes } from "./Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const darkThem = createTheme(DarkTheme);
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
