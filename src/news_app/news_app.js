// import { format } from "prettier";
// import { doc } from 'prettier';
import { makeFeed } from './create_feed.js';
import { getData } from './get_data.js';


// VARIABLES
let topic = '+wine';
const source = `https://newsapi.org/v2/everything?q=${topic}&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;

// ! RUNTIME

const makeNews = () => {
    getData(source)
        .then(data => {
            const newsArticles = data.articles;
            makeFeed(newsArticles);
        })
        .catch(err => console.log('runtime error', err.message));
}

makeNews();

const newsOptions = document.querySelector('.news-options');

// 
// newsOptions.addEventListener("click", )


