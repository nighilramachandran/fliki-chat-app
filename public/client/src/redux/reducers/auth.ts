import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  ApiResponse,
  LoginReq,
  LogOutReq,
  RegisterReq,
  RequestStatus,
  User,
} from "../../interfaces";
import {
  loginRoutes,
  logOutRoutes,
  regiserRoutes,
} from "../../utils/routes/APIRoutes";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../../utils/routes/contants";

interface InitialState {
  status: RequestStatus;
  user: User;
  isAuth: boolean;
}

const initialState: InitialState = {
  status: "nothing",
  user: { _id: "", username: "", email: "", isOnline: false },
  isAuth: sessionStorage.getItem("chat-app-user") ? true : false,
};

const storedUser = sessionStorage.getItem("chat-app-user");

if (storedUser) {
  initialState.user = JSON.parse(storedUser);
  initialState.status = "data";
}

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    ResetsUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.status = "nothing";
    },
    setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
  },
});

export const { setStatus, setUser, setIsAuth, ResetsUser } = AuthSlice.actions;

export const RegisterAsync =
  (req: RegisterReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));

    const { ROOT } = ROUTES;
    try {
      const { data } = await axios.post<ApiResponse>(regiserRoutes, req);

      if (data.status) {
        dispatch(setStatus("data"));
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
        navigate(ROOT);
      }
      if (!data.status) {
        console.log("false");

        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };

export const LoginAsync =
  (req: LoginReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const { AUTH, ROOT } = ROUTES;
    try {
      const { data } = await axios.post<ApiResponse>(loginRoutes, req);
      console.log(data);

      if (data.status) {
        dispatch(setStatus("data"));
        dispatch(setUser(data.user));
        dispatch(setIsAuth(data.user.isOnline));
        sessionStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate(AUTH.HOME);
      }
      if (!data.status) {
        navigate(ROOT);
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };

export const LogOutAsync =
  (req: LogOutReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const { ROOT } = ROUTES;
    try {
      const { data } = await axios.post<ApiResponse>(logOutRoutes, req);
      console.log(data);

      if (data.status) {
        dispatch(setStatus("data"));
        dispatch(setUser(data.user));
        dispatch(setIsAuth(data.user.isOnline));
        sessionStorage.removeItem("chat-app-user");
        navigate(ROOT);
      }
      if (!data.status) {
        navigate(ROOT);
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };

export default AuthSlice;
