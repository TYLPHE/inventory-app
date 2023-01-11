const Food = require('../models/food');

// Display list of all food
exports.food_list = (req, res) => {
  Food.find()
    .populate('food')
};

// Display detail page for a specific food
exports.food_detail = (req, res) => {
  res.send(`not implemented: food detail ${req.params.id}`);
};

// Display food create form GET
exports.food_create_get = (req, res) => {
  res.send('not implemented: food create GET');
};

// Display food create on POST
exports.food_create_post = (req, res) => {
  res.send('not implemented: food create POST');
};

// Display food delete form on GET
exports.food_delete_get = (req, res) => {
  res.send('not implemented: food delete GET');
};

// Handle food delete on POST
exports.food_delete_post = (req, res) => {
  res.send('not implemented: food delete POST');
};

// Display food update form on GET
exports.food_update_get = (req, res) => {
  res.send('not implemented: food update GET');
};

// Handle food update on POST
exports.food_update_post = (req, res) => {
  res.send('not implemented: food update POST');
};
