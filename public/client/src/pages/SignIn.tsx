import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";

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

const { AUTH } = ROUTES;

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate(AUTH.REGISTER);
  };

  return (
    <Grid container alignItems={"center"} justifyContent={"center"}>
      <Grid item xs={5}>
        <Paper sx={{ padding: "40px" }}>
          <Stack spacing={2}>
            <CustomForm
              formName="form"
              inputs={inputs}
              onSubmit={(vals) => console.log(vals)}
              submitLable={"login"}
            ></CustomForm>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={1}
            >
              <Typography>Dont have an account ?</Typography>
              <Button onClick={() => handleSignUp()}>Register</Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
