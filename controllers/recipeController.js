const Recipe = require('../models/recipe');

// Display list of all recipes
exports.recipe_list = (req, res) => {
  res.send('not implemented: recipe list');
};

// Display detail page for a specific recipe
exports.recipe_detail = (req, res) => {
  res.send(`not implemented: recipe detail: ${req.params.id}`);
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
