const apiKey = '32a30d5008384c0abc8d37b703d08307';
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

const renderMenuItems = () => {
  const numberInput = document.getElementById('menu-amount');
  const number = numberInput.value;
  clearDivs(number);
  const input = document.getElementById('menu-search');
  let query;
  input.value ? query = input.value : query = "menu";
  
  getApi(`https://api.spoonacular.com/food/menuItems/search?query=${query}&number=${number}&apiKey=${apiKey}&addMenuItemInformation=true`)
  .then(data => {
      const arrayMenuItems = data.menuItems;

      arrayMenuItems.forEach((element) => {
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
        menuElement.appendChild(titleElement);
        menuElement.appendChild(restaurantName);
        menuElement.appendChild(imgElement);
        
        renderNutritionInfo(element, menuElement)
    })
  });
}

searchButton.addEventListener('click', renderMenuItems)

const clearDivs = number => {
  for (let i=0; i< number; i++){
    while(divTarget.firstChild) {
      divTarget.removeChild(divTarget.firstChild);
  }
  }
}

const renderNutritionInfo = (element, menuElement) => {
  const arrayNutrition = element.nutrition.nutrients;
  const nutritionInfo = document.createElement('ul');
  arrayNutrition.forEach((skladnik) => {    
    const nutritionName = skladnik.name;
    const nutritionAmount = skladnik.amount;
    const nutritionUnit = skladnik.unit;
    nutritionInfo.innerHTML += `<li>${nutritionName} ${nutritionAmount} ${nutritionUnit}</li>`;       
   })
  menuElement.appendChild(nutritionInfo);
}
renderMenuItems();