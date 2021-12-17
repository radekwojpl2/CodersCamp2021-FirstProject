export const makeFeed = (array) => {
  // CREATE NEWS FEED CONTAINER
  const newsParent = document.querySelector('.news');
  const newsContainer = document.createElement('div');
  newsContainer.classList.add('news-list');
  newsParent.appendChild(newsContainer);
  const news = document.querySelector('.news-list');
  // GENERATE NEWS FEED
  array.forEach((item) => {
    const { title, published_at, description, source, url, image_url } = item;
    // NEW NEWS DIV
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('news-item');
    // ADD IMAGE
    const newsPic = document.createElement('img');
    newsPic.setAttribute('width', '400px');
    newsPic.src = image_url;
    newsDiv.appendChild(newsPic);
    // ADD TITLE HEADER
    const newsHead = document.createElement('h3');
    newsHead.innerText = title;
    newsDiv.appendChild(newsHead);
    // // ADD AUTHOR
    // if (author) {
    //   const newsAuthor = document.createElement('h4');
    //   newsAuthor.innerText = author;
    //   newsDiv.appendChild(newsAuthor);
    // }
    // ADD PUBLISHED DATE
    const newsPublished = document.createElement('h5');
    newsPublished.innerText = published_at;
    newsDiv.appendChild(newsPublished);
    // ADD NEWS CONTETNT
    const newsDescription = document.createElement('p');
    newsDescription.innerText = description;
    newsDiv.appendChild(newsDescription);
    // ADD READ MORE LINK
    const readMore = document.createElement('a');
    readMore.href = url;
    readMore.innerText = `Continue reading ...`;
    newsDiv.appendChild(readMore);
    // APPEND READY DIV
    news.appendChild(newsDiv);
  });
};

export default makeFeed;
