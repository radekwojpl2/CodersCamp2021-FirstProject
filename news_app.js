// const { doc } = require("prettier");

// FETCH VARIABLES
const topic = 'food';
const source = `https://newsapi.org/v2/everything?q=${topic}&from=2021-11-02&sortBy=publishedAt&apiKey=b10b22f57fca436ca78791aa2c90a376`;

// DOM VARIABLES
const body = document.body;
const news = document.querySelector('.news')


// JS FETCH DATA
const getData = async () => {
    const response = await fetch(source);
    if(response.status !== 200){
        throw new Error('can not fetch the data');
    };
    const data = await response.json();
    return data;
};


// RUNTIME
getData()
    .then(data => {
        console.log(data);
        // TODO: NEEDED DATA OBJECTS: author, content -short, description -long, published -date, source{name}, title, url, urlToImage 
        
        const {title, author, published, description, source, url, urlToImage} = data.articles[0];
        
        // NEW NEWS DIV
        const newsDiv = document.createElement('div');
        // ADD IMAGE
        const newsPic = document.createElement('img');
        newsPic.src = urlToImage
        newsDiv.appendChild(newsPic);
        // ADD TITLE HEADER
        const newsHead = document.createElement('h3');
        newsHead.innerText = title;
        newsDiv.appendChild(newsHead);
        // ADD AUTHOR
        const newsAuthor = document.createElement('h4');
        newsAuthor.innerText = author;
        newsDiv.appendChild(newsAuthor);
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
        



        
        news.appendChild(newsDiv);
    })
    .catch(err => console.log('runtime error', err.message));

