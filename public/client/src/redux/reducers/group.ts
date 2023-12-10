import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import { RequestStatus } from "../../interfaces";
import {
  chatGroupRoutes,
  groupRoutes,
  joinGroupRoutes,
} from "../../utils/APIRoutes";
import { enqueueSnackbar } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../../utils/routes/constants";
import {
  ChatUsers as ChatGroupUsers,
  CreateGroupReq,
  Group,
  GroupRoot,
} from "../../interfaces/Group";

interface InitialState {
  status: RequestStatus;
  groups: Group[];
  joinedGroup: boolean;
  chatGroupUsers: ChatGroupUsers[];
}

const initialState: InitialState = {
  status: "nothing",
  groups: [],
  joinedGroup: false,
  chatGroupUsers: [],
};

const GroupSlice = createSlice({
  name: "Group",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setGroup: (state, { payload }: PayloadAction<Group[]>) => {
      state.groups = payload;
    },
    setChatUserGroup: (state, { payload }: PayloadAction<ChatGroupUsers[]>) => {
      state.chatGroupUsers = payload;
    },
  },
});

export const { setStatus, setGroup, setChatUserGroup } = GroupSlice.actions;

export const CreateGroupAsync =
  (req: CreateGroupReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const { AUTH } = ROUTES;
    try {
      const { data } = await axios.post(groupRoutes, req);

      if (data.status) {
        dispatch(setStatus("data"));
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
        navigate(AUTH.CHAT_GROUP);
      }
      if (!data.status) {
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };
export const GetAllGroupAsync = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await axios.get<GroupRoot>(groupRoutes);

    if (data.status) {
      dispatch(setStatus("data"));
      dispatch(setGroup(data.groups));
      data.msg !== "" &&
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
    }
    if (!data.status) {
      enqueueSnackbar(data.msg, {
        variant: "error",
      });
    }
  } catch (error: any) {
    dispatch(setStatus("error"));
  }
};

// export const JoinGroupAsync =
//   (req: any): AppThunk =>
//   async (dispatch) => {
//     dispatch(setStatus("loading"));
//     try {
//       const { data } = await axios.post(joinGroupRoutes, req);

//       if (data.status) {
//         dispatch(setStatus("data"));
//         dispatch(setGroup(data.groups));
//         enqueueSnackbar(data.msg, {
//           variant: "success",
//         });
//       }
//       if (!data.status) {
//         dispatch(setStatus("nothing"));
//         enqueueSnackbar(data.msg, {
//           variant: "error",
//         });
//       }
//     } catch (error: any) {
//       dispatch(setStatus("error"));
//     }
//   };

export const getChatGroupAsync =
  (req: any): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.post(chatGroupRoutes, req);

      if (data.status) {
        dispatch(setStatus("data"));
        dispatch(setChatUserGroup(data.groups.users));
      }
      if (!data.status) {
        dispatch(setStatus("nothing"));
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };
export default GroupSlice;
