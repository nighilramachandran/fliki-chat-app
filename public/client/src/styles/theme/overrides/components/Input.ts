import { Components, Theme } from "@mui/material/styles";

export const inputOverride: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        borderRadius: "6px",
        height: "40px",
      }),
      multiline: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
      }),
    },
  },

  MuiTextField: {
    variants: [
      {
        props: { className: "outlined-gradient" },
        style: ({ theme }) => ({
          color: theme.palette.text.primary,
          backgroundImage:
            "linear-gradient(199.24deg, #F26722 1%, #F26623 5.95%, #F2622A 9.91%, #F15C35 13.87%, #F05343 17.83%, #EF4652 21.79%, #EE3260 25.75%, #ED1B68 27.73%, #DB2B6F 39.61%, #B04182 63.37%, #6352A0 98.02%, #5E53A3 100%)",
          border: "none",
          overflow: "hidden",
          zIndex: "0",
          borderRadius: "5px",

          "&:before": {
            content: "''",
            position: "absolute",
            top: "1px",
            right: "1px",
            bottom: "1px",
            left: "1px",
            backgroundColor: theme.palette.background.default,
            borderRadius: "5px",
            boxSizing: "border-box",
            zIndex: "-1",
            border: "none",
          },
          "&:hover": {
            border: "none",
            outline: "none",
          },
          "&:focus": {
            outline: "none",
            border: "none",
          },
        }),
      },
    ],
  },
};
