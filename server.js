var http = require("http");
var path = require('path');
var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var validateSignupForm = require('./server/routes/auth');

const passport = require("passport");
const config = require("./config");

require("./server/models").connect(config.dbUri);

// mongoose.connect(MONGODB ADDRESS)

var app = express();
app.use(express.static(path.resolve(__dirname, 'client')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

// passport strategies
const localSignupStrategy = require("./server/passport/local-signup");
const localLoginStrategy = require("./server/passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

// authentication check middleware

/**
 * so these routes, and probably this middleware, need to be inline to work
 **/
 
const authCheckMiddleware = require("./server/middleware/auth-check");
app.use("/api", authCheckMiddleware);

/**
 * Inline auth routes
 **/

const validator = require('./server/middleware/validation.js');

app.post("/auth/signup", (req, res, next) => {
    const validationResult = validator.validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }
    
    return passport.authenticate("local-signup", (err) => {
        if (err) {
            if (err.name === "MongoError" && err.code === 11000) {
                // the 11000 mongo code is for a duplication email err
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: "Check the form for errors",
                    errors: {
                        email: "This email is already taken."
                    }
                });
            }
            
            return res.status(400).json({
                success: false,
                message: "Could not process the form."
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "You have successfully signed up! Now you should be able to log in"
        });
    })(req, res, next);
});


app.post("/auth/login", (req, res, next) => {
    const validationResult = validator.validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    
    return passport.authenticate("local-login", (err, token, userData) => {
        if (err) {
            if (err.name === "IncorrectCredentialsError") {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            
            return res.status(400).json({
                success: false,
                message: "Could not process the form."
            });
        }
        
        return res.json({
            success: true,
            message: "You have successfully logged in!",
            token,
            user: userData
        });
    })(req, res, next);
});

/**
 * API routes here
 * 
 * GET ALL cardsets for USER
 * 
 * GET one CARDSET for USER
 * 
 * POST one CARDSET for USER
 * 
 **/

app.get("/api/users/:user", (req, res) => {
    console.log(req.params)
    res.status(200).json({
        message: req.params.user
    });
});


app.get('/*', function (request, response){
  console.log("star path");
  response.sendfile(path.resolve(__dirname, 'client', 'index.html'));
});


var server = http.createServer(app);
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = "0.0.0.0";
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
