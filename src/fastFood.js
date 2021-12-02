const apiKey = 'b51b95c93a154a4c9c7d6bc73c618c5f';
let query = 'burger';
let number = 12;
const div = document.getElementById('app')
const getApi = async (url) => {
  let res = await fetch (url);
  
  if (res.ok){
    return await res.json();
  } else {
    console.log('Something went wrong!')
  }
}
getApi(`https://api.spoonacular.com/food/menuItems/search?query=${query}&number=${number}&apiKey=${apiKey}`)
  .then(data => {
    console.log(data)
    makeDivs(data);  
  });

const makeDivs = item => {
    for (let i=0 ; i<number; i++){
      const newMenuElement = document.createElement('div');
      // newMenuElement.classList.add("menu-element")
      let itemTitle = item.menuItems[i].title
      newMenuElement.textContent = itemTitle;
      const newMenuImage = document.createElement ('img');
      let imageSrc = item.menuItems[i].image;
      newMenuImage.src = imageSrc;
      div.appendChild(newMenuElement);
      newMenuElement.appendChild(newMenuImage);
    }
}





  // const renderMenu = async () => {
// let menuPieces = await getApi(`https://api.spoonacular.com/food/menuItems/search?query=${query}&number=${number}&apiKey=${apiKey}`)
// return menuPieces
// // for (let i=0 ; i<number; i++){
// //   const newMenuElement = document.createElement('div');
// //   // newMenuElement.classList.add("menu-element")
// //   let itemTitle = menuPieces.menuItems[i].title
// //   newMenuElement.textContent = itemTitle;
// //   const newMenuImage = document.createElement ('img');
// //   let imageSrc = menuPieces.menuItems[i].image;
// //   newMenuImage.src = imageSrc;
// //   div.appendChild(newMenuElement);
// //   newMenuElement.appendChild(newMenuImage);
// // }
// // console.log(menuPieces)
// }
// //  renderMenu()
