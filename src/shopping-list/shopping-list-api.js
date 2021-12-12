const BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = 'a07d4f9d4e0c49088d9c905d31506b9c';

export async function getRecipes(searchQuery) {
  const searchUrl = `${BASE_URL}/complexSearch?query=${searchQuery}&apiKey=${API_KEY}&number=5`;
  console.log(`Search URL: ${searchUrl}`);
  const result = await ((await fetch(searchUrl)).json());
  console.log(result);
  return result.results;
}


export async function getIngredients(recipeId) {
  const recipeDetailsUrl = `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`;
  console.log(recipeDetailsUrl);
  const recipeDetailsResult = await ((await fetch(recipeDetailsUrl)).json());
  const ingredients = recipeDetailsResult.extendedIngredients;
  console.log(ingredients);
  return ingredients;
}


