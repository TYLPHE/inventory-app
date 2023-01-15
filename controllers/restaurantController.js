const restaurant = require('../models/restaurant');
const equipment = require('../models/equipment');
const dish = require('../models/dish');
const ingredients = require('../models/ingredients');
const recipe = require('../models/recipe');
const staff = require('../models/staff');

const async = require('async');

// Display website home page
exports.index = (req, res) => {
  async.parallel(
    {
      restaurantCount(callback) {
        // Pass an empty object to find all documents in collection
        restaurant.countDocuments({}, callback);
      },
      equipmentCount(callback) {
        equipment.countDocuments({}, callback);
      },
      dishCount(callback) {
        dish.countDocuments({}, callback);
      },
      ingredientsCount(callback) {
        ingredients.countDocuments({}, callback);
      },
      recipeCount(callback) {
        recipe.countDocuments({}, callback);
      },
      staffCount(callback) {
        staff.countDocuments({}, callback);
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
  restaurant.find({}, 'name')
    .sort({ name: 1 })
    .populate('name')
    .exec(function (err, restaurant_list) {
      if (err) {
        return next(err);
      }
      // Successful so render page
      res.render('restaurant_list', {title: 'Restaurant List', restaurant_list: restaurant_list});
    })
};

// Display detail page for a specific restaurant
exports.restaurant_detail = (req, res, next) => {
  restaurant.findById(req.params.id, function(err, findRestaurant){
    if(err) return next(err);
    console.log('findRestaurant: ', findRestaurant)
    async.parallel(
      {
        finda(callback) {
          dish.findById(findRestaurant.dishes[0]).exec(callback);
        },
        findb(callback) {
          equipment.findById(findRestaurant.equipment[0]).exec(callback);
        },
        findc(callback) {
          staff.findById(findRestaurant.staff[0]).exec(callback);
        }
      },
      (err,results) => {
        if(err) return next(err);
        if (findRestaurant === null) {
          const err = new Error('No restaurant found');
          err.status = 404;
          return next(err);
        }
        res.render('restaurant_detail', {
          title: 'Restaurant detail',
          restaurant: findRestaurant,
          dishes: results.finda,
          equipment: results.findb,
          staff: results.findc,
        })
      }
    );
  })
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
