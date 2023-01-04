const Staff = require('../models/staff');

// Display list of all staff
exports.staff_list = (req, res) => {
  res.send('not implemented: staff list');
};

// Display detail page for specific staff
exports.staff_detail = (req, res) => {
  res.send(`not implemented: staff detail ${req.params.id}`);
};

// Display staff create form GET
exports.staff_create_get = (req, res) => {
  res.send('not implemented: staff create GET');
};

// Display staff create form POST
exports.staff_create_post = (req, res) => {
  res.send('not implemented: staff create POST');
};

// Display staff delete form on get
exports.staff_delete_get = (req, res) => {
  res.send('not implemented: staff delete GET');
};

// Handle staff delete on POST
exports.staff_delete_post = (req,res) => {
  res.send('not implemented: staff delete POST');
};

// Display staff update form on GET
exports.staff_update_get = (req, res) => {
  res.send('not implemented: staff update GET');
};

// Handle staff update on POST
exports.staff_update_post = (req, res) => {
  res.send('not implemented: staff update POST');
};
