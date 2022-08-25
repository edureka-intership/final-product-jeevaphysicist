const   LOCATION =require('../models/locationmodel');


exports.listoflocations = (req,res)=>{

    LOCATION.find().then(
        result=>{
            res.status(200).json({
                message:"locations are fetced sucessfully",
                data:result
    })
        }
    )
    .catch(error=>{
        res.status(500).json({message:"error in database",
         error:error})
    }) 
}