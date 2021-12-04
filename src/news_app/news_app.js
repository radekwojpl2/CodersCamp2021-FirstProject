import { makeFeed } from './src/create_feed';
// const { doc } = require("prettier");

// FETCH VARIABLES
let topic = '+wine';
const source = `https://newsapi.org/v2/everything?q=${topic}&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;

// DOM VARIABLES
const body = document.body;
const news = document.querySelector('.news')
const newsOptions = document.querySelector('.news-options');



// EVENT LISTENERS
// TODO: Configure function for event listener


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

// clear news feed
const clearNews = () => {
    let currentNewsDivs = document.querySelectorAll['.news-item'];
    console.log(currentNewsDivs)
    if(currentNewsDivs) {
        currentNewsDivs.forEach(news => {
            news.remove();
        })
    }    
};


// ! RUNTIME
topic = '+wine';

getData()
    .then(data => {
        // TODO: FIX DATE FORMATTING / UNDEFINED
        const newsArticles = data.articles;
        makeFeed(newsArticles)
    })
    .catch(err => console.log('runtime error', err.message));


newsOptions.addEventListener('click', event => {
    // console.log(event.target)
    switch (event.target.value) {
        case '+food':
            console.log('food selected');
            topic = event.target.value;
            clearNews();
            makeNewsFeed();
            break;
        case '+wine':
            console.log('wine selected');
            topic = event.target.value;
            clearNews();
            makeNewsFeed();
            break;
        case '+restuarants':
            console.log('restaurant selected');
            topic = event.target.value;
            clearNews();
            makeNewsFeed();
            break;
        
    }
})