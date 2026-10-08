import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: savedUser || null,
  accessToken: localStorage.getItem("accessToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    signup: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { signup, logout } = authSlice.actions;

export default authSlice.reducer;