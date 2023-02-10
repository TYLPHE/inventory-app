const restaurant = require('../models/restaurant');
const equipment = require('../models/equipment');
const dish = require('../models/dish');
const ingredients = require('../models/ingredients');
const recipe = require('../models/recipe');
const staff = require('../models/staff');
const { body, validationResult } = require('express-validator')
const async = require('async');
const { json } = require('express');

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
  // Find all dishes to add to restaurant form
  dish.find()
    .populate('dishName')
    .exec((err, dish_list) => {
      if (err) {
        return next(err);
      }
      res.render('restaurant_form', 
        { 
          title: 'Create Restaurant',
          dish: dish_list,
        }
      );
    })
};

// Display restaurant create on POST
exports.restaurant_create_post = [
  // Validate and sanitize the form
  body('name', 'Invalid restaurant name').trim().isLength({ min: 1 }).escape(),
  body('address', 'Invalid address').trim().isLength({min:1}).escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract validation errors from a request
    const errors = validationResult(req);

    // Parse checklist to an array of objects
    const jsonArr = [];
    // If user checks only ONE checkbox, returned data is a string
    // Multiple checks returns an array of strings
    if (typeof req.body.dish == 'string') {
      const parsed = JSON.parse(req.body.dish)
      jsonArr.push(parsed._id);
    } else {
      req.body.dish.forEach(element => {
        const parsed = JSON.parse(element);
        jsonArr.push(parsed._id);
      });
    } 

    // Create a restaurant object with escaped trimmed data
    const restaurantObj = new restaurant(
      {
        name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
        address: req.body.address,
        phone: req.body.phone,
        dishes: jsonArr,
      }
    );

    if(!errors.isEmpty()) {
      // Errors found. Render form with errors at the bottom.  
      // Find all dishes to add to restaurant form
      dish.find()
      .populate('dishName')
      .exec((err, dish_list) => {
        if (err) {
          return next(err);
        }
        res.render('restaurant_form', 
          { 
            title: 'Create Restaurant',
            dish: dish_list,
            errors: errors.array(),
            restaurant: restaurantObj,
          }
        );
      });
    } else {
      // Data is valid
      // Check if restaurant exists
      restaurant.findOne({ name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1) }, function(err, found_rest) {
        if(err) return next(err);
        console.log('found rest: ', found_rest)
        if (found_rest) {
          // Find all dishes to add to restaurant form
          dish.find()
            .populate('dishName')
            .exec((err, dish_list) => {
              if (err) {
                return next(err);
              }
              res.render('restaurant_form', 
                { 
                  title: 'Create Restaurant',
                  dish: dish_list,
                  errors: [
                    {
                      msg: 'Restaurant name already exists. Update restaurant name.'
                    }
                  ],
                  restaurant: restaurantObj,
                }
              );
            });
          return;
        } else {
          if (err) return next(err);
          restaurantObj.save((err) => {
            if (err) return next(err);
            // Restaurant is saved. Redirect to the newly created restaurant
            res.redirect(restaurantObj.url);
          });
        }
      });
    }
  }
];


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
