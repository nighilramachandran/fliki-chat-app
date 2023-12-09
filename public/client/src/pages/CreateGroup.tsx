import React, { useEffect } from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Grid, Paper } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { groupRoutes } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { CreateGroupAsync } from "../redux/reducers/group";
import { CreateGroupReq } from "../interfaces/Group";
import { setUser } from "../redux/reducers/auth";

const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "groupname",
    label: "Group Name",
    placeholder: "Group Name",
    validate: { required: true },
    colProps: { xs: 12 },
  },
];

const CreateGroup = () => {
  //navigate
  const navigate = useNavigate();

  //selectors
  const { status } = useAppSelector((state: RootState) => state.Group);

  //dispatcher
  const dispatch = useAppDispatch();

  //functions
  const handleCreateGroup = async (vals: CreateGroupReq) => {
    dispatch(CreateGroupAsync(vals, navigate));
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={5}>
        <Paper sx={{ padding: "40px" }}>
          <CustomForm
            formName="form"
            inputs={inputs}
            onSubmit={handleCreateGroup}
            submitLable={"create group"}
            status={status === "loading" ? "loading" : "nothing"}
          ></CustomForm>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateGroup;
