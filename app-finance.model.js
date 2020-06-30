const { Sequelize } = require('sequelize');
const db = require('./config/database');

//use table name in define - use singular version of name if plural in db
const AppFinance = db.define('app_financials', {
    appStatus: {
        type: Sequelize.STRING
    },
    app_key: {
        type: Sequelize.STRING
    },
    dealerName: {
        type: Sequelize.STRING
    },
    dealerNumber: {
        type: Sequelize.STRING
    },
    leadSource: {
        type: Sequelize.STRING
    },
    dialer: {
        type: Sequelize.STRING
    },
    financePay: {
        type: Sequelize.STRING
    },
    financeTerms: {
        type: Sequelize.DECIMAL
    },
    installDate: {
        type: Sequelize.DATE
    },
    itemFinanced: {
        type: Sequelize.STRING
    },
    terms: {
        type: Sequelize.STRING
    },
    projectCost: {
        type: Sequelize.DECIMAL
    },
    saleAmount: {
        type: Sequelize.DECIMAL
    },
    saleDate: {
        type: Sequelize.DATE
    },
    rebate: {
        type: Sequelize.DECIMAL
    },
    netSale: {
        type: Sequelize.DECIMAL
    },
    ro: {
        type: Sequelize.INTEGER
    },
    air: {
        type: Sequelize.STRING
    },
    referral: {
        type: Sequelize.INTEGER
    },
    intake: {
        type: Sequelize.INTEGER
    },
    soapIncluded: {
        type: Sequelize.STRING
    },
    bonusItem: {
        type: Sequelize.STRING
    },
    notes: {
        type: Sequelize.STRING
    }

});

module.exports = AppFinance;