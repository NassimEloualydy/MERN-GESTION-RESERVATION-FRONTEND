import React,{useState,useEffect} from 'react'
import "./Logement.css"
import {API_URL} from '../../config';
import * as FaIcon from 'react-icons/fa';
import { ImHome3,ImUsers,ImKey2,ImWarning,ImUserTie,ImExit,ImBin,ImPencil,ImNotification } from "react-icons/im";
import toastr from 'toastr';
import "toastr/build/toastr.css";
import {useNavigate} from "react-router-dom";
import {Bar,Doughnut,Bubble} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import BareMenu from '../PageMatire/BareMenu';
import BarUp from "../PageMatire/BarUp"
const Dashbord=()=>{
    const [menu,setMenu]=useState(true);
    const [formulaire,setFormulaire]=useState(true);
    const [logementDetailCart,setLogementDetailCart]=useState(true);
    const [loadImageLogement,setLoadImageLogement]=useState("");
    const [logement,setLogement]=useState({});
    const [formdata,setFormdata]=useState(new FormData());
    const [logements,setLogements]=useState([]);
    const [addUpdateInput,setAddUpdateInput]=useState("Ajouter");
    const [idLogement,setIdLogement]=useState('');
    const [searchLogement,setSearchLogement]=useState({
        libelle_search:'',
        adresse_search:'',
        ville_search:'',
        min_prix_search:0,
        max_prix_search:10000000000,
        desc_search:'',
        type_search:'',
        desponabiliter_search:''
    });
    const [relatedLogement,setRelatedLogement]=useState([]);
    const [latestAddedLogement,setLatestAddedLogement]=useState([]);
    const [latestUpdatedLogement,setLatestUpdatedLogement]=useState([]);
    const [inputFiltrage,setInputFiltrage]=useState("");
    const [resultFiltrage,setResultFiltrage]=useState(0);
    const [charts1,setCharts1]=useState([]);
    const Navigate=useNavigate();
    const show_formulaire=()=>{setFormulaire(false);setAddUpdateInput("Ajouter");};
    const showHideMenu=()=>{setMenu(!menu)};
    const hideFormulaire=()=>{setFormulaire(true);

        setLogement({
            libelle_logment:"",
            adresse_logment:"",
            ville_logment:"",
            prix_logment:"",
            desc_logment:"",
            type_logment:"",
            desponabiliter_logment:""
        });
    };
    const {admin}=JSON.parse(localStorage.getItem('JWT_INFO'));
    const hideMenu=()=>{setMenu(true)};
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
    // useEffect(()=>{
    // },[])
    const handleChangeLogement=(e)=>{
        setLogement({...logement,[e.target.id]:e.target.value});
        const value=e.target.id==="photo_logment"?e.target.files[0]:e.target.value;
        formdata.set(e.target.id,value);
    };
    const submitLogement=(e)=>{
        if(e.target.value=="Ajouter"){
            fetch(`${API_URL}/logement/add`,{
                    method:"POST",
            headers:{
                "Accept":"application/json"
            },
            body:formdata
        }).then(res=>res.json()).then(res=>
            {
                if(res.err){
                    toastr.warning(`${res.err}`,"SVP valider votre formaulaire !!",{positionClass:"toast-bottom-right"});
                }else{
                    toastr.success("Ajouter Avec success !!","Succes",{positionClass:"toast-bottom-right"});
                    setLogement({
                        libelle_logment:"",
                        adresse_logment:"",
                        ville_logment:"",
                        prix_logment:"",
                        desc_logment:"",
                        type_logment:"",
                        desponabiliter_logment:""
                    });
                    setFormdata(new FormData());
                    hideFormulaire();
                    GetAll();
                }
            }
            ).catch(err=>alert(err));
    }else{
        fetch(`${API_URL}/logement/update/${idLogement}`,{
            method:"POST",
            headers:{
                "Accept":"application/json"
            },

            body:formdata
        }).then(res=>res.json()).then(res=>{
            if(res.err){
                toastr.warning(`${res.err}`,"Errer",{positionClass:"toast-bottom-right"});
            }else{
                toastr.success(`${res.msg}`,"Valide",{positionClass:"toast-bottom-right"});
                setLogement({
                    libelle_logment:"",
                    adresse_logment:"",
                    ville_logment:"",
                    prix_logment:"",
                    desc_logment:"",
                    type_logment:"",
                    desponabiliter_logment:""
                });
                setFormdata(new FormData());
                hideFormulaire();
                GetAll();
            }
        }).catch(err=>console.log(err));
    }
    }
    const GetAll=()=>{
        fetch(`${API_URL}/logement/all`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json"
            }
        
        }).then(res=>res.json()).then(res=>{
            setLogements(res);
        }).catch(err=>console.log(err));
    }
    const deleteLogement=(id)=>{
        if(window.confirm("Voulez vous vraiment supprimer cet Logement !!")==true){

            fetch(`${API_URL}/logement/delete/${id}`,{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }).then(res=>res.json()).then(res=>{
                toastr.success("Supprimer avec succes !!","Valide",{positionClass:"toast-bottom-right"});
                GetAll();
                console.log(res);
            }).catch(err=>console.log(err));
        }
    }
  const  loadeLogement=(_id)=>{
     fetch(`${API_URL}/logement/getLogement/${_id}`,{
         method:"POST",
         headers:{
             "Accept":"application/json",
             "Content-Type": "application/json"
         }
         
     }).then(res=>res.json()).then(res=>{
         const {libelle,ville,adresse,prix,description,desponabiliter,type}=res.l;
         console.log(res.l.type);
        setLogement({
            libelle_logment:libelle,
            adresse_logment:adresse,
            ville_logment:ville,
            prix_logment:prix,
            desc_logment:description,
            type_logment:type,
            desponabiliter_logment:desponabiliter
        });
        formdata.set("libelle_logment",libelle);
        formdata.set("adresse_logment",adresse);
        formdata.set("ville_logment",ville);
        formdata.set("prix_logment",prix);
        formdata.set("desc_logment",description);
        formdata.set("type_logment",type);
        formdata.set("desponabiliter_logment",desponabiliter);
        show_formulaire();
        setAddUpdateInput("Update");
        setIdLogement(_id);
     }).catch(err=>console.log(err));
  }
  const handleChangeSearchLogement=(e)=>{
      setSearchLogement({...searchLogement,[e.target.id]:e.target.value});
  }
  const search=()=>{
    fetch(`${API_URL}/logement/search`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(searchLogement)
      }).then(res=>res.json()).then(res=>{
        setLogements(res.l);
        // GetAll();
      }).catch(err=>console.log(err));
  }
  const showDetailLogement=(l)=>{
    const {ville,type,_id}=l;
   fetch(`${API_URL}/logement/relatedLogement`,{
       method:"POST",
       headers:{
           "Accept":"application/json",
           "Content-Type":"application/json"
       },
       body:JSON.stringify({ville,type,_id})
   }).then(res=>res.json()).then(res=>{
       setRelatedLogement(res.logements);
   }).catch(err=>console.log(err));
    setLoadImageLogement(`${API_URL}/logement/getImage/${l._id}`);
    setLogementDetailCart(false);
      
      setLogement({
        libelle_logment:l.libelle,
        adresse_logment:l.adresse,
        ville_logment:l.ville,
        type_logment:l.type,
        prix_logment:l.prix,
        desponabiliter_logment:l.desponabiliter,
        desc_logment:l.description
    });
  }
  const hideCartDetail=()=>{
    setLogementDetailCart(true);
    setLogement({
      libelle_logment:"",
      adresse_logment:"",
      ville_logment:"",
      type_logment:"",
      prix_logment:"",
      desponabiliter_logment:"",
      desc_logment:""
  });
  }
  const latestAdded=()=>{
      fetch(`${API_URL}/logement/latestAdded`,{
          method:"POST",
          headers:{
              "Accept":"application/json",
              "Content-Type": "application/json"
          }
      }).then(res=>res.json()).then(res=>{
        setLatestAddedLogement(res.l);
      }).catch(err=>console.log(err));
  }
  const latestUpdated=()=>{
      fetch(`${API_URL}/logement/latestUpdated`,{
          method:"POST",
          headers:{
            "Accept":"application/json",
            "Content-Type": "application/json"
          }
      }).then(res=>res.json()).then(res=>setLatestUpdatedLogement(res.l)).catch(err=>console.log(err));
  }
  const handleInputFiltrage=(e)=>{
      setInputFiltrage(e.target.value);
  }
  const handeValueFiltrage=(e)=>{
    const value=e.target.value;
    const filterBy=inputFiltrage;
    fetch(`${API_URL}/logement/filtreByTypeOrDesponabiliter`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({value,filterBy})
    }).then(res=>res.json()).then(res=>{
        if(res.err){
            toastr.warning(`${res.err}`,"Error",{positionClass:"toast-bottom-right"});
        }else
        setResultFiltrage(res);

    }).catch(err=>console.log(err));
  }
  var villes=[];
  var counts=[];
  const  [userData1,setUserData1]=useState({
    labels:logements.map((data)=>data.ville),
    datasets:[{
        label:"Number of users",
        data:logements.map((data)=>data.prix),
        backgroundColor:[ 
        'rgb(153, 102, 255)']
    }]

});

  const chart1=()=>{
      fetch(`${API_URL}/logement/chart1`,{
          method:"POST",
          headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
          }
      }).then(res=>res.json()).then(res=>{
        
        villes=[];
        counts=[];
        for(const data of res.l){
            villes.push(data._id.ville);
            counts.push(data.count);
        }
        console.log(JSON.stringify(counts));
        setUserData1({
            labels:villes,
            datasets:[{
                label:"Number of users",
                data:counts,
                backgroundColor:[ 
                'rgb(153, 102, 255)']
            }]
        
    
        })
      }).catch(err=>console.log(err));
  }

    useEffect(()=>{
        chart1();
        console.log(JSON.stringify(villes));
        latestUpdated();
        latestAdded();
        GetAll();
    },[]);
    
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
            <input type="file" name="" onChange={handleChangeLogement} id="photo_logment"   /><br/><br/>
            <input type="text" value={logement.libelle_logment} name="" onChange={handleChangeLogement} id="libelle_logment" placeholder='libelle' className="input_formulaire"/><br/><br/>
            <input type="text" value={logement.adresse_logment} name="" onChange={handleChangeLogement} id="adresse_logment" placeholder='adresse' className="input_formulaire"/><br/><br/>
            <input type="text" value={logement.ville_logment} name="" onChange={handleChangeLogement} id="ville_logment" placeholder='ville' className="input_formulaire"/><br/><br/>
            <input type="text" value={logement.prix_logment} name="" onChange={handleChangeLogement} id="prix_logment" placeholder='prix' className="input_formulaire"/><br/><br/>
            <input type="text" value={logement.desc_logment} name="" onChange={handleChangeLogement} id="desc_logment" placeholder='description' className="input_formulaire"/><br/><br/>
            <select value={logement.type_logment} id="type_logment" onChange={handleChangeLogement} className="input_formulaire">
            <option value="">Chosire Le type</option>
            <option value="Appartement">Appartement</option>
            <option value="Duplex">Duplex</option>
            <option value="Maison isolée">Maison isolée</option>
            <option value="Maison jumelée">Maison jumelée</option>
            <option value="Maison en rangée">Maison en rangée</option>
            <option value="Chambre">Chambre</option>
            </select>
           <br/><br/>
            <select value={logement.desponabiliter_logment} id="desponabiliter_logment" onChange={handleChangeLogement} className="input_formulaire">
            <option value="">Chosire La desponabiliter</option>
            <option value="Réserver">Réserver</option>
            <option value="No Réserver">No Réserver</option>
            </select>
           <br/><br/>
            <input type="button" value={addUpdateInput || ''} onClick={submitLogement} style={{borderColor:"white"}} className="btn_input"/>  &nbsp;
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
                       <img src={loadImageLogement} alt="" className="detail_logement_img" />
                   </div>
                   <div className="desc_detail_logement">
                       <div className="box_desc_detail_logement">
                           <br/>
                       <table className="detail_table">
                           <tbody>
                               <tr>
                               <th>Libelle :</th><td>{logement.libelle_logment}</td>
                               </tr>
                               <tr>
                               <th>Adresse :</th><td>{logement.adresse_logment}</td>
                               </tr>
                               <tr>
                               <th>Ville :</th><td>{logement.ville_logment}</td>
                               </tr>
                               <tr>
                               <th>Type :</th><td>{logement.type_logment}</td>
                               </tr>
                               <tr>
                               <th>Prix :</th><td>{logement.prix_logment}</td>
                               </tr>
                               <tr>
                               <th>Desponabiliter :</th><td>{logement.desponabiliter_logment}</td>
                               </tr>
                               <tr>
                               <th>Description :</th><td>{logement.desc_logment}</td>
                               </tr>
                              
                           </tbody>
                       </table>

                       </div>
                       <div className="box_desc_detail_logement">
                           <center>
                               <h3>Similaire Logement</h3>
                              <div className="related_items">
                                  
                                      {
                                          
                                      relatedLogement.map((l,i)=>(
                                        <div className="item_related">
                                        <img src={`${API_URL}/logement/getImage/${l._id}`} alt="" className="related_logement_img" />
                                        <div className="desc_related">
                                            <div key={i}>
                                              <p>Libeller :{l.libelle}</p>
                                              <p>Adresse :{l.ville}</p>
                                              <p><ImNotification onClick={showDetailLogement.bind(this,l)} className="Icon Icon_details"/></p>
                                            </div>
                                            </div>
                                  </div>
                                      ))
                                       }
                              </div>
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
                <div className="container_up">
                <div className="charts_container">
                    {/* <br/>
                    <div className="item_chart">Totale</div><br/>
                    <div className="item_chart">count ville distinct</div><br/>
                    <div className="item_chart"></div><br/>
                    <div className="item_chart"></div> */}
                    <div className="chartBar"><h5 className='title_chart'>Nombre des Logement Par ville</h5><Bar data={userData1}/></div>
                    <div className="chartPie"><Doughnut data={userData1}/></div>

                </div>
                
                <br/>
                <div className="latest_updated">
                    <center>
                           <br/>
                          <div className="container_filtrage_inputs">
            <select id="type_filter" onChange={handleInputFiltrage}  className="input_text_filtrage">
            <option value="">Type de Filtrage</option>
            <option value="Type">Type</option>
            <option value="Desponabiliter">Desponabiliter</option>
            </select>
            
            <select id="value_filter" onChange={handeValueFiltrage} className="input_text_filtrage">
            <option value="">Choisir la valeur</option>
            {inputFiltrage=="Type" && (
              <>
            <option value="Appartement">Appartement</option>
            <option value="Duplex">Duplex</option>
            <option value="Maison isolée">Maison isolée</option>
            <option value="Maison jumelée">Maison jumelée</option>
            <option value="Maison en rangée">Maison en rangée</option>
            <option value="Chambre">Chambre</option>

              </>
            )}
            {inputFiltrage=="Desponabiliter" && (
                <>
                <option value="Réserver">Réserver</option>
                <option value="No Réserver">No Réserver</option>
                </>
            )}
             
            </select>

                          </div>
                          <h2>Resultat : {resultFiltrage}</h2>

                    </center>
                </div>
                </div>
                <br/>
                 <div className="container_up">
                     <div className="list_all">
                         <h3>La bare de recherche</h3>
                           <div className="container_input">
                               <input type="text" onChange={handleChangeSearchLogement} name="" id="libelle_search" placeholder='libelle' className="input_text search" /><br/> <br/>
                               <input type="text" onChange={handleChangeSearchLogement} name="" id="adresse_search" placeholder='adresse' className="input_text search" /><br/> <br/>
                               <input type="text" onChange={handleChangeSearchLogement} name="" id="ville_search" placeholder='ville' className="input_text search" /><br/> <br/>
                                <input type="text" onChange={handleChangeSearchLogement} name="" id="desc_search" placeholder='description' className="input_text search" /><br/> <br/>
                           </div>
                           <div className="container_input">
                           <input type="number" onChange={handleChangeSearchLogement} name="" id="min_prix_search" placeholder='prix minimale' className="input_text search" />  <br/> <br/> 
                           <input type="number" onChange={handleChangeSearchLogement} name="" id="max_prix_search" placeholder='prix maximale' className="input_text search" />   <br/> <br/>
                           <select id="type_search" onChange={handleChangeSearchLogement} className="input_text search">
            <option value="">Chosire Le type</option>
            <option value="Appartement">Appartement</option>
            <option value="Duplex">Duplex</option>
            <option value="Maison isolée">Maison isolée</option>
            <option value="Maison jumelée">Maison jumelée</option>
            <option value="Maison en rangée">Maison en rangée</option>
            <option value="Chambre">Chambre</option>
            </select>
                    <br/> <br/>
                    <select id="desponabiliter_search" onChange={handleChangeSearchLogement} className="input_text search">
            <option value="">Chosire La desponabiliter</option>
            <option value="Réserver">Réserver</option>
            <option value="No Réserver">No Réserver</option>
            </select>
<br/> <br/>
                           </div>
                           <input type="button" value="Chercher" onClick={search} className="btn_input btn_search"/>          

                           <br/>
                           <input type="button" value="Nouvelle Logement" onClick={show_formulaire} className="btn_input right_side" />          
                           <br/>
                           <div className="content_Table">

                           <table className="list_logement">
                             <thead>
                                 <tr>
                                     <th></th>
                                     <th>Libelle</th>
                                     <th>Adresse</th>
                                     <th>Ville</th>
                                     <th>Prix</th>
                                     <th colSpan="3">Options</th>
                                 </tr>
                             </thead>
                             <tbody className='list_content'>
                                 {logements.map((l,i)=>(
                                <tr key={i}>
                                <td><img src={`${API_URL}/logement/getImage/${l._id}`} alt="" className="compt_image" /></td>
                                <td>{l.libelle}</td>
                                <td>{l.adresse}</td>
                                <td>{l.ville}</td>
                                <td>{l.prix}</td>
                                <td><ImBin onClick={deleteLogement.bind(this,l._id)} className="Icon Icon_delete"/></td>
                                <td><ImPencil onClick={loadeLogement.bind(this,l._id)} className="Icon Icon_update"/></td>
                                <td><ImNotification onClick={showDetailLogement.bind(this,l)} className="Icon Icon_details"/></td>
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
                                   {latestAddedLogement.map((l,i)=>(
                               <div key={i} onClick={showDetailLogement.bind(this,l)} className="item_add">
                               <img src={`${API_URL}/logement/getImage/${l._id}`} className="compt_image" />
                               <div className="desc_item_added">
                                   <table>
                                       <tbody>
                                           <tr>
                                               <th>Libelle :</th><td>{l.libelle}</td>
                                           </tr>
                                           <tr>
                                               <th>Ville :</th><td>{l.ville}</td>
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
                           {latestUpdatedLogement.map((l,i)=>(
                               <div key={i} onClick={showDetailLogement.bind(this,l)} className="item_add">
                               <img src={`${API_URL}/logement/getImage/${l._id}`} className="compt_image" />
                               <div className="desc_item_added">
                                   <table>
                                       <tbody>
                                           <tr>
                                               <th>Libelle :</th><td>{l.libelle}</td>
                                           </tr>
                                           <tr>
                                               <th>Ville :</th><td>{l.ville}</td>
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

export default Dashbord