const socialusermodels = require('../models/socialmedialmodel');

exports.socilMediaSignUp = (req,res)=>{

    console.log("req.body",req.body)

    const {email,ID,FullName}=req.body;
    const userobject = new socialusermodels({
        email:email,
        userId :ID,
        FullName:FullName        
    })
    let filter ={email:email,userId:ID};
         
    socialusermodels.find(filter).then((result=>{
         if(result.length > 0){
            res.status(200).json({
                message:"Already Exist Continue Login"

            })
         }
         else{
            userobject.save().then(result=>{
                res.status(200).json({
                    message:"Successfully Registered",
                    UserData:result
                })
              })
            .catch((err)=>{
                res.status(500).json({
                    message:"data fetched failed",
                    Error:err
                });
            })

        }
    }))
}


exports.socilMediaLogin = (req,res)=>{

    console.log("req.body",req.body)

    const {email,ID} = req.body;
    
    let filter ={email:email,userId:ID};
         
    socialusermodels.find(filter).then((result=>{
         if(result.length > 0){
            res.status(200).json({
                message:"User Successfully login",
                UserData:result,
                isloggedIn:true
            })
         }
         else{       
            res.status(200).json({
                message:"login failed",
                isloggedIn:true
            })
        }
    }))
}