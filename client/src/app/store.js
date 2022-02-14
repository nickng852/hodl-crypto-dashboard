import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoApi } from "../services/cryptoApi";

const store = configureStore({
  reducer: { [cryptoApi.reducerPath]: cryptoApi.reducer },
  middleware: (gDM) => gDM().concat(cryptoApi.middleware),
});

// enable listener behavior for the store
setupListeners(store.dispatch);

export default store;
