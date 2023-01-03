const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  recipe: { type: Schema.Types.ObjectId },
  ingredients: { Type: Schema.Types.ObjectId },
});

FoodSchema.virtual('url').get(function() {
  return `/food/${this._id}`;
});

module.exports = mongoose.model('Food', FoodSchema);
