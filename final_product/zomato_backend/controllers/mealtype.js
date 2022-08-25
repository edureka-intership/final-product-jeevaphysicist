const   MEALTYPE =require('../models/mealtypemodel');


exports.listofmealtypes = (req,res)=>{

    MEALTYPE.find().then(
        result=>{
            res.status(200).json({
                message:"mealtypes is fetced sucessfully",
                data:result
    })
        }
    )
    .catch(error=>{
        res.status(500).json({message:"error in database",
         error:error})
    }) 
}
