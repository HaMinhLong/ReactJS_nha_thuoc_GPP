import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginApiResponse } from "../../api/auth";
import { TypeUser } from "../../api/user";

const initialState: LoginApiResponse["data"] = {};

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
  },
});
export const { updateAccessToken, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;
