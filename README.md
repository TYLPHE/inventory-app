# inventory-app
Manage a restaurant's inventory

![A gif of how the app works(To be created)](https://TYLPHE.github.io/inventory-app/)

## Links
- [Try Inventory App here](https://inventory-app-production-8918.up.railway.app/catalog)
- [Link to assignment](https://www.theodinproject.com/lessons/nodejs-inventory-application)

## Summary
Create, read, update, and delete a restaurant's inventory with Inventory App. This project allows me to practice more with Express, Mongoose, and Pug (formerly known as Jade). The website is published on Railway.

## Data Structure
Below is a simple layout of my data structure:
![data structure of Inventory App](https://github.com/TYLPHE/inventory-app/blob/main/readme-assets/inventory-application-structure-3.jpg)

The data structure is influenced by the [MDN express tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#designing_the_locallibrary_models), which is what I'm using as a guide as I develop this app.

## Challenges
### Populating the database defaults to 'test'
Thanks to [this article](https://stackoverflow.com/questions/61302342/mongodb-sets-my-database-to-test-automatically-how-to-change-it), I learned that we need to update the mongodb connection link like so:

const mongoDB = "mongodb+srv://'account':'password'@cluster0.rbwivgx.mongodb.net/inventory?retryWrites=true&w=majority";

In the case above, we connect to mongodb.net/INVENTORY, without the 'inventory' part, mongodb defaults to creating a database called 'test'.

### Model.findOne() returns null
My form was capitalizing the restaurant names when I was sanitizing and validating the form data. When I was checking if the restaurant name exists in the database before saving it, I was checking for a lowercased version of the restaurant name. For example, checking 'burger' against 'Burger'.

My query would return null, which meant that it was ok to save the form data to the database. This created multiple restaurants with the same name!

I had to fix this by changing any restaurants with all lowercase names to a capitalized first letter!

### Data structure was too big
I have to be honest with myself, this project is intended for extra Mongoose and Express practice. If you see the data structure above and compare it to the actual project, it's missing staff and equipment. For the sake of continuing with The Odin Project, I have decided to reduce the size of the data structure to just Restaurant, Dish, Recipe, and Ingredients.

## Railway starter plan - Manually refresh each month
Railway has a limited free plan. In order to start the free plan again, I need to restart the application each month to start a 500-hour (20 days) hosting time limit. I've hosted the website on railway but in order for users to try my app, I provided a GitHub link instead.

## Notes to self
* Validation and sanitization: `npm install express-validator`
* list of validators and sanitizers: https://github.com/validatorjs/validator.js

## TODO
Updating a recipe does not update dish properly
