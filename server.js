
var path = require('path');
var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var validateSignupForm = require('./client/server/routes/auth');

// mongoose.connect(MONGODB ADDRESS)

var router = express();


router.use(express.static(path.resolve(__dirname, 'client')));

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/auth/signup", (req,res) => {
    var validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            errors: validationResult.errors,
            message: validationResult.message
        })
    }
    
    return res.status(200).end();
})



router.get('*', function (request, response){
  response.sendfile(path.resolve(__dirname, 'client', 'index.html'));
});

router.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = "0.0.0.0";
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
