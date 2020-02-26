import {store} from "../store/config";
import {types} from "../store/models/settings";

const API_KEY = "4c5f1fc8d7b140b783982a00a2d411a4";
const API_URL = 'https://api.spoonacular.com/';
const API_URL_SUFFIX = '&apiKey=' + API_KEY;
const MAX_API_POINT = 150;

async function doGet(url) {
  console.log(url);
  try {
    const response = await fetch(url);

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


