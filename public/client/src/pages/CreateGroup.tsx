import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Grid, Paper } from "@mui/material";

const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "group",
    label: "Group Name",
    placeholder: "Group Name",
    validate: { required: true },
    colProps: { xs: 12 },
  },
];

const CreateGroup = () => {
  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={5}>
        <Paper sx={{ padding: "40px" }}>
          <CustomForm
            formName="form"
            inputs={inputs}
            onSubmit={() => null}
            submitLable={"create group"}
            // status={load ? "loading" : "nothing"}
          ></CustomForm>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateGroup;
