import { CartPizzaModel } from "@/types/types";

export const comparePizzas = (a: CartPizzaModel, b: CartPizzaModel) => {
  return a.dough === b.dough && a.size === b.size && a.pizza.id === b.pizza.id;
};
