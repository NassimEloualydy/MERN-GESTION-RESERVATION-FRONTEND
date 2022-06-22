import React,{useEffect, useState} from 'react'
import "../Logement/Logement.css"
import {API_URL} from '../../config';
import { ImBin,ImPencil,ImNotification } from "react-icons/im";
import toastr from 'toastr';
import "toastr/build/toastr.css";
import {useNavigate} from "react-router-dom";
import {Bar,Doughnut,Bubble} from "react-chartjs-2";
import BareMenu from '../PageMatire/BareMenu';
import BarUp from "../PageMatire/BarUp"
import moment from "moment";

const Degat=()=> {
    const [menu,setMenu]=useState(true);
    const [formulaire,setFormulaire]=useState(true);
    const [logementDetailCart,setLogementDetailCart]=useState(true);
    const Navigate=useNavigate();
    const show_formulaire=()=>{setFormulaire(false)};
    const showHideMenu=()=>{setMenu(!menu)};
    const [degats,setDegats]=useState([]);
    const hideFormulaire=()=>{setFormulaire(true);setDegat({
        cin:"",
        libelle:"",
        dateDegat:"",
        description:"",
        coutEstimer:""
    })
    setSubmitInput("Ajouter");
};
    const [degat,setDegat]=useState({
                        cin:"",
                        libelle:"",
                        dateDegat:"",
                        description:"",
                        coutEstimer:""
    })
    const [submitInput,setSubmitInput]=useState("Ajouter");
    const [idDegat,setIdDegat]=useState("");
    const hideMenu=()=>{setMenu(true)};
    const hideCartDetail=()=>{
        setLogementDetailCart(true);
    }    
    const handlchange=(e)=>{
      setDegat({...degat,[e.target.name]:e.target.value});
    }
    const getAll=()=>{
        fetch(`${API_URL}/degat/getall`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            setDegats(res.d);
        }
            ).catch(err=>console.log(err));
       }
    
    const submit=()=>{
        if(submitInput=="Ajouter"){
            fetch(`${API_URL}/degat/add`,{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(degat)
            }).then(res=>res.json()).then(res=>{
              if(res.err){
                toastr.warning(`${res.err}`,"Operation invalide !!",{positionClass:"toast-bottom-right"});
              }
              if(res.msg){
                toastr.success(`${res.msg}`,"Operation valide",{positionClass:"toast-bottom-right"});
                hideFormulaire();
                getAll();
              }else{
                console.log(res);
              }
    
            }).catch(err=>console.log(err));
    
        }else{
           fetch(`${API_URL}/degat/updateDegate/${idDegat}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(degat)
           }).then(res=>res.json()).then(res=>{
            if(res.err){
              toastr.warning(`${res.err}`,"Operation invalide !!",{positionClass:"toast-bottom-right"});
            }
            if(res.msg){
              toastr.success(`${res.msg}`,"Operation valide",{positionClass:"toast-bottom-right"});
              hideFormulaire();
              getAll();
            }else{
              console.log(res);
            }
  
          }).catch(err=>console.log(err));
        }
    }
    const deleteDegat=(id)=>{
      if(window.confirm("Voulez vous vraiment supprimer cet degat ?")==true){
        fetch(`${API_URL}/degat/deleteDegat/${id}`,{
            method:"DELETE",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            if(res.err){
                toastr.warning(`${res.err}`,"Operation invalide",{positionClass:"toast-bottom-right"});
            }
            if(res.msg){
                toastr.success(`${res.msg}`,"Operation valide",{positionClass:"toast-bottom-right"});
                getAll();
            }else 
            console.log(res);
        }).catch(err=>console.log(err));
      }
    }
    const [searchDegat,setSearchDegat]=useState({
        cin:"",
        libelle:"",
        dateDegatMin:"",
        dateDegatMax:"",
        description:"",
        coutEstimer:""
    })
    const handleChangeSearch=(e)=>{
        setSearchDegat({...searchDegat,[e.target.name]:e.target.value});
    }
    const updateDegat=(d)=>{
        show_formulaire();
        setDegat({
            cin:d.personeR[0].cin,
            libelle:d.logementR[0].libelle,
            dateDegat:moment(d.dateDegat).format("YYYY-MM-DD"),
            description:d.description,
            coutEstimer:d.coutEstimer
        });
        setIdDegat(d._id);
        setSubmitInput("Moddifier");
        }
        const searchBtn=()=>{
        fetch(`${API_URL}/degat/search`,{
            method: 'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(searchDegat)
        }).then(res=>res.json()).then(res=>{
            if(res.err){
              toastr.warning(`${res.err}`,"Operation invalide !!",{positionClass:"toast-bottom-right"});
            }
            if(res.d){
              setDegats(res.d);
            }else{
              console.log(res);
            }
  
          }).catch(err=>console.log(err));
        }
        const [lastCreate,setLastCreate]=useState([]);
        const [lastUpdate,setLastUpdate]=useState([]);
        const getlastUpdate=(e)=>{
            fetch(`${API_URL}/degat/lastUpdate`,{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }).then(res=>res.json()).then(res=>{
            console.log(res);
            setLastUpdate(res.d);
            }).catch(err=>console.log(err));
        }

        const getlastCreate=(e)=>{
            fetch(`${API_URL}/degat/lastCreate`,{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }).then(res=>res.json()).then(res=>{
            console.log(res);
            setLastCreate(res.d);
            }).catch(err=>console.log(err));
        }
        const [detailDegat,setDetailDegat]=useState(
            {_id:"",dateDegat:"",description:"",coutEstimer:"",personeR:[{_id:"",cin:"",nom:"",prenom:""}],logementR:[{_id:"",libelle:""}]}
        );
        const showDetailCart=(d)=>{
            setDetailDegat(d);
            setLogementDetailCart(false);
        }
   useEffect(()=>{
    getlastCreate();
    getlastUpdate();
    getAll();
   },[]);

  return (
    <div>
    <div className="dashbord">
        <div className={menu?'menu':'menu_show'}>
          <BareMenu HideBareMenu={hideMenu}/>
        </div>
        <div className={formulaire? "formulaire" :"show_formulaire"}>
            <center>
                <h4>Formulaire Degat</h4>
                <br/>
                <input type="text"  value={degat.cin} onChange={handlchange} name="cin"  placeholder='CIN person' className="input_formulaire"/><br/><br/>
                <input type="text"  value={degat.libelle} onChange={handlchange} name="libelle"  placeholder='Libelle logement' className="input_formulaire"/><br/><br/>
                <input type="text"  value={degat.dateDegat} onChange={handlchange} name="dateDegat"  placeholder='Date degate' className="input_formulaire"/><br/><br/>
                <input type="text"  value={degat.description} onChange={handlchange} name="description"  placeholder='Description' className="input_formulaire"/><br/><br/>
                <input type="text"  value={degat.coutEstimer} onChange={handlchange} name="coutEstimer"  placeholder='Cout Estimer' className="input_formulaire"/><br/><br/>
            <input type="button" value={submitInput} onClick={submit} style={{borderColor:"white"}} className="btn_input"/>  &nbsp;
            <input type="button" value="Annuler" onClick={hideFormulaire} style={{borderColor:"white"}} className="btn_input"/>  

            </center>
        </div>
        <div className={logementDetailCart?"detail_logement_card_hide":"detail_logement_card_show"}>
           <br/>
           <center>
               <h1>Les Detail</h1>

               <br/>
               <div className="detail_container">
                   <div className="img_logement">

                       <img src={`${API_URL}/logement/getImage/${detailDegat.logementR[0]._id}`} alt="" className="detail_logement_img" />
                   </div>
                   <div className="desc_detail_logement">
                       <div className="box_desc_detail_logement">
                           <br/>
                       <table className="detail_table">
                           <tbody>
                               <tr>
                               <td colSpan={2}><img src={`${API_URL}/persone/getimage/${detailDegat.personeR[0]._id}`} alt="" className="compt_image" /></td>
                               </tr>
                               <tr>
                               <th>Nom :</th><td>{detailDegat.personeR[0].nom}</td>
                               </tr>
                               <tr>
                               <th>Prenom :</th><td>{detailDegat.personeR[0].prenom}</td>
                               </tr>
                               <tr>
                               <th>Libelle :</th><td>{detailDegat.logementR[0].libelle}</td>
                               </tr>
                               <tr>
                               <th>Date de degat:</th><td>{moment(detailDegat.dateDegat).format("YYYY-MM-DD")}</td>
                               </tr>
                               <tr>
                               <th>Cout estimer :</th><td>{detailDegat.coutEstimer}</td>
                               </tr>
                               <tr>
                               <th>Description :</th><td>{detailDegat.description}</td>
                               </tr>
                           </tbody>
                       </table>

                       </div>
                       <div className="box_desc_detail_logement">
                           <center>
                           </center>
                   </div>
               </div>                   
               </div>
                       <br/>
                       <input type="button" value="Reteur" onClick={hideCartDetail} style={{borderColor:"white"}} className="btn_input"/>
                       <br/>
                       <br/>
                       <br/>

           </center>
        </div>
        <div className="item">
            <center>
                       <BarUp showHideMenu={showHideMenu}/>
                <div className="test"></div>
               
                <br/>
                 <div className="container_up">
                     <div className="list_all">
                         <h3>La bare de recherche</h3>
                           <div className="container_input">
                           <input type="text"  name="cin" onChange={handleChangeSearch} id="adresse_search" placeholder='CIN person' className="input_text search" /><br/> <br/>
                               <input type="text"  name="libelle" onChange={handleChangeSearch} id="adresse_search" placeholder='Libelle logement' className="input_text search" /><br/> <br/>
                                <input type="text"  name="dateDegatMin" onChange={handleChangeSearch} id="desc_search" placeholder='Minimale date' className="input_text search" /><br/> <br/>
                           </div>
                           <div className="container_input">
                           <input type="text"  name="dateDegatMax" onChange={handleChangeSearch} id="desc_search" placeholder='Maximale date' className="input_text search" /><br/> <br/>
                           <input type="text"  name="description" onChange={handleChangeSearch} id="min_prix_search" placeholder='Description' className="input_text search" />  <br/> <br/> 
                           <input type="number"  name="coutEstimer" onChange={handleChangeSearch} id="min_prix_search" placeholder='Minimale Cout' className="input_text search" />  <br/> <br/> 
                           </div>
                           <input type="button" value="Chercher" onClick={searchBtn}  className="btn_input btn_search"/>          
                           <br/>
                           <input type="button" value="Nouvelle Degat" onClick={show_formulaire} className="btn_input right_side" />          
                           <br/>
                           <div className="content_Table">

                           <table className="list_logement">
                             <thead>
                                 <tr>
                                     <th>Persone</th>
                                     <th>Nom</th>
                                     <th>Prenom</th>
                                     <th>Libelle</th>
                                     <th>Date</th>
                                     <th>Cout</th>
                                     <th colSpan="3">Options</th>
                                 </tr>
                             </thead>
                             <tbody className='list_content'>
                                {/* {JSON.stringify(degats)} */}
                                 {degats.map((d,i)=>(
                                <tr key={i}>
                                <td><img src={`${API_URL}/persone/getimage/${d.personeR[0]._id}`} alt="" className="compt_image" /></td>
                                <td>{d.personeR[0].nom}</td>
                                <td>{d.personeR[0].prenom}</td>
                                <td>{d.logementR[0].libelle}</td>
                                <td>{moment(d.dateDegat).format("YYYY-MM-DD")}</td>
                                <td>{d.coutEstimer}</td>
                                <td><ImBin onClick={deleteDegat.bind(this,d._id)} className="Icon Icon_delete"/></td>
                                <td><ImPencil onClick={updateDegat.bind(this,d)}  className="Icon Icon_update"/></td>
                                <td><ImNotification onClick={showDetailCart.bind(this,d)} className="Icon Icon_details"/></td>
                            </tr>

                                 ))}
                             </tbody>
                           </table>
                           </div>
                    </div>
                    <br></br>
                   <div className="latest_created">
                       <center>
                           <h3>Dernier ajout</h3>
                           <div className="container_itmes_added">
                               <center>
                                   {/* begin */}
                                   {lastCreate.map((d,i)=>(
                               <div key={i} className="item_add">
                               <img src={`${API_URL}/persone/getimage/${d.personeR[0]._id}`} className="compt_image" />
                               <div className="desc_item_added">
                                   <table>
                                       <tbody>
                                           <tr>
                                               <th>Persone :</th><td>{d.personeR[0].nom} {d.personeR[0].prenom}</td>
                                           </tr>
                                           <tr>
                                               <th>Ville :</th><td>{d.logementR[0].libelle}</td>
                                           </tr>
                                       </tbody>
                                   </table>
                                  </div>
                               </div>

                                   ))}
                               {/* end */}
                               </center>
                           </div>
                           <h3>Dernier mise a joure</h3>
                           <div className="container_itmes_added">
                           {/* latestUpdatedLogement */}
                           {lastUpdate.map((d,i)=>(
                               <div key={i} className="item_add">
                               <img src={`${API_URL}/persone/getimage/${d.personeR[0]._id}`} className="compt_image" />
                               <div className="desc_item_added">
                                   <table>
                                       <tbody>
                                           <tr>
                                               <th>Persone :</th><td>{d.personeR[0].nom} {d.personeR[0].prenom}</td>
                                           </tr>
                                           <tr>
                                               <th>Ville :</th><td>{d.logementR[0].libelle}</td>
                                           </tr>
                                       </tbody>
                                   </table>
                                  </div>
                               </div>

                                   ))}

                           </div>

                       </center>
                   </div>
                 </div>
                 <br/>
            </center>
       </div>
    </div>
    </div>
  )
}

export default Degat;