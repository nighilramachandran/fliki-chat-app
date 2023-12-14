import { Box, Button, Chip, Grid, Paper, Stack } from "@mui/material";
// import socketIO from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CustomForm, CustomInputFormProps } from "../form";
import { CreateGroupAsync, GetAllGroupAsync } from "../redux/reducers/group";
import { CreateGroupReq, Group } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
