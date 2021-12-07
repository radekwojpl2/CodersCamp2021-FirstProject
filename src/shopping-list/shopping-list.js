const searchInput = document.querySelector('.shoppinglist__search--input--js');
const displayedRecipiesList = document.querySelector('.shoppinglist__displayed-recipies--js');
const shoppingListContainer = document.querySelector('.shoppinglist__results--ingredients-container');


searchInput.addEventListener('keyup', () => {
    const searchQuery = searchInput.value;
    const recipes = getRecipesFromAPI(searchQuery);
    showRecipes(recipes) 
});

const shoppingList = [];


const getRecipesFromAPI = (searchQuery) => {
    if(searchQuery.length > 0) { 
    return searchQuery.length > 3 ? [{name: 'przepis1', id: 1, ingredients: [{name: 'maslo', id: 1}, {name: 'cukier', id: 2}]}] 
    : [{name: 'przepis1', id: 1, ingredients: [{name: 'maslo', id: 1}, {name: 'cukier', id: 2}]}, {name: 'przepis2', id: 2, ingredients: [{name: 'cukier', id: 2}, {name: 'jajko', id: 3}]}];
    } else {
        return [];
    }
}

const showRecipes = (recipes) => {
    displayedRecipiesList.innerHTML = '';
    for(let i = 0; i < recipes.length; i++) {
        const recipeElement = document.createElement('div');
        recipeElement.className = "shoppinglist__displayed-recipies--element";
        const recipeElementHeader = document.createElement('h5');
        recipeElementHeader.innerHTML =  `${recipes[i].id} ${recipes[i].name}`;
        const recipeIngredientsContainer = document.createElement('div');
        recipeElementHeader.onclick = () => onRecipeClicked(recipeIngredientsContainer, recipes[i].ingredients);
        recipeElement.appendChild(recipeElementHeader);
        recipeElement.appendChild(recipeIngredientsContainer);
        displayedRecipiesList.appendChild(recipeElement);
    }
};

const onRecipeClicked = (container, ingredients) => {
    if(container.innerHTML === '') {
        for(let i = 0; i < ingredients.length; i++) {
            const ingredientElement = document.createElement('div');
            ingredientElement.innerHTML = `${ingredients[i].id} ${ingredients[i].name}`;
            ingredientElement.className = 'shoppinglist__displayed-ingredients'
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

updateShoppingList = () => {
    shoppingListContainer.innerHTML = '';
    for(let i = 0; i < shoppingList.length; i++) {
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
}


const removeIngredient = (index) => {
    console.log(shoppingList)
    shoppingList.splice(index, 1);
    updateShoppingList();
}