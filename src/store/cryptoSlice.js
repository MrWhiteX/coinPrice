import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crypto: [],
  copyCrypto: [],
  loading: true,
  isSearchTerm: false,
  currentPaginationPage: 1,
  reloadComponentValue: false,
  dataCurrency: {
    USD: 0,
    EUR: 0,
  },
  actualCurrency: "USD",
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    addCrypto: (state, { payload }) => {
      state.crypto = payload;
    },
    copyCrypto: (state, { payload }) => {
      state.copyCrypto = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    isSearchTerm: (state, { payload }) => {
      state.isSearchTerm = payload;
    },
    currentPaginationPage: (state, { payload }) => {
      state.currentPaginationPage = payload;
    },
    reloadComponent: (state, { payload }) => {
      state.reloadComponent = payload;
    },
    currency: (state, { payload }) => {
      state.dataCurrency = payload;
    },
    setActualCurrency: (state, { payload }) => {
      state.actualCurrency = payload;
    },
  },
  // extraReducers: {},
});

export const {
  addCrypto,
  copyCrypto,
  setLoading,
  isSearchTerm,
  currentPaginationPage,
  reloadComponent,
  currency,
  setActualCurrency,
} = cryptoSlice.actions;
export const getAllCrypto = (state) => state.crypto.crypto;
export const getCryptoCopy = (state) => state.crypto.copyCrypto;
export const getLoading = (state) => state.crypto.loading;
export const getIsSearchTerm = (state) => state.crypto.isSearchTerm;
export const getCurrentPaginationPage = (state) =>
  state.crypto.currentPaginationPage;
export const getReloadComponentValue = (state) => state.crypto.reloadComponent;
export const getCurrency = (state) => state.crypto.dataCurrency;
export const getActualCurrency = (state) => state.crypto.actualCurrency;
export default cryptoSlice.reducer;
