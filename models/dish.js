const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dishSchema = new Schema({
  dishName: String,
  price: Number,
  recipe: [{ type: Schema.Types.ObjectId }],
});

dishSchema.virtual('url').get(function () {
  return `/catalog/dish/${this._id}`;
});

module.exports = mongoose.model('Dish', dishSchema);
