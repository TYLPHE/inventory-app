const staff = require('../models/staff');

// Display list of all staff
exports.staff_list = (req, res, next) => {
  staff.find()
    .populate('first_name')
    .exec(function(err, list_staff) {
      if(err) {
        return next(err);
      }

      // Successful > render page
      console.log(list_staff)
      res.render('staff_list', {
        title: 'Staff List',
        staffList: list_staff,
      });
    });
};

// Display detail page for specific staff
exports.staff_detail = (req, res) => {
  staff.findById(req.params.id)
    .exec(
      function(err, results) {
        if (err) console.error(err);
        console.log(results);
        res.render('staff_detail', {
          title: 'Staff detail',
          staff: results,
        })
      }
    );
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
