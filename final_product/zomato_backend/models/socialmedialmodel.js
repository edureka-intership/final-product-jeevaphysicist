const mongoose  = require("mongoose");

const socialuserschema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    FullName:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model("Socialusers",socialuserschema,"socialuser")

 