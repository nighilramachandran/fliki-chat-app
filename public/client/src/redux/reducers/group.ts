import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  APIGroupResponse,
  CreateGroupReq,
  GetGroupByIdReq,
  Group,
  Members,
  Message,
  RequestStatus,
} from "../../interfaces";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import {
  createGroupRoutes,
  getGroupByIdRoutes,
  getGroupRoutes,
} from "../../utils/routes/APIRoutes";

interface InitialState {
  status: RequestStatus;
  groups: Group[];
  members: Members[];
  messages: Message[];
}

const initialState: InitialState = {
  status: "nothing",
  groups: [],
  members: [],
  messages: [],
};

const GroupSlice = createSlice({
  name: "Group",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setGroups: (state, { payload }: PayloadAction<Group[]>) => {
      state.groups = payload;
    },
    addGroup: (state, { payload }: PayloadAction<Group>) => {
      state.groups.push(payload);
    },
    setMessages: (state, { payload }: PayloadAction<Message[]>) => {
      state.messages = payload;
    },
    AddMessages: (state, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload);
    },
    setMembers: (state, { payload }: PayloadAction<Members[]>) => {
      state.members = payload;
    },
  },
});

export const {
  setStatus,
  setGroups,
  addGroup,
  setMessages,
  setMembers,
  AddMessages,
} = GroupSlice.actions;

export const CreateGroupAsync =
  (req: CreateGroupReq): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.post<APIGroupResponse>(
        createGroupRoutes,
        req
      );

      console.log(data.group);

      if (data.status) {
        dispatch(setStatus("data"));
        dispatch(addGroup(data.group));
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

export const GetAllGroupAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const { data } = await axios.get(getGroupRoutes);

    console.log("Data", data);

    if (data.status) {
      dispatch(setStatus("data"));
      dispatch(setGroups(data.groups));
      dispatch(setMessages(data.groups.messages));
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

export const GetGroupByIdAsync =
  (req: GetGroupByIdReq): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.post(getGroupByIdRoutes, req);
      console.log("data", data);

      if (data.status) {
        dispatch(setStatus("data"));
        dispatch(setMembers(data.groups.members));
        dispatch(setMessages(data.groups.messages));
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

export default GroupSlice;
