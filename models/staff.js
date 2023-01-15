const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  title: {
    enum: [
      'Bartender',
      'Bus person',
      'Chef',
      'Dishwasher',
      'Host/Hostess',
      'Manager',
      'Server',
    ]
  },
  rate: { type: Number, required: true}, 
  start_date: { type: Date, required: true },
  end_date: { type: Date },
});

StaffSchema.virtual('url').get(function () {
  return `/catalog/staff/${this._id}`;
});

module.exports = mongoose.model('Staff', StaffSchema);
