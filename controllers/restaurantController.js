const Restaurant = require('../models/restaurant');
const Equipment = require('../models/equipment');
const Dish = require('../models/dish');
const Ingredients = require('../models/ingredients');
const Recipe = require('../models/recipe');
const Staff = require('../models/staff');

const async = require('async');

// Display website home page
exports.index = (req, res) => {
  async.parallel(
    {
      restaurantCount(callback) {
        // Pass an empty object to find all documents in collection
        Restaurant.countDocuments({}, callback);
      },
      equipmentCount(callback) {
        Equipment.countDocuments({}, callback);
      },
      dishCount(callback) {
        Dish.countDocuments({}, callback);
      },
      ingredientsCount(callback) {
        Ingredients.countDocuments({}, callback);
      },
      recipeCount(callback) {
        Recipe.countDocuments({}, callback);
      },
      staffCount(callback) {
        Staff.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render('index', {
        title: 'Inventory App',
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all restaurants
exports.restaurant_list = (req, res, next) => {
  Restaurant.find({}, 'name')
    .sort({ name: 1 })
    .populate('name')
    .exec(function (err, restaurant_list) {
      if (err) {
        return next(err);
      }
      // Successful so render page
      console.log(restaurant_list)
      res.render('restaurant_list', {title: 'Restaurant List', restaurant_list: restaurant_list});
    })
};

// Display detail page for a specific restaurant
exports.restaurant_detail = (req, res) => {
  res.send(`not implemented: restaurant detail: ${req.params.id}`);
};

// Display restaurant create form GET
exports.restaurant_create_get = (req, res) => {
  res.send('not implemented: restaurant create GET');
};

// Display restaurant create on POST
exports.restaurant_create_post = (req, res) => {
  res.send('not implemented: restaurant create POST');
};

// Display restaurant delete form on GET
exports.restaurant_delete_get = (req, res) => {
  res.send('not implemented: restaurant delete GET');
};

// Handle restaurant delete on POST
exports.restaurant_delete_post = (req, res) => {
  res.send('not implemented: restaurant delete POST');
};

// Display restaurant update form on GET
exports.restaurant_update_get = (req, res) => {
  res.send('not implemented: restaurant update GET');
};

// Handle restaurant update on POST
exports.restaurant_update_post = (req, res) => {
  res.send('not implemented: restaurant update POST');
};
