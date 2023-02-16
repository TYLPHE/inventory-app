const ingredients = require('../models/ingredients');
const dish = require('../models/dish');
const recipe = require('../models/recipe');
const { body, validationResult } = require('express-validator');
const async = require('async');

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
exports.recipe_create_get = (req, res, next) => {
  // Find all ingredients to add to recipe
  ingredients.find()
    .populate('name')
    .exec(function (err, ingredients_list) {
      if (err) {
        return next(err);
      }
      // Find all dishes. Recipe must be associated with dish
      // Ex. Dish: Pizza > Recipe: Pepperoni pizza
      dish.find()
      .populate('dishName')
      .exec(function (err, dish_list) {
        if (err) {
          return next(err);
        }
        res.render(
          'recipe_form',
          {
            title: 'Create Recipe',
            ingredients: ingredients_list,
            dish: dish_list,
          }
        )
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
    const errors = validationResult(req);

    // Parse checklist to an array of objects
    const jsonArr = [];
    req.body.ingredients.forEach(e => {
      jsonArr.push(JSON.parse(e));
    })

    // Create a recipe object with escaped trimmed data
    const recipeObj = new recipe(
      {
        name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
        instructions: req.body.instructions,
        ingredients: jsonArr,
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
          if (err) return next(err);
          recipeObj.save((err) => {
            if (err) {
              return next(err);
            }
            // Recipe is saved. Redirect to the newly created recipe
            // Also update the dish list with new recipe
            const parseDish = JSON.parse(req.body.dish);
            parseDish.recipe.push(recipeObj.id);
            dish.findByIdAndUpdate(parseDish._id, parseDish, {}, (err) => {
              if (err) {
                return next(err);
              }
              res.redirect(recipeObj.url);
            });
          });
        }
      });
    }
  }
];

// Display recipe delete form on GET
exports.recipe_delete_get = (req, res, next) => {
  async.parallel(
    {
      findRecipe(callback) {
        recipe.findById(req.params.id).exec(callback)
      },
    },
    (err, results) => {
      if (err) next(err);
      if (results.findRecipe === null) res.redirect('/catalog/recipe_list')
      res.render('recipe_delete', {
        title: 'Delete Recipe',
        recipe: results.findRecipe,
      });
    }
  );
};

// Handle recipe delete on POST
exports.recipe_delete_post = (req, res, next) => {
  recipe.findByIdAndRemove(req.body.recipeId, (err) => {
    if (err) next(err);
    res.redirect('/catalog/');
  });
};

// Display recipe update form on GET
exports.recipe_update_get = (req, res, next) => {
  async.parallel(
    {
      findIngredients(callback) {
        ingredients.find().populate('name').exec(callback);
      },
      findDish(callback) {
        dish.find().populate('dishName').exec(callback);
      },
      findRecipe(callback) {
        recipe.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) next(err);
      res.render('recipe_form', {
        title: 'Update Recipe',
        ingredients: results.findIngredients,
        dish: results.findDish,
        recipe: results.findRecipe,
      });
    }
  );
};

// Handle recipe update on POST
exports.recipe_update_post = [
  // Validate and sanitize the form
  body('name', 'Invalid recipe name').trim().isLength({ min: 1 }).escape(),
  body('instructions', 'Invalid instructions text').trim().escape(),
  body('value', 'Invalid value').isInt({ min: 0 }),
  
  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Parse checklist to an array of objects
    const jsonArr = [];
    // If user checks only ONE checkbox, returned data is a string
    // Multiple checks returns an array of strings
    if (typeof req.body.ingredients == 'string') {
      const parsed = JSON.parse(req.body.ingredients);
      jsonArr.push(parsed._id);
    } else {
      req.body.ingredients.forEach(e => {
        jsonArr.push(JSON.parse(e));
      })
    }

    // Create a recipe object with escaped trimmed data
    const recipeObj = new recipe(
      {
        name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
        instructions: req.body.instructions,
        ingredients: jsonArr,
        value: req.body.value,
        _id: req.params.id, // Necessary for update
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
      // Update the record      
      // Remove recipe from previous dish type
      dish.updateMany({}, {
        $pull: {
          recipe: [req.params.id]
        }
      });
      recipe.findByIdAndUpdate(req.params.id, recipeObj, {}, (err, updated) => {
        if (err) next(err);
        // Also update the dish list with new recipe
        const parseDish = JSON.parse(req.body.dish);
        parseDish.recipe.push(recipeObj.id);
        dish.findByIdAndUpdate(parseDish._id, parseDish, {}, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect(recipeObj.url);
        });
      });
    }
  }
];
