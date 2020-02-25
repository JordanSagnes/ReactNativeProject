const API_KEY = "4c5f1fc8d7b140b783982a00a2d411a4";
const API_URL = 'https://api.spoonacular.com/';
const API_URL_SUFFIX = '&apiKey=' + API_KEY;

async function doGet(url) {
  try {
    const response = await fetch(url);
    console.log(response.headers.map['x-api-quota-request'], response.headers.map['x-api-quota-used']);
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  } catch(error) {
    throw error;
  }

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


