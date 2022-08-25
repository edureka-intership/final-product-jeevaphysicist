const Restaurant = require('../models/restaurantmodel');

exports.listofrestaurants = (req,res)=>{

    Restaurant.find().then(
        result=>{
            res.status(200).json({
                message:"Api is fetced sucessfully",
                data:result
    })
        }
    )
    .catch(error=>{
        res.status(500).json({message:"error in database",
         error:error})
    }) 
}



exports.listonlycityid = (req,res)=>{
    let filter = {city:req.params.city};
    Restaurant.find(filter).then(result=>{
        res.status(200).json(
            {
                message:" restarant collection connected sucessfully",
                data:result
            }
        );
    }
    )
    .catch(error=>{
        res.status(500).json({
            message:"something went worng in database connection",
            error:error
        }); 
        });  
}



exports.listonlyname = (req,res)=>{
    let filter = {name:req.params.rname};
    Restaurant.findOne(filter).then(result=>{
        res.status(200).json(
            {
                message:" restarant collection connected sucessfully",
                data:result
            }
        );
    }
    )
    .catch(error=>{
        res.status(500).json({
            message:"something went worng in database connection",
            error:error
        }); 
        });  
}







exports.listitems=(req,res)=>{
    Restaurant.find().then((result)=>
    res.status(200).json({
        message : "Api is succussfully conncted",
        data: result
    })
    )
    .catch(error=>
        res.status(500).json(
            {
                message :"server error",
                error:error
            }
        ))
}



exports.filter=(req,res)=>{
       
          let filter={};
          
          if(req.body.city_id)
          {
            filter.city = req.body.city_id ;
          }
          console.log('fillter:',filter);
          if(req.body.cuisine && req.body.cuisine.length > 0)
          {            
            filter["Cuisine.name"]={$in:req.body.cuisine }
          }
          if(req.body.Type && req.body.Type.length > 0)
          {            
            filter["type.name"]={$in:req.body.Type }
          }

console.log('hcost',req.body.hcost);
        if(req.body.lcost && req.body.hcost)
        {
            filter.cost = {$lt: req.body.hcost,$gt:req.body.lcost};
        }
       
        else{
            if(req.body.lcost == 0)
            if(req.body.hcost){
                filter.cost ={$lte :req.body.hcost}
                } 
        }

        let sort = 1;
        if(req.body.sort){
            sort = req.body.sort;
        }
        
   



         

        console.log("filter",filter,"sort :",sort);

    Restaurant.find(filter).sort({"cost":sort}).limit(2).skip(2*req.params.pageNo).then((result)=>{
          Restaurant.find(filter).count((err,count)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).json({
                    message:"API fetched successfully",
                    data: result,
                    totalRecords:count
                })
            }

          })
        
    })
    .catch(error=>{
        res.status(500).json({
            messsage :"server error",
            error:error
        })
    })
}