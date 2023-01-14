const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
  name: { type: String },
  qty: { type: Number },
  cost: { type: Number },
});

ingredientsSchema.virtual('url').get(function () {
  return `/ingredients/${this._id}`;
});

module.exports = mongoose.model('Ingredients', ingredientsSchema);
