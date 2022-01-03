const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        wineView: resolve(__dirname, 'wineView.html'),
        shoppingListView: resolve(__dirname, 'shoppingListView.html'),
        fastFood: resolve(__dirname, 'fastFood.html'),
      },
    },
  },
});
