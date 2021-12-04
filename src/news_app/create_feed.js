
export const makeFeed = array => {
    array.forEach(item => {
        const {title, author, published, description, source, url, urlToImage} = item;
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
};



