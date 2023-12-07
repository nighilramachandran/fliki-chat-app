import { ThemeOptions } from "@mui/material/styles";
import { typographyStylesOverrides } from "./overrides/components/TypographyFontStyle";
import { componetnsOverrides } from "./overrides/components/index";
import { typographyOverride } from "./overrides/components/Typography";

const DarkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: "#d28994",
    },
    background: {
      default: "#003c3b",
      paper: "#43685D",
    },
    primary: {
      main: "#fc9915",
    },
  },
  // shape: { ...shapOverrides },
  typography: { ...typographyStylesOverrides, ...typographyOverride },

  components: {
    ...componetnsOverrides,
  },
};

export default DarkTheme;
