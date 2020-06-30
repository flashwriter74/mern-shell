const express = require('express');
const router = express.Router();
const db = require('../config/database');
const ClientApp = require('../application.model');
const ClientTEST = require('../app_test.model');
const SystemUser = require('../system-user.model')
const AppFinance = require('../app-finance.model')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//get gig list - ALL
router.get('/', (req, res) => {
    res.json(
        {
            "route": "db"
        })
    });

router.get('/all', (req, res) => 
    ClientApp.findAll()
    .then(apps => {
        res.json(apps)
        console.log(apps)
    })
    .catch(err => console.log(err)));

router.get('/users/all', (req, res) => 
    SystemUser.findAll()
    .then(apps => {
        res.json(apps)
    })
    .catch(err => console.log(err)));

router.get('/users/:id', (req, res) => {
    let term = req.params.id
    console.log(term)
    SystemUser.findOne({ where: {alias: term}})
    .then(apps => {
        
        res.json(apps)
        console.log(apps)
    })
    .catch(err => console.log(err));
});

router.get('/finance/query/:id', (req, res) => {
    console.log("key query");
    let term = req.params.id
    
    term = term.toLowerCase();
    
    AppFinance.findOne({ where: {app_key: {[Op.like]: '%'+term+'%' }}})
        .then(apps => res.json(apps))
        .catch(err => res.render('error', { error: err }))
});

router.get('/finance/all', (req, res) => {

    AppFinance.findAll()
        .then(apps => res.json(apps))
        .catch(err => res.render('error', { error: err }))
});

router.get('/finance/dates/:d1/:d2', (req, res) => {
    console.log("key query");
    let date1 = req.params.d1;
    let date2 = req.params.d2;
    
    term = term.toLowerCase();
    
    AppFinance.findOne({ where: {app_key: {[Op.like]: '%'+term+'%' }}})
        .then(apps => res.json(apps))
        .catch(err => res.render('error', { error: err }))
});

//search for applications by client last name
router.get('/search', (req, res) => {
    let { term } = req.query
    
    term = term.toLowerCase();
    
    ClientApp.findAll({ where: {pri_lastName: {[Op.like]: '%'+term+'%' }}})
    .then(apps => res.json(apps))
    .catch(err => res.render('error', { error: err }))
});

router.get('/query/appkey/:id', (req, res) => {
    console.log("key query");
    let term = req.params.id
    
    term = term.toLowerCase();
    
    ClientApp.findOne({ where: {app_key: {[Op.like]: '%'+term+'%' }}})
    .then(apps => res.json(apps))
    .catch(err => res.render('error', { error: err }))
});





/*
router.post('/add-app', (req, res) => {
    const goods = req.body;
    console.log(goods);

      
    ClientApp.create(req.body)
        .then(apps => res.json({
            //"confirm": res.status(200).send({ message: apps })
        }))
    
})
*/

//export
module.exports = router;