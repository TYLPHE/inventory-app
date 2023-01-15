const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  founded: { type: Date },
  dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
  equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
  staff: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
});

// Virtual for Restaurant's URL
RestaurantSchema.virtual('url').get(function () {
  return `/catalog/restaurant/${this._id}`;
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
