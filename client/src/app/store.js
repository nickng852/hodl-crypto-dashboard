// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coinsReducer from "../features/coins/coinsSlice";
import newsReducer from "../features/news/newsSlice";

// RTK Query
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoApi } from "../services/cryptoApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coins: coinsReducer,
    news: newsReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(cryptoApi.middleware),
});

setupListeners(store.dispatch);

export default store;
