import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import {
  LoginReq,
  RegisterReq,
  RequestStatus,
  User,
  UserRoot,
} from "../../interfaces";
import { loginRoutes, regiserRoutes } from "../../utils/APIRoutes";
import { enqueueSnackbar } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../../utils/routes/constants";
// import { API } from "@/utility/api/constants";

interface InitialState {
  status: RequestStatus;
  authenticated: Boolean;
  user: User[];
}

const initialState: InitialState = {
  status: "nothing",
  authenticated: false,
  user: [],
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setAuthentication: (state, { payload }: PayloadAction<Boolean>) => {
      state.authenticated = payload;
    },
    setUser: (state, { payload }: PayloadAction<User[]>) => {
      state.user = payload;
    },
  },
});

export const { setStatus, setAuthentication, setUser } = AuthSlice.actions;

export const LoginAsync =
  (req: LoginReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const { AUTH } = ROUTES;
    try {
      const { data } = await axios.post<UserRoot>(loginRoutes, req);

      if (data.status) {
        dispatch(setStatus("data"));
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        dispatch(setAuthentication(data.status));
        navigate(AUTH.CHAT_GROUP);
      }
      if (!data.status) {
        dispatch(setAuthentication(data.status));
        dispatch(setStatus("error"));
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };

export const RegisterAsync =
  (req: RegisterReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));

    const { ROOT } = ROUTES;
    try {
      const { data } = await axios.post(regiserRoutes, req);
      if (data.status) {
        dispatch(setStatus("data"));
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
        navigate(ROOT);
      }
      if (!data.status) {
        dispatch(setStatus("error"));
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };

export default AuthSlice;
