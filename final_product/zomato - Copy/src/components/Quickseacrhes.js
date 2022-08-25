import React, { Component } from 'react';
import Mealtype from './Mealtype';
import '../styles/Wallpaper.css';
import { Link } from 'react-router-dom';



export default class Quickseacrhes extends Component {
  constructor(){
    super();
    this.state={
      mealtypes : []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:8080/mealtype`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({mealtypes:data.data}));
  }

  render() {
    const mealtypeslist = this.state.mealtypes.length && this.state.mealtypes.map(items=><Mealtype key={items.name} items={items}></Mealtype>)
    return (
      <div>
         <div className="container">
      <div className=" row pt-5">
        <p className="col-12 quick text-start">Quick Searches</p>
       </div>
      
       <div className="row">
           <p className="col-12 col-lg-12 text-start " style={{color:"#8C96AB",fontSize:"26px"}}>Discover restaurants by type of meal</p>
      </div>  

      <div className="row text-center">
          
       {mealtypeslist}
  
  </div>
             
  </div>
  
     
     </div>
    )
  }
}
