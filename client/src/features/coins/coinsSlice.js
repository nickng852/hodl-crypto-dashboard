import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coins: null, // GET coins
  coin: null, // GET coin
  coinPriceHistory: null, // GET coin price history
};

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload.coins;
    },

    setCoin: (state, action) => {
      state.coin = action.payload.coin;
    },

    setCoinPriceHistory: (state, action) => {
      state.coinPriceHistory = action.payload.coinPriceHistory;
    },
  },
});

export const { setCoins, setCoin, setCoinPriceHistory } = coinsSlice.actions;

export const selectCoins = (state) => state.coins.coins;

export const selectCoin = (state) => state.coins.coin;

export const selectCoinPriceHistory = (state) => state.coins.coinPriceHistory;

export default coinsSlice.reducer;
