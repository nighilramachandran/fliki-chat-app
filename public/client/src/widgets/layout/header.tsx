import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Stack, Toolbar } from "@mui/material";
import { HEADER } from "../../utils/config";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes/constants";

export const Header: React.FC = () => {
  //path
  const location = useLocation();
  const currentPath = location.pathname;
  //routes
  const { AUTH } = ROUTES;

  //states
  const [avatarName, setAvatarName] = useState<string>("");

  //effects
  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");
    if (user) {
      const char = JSON.parse(localStorage.getItem("chat-app-user") ?? "");
      setAvatarName(char.username);
    }
  }, []);

  return (
    <AppBar
      sx={{
        position: "sticky",
        bgcolor: "background.header",
        borderRadius: 0,
        padding: "0px 10px 0px 10px",
      }}
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
        {currentPath === AUTH.CHAT_GROUP && (
          <Box sx={{ marginLeft: "auto" }}>
            <Stack direction={"row"} spacing={2}>
              <Avatar
                sx={{
                  background: "transparent",
                  border: "1px solid #fc9915",
                  color: "#fc9915",
                }}
              >
                {avatarName.charAt(0).toUpperCase()}
              </Avatar>
              <Button variant="contained" sx={{ color: "white" }}>
                Log out
              </Button>
            </Stack>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
