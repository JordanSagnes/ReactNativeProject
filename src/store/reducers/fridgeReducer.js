import { types } from "../models/fridge.js";

const fridgeState = {
  ingredients : []
};

function fridge(state = fridgeState, action) {
  let nextState;
  switch (action.type) {
    case types.ADD_INGREDIENT_TO_FRIDGE:
      nextState = {
        ...state,
        ingredients: [...state.ingredients.filter(ingredient => ingredient.id !== action.value.id), action.value]
      };
      return nextState || state;

    case types.REMOVE_INGREDIENT_TO_FRIDGE:
      nextState = {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.value)
      };
      return nextState || state;

    case types.RESET:
      nextState = {
        ingredients: []
      };
      return nextState || state;

    default:
      return state
  }
}

export default fridge;
