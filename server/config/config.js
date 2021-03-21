const env = process.env.NODE_ENV || 'development';
const atlasURL = 'mongodb+srv://dbUser:dbUser@cluster0.el6cf.mongodb.net/RecipesProject?retryWrites=true&w=majority';

const config = {
    development: {
        port: process.env.PORT || 8000,
        dbURL: 'mongodb://localhost:27017/recipes-db',
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];