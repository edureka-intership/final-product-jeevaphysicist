const UserData = require("../models/userdetails");


exports.SignUp = (req,res)=>{
    let {email,password,FirstName,LastName}= req.body;
    let filter;

    let userobject = new UserData({
        email:email,
        password:password,
        FirstName:FirstName,
        LastName:LastName
    });

    console.log("userobject",userobject); 

   
    filter={email:email,password:password};


    

    console.log(filter);

    UserData.find(filter).then((result)=>{
        console.log("result.length",result.length);
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
    })
}





exports.Login =(req,res)=>{
    let {email,password} = req.body;

    let filter={email:email,password:password};
    UserData.find(filter).then((result)=>{
        if(result.length >0 ){
               res.status(200).json({
                message:"user login successfully",
                isLoggedIn:true,
                UserData:result
               })
        }
        else{
            res.status(200).json({
                message:"Either Email Or Password Wrong",
                isLoggedIn:false
            })
        }
    })
}