const dish = require('../models/dish');
const async = require('async');
const recipe = require('../models/recipe');

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
  dish.findById(req.params.id, function(err, dishDetail) {
    if(err) {
      return next(err);
    }
    console.log('dishdetail', dishDetail)
    recipe.findById(dishDetail.recipe, function(err, recipeDetail) {
      if(err) {
        return next(err);
      }
      console.log(recipeDetail)
      res.render('dish_detail', {
        title: 'Dish detail',
        dish: dishDetail,
        recipe: recipeDetail
      });
    });
  });
};

// Display dish create form GET
exports.dish_create_get = (req, res) => {
  res.send('not implemented');
}

// Display dish create on POST
exports.dish_create_post = (req, res) => {
  res.send('not implemented');
}

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