const express = require('express');

const bodyparser = require('body-parser');

const cors = require('cors');
 

const mealtyperoutes =require('./routers/mealtyperoutes');
const rout =require('./routers/restaurantrouter');
const locationroutes =require('./routers/locationroutes');
const menuroutes =require('./routers/menuroutes');
const paymentroutes = require('./routers/paymentroutes');
const userroutes = require('./routers/userloginroutes');

const mongoose =require('mongoose');


const DBStiring ="mongodb://localhost:27017/zomato";

const PORT = process.env.PORT || 8080;
mongoose.connect(DBStiring,()=>{console.log("database connected successfully")},e=>console.log("Error 404 in database server",e));

const app =express();

app.use(cors());

app.use(bodyparser.json());

if(process.env.NODE_ENV == "production"){
    app.use(express.static("zomato/build"));
    const path =require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"zomato","build","index.html"))
    })
}


 


//middlewares
app.use('/restaurant',rout);

app.use('/mealtype',mealtyperoutes);

app.use('/location',locationroutes);

app.use('/menu',menuroutes);

app.use('/payment',paymentroutes);

app.use('/createaccount',userroutes);

app.use('/zomato',rout);











app.listen(PORT,()=>console.log(`server is running on the port : ${PORT}`));
