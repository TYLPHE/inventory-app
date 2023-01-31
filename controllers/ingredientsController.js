const ingredient = require('../models/ingredients');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of all ingredients
exports.ingredient_list = (req, res, next) => {
  ingredient.find()
    .populate('name')
    .exec(function (err, list_ingredient) {
      if (err) {
        return next(err);
      }

      // Successful > render page
      res.render('ingredient_list', {
        title: 'Ingredient List',
        ingredientList: list_ingredient,
      });
    });
};

// Display detail page for a specific ingredient
exports.ingredient_detail = (req, res, next) => {
  async.parallel(
    {
      findIngredient(callback) {
        ingredient.findById(req.params.id).exec(callback);
      }
    },
    (err, results) => {
      if(err) {
        return next(err);
      }
      if(results.findIngredient == null) {
        const err = new Error('No ingredients found');
        err.status = 404;
        return next(err);
      }
      res.render('ingredient_detail', {
        title: 'Ingredient detail',
        ingredient: results.findIngredient,
      });
    }
  );
};

// Display ingredient create form GET
exports.ingredient_create_get = (req, res) => {
  res.render('ingredient_form', { title: 'Create Ingredient' });
};

// Display ingredient create on POST
exports.ingredient_create_post = [
  // Validate and sanitize the form
  body('name', 'Ingredient name required').trim().isLength({min: 1}).escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const ingredientName = new ingredient({ name: req.body.name });
    if(!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('ingredient_form', {
        title: 'Create Ingredient',
        ingredientName,
        error: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      // Check if ingredient with the same name already exists
      ingredient.findOne({ name: req.body.name }).exec((err, found_ingredient) => {
        if (found_ingredient) {
          // Ingredient exists, redirect to its detail page
          res.redirect(found_ingredient.url);
        } else {
          ingredientName.save((err) => {
            if (err) {
              return next(err);
            }
            // Ingredient is saved. Redirect to ingredient detail page
            res.redirect(ingredientName.url);
          });
        }
      });
    }
  }
]

// Display ingredient delete form on GET
exports.ingredient_delete_get = (req, res) => {
  res.send('not implemented: ingredient delete GET');
};

// Handle ingredient delete on POST
exports.ingredient_delete_post = (req, res) => {
  res.send('not implemented: ingredient delete POST');
};

// Display ingredient update form on GET
exports.ingredient_update_get = (req, res) => {
  res.send('not implemented: ingredient update GET');
};

// Handle ingredient update on POST
exports.ingredient_update_post = (req, res) => {
  res.send('not implemented: ingredient update POST');
};
