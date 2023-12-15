import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { CustomForm, CustomInputFormProps } from "../../form";
import socketIO from "socket.io-client";
import {
  Group,
  Members,
  Message,
  SendMessageReq,
  User,
} from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  AddMessages,
  GetAllGroupAsync,
  GetGroupByIdAsync,
} from "../../redux/reducers/group";

const socket = socketIO("http://localhost:3005/");

socket.on("connect", () => {
  console.log("Connected socket on client");
});

const Styles = {
  height: `calc(100vh - 120px)`,
};

export interface MessageDataProps {
  msg: string;
  groupId: string;
  name: string;
}

const ChatPage = () => {
  const { groups, members, messages } = useAppSelector((state) => state.Group);

  console.log("messages", messages);

  //dispatch
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.Auth);
  const { groupId } = useParams();
  socket.emit("join", {
    name: user.username,
    groupId: groupId,
    userId: user._id,
  });

  const [trigger, setTrigger] = useState<boolean>(false);

  //   socket.on("user-joined", (data) => {
  //     console.log("data", data);
  //     setTrigger((prev) => !prev);
  //   });

  useEffect(() => {
    // Listen for new messages
    socket.on("new-message", (msgData) => {
      console.log("message", msgData);
      setTrigger((prev) => !prev);
    });
  }, []);

  const handleSendMessage = (vals: SendMessageReq) => {
    socket.emit("send-message", {
      msg: vals.message,
      groupId: groupId,
      name: user.username,
      userId: user._id,
    });
    dispatch(
      AddMessages({
        sender: {
          userId: user._id,
          name: user.username,
          content: vals.message,
        },
      })
    );
  };

  //effects
  useEffect(() => {
    dispatch(GetGroupByIdAsync({ groupId: groupId as string }));
  }, [dispatch, groupId, trigger]);

  const messagesRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollDown();
  }, [messages]);

  useEffect(() => {
    scrollDown();
  }, []);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SideBarUsers membersProps={members} />
        </Grid>
        <Grid item xs={9}>
          <Chat
            handleSendMessageProps={(vals) => handleSendMessage(vals)}
            userProps={user}
            groupProps={groups}
            messagesProps={messages}
            messagesRefProps={messagesRef}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

interface SideBarUsersProps {
  membersProps: Members[];
}

const SideBarUsers = ({ membersProps }: SideBarUsersProps) => {
  return (
    <Paper sx={{ height: { ...Styles } }}>
      <Stack spacing={2}>
        {membersProps?.length > 0 &&
          membersProps?.map((member, ind) => {
            return (
              <Typography sx={{ wordBreak: "break-all" }} key={ind}>
                {member.name}
              </Typography>
            );
          })}
      </Stack>
    </Paper>
  );
};

interface ChatProps {
  handleSendMessageProps: (vals: SendMessageReq) => void;
  userProps: User;
  groupProps: Group[];
  messagesProps: Message[];
  messagesRefProps: React.RefObject<HTMLDivElement>;
}

const Chat = ({
  handleSendMessageProps,
  userProps,
  groupProps,
  messagesProps,
  messagesRefProps,
}: ChatProps) => {
  const handleSend = (vals: SendMessageReq) => {
    handleSendMessageProps && handleSendMessageProps(vals);
  };

  const inputs: CustomInputFormProps[] = [
    {
      type: "text",
      name: "message",
      label: "",
      placeholder: "Write your message",
      validate: { required: true },
      autoComplete: "false",
      colProps: { xs: 12 },
      className: "change-background",
    },
  ];

  return (
    <Box
      sx={{
        height: { ...Styles },
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box
        ref={messagesRefProps}
        sx={{
          height: "100%",
          width: "100%",
          border: "1px solid #43685d",
          borderRadius: "16px 16px 0px 0px",
          padding: "16px",
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <Stack spacing={2}>
          {messagesProps?.length > 0 &&
            messagesProps?.map((message, ind) => {
              return (
                <Stack direction={"row"} spacing={2}>
                  <Box
                    key={ind}
                    sx={{
                      background: "#43685d",
                      width: "fit-content",
                      height: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      marginLeft:
                        userProps._id === message.sender.userId
                          ? "auto!important"
                          : 0,
                    }}
                  >
                    <Typography>{message.sender.content}</Typography>
                  </Box>
                  <Avatar
                    sx={{
                      background: "transparent",
                      border: "1px solid #fc9915",
                      color: "#fc9915",
                    }}
                  >
                    {message.sender.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Stack>
              );
            })}
        </Stack>
        {/* <Stack spacing={2}>
          {messageProps.map((message, ind) => {
            return (
              <Box
                key={ind}
                sx={{
                  background: "#43685d",
                  width: "fit-content",
                  height: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  marginLeft:
                    userProps.username === message.name ? "auto !important" : 0,
                }}
              >
                <Typography>{message.msg}</Typography>
              </Box>
            );
          })}
        </Stack> */}
      </Box>
      <Box
        sx={{
          background: "#43685d",
          padding: "20px",
          borderRadius: "0px 0px 16px 16px",
        }}
      >
        <CustomForm
          formName="form"
          inputs={inputs}
          onSubmit={handleSend}
          submitLable={"send"}
          resetFrom={true}
        ></CustomForm>
      </Box>
    </Box>
  );
};

export default ChatPage;
