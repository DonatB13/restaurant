if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

    // include express
    const express = require('express')

    //express app
    const app = express()
    const flash = require('express-flash')
    const session = require('express-session')

    // Passport Config
    const passport = require('passport')
    require('./config/passport')(passport);

    // password encryption
    const bcrypt = require('bcrypt')

    //method override
    const methodOverride = require('method-override')

    //mongoose
    const mongoose = require('mongoose');
    const Account = require('./models/account')
    const Item = require('./models/item')

    // connect to mongoDB
    const dbURL = 'mongodb+srv://mongoUser:6q1p4nsdbru44Y2N@hamburger.1k0rv.mongodb.net/hamburgerDB?retryWrites=true&w=majority';
    mongoose.connect(dbURL)
        // only listen to requests from user when database connection has been established
        .then((result) =>   {app.listen(3000);      console.log("connected to db")}
        )
        .catch((err) => console.log(err));
    
    // Static files
    app.use(express.static('public'))
  
    // register view engine
    app.set('view-engine', 'ejs')

    //additional middlewares
    app.use(express.urlencoded({ extended: false }))
    app.use(flash())
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride('_method'))

    // index page
    app.get('/', (req, res) => {
        if(req.isAuthenticated())
        {
            console.log('logged in')
            Item.find({}, function(err, items) {
                res.render('index.ejs', {items: items, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, address: req.user.address, phoneNumber: req.user.phoneNumber})
            });
        }
        else
        {
            Item.find({}, function(err, items) {
                res.render('index.ejs', {items: items});
             });
        }

    })

    app.post('/changeAddress', async (req, res) => {
        let query = {'email': req.body.email};

        Account.findOneAndUpdate(query, { address: req.body.newAddress }, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            console.log('success')
        });
        res.redirect('/')
    });

    app.post('/changePhoneNumber', async (req, res) => {
        let query = {'email': req.body.email};

        Account.findOneAndUpdate(query, { phoneNumber: req.body.newPhoneNumber }, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            console.log('success')
        });
        res.redirect('/')
    });

    // Login
    app.post('/login', (req, res, next) => {
        console.log('login')
        passport.authenticate('local', {
        failureFlash: true,
        successRedirect: '/'
        })
        (req, res, next);
    });

    // Register

    app.post('/register', checkNotAuthenticated, async (req, res) => {
        try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const account = new Account({
            email: req.body.signupEmail,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber
        });

        account.save()
            .then((result) => {
                console.log('[DEBUG]: Successful registration')
            })
            .catch((err) => {
                console.log(err);
            });
        res.redirect('/')
        } catch {
            res.redirect('/')
        }
        });
  
    app.delete('/logout', (req, res) => {
        req.logOut()
        res.redirect('/')
    })
    
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
        return next()
        }
    
        res.redirect('/login')
    }
    
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
        return res.redirect('/')
        }
        next()
    }