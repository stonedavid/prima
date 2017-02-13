var validator = require('validator');

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

module.exports = validateSignupForm;