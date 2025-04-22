const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // SQLite file location
});

sequelize.authenticate()
    .then(() => console.log('SQLite connected.'))
    .catch((err) => console.error('Connection error:', err));

module.exports = sequelize;
