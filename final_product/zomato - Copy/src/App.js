import {Routes,Route} from "react-router-dom";
import Wallpaper from "./components/Wallpaper";
import Quicksearches from "./components/Quickseacrhes";
import Restaurantdetails from "./components/Restaurantdetails";
import Filter from "./components/filters/Filter";
//import Headers from "./components/logincreditional/Headers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div>
                                  <Wallpaper/>
                                  <Quicksearches/>
                                </div>}/>
         <Route path="/Restaurantdetails/:rname"  element={<Restaurantdetails/>} />
         <Route path="/filter/:itemname" element={<Filter/>} /> 
         <Route path="/filter/Drinks/Restaurantdetails/:rname" element={<Restaurantdetails/>}/>                   
      </Routes>
     
     
    </div>
  );
}

export default App;
