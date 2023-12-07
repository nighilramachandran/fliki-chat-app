import { ThemeOptions } from "@mui/material/styles";
import { typographyStylesOverrides } from "./overrides/components/TypographyFontStyle";
import { componetnsOverrides } from "./overrides/components";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    text: {
      primary: "#414141",
      secondary: "#B1B5C3",
    },
    background: {
      paper: "#F5F8FE",
    },
    primary: {
      main: "#D6357E",
    },
  },
  //   shape: { ...shapOverrides },
  typography: { ...typographyStylesOverrides },
  components: {
    ...componetnsOverrides,
  },
};

export default lightThemeOptions;
