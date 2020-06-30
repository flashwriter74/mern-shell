const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mainRoutes = express.Router();
//login and session security
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ClientApp = require('./application.model');
//const ClientTEST = require('./app_test.model');
const SystemUser = require('./system-user.model');
const AppFinance = require('./app-finance.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Gig routes
//app.use('/db', require('./routes/db'));

//if in production
//app.use(express.static(path.join(__dirname, 'creditapp', 'build')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(bodyParser.raw());

//database
const db = require('./config/database');

//text db
db.authenticate()
    .then(() => console.log('database connected'))
    .catch(err => console.log('Error:' + err))


app.use('/admin-db', mainRoutes);
app.use('/db', require('./routes/db'));

/*
mainRoutes.get('/', (req, res) => {
    console.log(req);
    res.json({
        "search": "found it"
    });
});
*/
mainRoutes.post('/login', (req, res) => {
    console.log("login");
    var tk = '';
    if(req.body.alias !== "") {
        console.log("alias search");

        SystemUser.findOne( 
            {
                where: {alias: {[Op.like]: '%'+req.body.alias+'%' }}
            }    
        )
        .then(user => {
            if(!user) {
                res.json({message: 'That alias is not registered'});
            }

            if(user.active === 0) {
                res.json({message: 'That alias is not active'});
            }

            var retProfile = {
                alias: user.alias,
                fname: user.core_fname,
                lname: user.core_lname,
                email: user.core_email,
                fullAdmin: user.fullAdmin
            }
            
            //match password
            bcrypt.compare(req.body.core_pwd, user.core_pwd, (err, isMatch) => {
                if(err) throw err;

                if(isMatch) {
                    //res.json({logindata: user});
                    
                    jwt.sign({user: req.body.alias}, 'secretkey', {expiresIn: '30m'}, (err,token) => {
                        console.log(retProfile);
                        
                        res.json({
                            token: token,
                            profile: retProfile
                            
                        })
                    });

                } else {
                    res.json({message: 'Passwords do not match'});
                }
            });

        })
        .catch(err => console.log(err));
    } else {
        console.log("empty request body");
    }
    
        
        //res.send('pass');
})


mainRoutes.route('/add-app').post(function(req, res) {
    const goods = req.body;
    console.log(goods);

   ClientApp.upsert(req.body, 
    {
        where: {app_key: {[Op.like]: '%'+req.body.app_key+'%' }}
    }
    )
    .then(apps => {
        res.status(200).send({ message: apps })
    })
    
})

mainRoutes.route('/add-app').put(function(req, res) {
    const goods = req.body;
    console.log(goods);

   ClientApp.update(req.body, 
    {
        where: {app_key: {[Op.like]: '%'+req.body.app_key+'%' }}
    }
    )
    .then(apps => {
        res.status(200).send({ message: apps })
    })
    
})

///add financials

mainRoutes.route('/add-finance').post(function(req, res) {
    const goods = req.body;
    console.log(goods);

   AppFinance.upsert(req.body, 
    {
        where: {app_key: {[Op.like]: '%'+req.body.app_key+'%' }}
    }
    )
    .then(apps => {
        res.status(200).send({ message: apps })
    })
    
})

mainRoutes.route('/add-finance').put(function(req, res) {
    const goods = req.body;
    console.log(goods);

    AppFinance.update(req.body, 
    {
        where: {app_key: {[Op.like]: '%'+req.body.app_key+'%' }}
    }
    )
    .then(apps => {
        res.status(200).send({ message: apps })
    })
    
})



mainRoutes.route('/add-user').post(function(req, res) {
    var goods = req.body;
    console.log(goods);

    bcrypt.genSalt(10, (err, salt) => 
        bcrypt.hash(goods.core_pwd, salt, (err, hash) => {
            if(err) throw err;
            goods.core_pwd = hash;
            SystemUser.upsert(req.body)
                .then(apps => {
                    res.status(200).send({ message: apps })
                })
                .catch(err => {
                    res.status(400).send('new user add failed: '+err);
                });
        }))   
})

mainRoutes.route('/new-hash').put(function(req, res) {
    var goods = req.body;
    console.log(goods);

    bcrypt.genSalt(10, (err, salt) => 
        bcrypt.hash(goods.core_pwd, salt, (err, hash) => {
            if(err) throw err;
            goods.core_pwd = hash;
            console.log("post salt");
            console.log(goods);
            SystemUser.update(goods,
                {
                    where: {alias: {[Op.like]: '%'+goods.alias+'%' }}
                })
                .then(apps => {
                    res.status(200).send({ message: apps })
                })
                .catch(err => {
                    res.status(400).send('update user failed: '+err)
                })
        }))   
})

mainRoutes.route('/update-user/:id').put(function(req, res) {
    let userAlias = req.params.id;
    const goods = req.body;
    console.log(goods);

    SystemUser.update(req.body,
        {
            where: {alias: {[Op.like]: '%'+userAlias+'%' }}
        })
        .then(apps => {
            res.status(200).send({ message: apps })
        })
        .catch(err => {
            res.status(400).send('update user failed: '+err)
        })

})

app.use(cors());

if (process.env.NODE_ENV === "production") {
    app.use(express.static('creditapp/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'creditapp', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));