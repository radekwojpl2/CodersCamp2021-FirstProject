import { makeFeed, clearFeed } from './create_feed';
import { getData } from './get_data';

const apiKey = 'NfHTFOIIekZazvqWjUldhd6FX72AKBkguV1ye0D2';
const apiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=`;

const catFood = `&categories=food&language=en`;
const catWine = `&language=en&search=wines`;
const catRestaurant = `&categories=food&language=en&search=restuarant`;

const newsOptions = document.querySelector('.news-options');

// FUNTIONS

function makeNews(source) {
  getData(source)
    .then((data) => {
      const newsArticles = data.data;
      makeFeed(newsArticles);
    })
    .catch((err) => console.log('runtime error', err.message));
}

function updateFeed(e) {
  e.preventDefault();
  // console.log(e.target.value);
  switch (e.target.value) {
    case '+food':
      clearFeed();
      makeNews(`${apiUrl}${apiKey}${catFood}`);
      break;
    case '+wine':
      clearFeed();
      makeNews(`${apiUrl}${apiKey}${catWine}`);
      break;
    case '+restuarants':
      clearFeed();
      makeNews(`${apiUrl}${apiKey}${catRestaurant}`);
      break;
    default:
      break;
  }
}

// EVENTS LISTENERS

newsOptions.addEventListener('change', updateFeed);

// ! RUNTIME
makeNews(`${apiUrl}${apiKey}${catFood}`);
