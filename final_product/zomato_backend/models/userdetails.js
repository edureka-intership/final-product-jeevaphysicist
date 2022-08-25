const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('UserData',UserSchema,'Users');