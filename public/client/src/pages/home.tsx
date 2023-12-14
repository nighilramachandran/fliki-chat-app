import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
// import socketIO from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CustomForm, CustomInputFormProps } from "../form";
import { Height } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { CreateGroupAsync, GetAllGroupAsync } from "../redux/reducers/group";
import { CreateGroupReq, Group } from "../interfaces";
import { LoginAsync } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// const socket = socketIO("http://localhost:3005/");

// socket.on("connect", () => {
//   console.log("Connected socket on client");
//   console.log("socket id", socket.id);
// });

// ==============================================

// socket.on("connect", () => {
//   console.log("Connected socket on client");

//   // if you want to join group
//   // like axio.post("join api")
//   // socket.emit("join", { name: "najeb", groupId: "qweq" });

//   // if you want to send message
//   // axios.post("send message")
// });
// // will be called when you receive a message
// socket.on("new-message", (message) => {
//   console.log("new message", message);
// });
// //
// socket.on("logout", () => console.log("Logout"));
// socket.on("join", () => console.log("join"));

// socket.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });

// const sendMessage = () => {
//   // const sendMessage = (msg, groupId, name) => {
//   socket.emit("send-message", {
//     test: 1,
//     msg: "hello najeb test by nIhguk",
//     groupId: "qweq",
//     name: "najeb",
//   });
// };

// console.log(socket);
// socket.on("connect", () => {
//   console.log("Connect", socket.id); // x8WIv7-mJelg7on_ALbx
// });

const Styles = {
  height: `calc(100vh - 120px)`,
};

const Home = () => {
  const { groups } = useAppSelector((state) => state.Group);

  //dispatch
  const dispatch = useAppDispatch();

  //navigate
  const navigate = useNavigate();

  //functions
  const handleCreateGroup = (vals: CreateGroupReq) => {
    dispatch(CreateGroupAsync(vals));
  };

  const handleJoinChat = (groupId: string) => {
    navigate(`/chat/${groupId}`);
  };

  //effects
  useEffect(() => {
    dispatch(GetAllGroupAsync());
  }, [dispatch]);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <SideBarGroups
            groupsProps={groups}
            handleJoinChatProps={(groupId) => handleJoinChat(groupId)}
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <CreateGroup handleCreateProp={(vals) => handleCreateGroup(vals)} />
        </Grid>
      </Grid>
    </Box>
  );
};

interface SideBarProps {
  groupsProps: Group[];
  handleJoinChatProps: (groupId: string) => void;
}

const SideBarGroups = ({ groupsProps, handleJoinChatProps }: SideBarProps) => {
  const handleClickJoin = (groupId: string) => {
    handleJoinChatProps && handleJoinChatProps(groupId);
  };
  return (
    <Box sx={{ height: { ...Styles } }}>
      <Paper sx={{ height: "inherit", overflow: "hidden", overflowY: "auto" }}>
        <Stack spacing={0.7}>
          {groupsProps.length > 0 &&
            groupsProps?.map((group, ind) => {
              return (
                <Grid container key={ind}>
                  <Grid item xs={6}>
                    <Chip
                      sx={{ width: "100%", borderRadius: "5px" }}
                      label={group.groupname}
                    ></Chip>
                  </Grid>
                  <Grid item xs={6} display={"flex"} justifyContent={"center"}>
                    <Button
                      value={group._id}
                      onClick={() => handleClickJoin(group._id)}
                    >
                      Join Chat
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
        </Stack>
      </Paper>
    </Box>
  );
};

interface CreateGroupProps {
  handleCreateProp: (vals: CreateGroupReq) => void;
}

const CreateGroup = ({ handleCreateProp }: CreateGroupProps) => {
  const inputs: CustomInputFormProps[] = [
    {
      type: "text",
      name: "groupname",
      label: "Group Name",
      placeholder: "Group Name",
      validate: { required: true },
      autoComplete: "false",
      colProps: { xs: 12 },
    },
  ];

  const handleCreate = (vals: CreateGroupReq) => {
    handleCreateProp && handleCreateProp(vals);
  };
  return (
    <Box sx={{ height: { ...Styles } }}>
      <Paper
        sx={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomForm
          formName="form"
          inputs={inputs}
          onSubmit={handleCreate}
          submitLable={"create group"}
          resetFrom={true}
        ></CustomForm>
      </Paper>
    </Box>
  );
};

export default Home;
