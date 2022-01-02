# CodersCamp2021-FirstProject

### Roles
- Tech lead: Kuba, Agata
- Development Manager: Adrian, Mateusz
- Product Owner: Sylwia, Paweł

### Introduction / application overview

This project was developed during CodersCamp 2021 mentorship program.

The application allows users to: 
- see food-related news
- get a recipe
- create a shopping list based on selected recipes
- select wine and see its description
- find a dish that goes well with a given wine
- search facility for preferred food in available take-aways
- display nutritional values and information of selected dishes.

The application uses the spoonacular API (https://spoonacular.com/food-api).

### Technologies

- JavaScript (Vanilla)
- HTML5
- CSS3

### Subjects covered

- Variables
- Oprators
- Loops
- Arrays & objects
- Functions
- Logical operators
- REST API
- DOM Manipulation
- External libraries
- Modules
- Asyncronicity
- Callbacks
- HTTP requests
- Error handling
- RWD

### Instructions / Launch

`npm install` or `npm -i` - to install required modules & dependecies
`npm run build` - to build production/deployment ready project
`npm run dev` - to enable localhost preview server

## Features Overview

### Main Menu / Food related news

The goal was to be create main page view with a menu allowing for navigation through the application. Main page was designed to display recent food related news from various sources using an REST API as a source of data. The aim was also to give user level of customization by choosing from following topics: Food, Wine, Restaurant and making this option persistent with application of local storage for user conveniance.

### Wine selector / Wine and food paring

The goal is to allow users to choose a wine from a list of given wines types and get information about it. Furthermore, the application allows users to visualize wines based on their price (in USD).

![image](https://user-images.githubusercontent.com/84134018/147881495-dffc36ce-1957-4bd2-a390-fc3606410306.png)

1. Select wine and see its description

To see a list of wines for a specific wine type (e.g., "merlot"), the user can select the wine type using the dropdown menu. The application will display 10 wines for the specified wine type. For each of them, the user will be able to see: the name of the wine, its rating and a photo.
Next, if the user wants to see more information about a specific wine, he/she has to hover over the card wine and the application will display: the wine description, price, and dishes that go well with the given wine.

![image](https://user-images.githubusercontent.com/84134018/147882126-92affda7-ae6d-4502-8d04-9b86aa0a73c0.png)

2. Select wine based on price

To see a list of wines for a specific price range (e.g., up to 50$), the user can select the price using the slider. The value will be a multiple of 10 in a range from 5$ up to 100$. The application will display all the wines whose price is less than or equal to the selected one. 

![image](https://user-images.githubusercontent.com/84134018/147882615-a267fef3-d33f-44fe-844e-17db0bbabde6.png)







