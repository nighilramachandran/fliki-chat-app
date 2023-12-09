import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";
import { Box, Button, Chip, Grid, Paper, Stack } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { GetAllGroupAsync, JoinGroupAsync } from "../redux/reducers/group";
import { RootState } from "../redux/store";
import styled from "@emotion/styled";
import { setUser } from "../redux/reducers/auth";

const ChatGroup = () => {
  //routes
  const { AUTH } = ROUTES;

  //dispatcher
  const dispatch = useAppDispatch();

  //selectors
  const { groups } = useAppSelector((state: RootState) => state.Group);
  const { user } = useAppSelector((state: RootState) => state.Auth);

  // const isUserInGroup = groups.users.some((user) => user.userId === userId);

  //navigate
  const navigate = useNavigate();

  //functions
  const handleCreateGroup = () => {
    navigate(AUTH.CREATE_GROUP);
  };

  const handleJoinGrop = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(
      JoinGroupAsync({
        groupId: e.currentTarget.value,
        userId: user[0]._id,
        username: user[0].username,
      })
    );
  };

  //effects
  useEffect(() => {
    dispatch(GetAllGroupAsync());
  }, []);

  //effects
  useEffect(() => {
    const storedUserString = localStorage.getItem("chat-app-user");
    if (storedUserString !== null) {
      const storedUser = JSON.parse(storedUserString);
      dispatch(setUser([storedUser]));
    }
  }, [dispatch]);

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
              {groups?.length !== 0 &&
                groups?.map((el, index) => {
                  return (
                    <Grid
                      key={index}
                      container
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Grid item xs={6}>
                        <Chip
                          sx={{ width: "100%" }}
                          key={index}
                          label={el.groupname}
                          variant="filled"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Button
                          value={el._id}
                          onClick={(e) => handleJoinGrop(e)}
                          variant="text"
                        >
                          Join Group
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ height: "80vh" }}>
            <StyledBoxInner />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

const StyledBoxInner = styled(Box)(({ theme }: any) => ({
  width: "100%",
  height: "100%",
  background: `${theme.palette.background.default}`,
}));

export default ChatGroup;
