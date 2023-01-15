const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: { type: Schema.Types.ObjectId },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  instructions: { type: String },
  value: { type: Number },
});

RecipeSchema.virtual('url').get(function () {
  return `/catalog/recipe/${this._id}`;
});

module.exports = mongoose.model('Recipe', RecipeSchema);
