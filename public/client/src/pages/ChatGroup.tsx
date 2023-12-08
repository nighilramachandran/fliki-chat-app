import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";
import { Button, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { getAllGroupRoutes } from "../utils/APIRoutes";

interface Group {
  groupname: string;
}

const ChatGroup = () => {
  //states
  const [allGroups, setAllGroups] = useState<Group[]>();
  //routes
  const { ROOT, AUTH } = ROUTES;
  //navigate
  const navigate = useNavigate();

  //functions
  const handleCreateGroup = () => {
    navigate(AUTH.CREATE_GROUP);
  };

  //functions
  const getAllGroups = async () => {
    try {
      const { data } = await axios.get(getAllGroupRoutes);

      if (data.status) {
        setAllGroups(data.groups);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  //effects
  useEffect(() => {
    getAllGroups();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");
    if (!user) navigate(ROOT);
  }, []);

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
          <Paper sx={{ height: "80vh" }}>
            <Stack direction={"column"} spacing={1}>
              {allGroups?.length !== 0 &&
                allGroups?.map((el, index) => {
                  return (
                    <Chip key={index} label={el.groupname} variant="filled" />
                  );
                })}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ height: "80vh" }}></Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChatGroup;
