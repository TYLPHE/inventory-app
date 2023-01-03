#! /usr/bin/env_node

console.log('This script populates some restaurant data into your database. Specified database as argument - e.g.: populatedb mongodb+srv://username:password@cluster0.rbwivgx.mongodb.net/?retryWrites=true&w=majority')

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
    console.log('Error: You need to specify a valid mongodb URL as the first argument');
    return;
  }
*/

const async = require('async');
const equipment = require('./models/equipment');
const food = require('./models/food');
const ingredients = require('./models/ingredients');
const recipe = require('./models/recipe');
const restaurant = require('./models/restaurant');
const staff = require('./models/staff');

const mongoose = require('mongoose');
const equipment = require('./models/equipment');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const equipmentArr = [];
const foodArr = [];
const ingredientsArr = [];
const recipeArr = [];
const restaurantArr = [];
const staffArr = [];

function equipmentCreate(
  name, 
  cost, 
  date_purchased, 
  date_removed, 
  location, 
  qty, 
  cb
) {
  equipmentDetail = {
    name: name,
    cost: cost,
    date_purchased: date_purchased,
    location: location,
    qty: qty,
  }

  if (date_removed !== false) {
    equipmentDetail.date_removed = date_removed;
  }

  const newEquipment = new equipment(equipmentDetail);

  newEquipment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Equipment: ${newEquipment}`);
    equipmentArr.push(newEquipment);
    cb(null, newEquipment);
  });
}

function foodCreate(
  recipe,
  ingredients,
  cb,
) {
  foodDetail = {
    recipe: recipe,
    ingredients: ingredients,
  }

  const newFood = new food(foodDetail);

  newFood.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Food : ${newFood}`);
    foodArr.push(newFood);
    cb(null, newFood);
  });
}

function ingredientsCreate(
  name,
  qty,
  cost,
  cb,
) {
  ingredientsDetail = {
    name: name,
    qty: qty,
    cost: cost,
  };

  const newIngredients = new ingredients(ingredientsDetail);

  newIngredients.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Ingredients: ${newIngredients}`);
    ingredientsArr.push(newIngredients);
    cb(null, newIngredients);
  });
}

function recipeCreate(
  name,
  ingredients,
  instructions,
  value,
  cb,
) {
  recipeDetail = {
    name: name,
    ingredients: ingredients,
    instructions: instructions,
    value: value,
  };

  const newRecipe = new recipe(recipeDetail);

  newRecipe.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Recipe: ${newRecipe}`);
    recipeArr.push(newRecipe);
    cb(null, newRecipe);
  });
}

function restaurantCreate(
  name,
  address,
  number,
  founded,
  food,
  equipment,
  staff,
  cb,
) {
  restaurantDetail = {
    name: name,
    address: address,
    number: number,
    founded: founded,
    food: food,
    equipment: equipment,
    staff: staff,
  };

  const newRestaurant = new restaurant(restaurantDetail);

  newRestaurant.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`new Restaurant: ${newRestaurant}`);
    restaurantArr.push(newRestaurant);
    cb(null, newRestaurant);
  })
}

function staffCreate(
  first_name,
  last_name,
  title,
  rate,
  start_date,
  end_date,
  cb,
) {
  staffDetail = {
    first_name: first_name,
    last_name: last_name,
    title: title,
    rate: rate,
    start_date: start_date
  };

  if (end_date) {
    staffDetail.end_date = end_date;
  };

  const newStaff = new staff(staffDetail);

  newStaff.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Staff: ${newStaff}`);
    staffArr.push(newStaff);
    cb(null, newStaff);
  });
}

function equipmentPopulate(cb) {
  async.series([
    (cb) => equipmentCreate('Blender', 99, '1-1-2020', false, 'Kitchen', 3, cb),
  ]);
}

function foodPopulate(cb) {
  async.series([
    (cb) => foodCreate(recipeArr[0], ingredientsArr[0], cb),
  ]);
}

function ingredientsPopulate(cb) {
  async.series([
    (cb) => ingredientsCreate('Flour', 2, 50, cb),
  ]);
}

function recipePopulate(cb) {
  async.series([
    (cb) => recipeCreate(
      'Pizza', 
      ingredientsArr[0],
      'Mix flour with water and knead to dough. Press into a flat circle and add tomato sauce and cheese. Place into oven for 15 minutes',
      3,
      cb
    ),
  ])
}

function restaurantPopulate(cb) {
  async.series([
    (cb) => restaurantCreate('Slice to Meet You', '123 Pizza Lane', 5555555555, '1-1-2020', foodArr[0], equipmentArr[0], staffArr[0], cb),
  ]);
}

function staffPopulate(cb) {
  async.series([
    (cb) => staffCreate('Tyl', 'Phe', 'Chef', 10, '1-1-2020', false, cb),
  ]);
}

async.series([
  equipmentPopulate,
  foodPopulate,
  ingredientsPopulate,
  recipePopulate,
  restaurantPopulate,
  staffPopulate,
],
  // Optional Callback
  function (err, results) {
    if (err) {
      console.log(`Fatal Error: ${err}`);
    } else {
      console.log(`Result: ${result}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
