import React,{useEffect, useState} from 'react'
import "../Logement/Logement.css"
import {API_URL} from '../../config';
import { ImBin,ImPencil,ImNotification } from "react-icons/im";
import toastr from 'toastr';
import "toastr/build/toastr.css";
import {useNavigate} from "react-router-dom";
import BareMenu from '../PageMatire/BareMenu';
import BarUp from "../PageMatire/BarUp"

const FormulaireAdmin=()=> {
  const [menu,setMenu]=useState(true);
  const [formulaire,setFormulaire]=useState(true);
  const Navigate=useNavigate();
  const show_formulaire=()=>{setFormulaire(false)};
  const showHideMenu=()=>{setMenu(!menu)};
  const hideFormulaire=()=>{setFormulaire(true)};
  const hideMenu=()=>{setMenu(true)};
  const [admin,setAdmin]=useState({});
  const [formdata,setFormdata]=useState(new FormData());
  const handleChnage=(e)=>{
    const value=e.target.name=="photo"?e.target.files[0]:e.target.value;
    formdata.set([e.target.name],value);
    setAdmin({...admin,[e.target.name]:e.target.value});
  }
  useEffect(()=>{
    const {admin}=JSON.parse(localStorage.getItem('JWT_INFO'));
    fetch(`${API_URL}/admin/getAdmin`,{
      method: 'POST',
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(admin)
        }).then(res=>res.json()).then(res=>{
          setAdmin({_id:res.a._id,nom:res.a.nom,prenom:res.a.prenom,login:res.a.login,pw:""})
          formdata.set("nom",res.a.nom);
          formdata.set("prenom",res.a.prenom);
          formdata.set("login",res.a.login);
          formdata.set("pw","");
        }).catch(err=>console.log(err));
  },[])
  const updateAdmin=()=>{
    fetch(`${API_URL}/admin/updateAdmin/${admin._id}`,{
      method: 'POST',
      headers:{
        "Accept":"application/json"
        // "Content-Type":"application/json"
      },
      body:formdata
    }).then(res=>res.json()).then(res=>{
      if(res.err){
        toastr.warning(`${res.err}`,"Operation invalide !!",{positionClass:"toast-bottom-right"});
      }
      else{
        toastr.success(`Moddifier avec succes`,"Operation Valide",{positionClass:"toast-bottom-right"})
        localStorage.setItem('JWT_INFO',JSON.stringify(res));
        window.location.reload();
      }
    }).catch(err=>console.log(err))
  }
  return (
    <div>
    <div className="dashbord">
        <div className={menu?'menu':'menu_show'}>
          <BareMenu HideBareMenu={hideMenu}/>
        </div>
        <div className={formulaire? "formulaire" :"show_formulaire"}>
            <center>
                <h4>Formulaire Logement</h4>
                <br/>
            <input type="file" name=""  id="photo_logment"   /><br/><br/>
            <input type="text"  name=""  id="libelle_logment" placeholder='libelle' className="input_formulaire"/><br/><br/>
            <input type="button" value="Moddifier"  style={{borderColor:"white"}} className="btn_input"/>  &nbsp;
            <input type="button" value="Annuler"  style={{borderColor:"white"}} className="btn_input"/>  

            </center>
        </div>
        {/* from here */}
        {/* to herer */}
        <div className="item">
            <center>
                       <BarUp showHideMenu={showHideMenu}/>
                <div className="test"></div>
                <div className="container_up">
                <div className="FormulaireAdmin">
                  <center>
                    <h3>Formulaire Admin</h3>
                  </center>
                  <div className="inputField">
                       <div>Photo :</div>
                       <input type="file"  name="photo"   onChange={handleChnage}  className="inputAdmin" />
                  </div>
                  <br/>
                  <div className="inputField">
                       <div>Nom :</div>
                         <input type="text"   value={admin.nom} onChange={handleChnage}   name="nom"  className="input_text inputAdmin" />
                  </div>
                  <br/>
                  <div className="inputField">
                         <div>Prenom :</div>
                         <input type="text"  value={admin.prenom}  onChange={handleChnage}  name="prenom"    className="input_text inputAdmin" />
                  </div>
                  <br/>
                  <div className="inputField">
                         <div>Login :</div>
                         <input type="text"   value={admin.login} onChange={handleChnage}   name="login"  className="input_text inputAdmin" />
                  </div>
                  <br/>
                  <div className="inputField">
                         <div>Mot de passe :</div>
                         <input type="text"  name="pw" onChange={handleChnage}   className="input_text inputAdmin" />
                  </div>
                  <br/>
                  <center>
                  <input type="button" value="Moddifier" onClick={updateAdmin} className="btn_input" />          
                  </center>
                    {/* <br/>
                    <div className="item_chart">Totale</div><br/>
                    <div className="item_chart">count ville distinct</div><br/>
                    <div className="item_chart"></div><br/>
                    <div className="item_chart"></div> */}
                </div>
                
                <br/>

                </div>
                <br/>
                 <br/>
            </center>
       </div>
    </div>
    </div>
  )
}

export default FormulaireAdmin