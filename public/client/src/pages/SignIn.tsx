import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Grid, Paper } from "@mui/material";

const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "Email",
    validate: { required: true },
    colProps: { xs: 12 },
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "password",
    validate: { required: true },
    colProps: { xs: 12 },
  },
];

const handleSignIn = () => {
  // console.log(values);
};

const SignIn = () => {
  return (
    <Grid container alignItems={"center"} justifyContent={"center"}>
      <Grid item xs={5}>
        <Paper sx={{ padding: "40px" }}>
          <CustomForm
            formName="form"
            inputs={inputs}
            onSubmit={(vals) => console.log(vals)}
            submitLable={"login"}
          ></CustomForm>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
