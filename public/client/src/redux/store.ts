import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/auth";
import GroupSlice from "./reducers/group";

export const store = configureStore({
  reducer: {
    [AuthSlice.name]: AuthSlice.reducer,
    [GroupSlice.name]: GroupSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
