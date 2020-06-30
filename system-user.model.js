const { Sequelize } = require('sequelize');
const db = require('./config/database');

//use table name in define - use singular version of name if plural in db
const OrbitUser = db.define('app_users', {
    alias: {
        type: Sequelize.STRING
    },
    core_email: {
        type: Sequelize.STRING
    },
    core_lname: {
        type: Sequelize.STRING
    },
    core_fname: {
        type: Sequelize.STRING
    },
    core_pwd: {
        type: Sequelize.STRING
    },
    fullAdmin: {
        type: Sequelize.INTEGER
    },
    active: {
        type: Sequelize.INTEGER
    }
});

module.exports = OrbitUser;