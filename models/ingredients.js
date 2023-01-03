const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
  name: { type: String },
  qty: { type: Number },
  cost: { type: Number },
});

ingredientsSchema.virtual('url').get(function () {
  return `/ingredients/${url}`;
});

module.exports = mongoose.Model('Ingredients', ingredientsSchema);
