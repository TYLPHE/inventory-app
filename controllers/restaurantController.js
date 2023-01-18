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
exports.restaurant_detail = async (req, res, next) => {
  const restResult = await restaurant.findById(req.params.id).exec();
  const dishArr = [];
  const equipArr = [];
  const staffArr = [];
  for (const id of restResult.dishes) {
    dishArr.push(await dish.findById(id).exec());
  }
  for (const id of restResult.equipment) {
    equipArr.push(await equipment.findById(id).exec());
  }
  for (const id of restResult.staff) {
    staffArr.push(await staff.findById(id).exec());
  }

  res.render('restaurant_detail', {
    title: 'Restaurant detail',
    restaurant: restResult,
    dish: dishArr,
    staff: staffArr,
    equipment: equipArr,
  });
}

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
