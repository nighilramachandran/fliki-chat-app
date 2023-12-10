import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  GetAllGroupAsync,
  JoinGroupAsync,
  getChatGroupAsync,
} from "../redux/reducers/group";
import { RootState } from "../redux/store";
import styled from "@emotion/styled";
import { setUser } from "../redux/reducers/auth";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { AddMessageAsync } from "../redux/reducers/message";
import { Formik } from "formik";
import { ChatUsers, Group } from "../interfaces/Group";
import { LottieLazyLoad } from "../components/lottie-lazyload/LottieLazyLoad";

const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "message",
    placeholder: "Write your message",
    validate: { required: true },
    colProps: { xs: 12 },
  },
];

const ChatGroup = () => {
  //routes
  const { AUTH } = ROUTES;

  //states
  const [currentGroupId, setCurrentGroupId] = useState<string>("");

  //dispatcher
  const dispatch = useAppDispatch();

  //selectors
  const { groups, chatGroupUsers } = useAppSelector(
    (state: RootState) => state.Group
  );
  const { user } = useAppSelector((state: RootState) => state.Auth);

  //navigate
  const navigate = useNavigate();

  //functions
  const handleCreateGroup = () => {
    navigate(AUTH.CREATE_GROUP);
  };

  const handleJoinGroup = (ChatGroupId: string) => {
    dispatch(
      JoinGroupAsync({
        groupId: ChatGroupId,
        userId: user[0]._id,
        username: user[0].username,
      })
    );
  };
  const handleChatGroup = (ChatGroupId: string) => {
    setCurrentGroupId(ChatGroupId);
    dispatch(
      getChatGroupAsync({
        groupId: ChatGroupId,
        userId: user[0]._id,
      })
    );
  };

  const handleAddMessage = (msg: any) => {
    dispatch(
      AddMessageAsync({
        message: msg.message,
        senderId: user[0]._id,
        groupId: currentGroupId,
      })
    );
  };

  //effects
  useEffect(() => {
    dispatch(GetAllGroupAsync());
  }, [dispatch]);

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
          <SideBar
            grp={groups}
            user={user}
            handleChatGroupP={(GroupId) => handleChatGroup(GroupId)}
            handleJoinGroupP={(ChatGroupId) => handleJoinGroup(ChatGroupId)}
          />
        </Grid>
        <Grid item xs={8}>
          <ChatContainer
            chatGroupUsers={chatGroupUsers}
            handleAddMessageP={(val) => handleAddMessage(val)}
            currentGroupId={currentGroupId}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

// interfaces
interface SideBarProps {
  grp: any;
  user: any;
  handleChatGroupP: (GroupId: string) => void;
  handleJoinGroupP: (ChatGroupId: string) => void;
}

// components

const SideBar = ({
  grp,
  user,
  handleChatGroupP,
  handleJoinGroupP,
}: SideBarProps) => {
  const handleChatGrp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ChatGroupId = e.currentTarget.value;
    handleChatGroupP && handleChatGroupP(ChatGroupId);
  };
  const handleJoinGrp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ChatGroupId = e.currentTarget.value;
    handleJoinGroupP && handleJoinGroupP(ChatGroupId);
  };

  return (
    <Paper sx={{ height: "80vh" }}>
      <Stack direction={"column"} spacing={1}>
        {grp.map((group: any, ind: any) => {
          const isUserInGroup = group.users.some(
            (ur: any) => ur.userId === user[0]._id
          );

          return (
            <Grid
              key={ind}
              container
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid item xs={6}>
                <Chip
                  sx={{ width: "100%" }}
                  key={ind}
                  label={group.groupname}
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
                {isUserInGroup ? (
                  <Button
                    value={group._id}
                    onClick={(e) => handleChatGrp(e)}
                    variant="text"
                  >
                    Chat in Group
                  </Button>
                ) : (
                  <Button
                    value={group._id}
                    onClick={(e) => handleJoinGrp(e)}
                    variant="text"
                  >
                    Join Group
                  </Button>
                )}
              </Grid>
            </Grid>
          );
        })}
      </Stack>
    </Paper>
  );
};

interface chatGroupUsersProps {
  chatGroupUsers: ChatUsers[];
  handleAddMessageP: (message: string) => void;
  currentGroupId: string;
}

const ChatContainer = ({
  chatGroupUsers,
  handleAddMessageP,
  currentGroupId,
}: chatGroupUsersProps) => {
  const handleMessage = (msg: string) => {
    handleAddMessageP && handleAddMessageP(msg);
  };

  return (
    <Paper
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currentGroupId === "" ? (
        <Box sx={{ width: "300px", height: "300px" }}>
          <LottieLazyLoad url={`/lotties/contact.json`} />
        </Box>
      ) : (
        <Grid container height={"100%"} flexGrow={1} flexShrink={0}>
          <Grid item xs={3}>
            <Stack direction={"column"} spacing={2}>
              {chatGroupUsers.map((user, ind) => {
                return (
                  <Stack
                    key={ind}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"start"}
                    spacing={2}
                  >
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "green",
                      }}
                    ></Box>
                    <Avatar
                      sx={{
                        background: "transparent",
                        border: "1px solid #fc9915",
                        color: "#fc9915",
                      }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography>{user.username}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs={9} flexGrow={1} flexShrink={0}>
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              spacing={2}
              height={"100%"}
              flexGrow={1}
              flexShrink={0}
            >
              <StyledBoxInner />
              <CustomForm
                formName="form"
                inputs={inputs}
                onSubmit={handleMessage}
                submitLable={"Send"}
                resetFrom={true}
              ></CustomForm>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};
//styles
const StyledBoxInner = styled(Box)(({ theme }: any) => ({
  width: "100%",
  height: "100%",
  background: `${theme.palette.background.default}`,
}));

export default ChatGroup;
