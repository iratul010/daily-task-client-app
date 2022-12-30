import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/Routes/Routes";
import { theme } from "./Theme/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "100vh" }}>
        <RouterProvider router={router} />
        <CssBaseline />
      </div>
    </ThemeProvider>
  );
}

export default App;
