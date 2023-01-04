const ingredient = require('../models/ingredient');

// Display list of all ingredients
exports.ingredient_list = (req, res) => {
  res.send('not implemented: ingredient list');
};

// Display detail page for a specific ingredient
exports.ingredient_detail = (req, res) => {
  res.send(`not implemented: ingredient detail: ${req.params.id}`);
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
