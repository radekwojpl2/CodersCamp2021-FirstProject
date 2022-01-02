import getApi from './getApi.js';
import makeElementWithClass from './createElements.js';

const apiKey = 'd64418229d904d0c960feba931308605';
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
  restaurantName.textContent = `Restaurant : ${itemRestaurant}`;

  const imageSrc = element.image;
  imgElement.setAttribute('style', `background-image: url("${imageSrc}"), url(https://i.postimg.cc/y6MpDRx6/noImg.png)`);

  divTarget.appendChild(menuElement);
  menuElement.appendChild(imgElement);
  menuElement.appendChild(titleElement);
  menuElement.appendChild(restaurantName);
  renderNutritionInfo(element, menuElement);
};

const renderNutritionInfo = (element, menuElement) => {
  const arrayNutrition = element.nutrition.nutrients;
  const nutritionInfo = document.createElement('ul');
  nutritionInfo.innerHTML = '<b>Nutrients:</b> <br><br>';
  arrayNutrition.forEach((ingredient) => {
    const nutritionName = ingredient.name;
    const nutritionAmount = ingredient.amount;
    const nutritionUnit = ingredient.unit;

    nutritionInfo.innerHTML += `<li>${nutritionName} ${nutritionAmount} ${nutritionUnit}</li>`;
  });
  menuElement.appendChild(nutritionInfo);
};

renderMenu();
