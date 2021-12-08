// import { format } from "prettier";
// import { doc } from 'prettier';

import { makeFeed } from './create_feed.js';
import { getData } from './get_data.js';
import { clearFeed } from './clear_feed.js';
// import { updateFeed } from './update_feed.js';


// VARIABLES
const urlFood = `https://newsapi.org/v2/everything?q=+food&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;
const urlWine = `https://newsapi.org/v2/everything?q=+wine&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;
const urlRestaurant = `https://newsapi.org/v2/everything?q=+restaurants&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;


const newsOptions = document.querySelector('.news-options');


// EVENTS LISTENERS

newsOptions.addEventListener("change", updateFeed);


// FUNTIONS 

function makeNews (source) {
    getData(source)
        .then(data => {
            const newsArticles = data.articles;
            localStorage.setItem('currentUrl', source);
            makeFeed(newsArticles);
        })
        .catch(err => console.log('runtime error', err.message));
};

export function updateFeed (e) {
    e.preventDefault();
    // console.log(e.target.value);
    clearFeed();
    switch (e.target.value) {
        case '+food':
            makeNews(urlFood);
            break;
        case '+wine':
            makeNews(urlWine);
            break;
        case '+restuarants':
            makeNews(urlRestaurant);
            break;
    }
};

// ! RUNTIME
if (localStorage.getItem('currentUrl')) {
    let currentUrl = localStorage.getItem('currentUrl');
    makeNews(currentUrl);
} else {
    makeNews(urlFood);
}
