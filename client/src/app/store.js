// Redux
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coinsReducer from "../features/coins/coinsSlice";
import newsReducer from "../features/news/newsSlice";

// RTK Query
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoApi } from "../services/cryptoApi";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: authReducer,
  coins: coinsReducer,
  news: newsReducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }).concat(cryptoApi.middleware),
});

setupListeners(store.dispatch);

export default store;
