# inventory-app
Manage a restaurant's inventory
![A gif of how the app works](https://TYLPHE.github.io/inventory-app/)

## Links
- [Try Inventory App here (In progress...)](https://TYLPHE.github.io/inventory-app/)
- [Link to assignment](https://www.theodinproject.com/lessons/nodejs-inventory-application)

## Summary
Create, read, update, and delete a restaurant's inventory with Inventory App. This project allows me to practice more with Express, Mongoose, and Pug (formerly known as Jade).

## Data Structure
Below is a simple layout of my data structure:
![data structure of Inventory App](https://github.com/TYLPHE/inventory-app/blob/main/readme-assets/inventory-application-structure-3.jpg)

The data structure is influenced by the [MDN express tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#designing_the_locallibrary_models), which is what I'm using as a guide as I develop this app.

## Challenges
### Populating the database defaults to 'test'
Thanks to [this article](https://stackoverflow.com/questions/61302342/mongodb-sets-my-database-to-test-automatically-how-to-change-it), I learned that we need to update the mongodb connection link like so:

const mongoDB = "mongodb+srv://'account':'password'@cluster0.rbwivgx.mongodb.net/inventory?retryWrites=true&w=majority";

In the case above, we connect to mongodb.net/INVENTORY, without the 'inventory' part, mongodb defaults to creating a database called 'test'.

