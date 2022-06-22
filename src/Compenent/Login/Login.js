import React,{useState} from 'react'
import "./login.css"
import {useNavigate} from "react-router-dom"
import {API_URL} from '../../config';
import toastr from 'toastr';
import "toastr/build/toastr.css";

const Login=()=>{
  const [sliderLogin,setSliderLogin]=useState(true);
  const [connexion,setConnexion]=useState({});
  const [inscrire,setInscrire]=useState({login_cnx:'',password_cnx:''});
  const [formdata]=useState(new FormData());
  const Navigate=useNavigate();
  const handlechangeConnxion=(e)=>{
    setConnexion({...connexion,[e.target.name]:e.target.value});
    
  }
  const handlechangeInscrire=(e)=>{
    const value=e.target.name==='photo'?e.target.files[0]:e.target.value;
    formdata.set(e.target.name,value);
    setInscrire({...inscrire,[e.target.name]:value});

  }
  const showSlide=()=>{setSliderLogin(!sliderLogin);console.log(sliderLogin)};
  const connexionAdmin=()=>{
    fetch(`${API_URL}/admin/connxion`,{
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify(connexion)
    }).then(res=>res.json())
    .then(res=>{
      if(res.err){
        toastr.warning(res.err,"Valider votre formumaire !!",{positionClass:"toast-bottom-right"});
// alert(res.err);
      }else{
        toastr.info("Connexion avec success !!","Bonjour",{positionClass:"toast-bottom-right"});
        localStorage.setItem('JWT_INFO',JSON.stringify(res));
        Navigate('/Dashbord');  
      }
    })
    .catch(err=>console.error(err));
  }
  const inscriptionAdmin=()=>{
    fetch(`${API_URL}/admin/inscription`,{
      method:"POST",
      headers:{
        "Accept":"application/json",
        // "Content-Type":"application/json"
      },
      body:formdata
    }).then(res=>res.json()).then(res=>{
      if(res.err){
        toastr.warning(res.err,"Valider Votre formulaire !!",{positionClass:"toast-bottom-right"});
      }else{
        console.log(res);
      }
    }).catch(err=>console.log(err));
  }
  return (
    <div>
        <div className="container_login">
            <div className="box_login">
                <center>
                <h1>Bonjour</h1>
              <div className="container_slider">
                  <div className="slider_images">
            <div className="img_login img1"></div>
            <div className="img_login img2"></div>
            <div className="img_login img3"></div>
            <div className="img_login img4"></div>
            <div className="img_login img5"></div>
            <div className="img_login img6"></div>

                  </div>
              </div>
                </center>
            </div>
            <div className="box_login">
                <center>
    <div className="contianer_loginForm">
      <div className={sliderLogin?'sliderloginForm signin' :'sliderloginForm signup' }>
        <div className="boxLoginForm">
          <center>
          <h1>Page de Connexion</h1>
          <br/>
            <table className='table_Login'>
              <tbody>
                <tr>
                  <td>Login :</td><td><input onChange={handlechangeConnxion} type="text" name="login_cnx" className="input_text" /></td>
                </tr>
                <tr>
                  <td>Mot de passe :</td><td><input onChange={handlechangeConnxion} type="text" name="password_cnx" className="input_text" /></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input type="button" onClick={connexionAdmin} value="Connexion" className="btn_input" /> &nbsp;
                    <input type="button" onClick={showSlide} value="Inscrire" className="btn_input" />  
                  </td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
        <div className="boxLoginForm">
        <center>
          <h1>Page de'Inscription</h1>
          <br/>
            <table className='table_Login'>
              <tbody>
              <tr>
                  <td>Image :</td><td><input  type="file" name="photo" onChange={handlechangeInscrire} /></td>
                </tr>
                <tr>
                  <td>Nom :</td><td><input onChange={handlechangeInscrire} type="text" name="nom" className="input_text" /></td>
                </tr>
                <tr>
                  <td>Prenom :</td><td><input onChange={handlechangeInscrire} type="text" name="prenom" className="input_text" /></td>
                </tr>

                <tr>
                  <td>Login :</td><td><input onChange={handlechangeInscrire} type="text" name="login" className="input_text" /></td>
                </tr>
                <tr>
                  <td>Mot de passe :</td><td><input onChange={handlechangeInscrire} type="text" name="pw" className="input_text" /></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input type="button"  onClick={inscriptionAdmin} value="Inscrire" className="btn_input" />  &nbsp;
                    <input type="button"onClick={showSlide} value="Connexion" className="btn_input" /> 
                  </td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
      </div>
    </div>
                 </center>
            </div>
        </div>
    </div>
  )
}

export default Login