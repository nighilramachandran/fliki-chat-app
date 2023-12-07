import React from "react";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { HEADER } from "../../utils/config";

// import { useState } from "react";
// const StyledAvatar = styled(Box)(({ theme }: any) => ({
//   width: "80px",
//   height: "80px",
//   borderRadius: "50%",
//   background: "transparent",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: "3px",
//   border: `3px solid ${theme.palette.primary.main}`,
//   marginRight: "40px",
// }));

// const StyledAvatarInner = styled(Box)(({ theme }: any) => ({
//   width: "100%",
//   height: "100%",
//   background: "white",
//   borderRadius: "50%",
//   position: "relative",
//   overflow: "hidden",
//   boxShadow: "0 10px 6px -6px #777",
// }));

export const Header: React.FC = () => {
  return (
    <AppBar
      sx={{ position: "sticky", bgcolor: "background.header", borderRadius: 0 }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
        }}
      >
        <Box sx={{ marginLeft: "auto" }}>
          {/* <Button
            sx={{
              color: "text.primary",
              background: "transparent",
              border: "2px solid #fc9915",
              borderRadius: "10px",
            }}
            variant="contained"
          >
            Download CV
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
