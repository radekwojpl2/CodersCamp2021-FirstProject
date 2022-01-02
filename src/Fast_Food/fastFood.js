import getApi from './getApi.js';
import makeElementWithClass from './createElements.js';

const apiKey = 'b51b95c93a154a4c9c7d6bc73c618c5f';
const divTarget = document.getElementById('menus');
const searchButton = document.getElementById('search');

const renderMenu = () => {
  const numberInput = document.getElementById('menu-amount');
  const number = numberInput.value;
  clearDivs();
  const input = document.getElementById('menu-search');
  let query;
  input.value ? (query = input.value) : (query = 'menu');
  const fastFoodUrl = `https://api.spoonacular.com/food/menuItems/search?query=${query}&number=${number}&apiKey=${apiKey}&addMenuItemInformation=true`;
  getApi(fastFoodUrl).then((data) => {
    const arrayMenuItems = data.menuItems;
    arrayMenuItems.forEach((element) => createMenuItems(element));
  });
};

searchButton.addEventListener('click', renderMenu);

const clearDivs = () => {
  while (divTarget.firstChild) {
    divTarget.removeChild(divTarget.firstChild);
  }
};
const createMenuItems = (element) => {
  const menuElement = makeElementWithClass('div', 'menu-element');
  const titleElement = makeElementWithClass('div', 'menu-element-title');
  const restaurantName = makeElementWithClass('div', 'menu-element-restaurant');
  const imgElement = makeElementWithClass('div', 'menu-element-image');

  const itemTitle = element.title;
  titleElement.textContent = itemTitle;

  const itemRestaurant = element.restaurantChain;
  restaurantName.innerHTML = `<strong>Restaurant</strong>: ${itemRestaurant}`;

  const imageSrc = element.image;
  imgElement.setAttribute('style', `background-image: url("${imageSrc}"), url(./src/Fast_Food/noImg.png)`);

  divTarget.appendChild(menuElement);
  menuElement.appendChild(imgElement);
  menuElement.appendChild(titleElement);
  menuElement.appendChild(restaurantName);
  renderNutritionInfo(element, menuElement);
};

const renderNutritionInfo = (element, menuElement) => {
  const arrayNutrition = element.nutrition.nutrients;
  const nutritionInfo = document.createElement('ul');
  nutritionInfo.innerHTML = '<b class="menu-nutrition-title">Nutrients:</b>';
  arrayNutrition.forEach((ingredient) => {
    const nutritionName = ingredient.name;
    const nutritionAmount = ingredient.amount;
    const nutritionUnit = ingredient.unit;

    nutritionInfo.innerHTML += `<li>${nutritionName} ${nutritionAmount} ${nutritionUnit}</li>`;
  });
  menuElement.appendChild(nutritionInfo);
};

renderMenu();
