import React,{useState,useEffect} from 'react'
import BarUp from "../PageMatire/BarUp";
import BareMenu from "../PageMatire/BareMenu";
import "../Logement/Logement.css";
import {API_URL} from "../../config";
import toastr from 'toastr';
import "toastr/build/toastr.css";
import { ImUsers,ImBin,ImPencil,ImNotification } from "react-icons/im";
import {BsGenderFemale,BsGenderMale} from "react-icons/bs";



const Person=()=>{
    const [menu,setMenu]=useState(true);
    const [formulaire,setFormulaire]=useState(true);
    const [addUpdateInput,setAddUpdateInput]=useState("Ajouter");
    const [person,setPerson]=useState({
        nom:"",
        prenom:"",
        email:"",
        tel:"",
        cin:"",
        sexe:""
    });
    const [formdata,setFormdata]=useState(new FormData());
    const [persons,setPersons]=useState([]);
    const [idPerson,setIdPerson]=useState("");
    const [personSearch,setPersonSearch]=useState({
        nom:"",
        prenom:"",
        email:"",
        tel:"",
        cin:"",
        sexe:""

    });
    const [logementDetailCart,setLogementDetailCart]=useState(true);
    const [personDetail,setPersonDetail]=useState({});
    const [lastUpdated,setLastUpdated]=useState([]);
    const [lastCreated,setLastCreated]=useState([]);
    // les state
    const hideMenu=()=>{setMenu(true)};
    const hideFormulaire=()=>{setFormulaire(true)
    
     setPerson({
        nom:"",
        prenom:"",
        email:"",
        tel:"",
        cin:"",
        sexe:""
     });
    };
    const showHideMenu=()=>{setMenu(!menu)};
    const show_formulaire=()=>{setFormulaire(false);setAddUpdateInput("Ajouter");};
    const handlechangeSubmit=(e)=>{
        const value=e.target.name==="photo"?e.target.files[0]:e.target.value;
        setPerson({...person,[e.target.name]:value});
        formdata.set(e.target.name,value);
    }
    const getAllPersons=()=>{
        fetch(`${API_URL}/persone/getall`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            setPersons(res.P);        
        }).catch(err=>console.log(err));
    }
    const submit=()=>{
        if(addUpdateInput==="Ajouter"){

            fetch(`${API_URL}/persone/add`,{
                method:"POST",
            headers:{
                "Accept":"application/json",
                // "Content-Type":"application/json"
            },
            body:formdata
        }).then(res=>res.json()).then(res=>{
            if(res.err){
                toastr.warning(`${res.err}`,"Formulaire est invalide !!",{positionClass:"toast-bottom-right"});
            }
            if(res.msg){
                toastr.success(`${res.msg}`,"Operation resussi",{positionClass:"toast-bottom-right"});
                hideFormulaire();
                getAllPersons();
                lastCreate();
        
                
            }            
        }).catch(err=>{            
            console.log(err)});
        }else{
            fetch(`${API_URL}/persone/update/${idPerson}`,{
                method: "PUT",
                headers: {
                    "Accept":"application/json"
                    // "Content-Type":"application/json"
                },
                body:formdata
            }).then(res=>res.json()).then(
                res=>{
                    if(res.err){
                        toastr.warning(`${res.err}`,"Operation échoué",{positionClass:"toast-bottom-right"});
                    }
                    if(res.msg){
                        toastr.success(`${res.msg}`,"Operation valide",{positionClass:"toast-bottom-right"});
                        hideFormulaire();
                        getAllPersons(); 
                lastUpdate();

                    }
                }
            ).catch(err=>console.log(err));
        }
        }
    const deletePerson=(id)=>{
        if(window.confirm("Voulez vous vraiment suprimer cet persone ?")==true){

            fetch(`${API_URL}/persone/delete/${id}`,{
                method: "POST",
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res=>res.json()).then(res=>{
                if(res.err){
                    toastr.warning(`${res.err}`,"Operation échoué",{positionClass:"toast-bottom-right"});
                }
                if(res.msg){
                    toastr.success(`${res.msg}`,"Operation reussi",{positionClass:"toast-bottom-right"});
                    getAllPersons();
                    setLogementDetailCart(true);
                }
            })
        }
    }
    const updatePerson=(p)=>{ 
        show_formulaire();
        setPerson({
            nom:p.nom,
            prenom:p.prenom,
            email:p.email,
            tel:p.tel,
            cin:p.cin,
            sexe:p.sexe    
        });
        setAddUpdateInput("Moddifier");
        formdata.set("nom",p.nom);
        formdata.set("prenom",p.prenom);
        formdata.set("email",p.email);
        formdata.set("tel",p.tel);
        formdata.set("sexe",p.sexe);
        formdata.set("cin",p.cin);
        setIdPerson(p._id);
    }
    const handlechangeSearch=(e)=>{
        setPersonSearch({...personSearch,[e.target.name]:e.target.value});
    }
    const searchPerson=()=>{
        fetch(`${API_URL}/persone/search`,{
            method:"POST",
            headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
            body:JSON.stringify(personSearch)
        }).then(res=>res.json()).then(res=>{
            if(res.err){
                toastr.warning(`${res.err}`,"Operation echoue",{positionClass:"toast-bottom-right"});
            }else{
             setPersons(res);
             
                        }
            // if(res.p){
            //     console.log(res.p);
            //     setPersonsSearch(res.p);
            // }else{
            //     console.log(res);
            // }
        }).catch(err=>console.log(err));
    }
    const showDetailPerson=(p)=>{
        setLogementDetailCart(false);
        setPersonDetail(p);
    }
    const UpdateFromDetail=(p)=>{
        setLogementDetailCart(true);
        updatePerson(p);
    }
    const hideDetailForm=()=>{
        setLogementDetailCart(true);
    }
    const lastUpdate=()=>{
        fetch(`${API_URL}/persone/latestUpdate`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>setLastUpdated(res.p)).catch(err=>console.log(err));
    }
    const lastCreate=()=>{
        fetch(`${API_URL}/persone/latestcreate`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>setLastCreated(res.p)).catch(err=>console.log(err));
    }

    useEffect(()=>{
        lastCreate();
        lastUpdate();
        getAllPersons();
    },[]);
   
  return (
    <div>
    <div className="dashbord">
        <div className={menu?'menu':'menu_show'}>
          <BareMenu HideBareMenu={hideMenu}/>
        </div>
        <div className={formulaire? "formulaire" :"show_formulaire"}>
            <center>
                <h4>Formulaire Persone</h4>
                <br/>
            <input type="file" id="" onChange={handlechangeSubmit} name="photo"   /><br/><br/>
            <input type="text" id="" value={person.cin}  onChange={handlechangeSubmit} name="cin" placeholder='cin' className="input_formulaire"/><br/><br/>
            <input type="text" id="" value={person.nom}  onChange={handlechangeSubmit} name="nom" placeholder='nom' className="input_formulaire"/><br/><br/>
            <input type="text"  id="" value={person.prenom}  onChange={handlechangeSubmit} name="prenom" placeholder="prenom" className="input_formulaire"/><br/><br/>
            <input type="text"  id="" value={person.tel}  onChange={handlechangeSubmit} name="tel" placeholder="telephone" className="input_formulaire"/><br/><br/>
            <input type="text"  id="" value={person.email}  onChange={handlechangeSubmit} name="email" placeholder="email" className="input_formulaire"/><br/><br/>
            <select onChange={handlechangeSubmit} value={person.sexe} name="sexe"  className="input_formulaire">
            <option value="">Chosire Le sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            </select>
           <br/><br/>
            <input type="button" value={addUpdateInput} onClick={submit}  style={{borderColor:"white"}} className="btn_input"/>  &nbsp;
            <input type="button" value="Annuler" onClick={hideFormulaire} style={{borderColor:"white"}} className="btn_input"/>  

            </center>
        </div>
        <div className={logementDetailCart?"detail_logement_card_hide":"detail_logement_card_show"}>
           <br/>
           <center>
           <h1>Les detail</h1>
           <div className="containerDetailPersons">
              <div className="box_detail_box_person">
                <br/>
                <img src={`${API_URL}/persone/getimage/${personDetail._id}`} alt="" className="img_detail_person" />
                <br/><br/>
            <input type="button" value="Moddifier" onClick={UpdateFromDetail.bind(this,personDetail)} style={{borderColor:"white"}} className="btn_input"/>  &nbsp;
            <input type="button" value="Supprimer" onClick={deletePerson.bind(this,personDetail._id)}  style={{borderColor:"white"}} className="btn_input"/>  
              </div>
              <div className="box_detail_box_person">
                <br/>
                <br/>
                <br/>
                <br/>
                <table className="detail_person_table">
                    <tbody>
                     <tr>
                        <th>Nom :</th><td>{personDetail.nom}</td>
                     </tr>
                     <tr>
                        <th>Prenom :</th><td>{personDetail.prenom}</td>
                     </tr>
                     <tr>
                        <th>Telephone :</th><td>{personDetail.tel}</td>
                     </tr>
                     <tr>
                        <th>Sexe :</th><td>{personDetail.sexe}</td>
                     </tr>
                     <tr>
                        <th>Email :</th><td>{personDetail.email}</td>
                     </tr>
                    </tbody>
                    </table>
              </div>
           </div>
           <br/>
           <input type="button" value="Reteur" onClick={hideDetailForm} style={{borderColor:"white"}} className="btn_input"/>  &nbsp;
           <br/>
           </center>
        </div>
        <div className="item">
            <center>
                       <BarUp showHideMenu={showHideMenu}/>
                <div className="test"></div>
                <div className="container_up">
                <div className="charts_container_persone">
                <br/>
                    <div className="statestic_box">
                         <div className="statestic_desc">
                            <h1>{persons.length}</h1>
                            Totale des persone
                         </div>    
                         <div className="statestic_icon">
                         <ImUsers/>   
                         {/* <BsGenderFemale/>
                         <BsGenderMale/> */}
                        </div>    
                    </div>
                    <br/>
                    <div className="statestic_box">
                    <div className="statestic_desc">
                            <h1>{persons.filter(p=>p.sexe==="Homme").length}</h1>
                            Toute les Homme
                         </div>    
                         <div className="statestic_icon">
                         <BsGenderMale/>
                        </div>    
                    </div><br/>
                    <div className="statestic_box">
                    <div className="statestic_desc">
                            <h1>{persons.filter(p=>p.sexe==="Femme").length}</h1>
                            Tout les Femme
                         </div>    
                         <div className="statestic_icon">
                         <BsGenderFemale/>
                        </div>     
                    </div><br/>
                </div>
                
                <br/>
                {/* <div className="latest_updated">
                    <center>
                           <br/>
                          <div className="container_filtrage_inputs">
            <select id="type_filter"   className="input_text_filtrage">
            <option value="">Type de Filtrage</option>
            <option value="Type">Type</option>
            <option value="Desponabiliter">Desponabiliter</option>
            </select>
            
            <select id="value_filter" className="input_text_filtrage">
            <option value="">Choisir la valeur</option>             
            </select>

                          </div>
                          <h2>Resultat : 45</h2>
                    </center>
                </div> */}
                </div>
                <br/>
                 <div className="container_up">
                     <div className="list_all">
                         <h3>La bare de recherche</h3>
                           <div className="container_input">
                            <input type="text" id=""  onChange={handlechangeSearch} name="cin" placeholder='cin' className="input_text search"/><br/><br/>
                            <input type="text" id=""  onChange={handlechangeSearch} name="nom" placeholder='nom' className="input_text search"/><br/><br/>
                            <input type="text"  id=""  onChange={handlechangeSearch} name="prenom" placeholder="prenom" className="input_text search"/><br/><br/>
                           </div>
                           <div className="container_input">
                            <input type="text"  id="" onChange={handlechangeSearch} name="tel" placeholder="telephone" className="input_text search"/><br/><br/>
                            <input type="text"  id=""  onChange={handlechangeSearch} name="email" placeholder="email" className="input_text search"/><br/><br/>
                            <select onChange={handlechangeSearch} name="sexe" className="input_text search">
                            <option value="">Chosire La Sexe</option>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                            </select>
<br/> <br/>
                           </div>
                           <input type="button" value="Chercher" onClick={searchPerson}  className="btn_input btn_search"/>          

                           <br/>
                           <input type="button" value="Nouvelle Persone" onClick={show_formulaire} className="btn_input right_side" />          
                           <br/>
                           <div className="content_Table">

                           <table className="list_logement">
                             <thead>
                                 <tr>
                                     <th></th>
                                     <th>CIN</th>
                                     <th>Nom</th>
                                     <th>Prenom</th>
                                     <th>sexe</th>
                                     <th colSpan="3">Options</th>
                                 </tr>
                             </thead>
                             <tbody className='list_content'>
                                {persons.map((p,i)=>(
                                <tr key={i}>
                                <td><img src={`${API_URL}/persone/getimage/${p._id}`} alt="" className="compt_image" /></td>
                                <td>{p.cin}</td>
                                <td>{p.nom}</td>
                                <td>{p.prenom}</td>
                                <td>{p.sexe}</td>
                                <td><ImBin  onClick={deletePerson.bind(this,p._id)} className="Icon Icon_delete"/></td>
                                <td><ImPencil onClick={updatePerson.bind(this,p)}  className="Icon Icon_update"/></td>
                                <td><ImNotification onClick={showDetailPerson.bind(this,p)} className="Icon Icon_details"/></td>
                            </tr>

                                ))}
                                 {/* {lastCreated.map((p,i)=>(
                                <tr key={i}>
                                <td><img src={`${API_URL}/persone/getimage/${p._id}`} alt="" className="compt_image" /></td>
                                <td>{l.libelle}</td>
                                <td>{l.adresse}</td>
                                <td>{l.ville}</td>
                                <td>{l.prix}</td>
                                <td><ImBin onClick={deleteLogement.bind(this,l._id)} className="Icon Icon_delete"/></td>
                                <td><ImPencil onClick={loadeLogement.bind(this,l._id)} className="Icon Icon_update"/></td>
                                <td><ImNotification onClick={showDetailLogement.bind(this,l)} className="Icon Icon_details"/></td>
                            </tr>

                                 ))} */}
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
                                   {lastCreated.map((p,i)=>(
                               <div key={i} onClick={showDetailPerson.bind(this,p)} className="item_add">
                               <img src={`${API_URL}/persone/getimage/${p._id}`} className="compt_image" />
                               <div className="desc_item_added">
                                   <table>
                                       <tbody>
                                           <tr>
                                               <th>Nom :</th><td>{p.nom} {p.prenom}</td>
                                           </tr>
                                           <tr>
                                               <th>Tel :</th><td>{p.tel}</td>
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
                           {lastUpdated.map((p,i)=>(
                               <div key={i} onClick={showDetailPerson.bind(this,p)} className="item_add">
                               <img src={`${API_URL}/persone/getimage/${p._id}`} className="compt_image" />
                               <div className="desc_item_added">
                                   <table>
                                       <tbody>
                                           <tr>
                                               <th>Nom :</th><td>{p.nom} {p.prenom}</td>
                                           </tr>
                                           <tr>
                                               <th>Tel :</th><td>{p.tel}</td>
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

export default Person;