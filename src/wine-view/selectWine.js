const selectWine = document.querySelector('.select-wine');

const availableWine = {
  'White wine': [
    {
      name: 'Assyrtiko',
      value: 'assyrtiko',
    },
    {
      name: 'Chardonnay',
      value: 'chardonnay',
    },
    {
      name: 'Frascati',
      value: 'frascati',
    },
    {
      name: 'Riesling',
      value: 'riesling',
    },
    {
      name: 'Sauvignon Blanc',
      value: 'sauvignon_blanc',
    },
  ],
  'Red wine': [
    {
      name: 'Malbec',
      value: 'malbec',
    },
    {
      name: 'Primitivo',
      value: 'primitivo',
    },
    {
      name: 'Sangiovese',
      value: 'sangiovese',
    },
    {
      name: 'Zinfandel',
      value: 'zinfandel',
    },
    {
      name: 'Zweigelt',
      value: 'zweigelt',
    },
  ],
  'Rose wine': [
    {
      name: 'Sparkling Rose',
      value: 'sparkling_rose',
    },
  ],
  'Sparkling wine': [
    {
      name: 'Cava',
      value: 'cava',
    },
    {
      name: 'Champagne',
      value: 'champagne',
    },
  ],
};

function listWine() {
  const wineOp = document.createElement('select');
  wineOp.id = 'wine';

  const optionEl = document.createElement('option');
  optionEl.setAttribute('value', '');

  wineOp.appendChild(optionEl);

  for (const wineType in availableWine) {
    const optgroupEl = document.createElement('optgroup');
    optgroupEl.label = wineType;

    wineOp.appendChild(optgroupEl);

    availableWine[wineType].forEach((el) => {
      const optionEl = document.createElement('option');
      optionEl.setAttribute('value', el.value);
      optionEl.innerHTML = `${el.name}`;

      optgroupEl.appendChild(optionEl);
    });
  }

  selectWine.appendChild(wineOp);
}

listWine();
