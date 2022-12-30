import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#52B69A",
      green: "#76C893",
      light: "#fff",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          padding: "0.6rem 2.5rem",
        },
      },
      defaultProps: {
        variant: "contained",
        color: "primary ",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  },
});
