const Razorpay = require('razorpay');
const shortid = require('shortid');
const Transaction = require('../models/Transaction');
const crypto =require('crypto');

var instance = new Razorpay({ key_id: 'rzp_test_BsGSW4LpkffpL9',
                              key_secret: '0qEB17FzJM6xwv9DkRQ6aosV' });

exports.createoreder =async(req,res)=>{
     let options ={  amount: req.body.amount * 100,
                     currency: "INR", 
                     receipt: shortid.generate(), 
                     notes: { key1: "value3", 
                              key2: "value2"  }

     }

       try{
         let response = await instance.orders.create(options);
         console.log(response)
         res.json(response);
      }
      catch(error){
          console.log(error);
      }
       }



       exports.saveTransaction=(req,res)=>{
        console.log("save Transcation !!!! ");

        //create signature in backend for checking purpose
           const generatedsignature = crypto.createHmac('sha256',instance.key_secret) ;
           generatedsignature.update(req.body.razorpay_orderid+"|"+req.body.razorpay_paymentid) ;

        // compare frontend and backend signature
        if(req.body.razorpay_signature == generatedsignature.digest('hex')){
          console.log("create transcation object !!!!");
          console.log("req.body",req.body);
          let transaction ={
            Transaction_id :  req.body.razorpay_paymentid ,
            Transaction_amount  : req.body.razorpay_amount
            }; 

            console.log("transaction",transaction);
           
           Transaction.create(transaction).then(
            result=>{
              console.log("result",result);
                res.status(201).json({data:result})
            }
           )                                  
        }
       }