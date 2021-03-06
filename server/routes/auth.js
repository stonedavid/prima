const express = require("express");
const validator = require('validator');
const passport = require("passport");

const router = new express.Router();

function validateSignupForm(payload) { 
    var errors = {};
    var isFormValid = true;
    var message = "";
    
    if (!payload || typeof payload.email !== "string" || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = "Please provide a correct email address";
    }
    
    if (!payload || typeof payload.password !== "string" || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters";
    }
    
    if (!payload || typeof payload.name !== "string" || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.userName = "Please provide your name";
    }
    
    if (!isFormValid) {
        message = "Check the form for errors";
    }
    
    return {
        success: isFormValid,
        errors,
        message
    };
}

/**
 * Validate the login form
 * 
 * @param {object} payload - the HTTP body message
 * @return {object} The validation result, with error tips
 *
 **/

function validateLoginForm(payload) {
    const errors = {};
    var isFormValid = true;
    var message = "";
    
    if (
        !payload 
        || typeof payload.email !== "string" 
        || payload.email.trim().length === 0
        ) {
            isFormValid = false;
            errors.email = "Please provide your email address.";
        }
        
    if (
        !payload 
        || typeof payload.password !== "string"
        || payload.password.trim().length === 0) {
            isFormValid = false;
            errors.password = "Please provide your password";
        }
        
    if (!isFormValid) {
        message = "Check the form for errors.";
    }
    
    return {
        success: isFormValid,
        message,
        errors
    };
}

router.get("/", (req,res) => {
    console.log("get connected");
    return res.end("hello");
});

router.post("/signup", (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
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


router.post("/", (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
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
            userData
        });
    })(req, res, next);
});

module.exports = router;