const Equipment = require('../models/equipment');

// Display list of all equipment
exports.equipment_list = (req, res) => {
  res.send('not implemented: equipment list');
};

// Display detail page for a specific equipment
exports.equipment_detail = (req, res) => {
  res.send(`not implemented: equipment detail: ${req.params.id}`);
};

// Display equipment create form GET
exports.equipment_create_get = (req, res) => {
  res.send('not implemented: equipment create GET');
};

// Display equipment create on POST
exports.equipment_create_post = (req, res) => {
  res.send('not implemented: equipment create POST');
};

// Display equipment delete form on GET
exports.equipment_delete_get =(req, res) => {
  res.send('not implemented: equipment delete GET');
};

// Handle restaurant delete on POST
exports.equipment_delete_post = (req, res) => {
  res.send('not implemented: equipment delete POST');
};

// Display equipment update form on GET
exports.equipment_update_get = (req, res) => {
  res.send('not implemented: equipment update GET');
};

// Handle equipment update on POST
exports.equipment_update_post = (req, res) => {
  res.send('not implemented: equipment update POST');
};
