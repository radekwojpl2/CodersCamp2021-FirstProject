import { getIngredients, getRecipes, getPrice } from './shopping-list-api.js';

const searchInput = document.querySelector('.recipe-search__input--js');
const displayedRecipiesList = document.querySelector('.list-recipies__container--js');
const shoppingListContainer = document.querySelector('.shopping-list__ingredients-container');
const shoppingListParagraph = document.querySelector('.shopping-list__paragraph');
const shoppingListTotalCost = document.querySelector('.shopping-list__total-cost');

const shoppingList = [];

let delayTimer;

searchInput.addEventListener('keyup', async () => {
  clearTimeout(delayTimer);
  delayTimer = setTimeout(async function () {
    const searchQuery = searchInput.value;
    if (searchQuery.length > 0) {
      const recipes = await getRecipes(searchQuery);
      showRecipes(recipes);
    } else {
      showRecipes([]);
    }
  }, 600);
});

//Recipes conatiner
const showRecipes = (recipes) => {
  displayedRecipiesList.innerHTML = '';
  for (let i = 0; i < recipes.length; i++) {
    const recipeElement = document.createElement('div');
    recipeElement.className = 'list-recipies__container--element';
    const recipeElementHeader = document.createElement('h5');
    recipeElementHeader.innerHTML = `${recipes[i].title}`;
    const recipeIngredientsContainer = document.createElement('div');
    recipeElementHeader.onclick = () => onRecipeClicked(recipeIngredientsContainer, recipes[i].id);
    recipeElement.appendChild(recipeElementHeader);
    recipeElement.appendChild(recipeIngredientsContainer);
    displayedRecipiesList.appendChild(recipeElement);
  }
};

//Ingredients container
const onRecipeClicked = async (container, recipeId) => {
  const ingredients = await getIngredients(recipeId);
  if (container.innerHTML === '') {
    for (let i = 0; i < ingredients.length; i++) {
      const ingredientElement = document.createElement('div');
      ingredientElement.innerHTML = `${ingredients[i].name}`;
      ingredientElement.className = 'list-ingredients__container';
      const ingredientAddButton = document.createElement('button');
      ingredientAddButton.innerHTML = `+`;
      ingredientAddButton.className = 'list-ingredients__container--add-button';

      ingredientAddButton.onclick = () => addIngredient(ingredients[i]);
      container.appendChild(ingredientElement);
      ingredientElement.appendChild(ingredientAddButton);
    }
  } else {
    container.innerHTML = '';
  }
};

const addIngredient = async (ingredient) => {
  const ingredientCost = await getPrice(ingredient.id);
  shoppingList.push({ ...ingredient, cost: ingredientCost });
  updateShoppingList();
};

//Shopping List update
const updateShoppingList = () => {
  if (shoppingList.length > 1) {
    shoppingListTotalCost.innerHTML = `<span class="shopping-list__total-cost--modifier"> <strong>Total Cost:</strong> $${calculateCost()} </span>`;
  } else {
    shoppingListTotalCost.innerHTML = '';
  }

  shoppingListContainer.innerHTML = '';
  for (let i = 0; i < shoppingList.length; i++) {
    const shoppingListIngredientElement = document.createElement('div');
    shoppingListIngredientElement.className = 'shopping-list__ingredient';
    const shoppingListIngredientHeader = document.createElement('h5');
    shoppingListIngredientElement.innerHTML = `<section class="shopping-list__ingredient--text-section">
    <span>$${shoppingList[i].cost}</span> 
    <div>
    <span class="shopping-list__ingredient-name"> ${shoppingList[i].name}</span>
    <span class="shopping-list__aisle-name">(${shoppingList[i].aisle.split(';')[0]})</span>
    </div>
    </section>`;

    const ingredientRemoveButton = document.createElement('button');
    ingredientRemoveButton.innerHTML = '-';
    ingredientRemoveButton.className = 'shopping-list__remove-button';

    ingredientRemoveButton.onclick = () => removeIngredient(i);
    shoppingListContainer.appendChild(shoppingListIngredientElement);
    shoppingListIngredientElement.appendChild(shoppingListIngredientHeader);

    shoppingListIngredientElement.appendChild(ingredientRemoveButton);
  }
  if (shoppingList.length !== 0) {
    shoppingListParagraph.classList.add('shopping-list__paragraph--remover');
  } else if (shoppingList.length === 0) {
    shoppingListParagraph.classList.remove('shopping-list__paragraph--remover');
  }
};

//Ingredient remover
const removeIngredient = (index) => {
  shoppingList.splice(index, 1);
  updateShoppingList();
};

//Total cost calculation
const calculateCost = () => {
  let totalCost = 0;
  for (let i = 0; i < shoppingList.length; i++) {
    totalCost += shoppingList[i].cost;
  }

  return totalCost.toFixed(2);
};

//Total cost container creation
