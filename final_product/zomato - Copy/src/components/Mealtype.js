import React from 'react';
import {Link} from "react-router-dom";
import '../styles/Wallpaper.css';



export default function Mealtype(props) {
  return (
    
        <div className='col-12 col-sm-12 col-md-6 col-lg-5 mx-auto col-xl-4'>
               <Link to ={`/filter/${props.items.name}`} className="mealtype">
              <div className="card p-0 my-3 mx-auto " >
              <div className="row">
                  <div className="col-6 p-0 mx-0 ">
             <img src={require('../'+props.items.image)} className="card-img px-0 py-0" alt="not-available" download/></div>
           <div className="col-6 px-3 py-3">
              <div className="card-title">{props.items.name}</div>
              <div className="card-description">{props.items.content}</div>
           </div>
              </div>
              </div>
              </Link>
        </div>
        
    
  )
}



