import React, { Component } from 'react';
import '../styles/Wallpaper.css';
import {Link} from 'react-router-dom';


export default class Wallpaper extends Component {

  constructor(){
    super();
    this.state ={
      location :[],
      restaurant:[],
      value :""
    };
  }

  fetchrestaurants = (event)=>{
   
    fetch(`http://localhost:8080/restaurant/${event.target.value}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({restaurant:data.data}));
  }
 
  componentDidMount(){
    fetch('http://localhost:8080/location',{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({location :data.data}));
  }


  render(){
      const locationlist = this.state.location.length && this.state.location.map(items=><option  key={items.name} value={items.city_id}>{items.name}</option>);
      

      const  restaurantlist = this.state.restaurant.length && this.state.restaurant
      .filter(post => {
       if (this.state.value === '') {
          return post;
        } else if (post.name.toLowerCase().includes(this.state.value.toLowerCase())) {
          return post;
        }
      })
      .map(items=><div className='box' key={items.name}>
        <Link className='link' to={`/Restaurantdetails/${items.name}`}>{items.name}</Link>
      </div>);
     
     
     
      return (
      <div>
        
          <div className="container-fluid">
            <div className="background">
            <div className='row'>
            <div className="col-2 col-md-6 col-lg-7 "></div>
            <div className="col-2  col-md-2 col-lg-2 text-end pt-4"><button className=" bg-transparent border-0 text-white">Login</button></div>
            <div className="col-8 col-md-4 col-lg-3 text-start pt-3"><button  className="p-2  border-1 border-white bg-transparent text-white">create an Account</button></div>
            </div>
              
     
    <div className="row pt-1 mx-auto text-start">
        <div className=" col-lg-5 col-md-5 col-4 "></div>
         <div className=" col-lg-7 col-md-7 col-8">
        <p className=" logo px-4 py-2 px-md-4 py-md-2 text-center">e!</p>
        </div>
    </div> 
    
   
    <div className="row  text-center ">
        <div className="col-12 "><p className='he'>Find the best restaurants, cafés, and bars</p></div>
    </div>
    
         
        <div className="row mx-auto">
             <div className="col-lg-2 col-sm-12 col-12 col-md-1 col-xl-2"></div> 
            <div className=" col-sm-12 col-12 col-lg-3 col-md-4 col-xl-3 pt-4 text-end"> 
                <select className="drop" onChange={this.fetchrestaurants}>
                    <option  value='0' selected disabled>Select Location</option>
                    {locationlist}
                </select>
             </div>
             
             <div className=" resturant col-lg-5 col-sm-12 col-12 col-md-6 col-xl-5 pt-4  text-start">
             
              <input className='search' placeholder='search for restaurant' onChange={event =>{this.setState({value : event.target.value})}} />
               {restaurantlist} 
        </div>
       
             <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
 </div>    
             </div>
             
             </div>
         
           
           
          
   






</div>
 );
  }
}
