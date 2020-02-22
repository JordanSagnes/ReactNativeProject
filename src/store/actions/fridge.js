import {action} from "./action";

export const types = {
  "ADD_INGREDIENT_TO_FRIGE" : "ADD_INGREDIENT_TO_FRIGE",
  "REMOVE_INGREDIENT_TO_FRIDGE" : "REMOVE_INGREDIENT_TO_FRIDGE"
};

export function addIngredientToFridge(value) {
  return action(types.ADD_INGREDIENT_TO_FRIGE, value);
}

export function removeIngredientToFridge(value) {
  return action(types.REMOVE_INGREDIENT_TO_FRIDGE, value);
}
