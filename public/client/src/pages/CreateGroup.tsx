import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Grid, Paper } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { groupRoutes } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";

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
  //routes
  const { AUTH } = ROUTES;
  //functions
  const handleCreateGroup = async (vals: any) => {
    try {
      const { data } = await axios.post(groupRoutes, vals);

      if (data.status) {
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
        navigate(AUTH.CHAT_GROUP);
      } else if (!data.status) {
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
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
            // status={load ? "loading" : "nothing"}
          ></CustomForm>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateGroup;
