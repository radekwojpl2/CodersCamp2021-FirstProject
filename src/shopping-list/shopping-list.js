const searchInput = document.querySelector('.shoppinglist__search--input--js');
const displayedRecipiesList = document.querySelector('.shoppinglist__displayed-recipies--js');

searchInput.addEventListener('keyup', () => {
    const searchQuery = searchInput.value;
    const recipes = getRecipesFromAPI(searchQuery);
    showRecipes(recipes) 
});

let shoppingList = [];


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
        const recipeElementHeader = document.createElement('h5');
        recipeElementHeader.innerText =  `${recipes[i].id} ${recipes[i].name}`;
        const recipeIngredientsContainer = document.createElement('div');

        recipeElementHeader.onclick = () => onRecipeClicked(recipeIngredientsContainer, recipes[i].ingredients);
        recipeElement.appendChild(recipeElementHeader);
        recipeElement.appendChild(recipeIngredientsContainer);
        displayedRecipiesList.appendChild(recipeElement);
    }
}

const onRecipeClicked = (container, ingredients) => {
    if(container.innerHTML === '') {
        for(let i = 0; i < ingredients.length; i++) {
            const ingredientElement = document.createElement('div');
            ingredientElement.innerHTML = `${ingredients[i].id} ${ingredients[i].name}`;
            const ingredientElementButton = document.createElement('button');
            ingredientElementButton.innerHTML = `+`;

            ingredientElementButton.onclick = () =>  console.log('button for ' + ingredients[i].name + ' clicked');
            container.appendChild(ingredientElement);
            ingredientElement.appendChild(ingredientElementButton);
        }
    } else {
        container.innerHTML = '';
    }
}


