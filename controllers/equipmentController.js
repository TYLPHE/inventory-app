const equipment = require('../models/equipment');

// Display list of all equipment
exports.equipment_list = (req, res, next) => {
  equipment.find()
    .populate('name')
    .exec(function (err, list_equip) {
      if (err) {
        return next(err);
      }
      
      // Successful > render page
      res.render('equip_list', {
        title: 'Equipment List',
        equipList: list_equip,
      })
    })
};

// Display detail page for a specific equipment
exports.equipment_detail = (req, res, next) => {
  equipment.findById(req.params.id, function(err, equipDetail) {
    if(err) {
      return next(err);
    }
    res.render('equip_detail', {
      title: 'Equipment deatil',
      equipment: equipDetail,
    })
  })
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
