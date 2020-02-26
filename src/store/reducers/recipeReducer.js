import { types } from "../models/recipe.js";

const recipeState = {
    recipes : []
};

function recipe(state = recipeState, action) {
    let nextState;
    switch (action.type) {
        case types.ADD_RECIPE_TO_FAV:
            nextState = {
                ...state,
                recipes: [...state.recipes.filter(recipe => recipe.id !== action.value.id), action.value]
            };
            return nextState || state;

        case types.REMOVE_RECIPE_TO_FAV:
            nextState = {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.value)
            };
            console.log(nextState);
            return nextState || state;

        case types.RESET:
            nextState = {
                recipes: []
            };
            return nextState || state;

        default:
            return state
    }
}

export default recipe;
