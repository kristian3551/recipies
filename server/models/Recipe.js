const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number } = Schema.Types;
// meal, ingredients, prepMethod, description, foodImageURL, category, categoryImageURL and likesCounter 
const recipeSchema = new Schema({
    meal: {
        type: String
    },
    ingredients: {
        type: Array
    },
    prepMethod: {
        type: String
    },
    description: {
        type: String
    },
    foodImageURL: {
        type: String
    },
    category: {
        type: String
    },
    categoryImageURL: {
        type: String
    },
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = new Model('Recipe', recipeSchema);