const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number },
  date_purchased: { type: Date },
  date_removed: { type: Date },
  location: { 
    enum: [
      'Bar',
      'Entrance',
      'Kitchen',
      'Staff Room',
      'Storage',
      'Waiting Area',
    ]
  },
  qty: { type: Number },
});

EquipmentSchema.virtual('url').get(function () {
  return `/catalog/equipment/${this._id}`;
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
