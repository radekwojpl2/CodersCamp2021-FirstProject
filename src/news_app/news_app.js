// import { format } from "prettier";
// import { doc } from 'prettier';
import { makeFeed } from './create_feed.js';
import { getData } from './get_data.js';
// import { updateFeed } from './update_feed.js';


// VARIABLES
export var topic = '+sports';
export const source = `https://newsapi.org/v2/everything?q=${topic}&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;
const newsOptions = document.querySelector('.news-options');

// EVENTS LISTENERS

newsOptions.addEventListener("change", updateFeed);


// FUNTIONS 

const makeNews = () => {
    getData(source)
        .then(data => {
            const newsArticles = data.articles;
            makeFeed(newsArticles);
        })
        .catch(err => console.log('runtime error', err.message));
}

export function updateFeed (e) {
    e.preventDefault();
    // console.log(e.target.value);
    switch (e.target.value) {
        case '+food':
            topic = '+food'
            console.log(topic);
            clearFeed();
            break;
        case '+wine':
            topic = '+wine';
            console.log(topic);
            clearFeed();
            break;
        case '+restuarants':
            topic = '+restuarants';
            console.log(topic);
            clearFeed();
            break;
    }
    makeNews()
};

// ! RUNTIME

makeNews();








