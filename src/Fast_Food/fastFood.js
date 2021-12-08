const apiKey = 'e0c14164498a428caa1de238781d3420';
const divTarget = document.getElementById('menus')
const searchButton = document.getElementById('search')

const makeElementWithClass = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
}

const getApi = async (url) => {
  let res = await fetch (url); 
  if (res.ok){
    return await res.json();
  } else {
    console.log('Something went wrong!')
    divTarget.textContent = 'Upsss. Something went wrong!'
  }
}

const renderMenu = () => {
  const numberInput = document.getElementById('menu-amount');
  const number = numberInput.value;
  clearDivs();
  const input = document.getElementById('menu-search');
  let query;
  input.value ? query = input.value : query = "menu";
  
  getApi(`https://api.spoonacular.com/food/menuItems/search?query=${query}&number=${number}&apiKey=${apiKey}&addMenuItemInformation=true`)
  .then(data => {
      const arrayMenuItems = data.menuItems;
      arrayMenuItems.forEach((element) => createMenuItems(element))
  });
}

searchButton.addEventListener('click', renderMenu)

const clearDivs = () => {
    while(divTarget.firstChild) {
      divTarget.removeChild(divTarget.firstChild);
  }
  
}
const createMenuItems = element => {
  const menuElement = makeElementWithClass('div', 'menu-element')
  const titleElement = makeElementWithClass('div', 'menu-element-title');
  const restaurantName = makeElementWithClass('div', 'menu-element-restaurant')
  const imgElement = makeElementWithClass('div', 'menu-element-image');

  let itemTitle = element.title;      
  titleElement.textContent = itemTitle;

  let itemRestaurant = element.restaurantChain;
  restaurantName.textContent = `Restaurant : ${itemRestaurant}`;

  let imageSrc = element.image;
  imgElement.style.backgroundImage = `url(${imageSrc})`

  divTarget.appendChild(menuElement);
  menuElement.appendChild(imgElement);
  menuElement.appendChild(titleElement);
  menuElement.appendChild(restaurantName);
  renderNutritionInfo(element, menuElement)
}

const renderNutritionInfo = (element, menuElement) => {
  const arrayNutrition = element.nutrition.nutrients;
  const nutritionInfo = document.createElement('ul');
  nutritionInfo.innerHTML = "<b>Nutrients:</b> <br><br>"
  arrayNutrition.forEach((skladnik) => {    
    const nutritionName = skladnik.name;
    const nutritionAmount = skladnik.amount;
    const nutritionUnit = skladnik.unit;
    
    nutritionInfo.innerHTML += `<li>${nutritionName} ${nutritionAmount} ${nutritionUnit}</li>`;       
   })
  menuElement.appendChild(nutritionInfo);
}

renderMenu();