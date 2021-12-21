'use strict';

// As a user
// I want to see list of wines
// so that i can chose one of them and read description about them.

// As a user
// I want to see which dish comes with selected wine
// so that I can choose right one for a dinner

// As a user
// I want to be able to navigate to wine description be given wine
// So that navigation from random recipe would be possible.

// As a user
// I want to get recommended wine for given prize
// So that I can pick what suites my needs.


const apiKey = 'f3969421f26440d898b6fdd1849e993f';

const urlWine = 'https://api.spoonacular.com/food/wine/recommendation?';
const urlDish = 'https://api.spoonacular.com/food/wine/dishes?';

const selectedWine = document.querySelector('#wine');
const displayWineEl = document.querySelector('.wine-list');
const selectedPrice = document.querySelector('#price');

let userWine = '';

selectedWine.addEventListener('change', function () {
  userWine = this.value;

  if (userWine) {
    showWine(userWine)
    selectedPrice.disabled = false
  } else {
    selectedPrice.disabled = true;
  }
});

selectedPrice.addEventListener('change', function (e) {
  const value = +e.target.value;
  const label = e.target.nextElementSibling;

  label.innerHTML = `$ ${value}`;

  showWineByPrice(userWine, this.value)
});


// Function to show wines to users
async function showWine(wine) {
  try {

    const res1 = await fetch(`${urlWine}wine=${wine}&number=10&apiKey=${apiKey}`)
    const res2 = await fetch(`${urlDish}wine=${wine}&number=10&apiKey=${apiKey}`)

    if (!res1.ok && !res2.ok) throw new Error(`Whoops! We're having problem getting data.`)

    const dataWine = await res1.json()
    const dataDish = await res2.json()

    displayWineEl.innerHTML = ''
    displayWine(dataWine.recommendedWines, dataDish.pairings)
  } catch (err) {
    console.log(`💥 ${err}`)
  }
}

// Function to show wines based on price
async function showWineByPrice(wine, price) {
  try {
    const res1 = await fetch(`${urlWine}wine=${wine}&maxPrice=${price}&number=10&apiKey=${apiKey}`)
    const res2 = await fetch(`${urlDish}wine=${wine}&number=10&apiKey=${apiKey}`)

    if (!res1.ok && !res2.ok) throw new Error(`Whoops! We're having problem getting data.`)

    const dataWine = await res1.json()
    const dataDish = await res2.json()

    dataWine.recommendedWines.forEach(winePrice => {
      displayWineEl.innerHTML = ''
      if (winePrice.price <= price) {
        displayWine(dataWine.recommendedWines, dataDish.pairings)
      }
    })
  } catch (err) {
    console.log(`💥 ${err}`)
  }
}

// Function to show wines to users
function displayWine(wines, pairings) {
  wines.forEach(wine => {
    let rating = 0;

    if (wine.averageRating <= 0.2) rating = 1
    else if (wine.averageRating <= 0.4) rating = 2
    else if (wine.averageRating <= 0.6) rating = 3
    else if (wine.averageRating <= 0.8) rating = 4
    else rating = 5

    const wineEl = document.createElement('div');
    wineEl.classList.add('wine')
    wineEl.innerHTML = `
      <p class="wine-rating">${'★'.repeat(rating)}</p>
      <img class="wine-img" src="${wine.imageUrl}" alt="">
      <div class="wine-info">
        <h3 class="wine-name">${wine.title}</h3>

        <div class="wine-overview">
          <h3 class="wine-name">${wine.title}</h3>
          <p class="wine-description">${wine.description ? wine.description : 'No description available'}</p>
          <p class="wine-price">Price: <span class="price">${wine.price}</span></p>
          <div class="wine-pairing">Dish pairing: ${showPairings(pairings)}</div>
        </div>
      </div>
    `;

    displayWineEl.appendChild(wineEl)
  })
}

// Function to show paired dishes
function showPairings(pairings) {
  let html = '';

  pairings.forEach(el => html += `<span class="wine-dish-pairing">${el}</span>`)

  return html;
}