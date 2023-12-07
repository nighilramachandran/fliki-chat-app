import { Components, Theme } from "@mui/material/styles";

export const typographyOverride: Components<Theme> = {
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        // fontWeight: "400px",
        // fontSize: "12px",
      }),
      //   subtitle1: ({ theme }) => ({ color: theme.palette.text.secondary }),
      //   subtitle2: ({ theme }) => ({ color: theme.palette.text.secondary, fontSize: ".8rem" }),
      //   paragraph: () => ({ fontSize: "12px" }),
    },
    // variants: [
    //   {
    //     props: { color: "gradient" },
    //     style: () => ({
    //       background:
    //         "-webkit-linear-gradient( #EF4652 0, #ff003e 25.21%, #e21a67 33.24%, #B04182 47.01%, #6352A0 67.09%)",
    //       WebkitBackgroundClip: "text",
    //       WebkitTextFillColor: "transparent",
    //       backgroundClip: "text",
    //       textFillColor: "transparent",
    //     }),
    //   },
    // ],
  },
};
