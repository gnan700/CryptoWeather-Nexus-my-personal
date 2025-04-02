import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface CryptoState {
  data: CryptoData[];
  loading: boolean;
  error: string | null;
  favorites: string[];
  websocketConnected: boolean;
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
  favorites: [],
  websocketConnected: false,
};

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async (ids: string[]) => {
    const response = await axios.get(`/api/crypto?ids=${ids.join(",")}`);
    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((c) => c !== id);
      } else {
        state.favorites.push(id);
      }
    },
    updateWebSocketStatus: (state, action) => {
      state.websocketConnected = action.payload;
    },
    updateCryptoPrice: (state, action) => {
      const { id, price } = action.payload;
      const crypto = state.data.find((c) => c.id === id);
      if (crypto) {
        crypto.current_price = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch crypto data";
      });
  },
});

export const { toggleFavorite, updateWebSocketStatus, updateCryptoPrice } =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
