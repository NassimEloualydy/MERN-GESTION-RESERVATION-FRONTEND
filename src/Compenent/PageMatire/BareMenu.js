import React,{useState} from 'react'
import { ImHome3,ImUsers,ImKey2,ImWarning,ImUserTie,ImExit,ImBin,ImPencil,ImNotification } from "react-icons/im";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../config";
import "../Logement/Logement.css"
import toastr from 'toastr';
import "toastr/build/toastr.css";
function BareMenu(props){
    const [menu,setMenu]=useState(true);
    const hideMenu=()=>{
        props.HideBareMenu();
    };
    const Navigate=useNavigate();
    const Quitter=()=>{
        setMenu(true);
        fetch(`${API_URL}/admin/quitter`,
        {
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json"
            }
            
        }
        ).then(res=>res.json())
        .then(res=>{
          toastr.info("Quitter avec succes","au revoire !!",{positionClass:"toast-bottom-right"});
          localStorage.removeItem('JWT_INFO');
            console.log(res);
            Navigate('/Login');
        }).catch(err=>console.log(err));
    }
    const linkMenu=(url)=>{
        Navigate(url);
    }
  return (
    <center>
   
        <h1>Dashbord</h1>
        <br></br>
        <div onClick={hideMenu && linkMenu.bind(this,"/Dashbord")} className="input_btn_menu" >
            <div className="menu_icon"><ImHome3/></div>
            <div className="menu_desc">Logement</div>
        </div>
        <br/>
        <div onClick={hideMenu && linkMenu.bind(this,"/Person")} className="input_btn_menu">
            <div className="menu_icon"><ImUsers/></div>
            <div className="menu_desc">Person</div>
        </div>
        <br/>
        <div onClick={hideMenu && linkMenu.bind(this,"/Louer")} className="input_btn_menu">
            <div className="menu_icon"><ImKey2/></div>
            <div className="menu_desc">louer</div>
        </div>
        <br/>
        <div onClick={hideMenu && linkMenu.bind(this,"/Degat")} className="input_btn_menu">
            <div className="menu_icon"><ImWarning/></div>
            <div className="menu_desc">Degats</div>
        </div>
        <br/>
        <div onClick={hideMenu && linkMenu.bind(this,"/Compt")} className="input_btn_menu">
            <div className="menu_icon"><ImUserTie/></div>
            <div className="menu_desc">Votre Compte</div>
        </div>
        <br/>
        <div onClick={Quitter} className="input_btn_menu">
            <div className="menu_icon"><ImExit/></div>
            <div className="menu_desc">Quitter</div>
        </div>
</center>
)
}

export default BareMenu