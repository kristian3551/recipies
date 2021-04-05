const models = require('../models');
const utils = require('../utils');
const config = require('../config/config');

module.exports = {
    get: (req, res, next) => {
        models.Recipe.find().populate('author')
            .then((recipes) => res.send(recipes))
            .catch(next);
    },
    getOne: (req, res, next) => {
        const id = req.params.id;
        models.Recipe.findOne({ _id: id}).populate('author').populate('likes')
        .populate('comments')
        .then((recipeObject) => res.send(recipeObject))
        .catch(next);
    },
    post: {
        create: (req, res, next) => {
            const { meal, ingredients, prepMethod, description, foodImageURL, category, categoryImageURL, author } = req.body;
            models.Recipe.create({ meal, ingredients, prepMethod,
                 description, foodImageURL, category, categoryImageURL, author })
                .then((createdRecipe) => {
                    return Promise.all([
                        models.User.updateOne({ _id: author }, { $push: { recipes: createdRecipe._id } }),
                        models.Recipe.findOne({ author: createdRecipe.author })
                    ]);
                })
                .then(([modifiedObj, recipeObj]) => {
                    res.send(recipeObj);
                })
                .catch(next);
        },
        like: (req, res, next) => {
            const id = req.params.id;
            const { user } = req.body;
            models.Recipe.updateOne({ _id: id }, { $push: { likes: user._id } })
                .then((updatedRecipe) => res.send(updatedRecipe))
                .catch(next);
        },
        comment: (req, res, next) => {
            const id = req.params.id;
            const { content, author } = req.body;
            models.Comment.create({ content, author })
            .then((createdComment) => {
                return Promise.all([
                    models.Recipe.updateOne({ _id: id }, { $push: { comments: createdComment._id } }),
                        models.Comment.findOne({ _id: createdComment._id })
                ])
            })
            .then(([modifiedRecipe, createdComment]) => {
                res.send(createdComment);
            })
            .catch(next);
        }
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { meal, ingredients, prepMethod, description, foodImageURL,
             category, categoryImageURL } = req.body;
        models.Recipe.updateOne({ _id: id }, { meal, ingredients, prepMethod,
             description, foodImageURL, category, categoryImageURL })
            .then((updatedRecipe) => res.send(updatedRecipe))
            .catch(next);
    },
    
    delete: (req, res, next) => {
        const id = req.params.id;
        models.Recipe.deleteOne({ _id: id })
            .then((removedRecipe) => res.send(removedRecipe))
            .catch(next);
    }
};