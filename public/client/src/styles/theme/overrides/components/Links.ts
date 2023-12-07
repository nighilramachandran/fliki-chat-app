import { Components } from "@mui/material/styles";

export const linkOverride: Components = {
  MuiLink: {
    styleOverrides: {
      root: ({ theme }: any) =>
        theme.unstable_sx({
          textDecoration: "none",
          fontWeight: "700",
          fontSize: "16px",
          color: theme.palette.text.primary,
          "&:hover": {
            opacity: 0.6,
          },
        }),
    },
  },
};
