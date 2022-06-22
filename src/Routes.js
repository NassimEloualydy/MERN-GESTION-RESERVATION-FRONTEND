import React from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from "./Compenent/Login/Login";
import Dashbord from "./Compenent/Logement/Logement";
import PraviteRoute from "./Compenent/PraviteRoute"
import Person from './Compenent/Person/Person';
import Louer from './Compenent/Louer/Louer';
import Degat from './Compenent/Degat/Degat';
import FormulaireAdmin from "./Compenent/PageMatire/FormulaireAdmin"

const RoutesApp=()=> {
  return (
      <Router>
       <>
       <Routes>
         <Route element={<PraviteRoute/>}>
           <Route path="/Dashbord" element={<Dashbord/>}/>
         </Route>
         <Route element={<PraviteRoute/>}>
           <Route path="/Person" element={<Person/>}/>
         </Route>
         <Route  element={<PraviteRoute/>} >
          <Route path="/Louer" element={<Louer/>}/>
         </Route>
         <Route element={<PraviteRoute/>}>
          <Route path="/Degat" element={<Degat/>}/>
         </Route>
         <Route element={<PraviteRoute/>}>
          <Route path="/Compt" element={<FormulaireAdmin/>}/>
         </Route>

           <Route path="/Login" element={<Login/>}/>
       </Routes>
       </>    
      </Router>
  )
}

export default RoutesApp