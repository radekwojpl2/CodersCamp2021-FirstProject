'use strict';

const url = 'https://api.spoonacular.com/food/products/search?';
const apiKey = '8cc85c6ead034a4e83c74be12baa0f04';

const query = 'wine';
const number = 100;

const displayWineList = document.querySelector('.wine-list');

async function getWineList() {
  try {
    const res = await fetch(`${url}query=${query}&number=${number}&apiKey=${apiKey}`)

    if (!res.ok) throw new Error(`Whoops! We're having problem getting data.`)

    const data = await res.json()
    const wineList  = data.products;
    
    showWine(wineList)
  } catch (err) {
    console.log(`💥 ${err}`)
  }
}

function showWine(wines) {
  wines.forEach(wine => {
    console.log(wine.title, wine.image)
    const wineEl = document.createElement('div');
    wineEl.innerHTML = `
      <div>
          <h3>${wine.title}</h3>
          <img src="${wine.image}" alt="">
       </div>
     `;
  
    displayWineList.appendChild(wineEl)
  })
}

getWineList();