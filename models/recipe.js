const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: Schema.Types.ObjectId },
  instructions: { type: String },
  value: { type: Number },
});

RecipeSchema.virtual('url').get(function () {
  return `/recipe/${this._id}`;
});

module.exports = mongoose.model('Recipe', RecipeSchema);
