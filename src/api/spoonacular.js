import {store} from "../store/config";
import {types} from "../store/actions/settings";

const API_KEY = "4c5f1fc8d7b140b783982a00a2d411a4";
const API_URL = 'https://api.spoonacular.com/';
const API_URL_SUFFIX = '&apiKey=' + API_KEY;
const MAX_API_POINT = 150;

async function doGet(url) {
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

function generateSearchRecipesUrl(searchTerm, cuisine, diet) {
  let url = `${API_URL}food/ingredients/autocomplete?`;
  if (searchTerm !== undefined)
    url += `query=${searchTerm}&`;
  if (cuisine !== undefined)
    url += `cuisine=${cuisine}&`;
  if (diet !== undefined)
    url += `diet=${diet}&`;

  return url + `metaInformation=true${API_URL_SUFFIX}`;
}

export async function getResultsSearchIngredients(searchTerm) {
  try {
    const url = `${API_URL}food/ingredients/autocomplete?query=${searchTerm}&metaInformation=true${API_URL_SUFFIX}`;
    let response = await doGet(url);
    return response;
  } catch (error) {
    console.log('Error with function getResultsSearchIngredients ' + error.message);
    throw error;
  }
}

export async function getResultsSearchRecipes(searchTerm, cuisine, diet) {
  try {
    const url = generateSearchRecipesUrl(searchTerm, cuisine, diet);
    let response = await doGet(url);
    return response;
  } catch (error) {
    console.log('Error with function getResultsSearchRecipes ' + error.message);
    throw error;
  }
}


