const BASE_URL = 'https://api.spoonacular.com/';
const API_KEY = '1ea3df64a1624f45adcb0d805131fc16';

export async function getRecipes(searchQuery) {
  const searchUrl = `${BASE_URL}recipes/complexSearch?query=${searchQuery}&apiKey=${API_KEY}&number=5`;
  const result = await (await fetch(searchUrl)).json();
  return result.results;
}

export async function getIngredients(recipeId) {
  const recipeDetailsUrl = `${BASE_URL}recipes/${recipeId}/information?apiKey=${API_KEY}`;
  const recipeDetailsResult = await (await fetch(recipeDetailsUrl)).json();
  const ingredients = recipeDetailsResult.extendedIngredients;
  return ingredients;
}

export async function getPrice(ingredientId) {
  const ingredientDetailUrl = `${BASE_URL}food/ingredients/${ingredientId}/information?amount=1&apiKey=${API_KEY}`;
  const ingredientDetailResult = await (await fetch(ingredientDetailUrl)).json();
  const ingredientPrice = ingredientDetailResult.estimatedCost.value;
  return ingredientPrice;
}
