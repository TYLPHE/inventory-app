const ingredient = require('../models/ingredients');
const async = require('async');

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
  res.send('not implemented: ingredient create GET');
};

// Display ingredient create on POST
exports.ingredient_create_post = (req, res) => {
  res.send('not implemented: ingredient create POST');
};

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
