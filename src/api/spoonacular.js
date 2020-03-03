import {store} from "../store/config";
import {types} from "../store/models/settings";

const API_KEY = "df65dc8514fa4945b43b5414bad63f3d";
const API_URL = 'https://api.spoonacular.com/';
const API_URL_SUFFIX = '&apiKey=' + API_KEY;
const MAX_API_POINT = 150;

async function doGet(url) {
  console.log(url);
  try {
    const response = await fetch(url);
    console.log(store.getState().fridgeState.ingredients);
    //update apiQuota
    store.dispatch({
      type: types.SET_NEW_API_QUOTA,
      value: {
        creditsRemaining: (MAX_API_POINT - response.headers.map['x-api-quota-used']).toFixed(2),
        lastUpdate: (new Date()).toUTCString()
      }
    });

    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  } catch (error) {
    throw error;
  }

}

function generateSearchRecipesUrl(searchTerm, cuisine, diet, offset) {
  let url = `${API_URL}recipes/search?query=${searchTerm}&`;
  if (cuisine !== null)
    url += `cuisine=${cuisine}&`;
  if (diet !== null)
    url += `diet=${diet}&`;

  return url + `metaInformation=true${API_URL_SUFFIX}&offset=${offset}`;
}

export async function getResultsSearchIngredients(searchTerm) {
  try {
    const url = `${API_URL}food/ingredients/autocomplete?query=${searchTerm}&number=20&metaInformation=true${API_URL_SUFFIX}`;
    let response = await doGet(url);
    return response;
  } catch (error) {
    console.log('Error with function getResultsSearchIngredients ' + error.message);
    throw error;
  }
}

export async function getResultsSearchRecipes(searchTerm, cuisine, diet, offset) {
  try {
    const url = generateSearchRecipesUrl(searchTerm, cuisine, diet, offset);
    let response = await doGet(url);
    return response;
  } catch (error) {
    console.log('Error with function getResultsSearchRecipes ' + error.message);
    throw error;
  }
}

export async function getRecipeDetail(id) {
  try {
    const url = `${API_URL}recipes/${id}/information?${API_URL_SUFFIX}`;
    let response = await doGet(url);
    return response;
  } catch (error) {
    console.log('Error with function getRecipeDetail ' + error.message);
    throw error;
  }
}

export async function getResultsFridgeRecipes() {
  try {
    let ingredients = store.getState().fridgeState.ingredients.map((ingredient) => ingredient.name);
    const url = `${API_URL}recipes/findByIngredients?ingredients=${ingredients.join(',')}${API_URL_SUFFIX}`;
    let response = await doGet(url);
    return response;
  } catch(error) {
    console.log('Error with function getFridgeRecipes ' + error.message);
    throw error;
  }

}


