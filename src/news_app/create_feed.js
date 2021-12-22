export const makeFeed = (array) => {
  // CREATE NEWS FEED CONTAINER
  const newsParent = document.querySelector('.news');
  const newsContainer = document.createElement('div');
  newsContainer.classList.add('news-list');
  newsParent.appendChild(newsContainer);
  const news = document.querySelector('.news-list');
  // GENERATE NEWS FEED
  array.forEach((item) => {
    const { title, published_at, description, url, image_url } = item;
    // NEW NEWS DIV
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('content-box', 'news-item');
    // ADD IMAGE SECTION
    if (image_url !== null || image_url !== 'https://www.retailtimes.co.uk/public_html/favicon.ico') {
      const picContainer = document.createElement('div');
      picContainer.classList.add('pic-container');
      const newsPic = document.createElement('img');
      newsPic.src = image_url;
      picContainer.appendChild(newsPic);
      newsDiv.appendChild(picContainer);
    }
    // ADD INFO SECTION
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
    // ADD TITLE HEADER
    const newsHead = document.createElement('h3');
    newsHead.innerText = title;
    infoContainer.appendChild(newsHead);
    // ADD PUBLISHED DATE
    const newsPublished = document.createElement('h5');
    const prettyDate = new Date(published_at).toLocaleDateString();
    newsPublished.innerText = prettyDate;
    infoContainer.appendChild(newsPublished);
    // ADD NEWS CONTETNT
    const newsDescription = document.createElement('p');
    newsDescription.innerText = description;
    infoContainer.appendChild(newsDescription);
    // ADD READ MORE LINK
    const readMore = document.createElement('a');
    readMore.href = url;
    readMore.innerText = `Continue reading ...`;
    infoContainer.appendChild(readMore);
    newsDiv.appendChild(infoContainer);

    // APPEND READY DIV
    news.appendChild(newsDiv);
  });
};

export const clearFeed = () => {
  if (document.querySelector('.news-list')) {
    document.querySelector('.news-list').remove();
  }
};

export default makeFeed;
