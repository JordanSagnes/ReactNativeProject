import {action} from "../actions/action";

export const types = {
    "MODIFY_ADD_INGREDIENT_TO_SHOPPING_LIST" : "MODIFY_ADD_INGREDIENT_TO_SHOPPING_LIST",
    "MODIFY_REMOVE_INGREDIENT_TO_SHOPPING_LIST" : "MODIFY_REMOVE_INGREDIENT_TO_SHOPPING_LIST",
    "SET_NEW_API_QUOTA": "SET_NEW_API_QUOTA",
    "RESET": "RESET"
};

export function modifySettingsAddIngredientToShoppingList(value) {
    return action(types.MODIFY_ADD_INGREDIENT_TO_SHOPPING_LIST, value);
}

export function modifySettingsRemoveIngredientToShoppingList(value) {
    return action(types.MODIFY_REMOVE_INGREDIENT_TO_SHOPPING_LIST, value);
}
