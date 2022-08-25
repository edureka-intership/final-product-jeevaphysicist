import React,{useEffect,useState} from 'react';
import '../../styles/Filter.css';
import '../../styles/Restaurantdetails.css';
import Header from '../Header';
import {useParams,Link} from 'react-router-dom'

    
export default function Filter() {

      // state inizialition 
      const [restaurants,setRestaurants]=useState('');

      const [pagecount,setPagecount] = useState(0);

      const [currentpage,setCurrentpage] = useState(0);

      const [location,setLocation]=useState('');

      const [place,setPlace] = useState("");

      const [setp,setSetp] = useState(false);

      const {itemname} = useParams();
      let type = itemname.toLocaleLowerCase(); 


      const [filter,setFliter] = useState({
        city_id:'',
        cuisine:[],
        lcost:'',
        hcost:'',
        sort:1,
        Type:[type]
      });

     
      

      useEffect(()=>{
        fetch('http://localhost:8080/location',{method:'GET'})
        .then(response=>response.json())
        .then(data=>setLocation(data.data));
      },[])


      useEffect(()=>{
        console.log("cuurentpage",currentpage);
        fetch(`http://localhost:8080/zomato/filter/${currentpage}`,{method:'POST',
      headers:{"Content-Type":"application/json"},
       body:JSON.stringify(filter)
      }).then(response=>response.json())
      .then(data=>{setRestaurants(data.data);setPagecount(data.totalRecords/2)});

       
      },[filter,currentpage])


      //log part
     console.log("restaurant",restaurants,pagecount);
     console.log("location",location);

     //create location list 

     const locationlist = location.length && location.map((items,index)=><option key={index} value={items.city_id} >{items.name}</option>); 

     //create pagination list
     let paginationlist = [];

     for(let i=1;i<=pagecount;i++){
          paginationlist[i] =<span><a href='#' key={i} onClick={()=>setCurrentpage(i-1)}>{i}</a>&nbsp;</span> 
     }

  

     //handlelocation
     const handlelocation=(e)=>{
      filter.city_id=e.target.value;
      console.log("filter.city_id : ",e);
      setFliter({...filter});
      fetch(`http://localhost:8080/zomato/${e.target.value}`,{method:"GET"})
      .then(res=>res.json())
      .then(result=>{
        console.log("restaurants : ",result);
        setPlace(result.data[0].city_name);
        setSetp(true);
      })
     }

     
     //handle sort
     const handlesort =(sort)=>{
      filter.sort=sort;
      setFliter({...filter});
     }

     //handlecost
     const handlecost =(lcost,hcost)=>{
      filter.lcost = lcost;
      filter.hcost = hcost;
      setFliter({...filter});
     }

     //handlecuisine
     const handlecuisine =(e)=>{
      console.log('event',e);
      if(e.target.checked){
        filter.cuisine.push(e.target.name);
        console.log("name",e.target.name);
        
      }
      else{
        let index = filter.cuisine.indexOf(e.target.name) ;
        if(index > -1){
        filter.cuisine.splice(index,1);
        }
      }
      setFliter({...filter});
     }
     
 
  return (
    <div>
      <Header/>

      <div className="heading">{itemname} Places {setp ?<span style={{ color: "#192F60",fontSize: " 33px"}}> in {place}</span>   : ""} </div>
    <div className="filter">
        <p className="fi">Filters</p>
        <p className="fi1">Select Location</p>
        <select className="fi2" onChange={(e)=>handlelocation(e)} >
            <option selected disabled>  Select Location</option>
            {locationlist}
        </select>
         
        <p className="cus">Cuisine</p>
        <div className="radio">
        <input type="checkbox" style= {{ position: "absolute",top: "175px"}}className="cus1" name='North Indain' onChange={(e)=>handlecuisine(e)}/>
        <span id="a" style={{position: "absolute",top: "175px"}}>North Indian</span>

        <input type="checkbox" style= {{ position: "absolute",top: "207px"}}className="cus1" name='South Indian' onChange={(e)=>handlecuisine(e)}/>
        <span id="a" style={{position: "absolute",top: "207px"}}>South Indian</span>

        <input type="checkbox" style= {{ position: "absolute",top: "244px"}}className="cus1" name='Chinese' onChange={(e)=>handlecuisine(e)}/>
        <span id="a" style={{position: "absolute",top: "244px"}}>Chineese</span>

        <input type="checkbox" style= {{ position: "absolute",top: "276px"}}className="cus1" name='Fast Food' onChange={(e)=>handlecuisine(e)}/>
        <span id="a" style={{position: "absolute",top: "276px"}}>Fast Food</span>

        <input type="checkbox" style= {{ position: "absolute",top: "308px"}}className="cus1" name='Street Food'  onChange={(e)=>handlecuisine(e)}/>
        <span id="a" style={{position: "absolute",top: "308px"}}>Street Food</span>

        <div className="cost">Cost For Two</div>

        <input type="radio" name="co"  style={{position: "absolute",top: "384px"}}id="a1" onChange={()=>handlecost(0,500)}/>
        <div id="a" style={{position: 'absolute',top: '384px'}}>Less than ` 500</div>

        <input type="radio" name="co"  style={{position: "absolute",top: "416px"}}id="a1" onChange={()=>handlecost(500,1000)}/>
        <div id="a" style={{position: 'absolute',top: '416px'}}>` 500 to ` 1000</div>

        <input type="radio" name="co"  style={{position: "absolute",top: "448px"}}id="a1" onChange={()=>handlecost(1000,1500)}/>
        <div id="a" style={{position: 'absolute',top: '448px'}}>` 1000 to ` 1500</div>

        <input type="radio" name="co"  style={{position: "absolute",top: "480px"}}id="a1" onChange={()=>handlecost(1500,2000)}/>
        <div id="a" style={{position: 'absolute',top: '480px'}}>` 1500 to ` 2000</div>

        <input type="radio" name="co"  style={{position: "absolute",top: "512px"}}id="a1" onChange={()=>handlecost(2000,3500)}/>
        <div id="a" style={{position: 'absolute',top: '512px'}}>` 2000+</div>

        <div className="sort">Sort</div>

        <input type="radio" style={{position: 'absolute',top: '601px'}}id="a1"name="so" checked={filter.sort==1} onChange={()=>handlesort(1)}/>
        <div id="a" style={{position: 'absolute',top: "601px"}}>Price low to high</div>

        <input type="radio" style={{position: 'absolute',top: '633px'}}id="a1"name="so" checked={filter.sort==-1} onChange={()=>handlesort(-1)}/>
        <div id="a" style={{position: 'absolute',top: "633px"}}>Price high to low</div>
         </div>

      <div className='display'>
        {
          restaurants.length > 0 ? restaurants.map((items,index)=>
          <div className='card mt-4 ' key={index}>
            <Link to={`/filter/Drinks/Restaurantdetails/${items.name}`}>
        <img src={items.thumb} alt="not available" className="img1"/> 
          <p className="p3">{items.name}</p>
          <p className="p4">{items.locality}</p>
          <p className="p5">{items.address}</p>
          <hr className='h1'/>
          <p className="p1">CUISINES: <br/><br/>COST FOR TWO:</p> 
          <p className="p2 ">{items.Cuisine.length && items.Cuisine.map((items,index)=><div style={{display:"inline"}} key={index}>{items.name}&nbsp; &nbsp;</div>)}<br/><br/><div>{items.cost}</div> </p>   
          </Link>
    </div>):<div className='nodata'> no data found</div>
        }

       <br/><br/> 
     <div className='pagination'>
      <a href='#' >&lt;</a>&nbsp;
      {paginationlist}
      <a href='#'>&gt;</a>
     </div>        
       
 
      </div>
      </div>
       
        
    
    </div>
  )
}

   