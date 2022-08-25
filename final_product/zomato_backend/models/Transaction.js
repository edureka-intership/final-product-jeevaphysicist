const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    Transaction_id :{
                    type:String,
                     required:true
                    },
    Transaction_amount :{
                     type:Number,
                     required:true
                     }

});


module.exports=mongoose.model('transaction',transactionSchema,'Transaction')