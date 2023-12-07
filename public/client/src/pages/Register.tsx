import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Grid, Paper } from "@mui/material";
import axios from "axios";
import { regiserRoutes } from "../utils/APIRoutes";

const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "username",
    label: "User Name",
    placeholder: "User Name",
    validate: { required: true },
    colProps: { xs: 12 },
  },
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
    name: "loginPassword",
    label: "Password",
    placeholder: "password",
    validate: { required: true },
    colProps: { xs: 12 },
  },
  {
    type: "password",
    name: "newPassword",
    label: "Confirm Password",
    placeholder: "Please reenter your password",
    validate: { required: true, same: "loginPassword" },
    colProps: { xs: 12 },
  },
];

const handleRegister = async (vals: any) => {
  try {
    const response = await axios.post(regiserRoutes, vals);
    // const response = await axios.get(regiserRoutes);
    console.log("response", response.data);
    console.log("Response in client", response.data);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const Register = () => {
  return (
    <Grid container alignItems={"center"} justifyContent={"center"}>
      <Grid item xs={5}>
        <Paper sx={{ padding: "40px" }}>
          <CustomForm
            formName="form"
            inputs={inputs}
            onSubmit={handleRegister}
            submitLable={"login"}
          ></CustomForm>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
