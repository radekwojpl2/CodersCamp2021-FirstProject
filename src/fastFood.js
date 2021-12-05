const apiKey = '32a30d5008384c0abc8d37b703d08307';
const divs = Array.from(document.getElementsByClassName('menu-element'))
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
  }
}

const renderMenuItems = () => {
  clearDivs();
  const input = document.getElementById('menu-search');
  let query = input.value

  getApi(`https://api.spoonacular.com/food/menuItems/search?query=${query}&number=6&apiKey=${apiKey}&addMenuItemInformation=true`)
  .then(data => {
      const arrayMenuItems = data.menuItems;

      arrayMenuItems.forEach((element, i) => {
        const titleElement = makeElementWithClass('div', 'menu-element-title');
        const restaurantName = makeElementWithClass('div', 'menu-element-restaurant')
        const imgElement = makeElementWithClass('div', 'menu-element-image');

        let itemTitle = element.title;      
        titleElement.textContent = itemTitle;

        let itemRestaurant = element.restaurantChain;
        restaurantName.textContent = `Restaurant : ${itemRestaurant}`;

        let imageSrc = element.image;
        imgElement.style.backgroundImage = `url(${imageSrc})`

        divs[i].appendChild(titleElement);
        divs[i].appendChild(restaurantName);
        divs[i].appendChild(imgElement);
        
        renderNutritionInfo(element, i)
    })
  });
}

searchButton.addEventListener('click', renderMenuItems)

const clearDivs = () => {
  for (let i=0; i< 6; i++){
    while(divs[i].firstChild) {
      divs[i].removeChild(divs[i].firstChild);
  }
  }
}

const renderNutritionInfo = (element, i) => {
  const arrayNutrition = element.nutrition.nutrients;
  const nutritionInfo = document.createElement('ul');
  arrayNutrition.forEach((skladnik) => {    
    const nutritionName = skladnik.name;
    const nutritionAmount = skladnik.amount;
    const nutritionUnit = skladnik.unit;
    nutritionInfo.innerHTML += `<li>${nutritionName} ${nutritionAmount} ${nutritionUnit}</li>`;       
   })
  divs[i].appendChild(nutritionInfo);
}
