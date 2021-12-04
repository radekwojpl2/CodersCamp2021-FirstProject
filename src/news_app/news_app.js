// import { format } from "prettier";

import { makeFeed } from './create_feed.js';

// FETCH VARIABLES
let topic = '+wine';
const source = `https://newsapi.org/v2/everything?q=${topic}&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;

// DOM VARIABLES
const body = document.body;
const newsList = document.querySelector('.news'); //needs fixed




// ! FUNCTIONS

// JS FETCH DATA
const getData = async () => {
    const response = await fetch(source);
    if(response.status !== 200){
        throw new Error('can not fetch the data');
    };
    const data = await response.json();
    return data;
};

// purge news feed // not working 
const removeAllNews = newsList => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};


// ! RUNTIME

getData()
    .then(data => {
        const newsArticles = data.articles;
        makeFeed(newsArticles);
    })
    .catch(err => console.log('runtime error', err.message));


removeAllNews();