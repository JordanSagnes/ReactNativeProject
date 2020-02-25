import {types} from "../actions/settings";

const settingsState = {
  addIngredientToShoppingList: false,
  removeIngredientToShoppingList: false,
  apiQuota: {
    creditsRemaining: null,
    lastUpdate: (new Date()).toUTCString()
  }
};

function settings(state = settingsState, action) {
  let nextState;
  switch (action.type) {
    case types.MODIFY_ADD_INGREDIENT_TO_SHOPPING_LIST:
      nextState = {
        ...state,
        addIngredientToShoppingList: action.value
      };
      return nextState || state;

    case types.MODIFY_REMOVE_INGREDIENT_TO_SHOPPING_LIST:
      nextState = {
        ...state,
        removeIngredientToShoppingList: action.value
      };
      return nextState || state;

      case types.SET_NEW_API_QUOTA:
      nextState = {
        ...state,
        apiQuota: action.value
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

export default settings;
