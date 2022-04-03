import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "crytocurrency",
  news: null,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },

    setNews: (state, action) => {
      state.news = action.payload;
    },

    resetNews: (state) => {
      state = initialState;
    },
  },
});

export const { setKeyword, setNews, resetNews } = newsSlice.actions;

export const selectKeyword = (state) => state.news.keyword;

export const selectNews = (state) => state.news.news;

export default newsSlice.reducer;
