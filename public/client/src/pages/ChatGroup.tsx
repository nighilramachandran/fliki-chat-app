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
import { GetAllGroupAsync, getChatGroupAsync } from "../redux/reducers/group";
import { RootState } from "../redux/store";
import styled from "@emotion/styled";
import { setUser } from "../redux/reducers/auth";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { ChatUsers, Group } from "../interfaces/Group";

import socketIO from "socket.io-client";
import { enqueueSnackbar } from "notistack";
const socket = socketIO("http://localhost:3005/");
socket.on("connect", () => {
  console.log("Connected");

  // if you want to join group
  // like axio.post("join api")
  // socket.emit("join", { name: "FirstGroup", groupId: "qweq" });

  // if you want to send message
  // axios.post("send message")
});
// will be called when you receive a message
socket.on("new-message", (message) => {
  console.log("new message", message);
});
//
socket.on("logout", () => console.log("Logout"));
socket.on("join", () => console.log("join"));

socket.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

const sendMessage = () => {
  // const sendMessage = (msg, groupId, name) => {
  socket.emit("send-message", {
    test: 1,
    msg: "hello najeb test by nIhguk",
    groupId: "qweq",
    name: "najeb",
  });
};
// sendMessage();

console.log(socket);
socket.on("connect", () => {
  console.log("Connect", socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("groupJoined", ({ message, status }) => {
  enqueueSnackbar(message, {
    variant: status ? "success" : "error",
  });
});
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

  //dispatcher
  const dispatch = useAppDispatch();

  //states
  const [groupButtons, setgroupButtons] = useState<boolean>(false);

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

  const handleJoinGroup = (groupname: string, groupId: string) => {
    socket.emit("join", {
      groupname: groupname,
      groupId: groupId,
      userId: user[0]._id,
      username: user[0].username,
    });
    setgroupButtons((prev) => !prev);
  };

  const handleChatUsers = (groupId: string) => {
    dispatch(
      getChatGroupAsync({
        groupId: groupId,
        userId: user[0]._id,
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

  // useEffect(() => {
  //   dispatch(
  //     getChatGroupAsync({
  //       groupId: currentGroupId,
  //       userId: user[0]._id,
  //     })
  //   );
  // }, [currentGroupId]);

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
            handleJoinGroupP={(groupname, groupId) =>
              handleJoinGroup(groupname, groupId)
            }
            handleChatUsersP={(groupId) => handleChatUsers(groupId)}
          />
        </Grid>
        <Grid item xs={8}>
          <ChatContainer chatGroupUsers={chatGroupUsers} />
        </Grid>
      </Grid>
    </Stack>
  );
};

// interfaces
interface SideBarProps {
  grp: any;
  user: any;
  handleJoinGroupP: (groupname: string, groupId: string) => void;
  handleChatUsersP: (groupId: string) => void;
}

// components

const SideBar = ({
  grp,
  user,
  handleJoinGroupP,
  handleChatUsersP,
}: SideBarProps) => {
  const handleJoinGrp = (ind: number) => {
    handleJoinGroupP && handleJoinGroupP(grp[ind].groupname, grp[ind]._id);
  };

  const handleChipClick = (ind: number) => {
    handleChatUsersP && handleChatUsersP(grp[ind]._id);
  };

  return (
    <Paper sx={{ height: "80vh" }}>
      <Stack direction={"column"} spacing={2} alignItems={"center"}>
        <Typography sx={{ fontWeight: 800 }}>
          Click the Group to start Chatting
        </Typography>
        {grp.map((group: any, ind: any) => {
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
                  sx={{ width: "100%", cursor: "pointer" }}
                  key={ind}
                  onClick={() => handleChipClick(ind)}
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
                <Button
                  value={group._id}
                  onClick={() => handleJoinGrp(ind)}
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
  );
};

interface chatGroupUsersProps {
  chatGroupUsers: ChatUsers[];
  // handleAddMessageP: (message: string) => void;
  // currentGroupId: string;
}

const ChatContainer = ({
  chatGroupUsers,
}: // handleAddMessageP,
// currentGroupId,
chatGroupUsersProps) => {
  // const handleMessage = (msg: string) => {
  //   handleAddMessageP && handleAddMessageP(msg);
  // };

  return (
    <Paper
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
              onSubmit={sendMessage}
              // onSubmit={handleMessage}
              submitLable={"Send"}
              resetFrom={true}
            ></CustomForm>
          </Stack>
        </Grid>
      </Grid>
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
