const { Sequelize } = require('sequelize');
const db = require('./config/database');

//use table name in define - use singular version of name if plural in db
const CustomerApp = db.define('full_apps', {
    app_key: {
        field: 'app_key',
        type: Sequelize.STRING
    },
    pri_firstName: {
        field: 'pri_firstName',
        type: Sequelize.STRING
    },
    pri_lastName: {
        field: 'pri_lastName',
        type: Sequelize.STRING
    }
});

module.exports = CustomerApp;