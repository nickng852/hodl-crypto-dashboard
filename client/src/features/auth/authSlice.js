import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null, // firebase/auth
  user: null, // firestore
  watchlist: null,
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
      state.watchlist = action.payload.watchlist;
    },

    resetUser: (state) => {
      state.user = initialState;
    },
  },
});

export const { setToken, setUser, setWatchList, resetUser } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export const selectUser = (state) => state.auth.user;

export const selectWatchList = (state) => state.auth.watchlist;

export default authSlice.reducer;
