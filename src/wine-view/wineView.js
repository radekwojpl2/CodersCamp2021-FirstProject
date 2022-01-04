const apiKey = 'f3969421f26440d898b6fdd1849e993f';
const wineURL = 'https://api.spoonacular.com/food/wine/';

const selectedWine = document.querySelector('#wine');
const displayWineEl = document.querySelector('.wine-list');
const selectedPrice = document.querySelector('#price');

let userWine = '';

selectedWine.addEventListener('change', function () {
  userWine = this.value;

  if (userWine) {
    showWine(userWine);
    selectedPrice.disabled = false;
  } else {
    selectedPrice.disabled = true;
  }
});

selectedPrice.addEventListener('change', function (e) {
  const value = +e.target.value;
  const label = e.target.nextElementSibling;

  label.innerHTML = `$ ${value}`;

  showWine(userWine, this.value);
});

// Function to show wines to users
async function showWine(wine, price) {
  const [wines, pairings] = await getData(wine);

  !price
    ? displayWine(wines, pairings)
    : displayWine(
        wines.filter((wine) => +wine.price.slice(1) <= +price),
        pairings
      );
}

// Function to get information about select wine type
async function getData(wine) {
  try {
    const res1 = await fetch(`${wineURL}recommendation?wine=${wine}&number=10&apiKey=${apiKey}`);
    const res2 = await fetch(`${wineURL}dishes?wine=${wine}&number=10&apiKey=${apiKey}`);

    if (!res1.ok && !res2.ok) throw new Error(`Whoops! We're having problem getting data.`);

    const dataWine = await res1.json();
    const dataDish = await res2.json();

    return [dataWine.recommendedWines, dataDish.pairings];
  } catch (err) {
    alert(`💥 ${err}`);
  }
}

// Function to show wines to users
function displayWine(wines, pairings) {
  displayWineEl.innerHTML = '';

  wines.forEach((wine) => {
    let rating = wine.averageRating;

    const [bad, mediocre, good, great] = [0.2, 0.4, 0.6, 0.8];
    const [badWine, mediocreWine, goodWine, greatWine, outstandingWine] = [1, 2, 3, 4, 5];

    if (wine.averageRating <= bad) rating = badWine;
    else if (wine.averageRating <= mediocre) rating = mediocreWine;
    else if (wine.averageRating <= good) rating = goodWine;
    else if (wine.averageRating <= great) rating = outstandingWine;
    else rating = greatWine;

    const wineEl = document.createElement('div');
    wineEl.classList.add('wine');
    wineEl.innerHTML = `
      <p class="wine-rating">${'★'.repeat(rating)}</p>
      <div class="wine__img--container">
      <img class="wine-img" src="${wine.imageUrl}" alt="">
      </div>
      <div class="wine-info">
        <h2 class="wine-name">${wine.title}</h2>

        <div class="wine-overview">
          <h2 class="wine-name secondary-heading">${wine.title}</h2>
          <p class="wine-description">${wine.description ? wine.description : 'No description available'}</p>
          <p class="wine-price">Price: <span class="price">${wine.price}</span></p>
          <div class="wine-pairing">Dish pairing: ${showPairings(pairings)}</div>
        </div>
      </div>
    `;

    displayWineEl.appendChild(wineEl);
  });
}

function showPairings(pairings) {
  let html = '';

  pairings.forEach((pair) => (html += `<span class="wine-dish-pairing">${pair}</span>`));
  return html;
}
