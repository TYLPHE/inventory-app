const ingredients = require('../models/ingredients');
const recipe = require('../models/recipe');
const { body, validationResult } = require('express-validator');

// Display list of all recipes
exports.recipe_list = (req, res, next) => {
  recipe.find()
    .populate('name')
    .exec(function (err, list_recipe) {
      if (err) {
        return next(err);
      }

      // Successful > render page
      res.render('recipe_list', {
        title: 'Recipe List',
        recipeList: list_recipe,
      });
    });
};

// Display detail page for a specific recipe
exports.recipe_detail = async (req, res, next) => {
  const recipeResult = await recipe.findById(req.params.id).exec()
  const ingredientsArr = [];
  for (const id of recipeResult.ingredients) {
    ingredientsArr.push(await ingredients.findById(id).exec());
  }

  res.render('recipe_detail', {
    title: 'Recipe detail',
    recipe: recipeResult,
    ingredients: ingredientsArr
  });
};

// Display recipe create form GET
exports.recipe_create_get = (req, res) => {
  ingredients.find()
    .populate('name')
    .exec(function (err, ingredients_list) {
      if (err) {
        return next(err);
      }
      res.render(
        'recipe_form', 
        { 
          title: 'Create Recipe',
          ingredients: ingredients_list,
        });
    });
};

// Display recipe create on POST
exports.recipe_create_post = [
  // Validate and sanitize the form
  body('name', 'Invalid recipe name').trim().isLength({ min: 1 }).escape(),
  body('instructions', 'Invalid instructions text').trim().escape(),
  body('value', 'Invalid value').isInt({ min: 0 }),
  
  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(err);

    // Create a recipe object with escaped trimmed data
    const recipeObj = new recipe(
      {
        name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
        // TODO: figure out how to post from a checklist of ingredients
        ingredients: 'to be implemented',
        instructions: req.body.instructions,
        value: req.body.value,
      }
    );
    if (!errors.isEmpty()) {
      // Errors found. Render form with errors at bottom.
      res.render('recipe_form', {
        title: 'Create Recipe',
        recipeObj,
        errors: errors.array(),
      });
      return;
    } else {
      // Data is valid
      // Check if recipe exists
      recipe.findOne({ name: req.body.name }).exec((err, found_recipe) => {
        if(found_recipe) {
          // Recipe name exists, render page again with message
          res.render('recipe_form', {
            title: 'Create Recipe',
            recipeObj,
            errors: [
              {
                msg: 'Recipe name already exists. Update the recpie name.'
              }
            ]
          });
          return;
        } else {
          recipeObj.save((err) => {
            if (err) {
              return next(err);
            }

            // Recipe is saved. Redirect to the newly created recipe
            res.redirect(recipeObj.url);
          });
        }
      });
    }
  }
];

// Display recipe delete form on GET
exports.recipe_delete_get = (req, res) => {
  res.send('not implemented: recipe delete GET');
};

// Handle recipe delete on POST
exports.recipe_delete_post = (req, res) => {
  res.send('not implemented: recipe delete POST');
};

// Display recipe update form on GET
exports.recipe_update_get = (req, res) => {
  res.send('not implemented: recipe update GET');
};

// Handle recipe update on POST
exports.recipe_update_post = (req, res) => {
  res.send('not implemented: recipe update POST');
};
