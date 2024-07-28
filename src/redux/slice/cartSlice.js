import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
