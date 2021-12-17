import { makeFeed } from './create_feed';
import { getData } from './get_data';
import { clearFeed } from './clear_feed';
// import { updateFeed } from './update_feed.js';

import './news_style.css';

// VARIABLES
const urlFood = `https://api.thenewsapi.com/v1/news/all?api_token=NfHTFOIIekZazvqWjUldhd6FX72AKBkguV1ye0D2&categories=food&language=en`;
const urlWine = `https://api.thenewsapi.com/v1/news/all?api_token=NfHTFOIIekZazvqWjUldhd6FX72AKBkguV1ye0D2&language=en&search=wines`;
const urlRestaurant = `https://api.thenewsapi.com/v1/news/all?api_token=NfHTFOIIekZazvqWjUldhd6FX72AKBkguV1ye0D2&categories=food&language=en&search=restuarant`;

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
      makeNews(urlFood);
      break;
    case '+wine':
      clearFeed();
      makeNews(urlWine);
      break;
    case '+restuarants':
      clearFeed();
      makeNews(urlRestaurant);
      break;
    default:
      break;
  }
}

// EVENTS LISTENERS

newsOptions.addEventListener('change', updateFeed);

// ! RUNTIME
makeNews(urlFood);
