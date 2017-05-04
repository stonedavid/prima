// from:
// https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const curriculum = require("../data/defaultCurriculum.js");
const generateCards = require("../data/generateCards.js").generateCardSet;

var cards = generateCards(24,96,["#","b"],["w","h","q","8","16"]);

// define the User model schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    name: String,
    curriculum: {
        lessons: { type: Object, default: curriculum },
        cards: { type: Object, default: cards } 
    },
    xpHistory: { type: Array, default: [] },
    totalXp: { type: Number, default: 0 }
});


/**
 * Compare password with database
 * 
 * @param {string} password
 * @returns {object} callback
 **/
 
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method
 **/
UserSchema.pre("save", function saveHook(next) {
    const user = this;
    
    // proceed further only if the password is modified or the user is new
    if (!user.isModified("password")) { 
        console.log("saving user data...");
        console.log("CURRICULUM MODIFIED?",user.isModified("curriculum"));
        return next(); 
    }
    
    return bcrypt.genSalt( (saltError, salt) => {
        if (saltError) { return next(saltError); }
        
        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }
            
            // replace a password string with hash value
            user.password = hash;
            
            return next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);