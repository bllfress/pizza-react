import type { CartPizzaModel, PizzaModel } from "@/types/types";
import { comparePizzas } from "@/utils/comparePizzas";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
  items: CartPizzaModel[];
}

const initialState: initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartPizzaModel>) => {
      const item = action.payload;
      const itemIndex = state.items.findIndex((cartItem) =>
        comparePizzas(cartItem, item)
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
