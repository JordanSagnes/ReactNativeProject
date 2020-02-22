const API_KEY = "4c5f1fc8d7b140b783982a00a2d411a4";
const API_URL = 'https://api.spoonacular.com/';
const API_URL_SUFFIX = '&apiKey=' + API_KEY

export async function getResultsSearchIngredients(searchTerm, startOffset, limit = 10) {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `${API_URL}food/ingredients/autocomplete?query=a${API_URL_SUFFIX}`;
    const response = await fetch(url);

    console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);

  } catch (error) {
    console.log('Error with function getResultsSearchIngredients ' + error.message);
    throw error;
  }
}
