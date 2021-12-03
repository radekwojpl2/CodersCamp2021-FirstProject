const { resolve } = require('path')
const { defineConfig } = require('vite')

console.log(__dirname)

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shoppingList: resolve(__dirname, 'src/views/ShoppingList/index.html')
      }
    }
  }
})