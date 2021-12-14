const wineChoice = document.getElementById('wine-choice');
const displayDishWine = document.querySelector('.displayDishWine')

const url = 'https://api.spoonacular.com/food/wine/dishes?';
// const apiKey = '8cc85c6ead034a4e83c74be12baa0f04';
const apiKeyTEMP = '1679c57de07f43f197f7cbde1472df41';
const wine = 'malbec';



wineChoice.addEventListener('input', function () {
  console.log(this.value)
});


async function getDishWine() {
  try {
    const res = await fetch(`${url}
    https://api.spoonacular.com/food/wine/dishes?wine=${wine}&apiKey=${apiKeyTEMP}`)

    if (!res.ok) throw new Error(`Whoops! We're having problem getting data.`)

    const date = await res.json();

    showDishWine(date);

    console.log(date)
  } catch (err) {
    console.log(`💥 ${err}`)
  }
}

function showDishWine(date) {
  const dishEl = document.createElement('div');
  dishEl.innerHTML = `
    <h2>Malbec</h2>

      <p>Malbec is a dry red wine which is bold and full bodied. It goes especially well with stew, chili, steak,
        burger, and jjigae.</p>

      <p>
        <span>stew</span>
        <span>chili</span>
        <span>steak</span>
        <span>burger</span>
        <span>jjigae</span>
      </p>
  `;
  displayDishWine.appendChild(dishEl)

}

getDishWine()