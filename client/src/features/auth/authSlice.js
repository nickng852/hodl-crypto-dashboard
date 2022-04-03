import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null, // firebase/auth
  user: null, // firestore
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setWatchList: (state, action) => {
      state.user.watchList = action.payload.watchlist;
    },
  },
});

export const { setToken, setUser, setWatchList } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;