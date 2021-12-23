const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shoppingList: resolve(__dirname, 'shoppingList.html'),
	fastFood: resolve(__dirname, 'fastFood.html')
      },
    },
  },
});
