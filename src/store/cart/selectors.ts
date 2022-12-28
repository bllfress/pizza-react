import type { RootState } from "@/store";

export const getCartQnt = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalCartSum = (state: RootState) => {
  return state.cart.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};
