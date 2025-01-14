import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginApiResponse } from "../../api/auth";

export type AuthState = LoginApiResponse["data"];

const initialState: AuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken: (
      state,
      action: PayloadAction<string | undefined | null>
    ) => {
      state.accessToken = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
    },
    updatePermission: (state, action) => {
      state.permission = action.payload;
    },
  },
});
export const { updateAccessToken, updateUserProfile, updatePermission } =
  authSlice.actions;

export default authSlice.reducer;
