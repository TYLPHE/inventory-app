const Restaurant = require('../models/restaurant');

// Display website home page
exports.index = (req, res) => {
  res.send('not implemented: restaurant home page');
};

// Display list of all restaurants
exports.restaurant_list = (req, res) => {
  res.send('not implemented: restaurant list');
};

// Display detail page for a specific restaurant
exports.restaurant_detail = (req, res) => {
  res.send(`not implemented: restaurant detail: ${req.params.id}`);
};

// Display restaurant create form GET
exports.restaurant_create_get = (req, res) => {
  res.send('not implemented: restaurant create GET');
};

// Display restaurant create on POST
exports.restaurant_create_post = (req, res) => {
  res.send('not implemented: restaurant create POST');
};

// Display restaurant delete form on GET
exports.restaurant_delete_get = (req, res) => {
  res.send('not implemented: restaurant delete GET');
};

// Handle restaurant delete on POST
exports.restaurant_delete_post = (req, res) => {
  res.send('not implemented: restaurant delete POST');
};

// Display restaurant update form on GET
exports.restaurant_update_get = (req, res) => {
  res.send('not implemented: restaurant update GET');
};

// Handle restaurant update on POST
exports.restaurant_update_post = (req, res) => {
  res.send('not implemented: restaurant update POST');
};
