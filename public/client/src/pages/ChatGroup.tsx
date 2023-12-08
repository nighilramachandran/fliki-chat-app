import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";
import { Button, Grid, Paper, Stack } from "@mui/material";

const ChatGroup = () => {
  //routes
  const { ROOT, AUTH } = ROUTES;
  //navigate
  const navigate = useNavigate();
  //effects
  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");
    if (!user) navigate(ROOT);
  }, []);

  //functions
  const handleCreateGroup = () => {
    navigate(AUTH.CREATE_GROUP);
  };
  return (
    <Stack direction={"column"} flexGrow={1} gap={2}>
      <Button
        onClick={() => handleCreateGroup()}
        variant="outlined"
        sx={{ maxWidth: "200px" }}
      >
        Create a Group
      </Button>
      <Grid container alignItems={"start"} spacing={2}>
        <Grid item xs={4}>
          <Paper sx={{ height: "80vh" }}></Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ height: "80vh" }}></Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChatGroup;
