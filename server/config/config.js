const env = process.env.NODE_ENV || 'development';
const atlasURL = 'mongodb+srv://dbUser:dbUser@cluster0.el6cf.mongodb.net/RecipesProject?retryWrites=true&w=majority';
const localURL = 'mongodb://localhost:27017/recipes-db';
const config = {
    development: {
        port: process.env.PORT || 8000,
        dbURL: atlasURL,
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];