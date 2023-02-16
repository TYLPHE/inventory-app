const ingredient = require('../models/ingredients');
const recipe = require('../models/recipe');
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
  body('qty', 'Must be a positive integer').isInt({ min: 0 }),
  body('cost', 'Must be a positive integer').isInt({ min: 0 }),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a ingredient object with escaped and trimmed data.
    const ingredientObj = new ingredient(
      { 
        name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
        qty: req.body.qty,
        cost: req.body.cost,
      });
    if(!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('ingredient_form', {
        title: 'Create Ingredient',
        ingredientObj,
        errors: errors.array(),
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
          ingredientObj.save((err) => {
            if (err) {
              return next(err);
            }
            // Ingredient is saved. Redirect to ingredient detail page
            res.redirect(ingredientObj.url);
          });
        }
      });
    }
  }
];

// Display ingredient delete form on GET
exports.ingredient_delete_get = (req, res, next) => {
  async.parallel(
    {
      findIngredient(callback) {
        ingredient.findById(req.params.id).exec(callback);
      },
      findRecipe(callback) {
        recipe.find({ ingredients: req.params.id }).exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.findIngredient === null) {
        // No results
        res.redirect('/catalog/ingredient_list');
      }
      // Successful. Render delete page
      res.render('ingredient_delete', {
        title: 'Delete Ingredient',
        ingredient: results.findIngredient,
        recipe: results.findRecipe,
      });
    }
  );
};

// Handle ingredient delete on POST
exports.ingredient_delete_post = (req, res, next) => {
  async.parallel(
    {
      findIngredient(callback) {
        ingredient.findById(req.params.id).exec(callback);
      },
      findRecipe(callback) {
        recipe.find({ ingredients: [ req.params.id ] }).exec(callback)
      },
    },
    (err, results) => {
      if (err) return next(err);
      // Success
      if (results.findRecipe.length > 0) {
        // Ingredient has associated recipe. render in the same way as the GET route
        res.render('ingredient_delete', {
          title: 'Delete Ingredient',
          ingredient: results.findIngredient,
          recipe: results.findRecipe,
        });
        return;
      }
      // Ingredients have no associated recipe. Delete object and redirect
      ingredient.findByIdAndRemove(req.body.ingredientId, (err) => {
        if (err) next(err);
        // Success - go to ingredient list
        res.redirect('/catalog/ingredient_list');
      });
    }
  );
};

// Display ingredient update form on GET
exports.ingredient_update_get = (req, res, next) => {
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
      res.render('ingredient_form', {
        title: 'Ingredient detail',
        ingredient: results.findIngredient,
      });
    }
  );
};

// Handle ingredient update on POST
exports.ingredient_update_post = [
  // Validate and sanitize the form
  body('name', 'Ingredient name required').trim().isLength({min: 1}).escape(),
  body('qty', 'Must be a positive integer').isInt({ min: 0 }),
  body('cost', 'Must be a positive integer').isInt({ min: 0 }),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a ingredient object with escaped and trimmed data.
    const ingredientObj = new ingredient(
      { 
        name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
        qty: req.body.qty,
        cost: req.body.cost,
        _id: req.params.id, // Required for update
      });
    if(!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('ingredient_form', {
        title: 'Create Ingredient',
        ingredientObj,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      // Update the record
      ingredient.findByIdAndUpdate(req.params.id, ingredientObj, {}, (err, updated) => {
        if (err) {
          return next(err);
        }

        // Successful. Redirect to updated detail page
        res.redirect(updated.url);
      });
    }
  }
];