const { Sequelize } = require('sequelize');
const db = require('./config/database');

//use table name in define - use singular version of name if plural in db
const CustomerApp = db.define('full_apps', {
    app_key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    pri_firstName: {
        type: Sequelize.STRING
    },
    pri_lastName: {
        type: Sequelize.STRING
    },
    pri_middleName: {
        type: Sequelize.STRING
    },
    pri_ssn: {
        type: Sequelize.STRING
    },
    pri_birthDate: {
        type: Sequelize.DATEONLY
    },
    pri_driverLicense: {
        type: Sequelize.STRING
    },
    pri_dl_DateIssued: {
        type: Sequelize.DATEONLY
    },
    pri_dl_DateExpires: {
        type: Sequelize.DATEONLY
    },
    pri_address: {
        type: Sequelize.STRING
    },
    pri_city: {
        type: Sequelize.STRING
    },
    pri_state: {
        type: Sequelize.STRING
    },
    pri_zip: {
        type: Sequelize.STRING
    },
    pri_homePhone: {
        type: Sequelize.STRING
    },
    pri_cellPhone: {
        type: Sequelize.STRING
    },
    pri_email: {
        type: Sequelize.STRING
    },
    pri_employerName: {
        type: Sequelize.STRING
    },
    pri_occupation: {
        type: Sequelize.STRING
    },
    pri_employerPhone: {
        type: Sequelize.STRING
    },
    pri_employerTenure: {
        type: Sequelize.STRING
    },
    pri_employerAddress: {
        type: Sequelize.STRING
    },
    pri_grossIncome: {
        type: Sequelize.STRING
    },
    pri_otherSource: {
        type: Sequelize.STRING
    },
    pri_otherIncome: {
        type: Sequelize.NUMBER
    },
    pri_signature: {
        type: Sequelize.STRING
    },
    sec_firstName: {
        type: Sequelize.STRING
    },
    sec_lastName: {
        type: Sequelize.STRING
    },
    sec_middleName: {
        type: Sequelize.STRING
    },
    sec_ssn: {
        type: Sequelize.STRING
    },
    sec_birthDate: {
        type: Sequelize.DATEONLY
    },
    sec_driverLicense: {
        type: Sequelize.STRING
    },
    sec_dl_DateIssued: {
        type: Sequelize.DATEONLY
    },
    sec_dl_DateExpires: {
        type: Sequelize.DATEONLY
    },
    sec_address: {
        type: Sequelize.STRING
    },
    sec_city: {
        type: Sequelize.STRING
    },
    sec_state: {
        type: Sequelize.STRING
    },
    sec_zip: {
        type: Sequelize.STRING
    },
    sec_homePhone: {
        type: Sequelize.STRING
    },
    sec_cellPhone: {
        type: Sequelize.STRING
    },
    sec_email: {
        type: Sequelize.STRING
    },
    sec_employerName: {
        type: Sequelize.STRING
    },
    sec_occupation: {
        type: Sequelize.STRING
    },
    sec_employerPhone: {
        type: Sequelize.STRING
    },
    sec_employerTenure: {
        type: Sequelize.STRING
    },
    sec_employerAddress: {
        type: Sequelize.STRING
    },
    sec_grossIncome: {
        type: Sequelize.STRING
    },
    sec_otherSource: {
        type: Sequelize.STRING
    },
    sec_otherIncome: {
        type: Sequelize.STRING
    },
    sec_signature: {
        type: Sequelize.STRING
    },
    ownRent: {
        type: Sequelize.STRING
    },
    timeResidence: {
        type: Sequelize.STRING
    },
    monthlyPayment: {
        type: Sequelize.STRING
    },
    previousAddress: {
        type: Sequelize.STRING
    },
    createdBy: {
        type: Sequelize.STRING
    }
});

module.exports = CustomerApp;