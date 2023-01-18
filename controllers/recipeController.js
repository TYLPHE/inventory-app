const ingredients = require('../models/ingredients');
const recipe = require('../models/recipe');

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
  res.send('not implemented: recipe create GET');
};

// Display recipe create on POST
exports.recipe_create_post = (req, res) => {
  res.send('not implemented: recipe create POST');
};

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
