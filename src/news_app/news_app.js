// import { format } from "prettier";
// import { doc } from 'prettier';

import { makeFeed } from './create_feed';
import { getData } from './get_data';
import { clearFeed } from './clear_feed';
// import { updateFeed } from './update_feed.js';

// VARIABLES
const urlFood = `https://newsapi.org/v2/everything?q=+food&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;
const urlWine = `https://newsapi.org/v2/everything?q=+wine&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;
const urlRestaurant = `https://newsapi.org/v2/everything?q=+wine&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;

const newsOptions = document.querySelector('.news-options');

// FUNTIONS

function makeNews(source) {
  getData(source)
    .then((data) => {
      const newsArticles = data.articles;
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
makeNews(urlRestaurant);
