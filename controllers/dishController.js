const dish = require('../models/dish');
const async = require('async');
const recipe = require('../models/recipe');
const { body, validationResult } = require('express-validator');

// Display list of all dishes
exports.dish_list = (req, res, next) => {
  dish.find()
    .populate('dishName')
    .exec(function (err, list_dish) {
      if (err) {
        return next(err);
      }

      // Successful > render page
      res.render('dish_list', {
        title: 'Dish List',
        dishList: list_dish
      });
    });
};

// Display detail page for a specific dish
exports.dish_detail = (req, res, next) => {
  dish.findById(req.params.id, async function(err, dishDetail) {
    if(err) {
      return next(err);
    }
    // recipeArr is an array of objects to find recipe names to display on detail page
    const recipeArr = await recipe.find({ '_id': { $in: dishDetail.recipe } });

    res.render('dish_detail', {
      title: 'Dish detail',
      dish: dishDetail,
      recipe: recipeArr,
    });
  });
};

// Display dish create form GET
exports.dish_create_get = (req, res) => {
  res.render('dish_form', { title: 'Create Dish' });
}

// Display dish create on POST
exports.dish_create_post = [
  // Validate and sanitize the form
  body('dishName', 'Dish name required').trim().isLength({min:1}).escape(),
  body('price', 'Must be a positive integer').isInt({min:0}),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create dish object with escaped and trimmed data
    const dishObj = new dish(
      {
        dishName: req.body.dishName.charAt(0).toUpperCase() + req.body.dishName.slice(1),
        price: req.body.price,
      }
    );

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages
      res.render('dish_form', {
        title: 'Create dish',
        dishObj,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      // Check if dish with the same name already exists
      dish.findOne({ dishName: req.body.dishName }).exec((err, found_dish) => {
        if (found_dish) {
          res.redirect(found_dish.url);
        } else {
          dishObj.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect(dishObj.url);
          });
        }
      });
    }
  }
];

// Display dish delete form on GET
exports.dish_delete_get = (req, res) => {
  res.send('not implemented');
}

// Handle dish delete form on POST
exports.dish_delete_post = (req, res) => {
  res.send('not implemented');
}

// Display dish update on GET
exports.dish_update_get = (req, res) => {
  res.send('not implemented'); 
}

// Handle dish update on POST
exports.dish_update_post = (req, res) => {
  res.send('not implemented');
}