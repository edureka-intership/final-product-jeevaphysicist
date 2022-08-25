const mongoose = require('mongoose');

const schema = mongoose.Schema({
               
             name:{
                type:String,
                required:true
             },
             
    locality:{
                type:String,
                required:true
             },
             city_name:{
                type:String,
                required:true
             },
             city:{
                type:Number,
                required:true
             },
             
            area:{
                type:Number,
                required:true
             },
             
      address:{
                type:String,
                required:true
             },
             
          thumb:{
                type:String,
                required:true
             },
             
         cost:{
                type:Number,
                required:true
             },
             
         contact_number:{
                type:Number,
                required:true
             },
             
        type:{
                type:Array,
                required:true
             },
             
         Cuisine:{
                type:Array,
                required:true
             }

});





module.exports= mongoose.model('Restaurant',schema,'restarant')