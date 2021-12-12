import { getIngredients, getRecipes } from "./shopping-list-api.js";

const searchInput = document.querySelector('.shoppinglist__search--input--js');
const displayedRecipiesList = document.querySelector('.shoppinglist__displayed-recipies--js');
const shoppingListContainer = document.querySelector('.shoppinglist__results--ingredients-container');
const shoppingListParagraph = document.querySelector('.shoppinglist__results--paragraph');

const shoppingList = [];

searchInput.addEventListener('keyup', async () => {
  const searchQuery = searchInput.value;
  if (searchQuery.length > 0){
    const recipes = await getRecipes(searchQuery);
    showRecipes(recipes);
  }
});

const showRecipes = (recipes) => {
  displayedRecipiesList.innerHTML = '';
  for (let i = 0; i < recipes.length; i++) {
    const recipeElement = document.createElement('div');
    recipeElement.className = 'shoppinglist__displayed-recipies--element';
    const recipeElementHeader = document.createElement('h5');
    recipeElementHeader.innerHTML = `${recipes[i].title}`;
    const recipeIngredientsContainer = document.createElement('div');
    recipeElementHeader.onclick = () => onRecipeClicked(recipeIngredientsContainer, recipes[i].id);
    recipeElement.appendChild(recipeElementHeader);
    recipeElement.appendChild(recipeIngredientsContainer);
    displayedRecipiesList.appendChild(recipeElement);
  }
};

const onRecipeClicked = async (container, recipeId) => {
  const ingredients = await getIngredients(recipeId);
  if (container.innerHTML === '') {
    for (let i = 0; i < ingredients.length; i++) {
      const ingredientElement = document.createElement('div');
      ingredientElement.innerHTML = `${ingredients[i].name}`;
      ingredientElement.className = 'shoppinglist__displayed-ingredients';
      const ingredientAddButton = document.createElement('button');
      ingredientAddButton.innerHTML = `+`;
      ingredientAddButton.className = 'shoppinglist__displayed-ingredients--add-button';

      ingredientAddButton.onclick = () => addIngredient(ingredients[i]);
      container.appendChild(ingredientElement);
      ingredientElement.appendChild(ingredientAddButton);
    }
  } else {
    container.innerHTML = '';
  }
};

const addIngredient = (ingredient) => {
  shoppingList.push(ingredient);
  updateShoppingList();
};

const updateShoppingList = () => {
  shoppingListContainer.innerHTML = '';
  for (let i = 0; i < shoppingList.length; i++) {
    const shoppingListIngredientElement = document.createElement('div');
    shoppingListIngredientElement.className = 'shoppinglist__results--ingredient';
    const shoppingListIngredientHeader = document.createElement('h5');
    shoppingListIngredientElement.innerText = `${shoppingList[i].name}`;

    const ingredientRemoveButton = document.createElement('button');
    ingredientRemoveButton.innerHTML = '-';
    ingredientRemoveButton.className = 'shoppinglist__results--remove-button';

    ingredientRemoveButton.onclick = () => removeIngredient(i);
    shoppingListContainer.appendChild(shoppingListIngredientElement);
    shoppingListIngredientElement.appendChild(shoppingListIngredientHeader);

    shoppingListIngredientElement.appendChild(ingredientRemoveButton);
  }
  if (shoppingList.length !== 0) {
    shoppingListParagraph.classList.add('shoppinglist__results--paragraph-remover');
  } else if(shoppingList.length === 0) {
    shoppingListParagraph.classList.remove('shoppinglist__results--paragraph-remover');
  }
};

const removeIngredient = (index) => {
  console.log(shoppingList);
  shoppingList.splice(index, 1);
  updateShoppingList();
};
