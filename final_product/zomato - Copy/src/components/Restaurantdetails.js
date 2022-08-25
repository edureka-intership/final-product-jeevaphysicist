import React ,{useState,useEffect} from 'react';

import '../styles/Restaurantdetails.css';

import {useParams} from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

import Modal from 'react-modal';

import Header from "./Header"


Modal.setAppElement('#root');



export default function Restaurantdetails() {

      // state initalization
       const [restaurant,setRestaurant] = useState({});
     
       const [isopenmenumodal,setIsopenmenumodal] = useState(false);

       const [menu,setMenu] = useState([]);

       const [totalprice,setTotalprice] = useState(0);

       const [i1,setI] =useState([]);

      
       
       

      //  use params from link

         let {rname}=useParams();

    //  call API 
      const fetchmenu = ()=>{
                              fetch(`http://localhost:8080/menu/${rname}`,{method:'GET'})
                              .then(response=>response.json())
                              .then(value =>setMenu(value.data));
                             
                              console.log("menu",menu.length);
                            }
                           
                         

     useEffect(()=>{
                   fetch(`http://localhost:8080/restaurant/details/${rname}`,{method:'GET'})
                  .then(response=>response.json())
                  .then(output=>setRestaurant(output.data));
                  },[]);

      // logic functions 

      const clactotalprice=(item,value,index)=>{
                                   
                                   i1.splice(index,1,value+1);
                                   console.log(index);
                                   let price = totalprice + item.itemPrice;
                                   setTotalprice(price);
                                   
                                   
           
                                   }
           
           
      const remainingprice =(item,value,index)=>{
        if(value>0){
        i1.splice(index,1,value-1);
        let price =totalprice - item.itemPrice;
        setTotalprice(price);
        }   
      }  

     useEffect(()=>{
      for(let i=0 ; i< menu.length;i++){
        console.log(" set elements" );
        let give =0;
          i1.push(give);
        
      }
     },[menu])
         
        
       
      
      console.log("i1:",i1[2]);
      
      

      const loadscript = (rzscript)=>{
        return new Promise((resolve)=>{
                                      let script =document.createElement('script');
                                      script.src = rzscript;
                                      script.onload = ()=>{
                                                          openrazerpay(); 
                                                          resolve(true)
                                                          }
                                      script.onerror=()=>{
                                                         resolve(false)
                                                         }
                                     document.body.appendChild(script);
                                     });
                                  }

      const openrazerpay = async()=>{

        try{
           let orderData;
           orderData = await fetch(`http://localhost:8080/payment`,{method:'POST',
           headers :{'Content-Type' : 'application/json'},
           body:JSON.stringify({amount:totalprice}) })
           .then(response=>response.json());

        const options={
                      key :"rzp_test_BsGSW4LpkffpL9",
                      amount: orderData.amount,
                      order_id: orderData.id,
                      curreny:orderData.curreny,
                      name : "Zomato food delivery App ",

                      prefill:{
                              email:"history@gmail.com",
                              contact:"677-875-9456"
                              },
                      handler:function(response){
                        console.log('response : ',response.razorpay_order_id);
                        fetch("http://localhost:8080/payment/savetransaction",{method:'POST',
                                                                      headers:{"Content-Type":"application/json"},
                                                                       body:JSON.stringify({
                                                                        razorpay_orderid: response.razorpay_order_id,
                                                                        razorpay_paymentid : response.razorpay_payment_id,
                                                                        razorpay_signature: response.razorpay_signature ,
                                                                       razorpay_amount:orderData.amount                            
                                                                      })
                                                                    }).then(response=>response.json())
                                                                     .then(data=>console.log(data));
                      }        




    //                  
                     }
        const paymentWindow = new window.Razorpay(options);
        paymentWindow.open()
        }
        catch(error){
                    console.log(error);
                    }

      }

    console.log("menu",menu);
  const{name,thumb,cost,address,Cuisine} = restaurant ;
  const cuisinelist = !(Cuisine == undefined) && Cuisine.length && <ul>
                                                                       {
                                                                       Cuisine.map(items=><li key={items.name}>{items.name}</li>)
                                                                       }
                                                                       </ul>

    
  return (
    <div>
        {/* logo part of the page  */}

  
    <Header />

    {/* image displaying part  */}
    
      <div className="row ">
            <img src={thumb} alt="title" className="col-12 mx-auto image"/>
      </div>
     <hr/> 

      <div className='container '>
        <span className='about'>{name}</span>
        <button className='btn btn-success btn-block' style={{float:'right'}} onClick={()=>{fetchmenu();setIsopenmenumodal(true) }}>Place Online Order</button>
      
      </div><br/>
   
   {/* dispaly tabs */}

      <div className='container'>
      <Tabs>
    <TabList>
      <Tab>Overview</Tab>
      <Tab>contact</Tab>
    </TabList>

    <TabPanel>
     <div className='about'>About the page</div>
     <div className='head'>Cuisine
     {cuisinelist}
     </div>
     <div className='head'>Average cost</div>
     <div className='value'>&#8377; {cost}</div>
    </TabPanel>
    <TabPanel>
     <div className='head'>phone no </div>
     <div>+91-1234567890</div>
     <div className='head'>{name}</div>
     <div className='value'>{address}</div>
    </TabPanel>
  </Tabs>
      </div>

      {/* Modals */}
    {/* menu modal */}
      <Modal isOpen = {isopenmenumodal}
      
       >
       
        <div className='bg'>
        <span>Menu items</span>
        <button className='btn btn-danger btn-block btn-close' style={{float:'right'}} onClick={()=>{setIsopenmenumodal(false)}}></button>
        </div>
        <div className='bg'>
          <ul type="none">
            {
               
              menu.length && 
              menu.map((item,index)=>
                <li key={index}>
                  <div className='card '>
                   <div>
                    {item.isVeg ? <span className='text-success'>item{item.itemName}</span> : <span className='text-danger'>{item.itemName}<br/></span>}
                   </div>
                   <div>{item.itemPrice}</div>
                   <div style={{fontSize:"15px",color:"lightblue"}}>{item.itemDescription}</div>
                   { i1[index] > 0? <div className='inline'>
                        <button className='ind btn' onClick={()=>remainingprice(item,i1[index],index)}>-</button>
                        <span className='itemcount' >{i1[index]}</span>
                        <button className='ind' onClick={()=>clactotalprice(item,i1[index],index)}>+</button>
                     </div>:
                     <button className='btn btn-success btn-block' onClick={()=>clactotalprice(item,i1[index],index)}>Add</button>}                   
                    
                   </div>
                   <hr/>
                </li>
              )
            }
          </ul>
        </div>
        <hr/>
        <div>
          <h1>
            Totalprice : {totalprice}
               <button className='btn btn-danger btn-block ' style={{float:'right'}} onClick={()=>{setIsopenmenumodal(false); loadscript('https://checkout.razorpay.com/v1/checkout.js')}}>Pay Now</button>
          </h1>
        </div>
      </Modal>

   
     
  </div>
  )
}
