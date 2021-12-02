// const { doc } = require("prettier");

// FETCH VARIABLES
const topic = 'food';
const source = `https://newsapi.org/v2/everything?q=${topic}&sortBy=popularity&pageSize=5&apiKey=b10b22f57fca436ca78791aa2c90a376`;

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
        // console.log(data);
        
        // ! MULTIPLE ARTICLES LOOP
        // TODO: FIX DATE FORMATTING
        // TODO: CHECK FOR AUTHOR
        const newsArticles = data.articles;

        newsArticles.forEach(article => {
            const {title, author, published, description, source, url, urlToImage} = article;
            // NEW NEWS DIV
            const newsDiv = document.createElement('div');
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
        });
        


        // ! SINGLE ARTICLE STRUCTURE
        // const {title, author, published, description, source, url, urlToImage} = data.articles[0];
        
        // // NEW NEWS DIV
        // const newsDiv = document.createElement('div');
        // // ADD IMAGE
        // const newsPic = document.createElement('img');
        // newsPic.src = urlToImage
        // newsDiv.appendChild(newsPic);
        // // ADD TITLE HEADER
        // const newsHead = document.createElement('h3');
        // newsHead.innerText = title;
        // newsDiv.appendChild(newsHead);
        // // ADD AUTHOR
        // const newsAuthor = document.createElement('h4');
        // newsAuthor.innerText = author;
        // newsDiv.appendChild(newsAuthor);
        // // ADD PUBLISHED DATE
        // const newsPublished = document.createElement('h5');
        // newsPublished.innerText = published;
        // newsDiv.appendChild(newsPublished);
        // // ADD NEWS CONTETNT
        // const newsDescription = document.createElement('p');
        // newsDescription.innerText = description;
        // newsDiv.appendChild(newsDescription);
        // // ADD READ MORE LINK
        // const readMore = document.createElement('a');
        // readMore.href = url;
        // readMore.innerText = `Continue reading on ${source.name}`;
        // newsDiv.appendChild(readMore);
        // // APPEND READY DIV
        // news.appendChild(newsDiv);
    })
    .catch(err => console.log('runtime error', err.message));

