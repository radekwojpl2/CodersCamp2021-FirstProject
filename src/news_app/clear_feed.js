export const clearFeed = () => {
  if (document.querySelector('.news-list')) {
    document.querySelector('.news-list').remove();
  }
};

export default clearFeed;
