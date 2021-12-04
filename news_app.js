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

// Produce news feed
const makeNewsFeed = () => {
    getData()
        .then(data => {
            // TODO: FIX DATE FORMATTING / UNDEFINED
            const newsArticles = data.articles;

            newsArticles.forEach(article => {
                const {title, author, published, description, source, url, urlToImage} = article;
                // NEW NEWS DIV
                const newsDiv = document.createElement('div');
                newsDiv.classList.add('news-item')
                // ADD IMAGE
                const newsPic = document.createElement('img');
                newsPic.setAttribute('width','400px')
                newsPic.src = urlToImage
                newsDiv.appendChild(newsPic);
                // ADD TITLE HEADER
                const newsHead = document.createElement('h3');
                newsHead.innerText = title;
                newsDiv.appendChild(newsHead);
                // ADD AUTHOR
                if (author) {
                    const newsAuthor = document.createElement('h4');
                    newsAuthor.innerText = author;
                    newsDiv.appendChild(newsAuthor);
                }
                // ADD PUBLISHED DATE
                const newsPublished = document.createElement('h5');
                newsPublished.innerText = published;
                newsDiv.appendChild(newsPublished);
                // ADD NEWS CONTETNT
                const newsDescription = document.createElement('p');
                newsDescription.innerText = description;
                newsDiv.appendChild(newsDescription);
                // ADD READ MORE LINK
                const readMore = document.createElement('a');
                readMore.href = url;
                readMore.innerText = `Continue reading on ${source.name}`;
                newsDiv.appendChild(readMore);
                // APPEND READY DIV
                news.appendChild(newsDiv);
            })
        })
        .catch(err => console.log('runtime error', err.message))    
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
makeNewsFeed()


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