import React,{useState,useEffect} from 'react'
import "../Logement/Logement.css"
import {API_URL} from '../../config';
import { ImBin,ImPencil,ImNotification } from "react-icons/im";
import toastr from 'toastr';
import "toastr/build/toastr.css";
import {useNavigate} from "react-router-dom";
import {Bar,Doughnut,Bubble} from "react-chartjs-2";
import BareMenu from '../PageMatire/BareMenu';
import BarUp from "../PageMatire/BarUp"
const Louer=()=>{
    const [menu,setMenu]=useState(true);
    const [formulaire,setFormulaire]=useState(true);
    const [logementDetailCart,setLogementDetailCart]=useState(true);
    const Navigate=useNavigate();
    const show_formulaire=()=>{setFormulaire(false);};
    const showHideMenu=()=>{setMenu(!menu)};
    const hideFormulaire=()=>{setFormulaire(true)
    setLouer({
        persone:"",
        logement:"",
        dateArrive:"",
        dateSortie:"",
        dureeLocation:"",
        montantTotoale:""
    });
    setSubmitBtn("Ajouter");
    };
    const hideMenu=()=>{setMenu(true)};
    const [louer,setLouer]=useState({
                persone:"",
                logement:"",
                dateArrive:"",
                dateSortie:"",
                dureeLocation:"",
                montantTotoale:""
    }); 
    const [louerSearch,setLouerSearch]=useState({
        persone:"",
        logement:"",
        dateArrive:"",
        dateSortie:"",
        dureeLocationMin:"",
        dureeLocationMax:"",
        montantTotoaleMin:"",
        montantTotoaleMax:""   
    });
    const [listLouers,setListLouers]=useState([]);   
    const [submitBtn,setSubmitBtn]=useState("Ajouter");
    const [idLouer,setIdLouer]=useState("");
    const [detailLouer,setDetailLouer]=useState({
        persone:{_id:"",nom:"",prenom:"",cin:""},
        logement:{_id:"",libelle:""},
        dateArrive:"",
        dateSortie:"",
        dureeLocation:"",
        montantTotoale:""
    });
    const [lastUpdates,setLastUpdates]=useState([]);
    const [lastCreates,setLastCreates]=useState([]);
    const [nbrLouerYear,setNbrLouerYear]=useState(0);
    const handleChange=(e)=>{
        setLouer({...louer,[e.target.name]:e.target.value});
    }
    const submit=()=>{
        if(submitBtn=="Ajouter"){

            fetch(`${API_URL}/louer/add`,{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(louer)
            }).then(res=>res.json()).then(res=>{
                if(res.err){
                    toastr.warning(`${res.err}`,"SVP format invalide !!",{positionClass:"toast-bottom-right"})
                }
                if(res.msg){
                    toastr.success(`${res.msg}`,"Operation valide !!",{positionClass:"toast-bottom-right"});
                    hideFormulaire();
                    getAll();

                }
                console.log(res);
            }).catch(err=>console.log(err));
        }
      if(submitBtn=="Moddifier"){
        fetch(`${API_URL}/louer/update/${idLouer}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(louer)
        }).then(res=>res.json()).then(res=>{
            if(res.err){
                toastr.warning(`${res.err}`,"Operation in valide !!",{positionClass:"toast-bottom-right"});
            }
            if(res.msg){
                toastr.success(`${res.msg}`,"Operation valide !!",{positionClass:"toast-bottom-right"});
                hideFormulaire();
                getAll();
            }
            else
            console.log(res);
        }).catch(err=>console.log(err));
      }
    }
    const getAll=()=>{
        fetch(`${API_URL}/louer/getall`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "ContentType":"application/json"
            }
        }).then(res=>res.json()).then(res=>
            setListLouers(res.l)
            ).catch(err=>console.log(err));
    }
    const deleteLouer=(id)=>{
        if(window.confirm("Voulez vous vraiment supprimer cet Louer ?")==true)
        fetch(`${API_URL}/louer/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }            
        }).then(res=>res.json()).then(res=>{
            if(res.err){
                toastr.warning(`${res.err}`,"Operation invalide !!",{positionClass:"toast-bottom-right"});
            }
            if(res.msg){
                toastr.success(`${res.msg}`,"Operation Valide",{positionClass:"toast-bottom-right"});
                getAll();
            }
        })
    }
    const updateLouer=(l)=>{
        console.log(JSON.stringify(l))
        setLouer({
            persone:l.persone.cin,
            logement:l.logement.libelle,
            dateArrive:l.dateArrive,
            dateSortie:l.dateSortie,
            dureeLocation:l.dureeLocation,
            montantTotoale:l.montantTotoale
        });
        show_formulaire(); 
        setSubmitBtn("Moddifier");
        setIdLouer(l._id);
    }
    const handleChangeSearch=(e)=>{
        setLouerSearch({...louerSearch,[e.target.name]:e.target.value});
    }
    const searchLogement=()=>{
        fetch(`${API_URL}/louer/search`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
           body:JSON.stringify(louerSearch)
        }).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
    }
    const showDetailLouer=(l)=>{
        setLogementDetailCart(false);
        setDetailLouer(l)
    }
    const hideDetailLouer=()=>{
        setLogementDetailCart(true);
    }
    const lastUpdate=()=>{
        fetch(`${API_URL}/louer/lastupdate`,{
            method: 'GET',
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>setLastUpdates(res.logements)).catch(err=>console.log(err));
    }
    const lastCreate=()=>{
        fetch(`${API_URL}/louer/lastcreate`,{
            method: 'GET',
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{setLastCreates(res.logements)}).catch(err=>console.log(err));
    }
    var count=[];
    var persone=[];
    const [louerData,setLouerData]=useState({
        labels:persone,
        datasets:[{
            label:"Number of users",
            data:count,
            backgroundColor:[ 
            'rgb(153, 102, 255)']
        }]

    });
    const chart1=()=>{  
     fetch(`${API_URL}/louer/chart1`,{
        method:"GET",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
     }).then(res=>res.json()).then(res=>{
        setLouerData(res.c);
        // console.log(res.c);
        count=[];
        persone=[];
        for(const data of res.c){
            count.push(data.count);
            persone.push(data.persone[0].nom+" "+data.persone[0].prenom);
        }
        setLouerData({
            labels:persone,
            datasets:[{
                label:"Number of users",
                data:count,
                backgroundColor:[ 
                'rgb(153, 102, 255)']
            }]
        
    

        })
    }).catch(err=>console.log(err));
    }
    
    const handleChangeAnnee=(e)=>{
        fetch(`${API_URL}/louer/louerParAnnee`,{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json"   
            },
            body: JSON.stringify({[e.target.name]:e.target.value})
        }).then(res=>res.json()).then(res=>setNbrLouerYear(res.l.length)).catch(err=>console.log(err))
    }
    useEffect(()=>{
        chart1();
        lastUpdate();
        lastCreate();
        getAll();
    },[])
  return (
    <div>
    <div className="dashbord">
        <div className={menu?'menu':'menu_show'}>
          <BareMenu HideBareMenu={hideMenu}/>
        </div>
        <div className={formulaire? "formulaire" :"show_formulaire"}>
            <center>
                <h4>Formulaire Louer</h4>
                <br/>
            <input type="text" value={louer.persone} onChange={handleChange}  name="persone"  placeholder='CNI person' className="input_formulaire"/><br/><br/>
            <input type="text" value={louer.logement} onChange={handleChange}  name="logement"  placeholder='Nom de logement' className="input_formulaire"/><br/><br/>
            <input type="text" value={louer.dateArrive} onChange={handleChange}  name="dateArrive"  placeholder="Date d'arrive:aaaa-mm-jj" className="input_formulaire"/><br/><br/>
            <input type="text" value={louer.dateSortie} onChange={handleChange}  name="dateSortie"  placeholder='Date de sortie:aaaa-mm-jj' className="input_formulaire"/><br/><br/>
            <input type="text" value={louer.dureeLocation} onChange={handleChange} name="dureeLocation"  placeholder='Duree' className="input_formulaire"/><br/><br/>
            <input type="text" value={louer.montantTotoale} onChange={handleChange} name="montantTotoale"  placeholder='Montent Totale' className="input_formulaire"/><br/><br/>
            <input type="button" value={submitBtn} onClick={submit}  style={{borderColor:"white"}} className="btn_input"/>  &nbsp;
            <input type="button" value="Annuler" onClick={hideFormulaire}  style={{borderColor:"white"}} className="btn_input"/>  

            </center>
        </div>
        <div className={logementDetailCart?"detail_logement_card_hide":"detail_logement_card_show"}>
           <br/>
           <center>
               <h1>Les Detail</h1>
               <br/>
               <div className="detail_container">
                   <div className="img_logement">

                       <img src={`${API_URL}/logement/getImage/${detailLouer.logement._id}`} alt="" className="detail_logement_img" />
                   </div>
                   <div className="desc_detail_logement">
                       <div className="box_desc_detail_logement">
                           <br/>
                       <table className="detail_table">
                           <tbody>
                               <tr>
                               <td colSpan={2}><img src={`${API_URL}/persone/getimage/${detailLouer.persone._id}`} alt="" className="compt_image" /></td>
                               </tr>
                               <tr>
                               <th>Nom :</th><td>{detailLouer.persone.nom}</td>
                               </tr>
                               <tr>
                               <th>Prenom :</th><td>{detailLouer.persone.prenom}</td>
                               </tr>
                               <tr>
                               <th>Libelle :</th><td>{detailLouer.logement.libelle}</td>
                               </tr>
                               <tr>
                               <th>Date d'arrive :</th><td>{detailLouer.dateArrive}</td>
                               </tr>
                               <tr>
                               <th>Date de sortie :</th><td>{detailLouer.dateSortie}</td>
                               </tr>
                               <tr>
                               <th>Duree de location :</th><td>{detailLouer.dureeLocation}</td>
                               </tr>
                               <tr>
                               <th>Montant Totale :</th><td>{detailLouer.montantTotoale}</td>
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
                       <input type="button" onClick={hideDetailLouer} value="Reteur"  style={{borderColor:"white"}} className="btn_input"/>
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
                    <div className="chartBar"><h5 className='title_chart'>Nombre des Louer Par Client</h5>
                    <Bar data={louerData}/></div>
                    <div className="chartPie"><Doughnut data={louerData}/></div>
                </div>
                
                <br/>
                <div className="latest_updated">
                    <center>
                           <br/>
                           
                          <h4>Nombre des Louer par Annee</h4>
                          <select onChange={handleChangeAnnee} name="Annee"  className="input_text">
                            <option value="">Choisire une Annee</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                          </select>
                          <h2>{nbrLouerYear}</h2>
                    </center>
                </div>
                </div>
                <br/>
                 <div className="container_up">
                     <div className="list_all">
                         <h3>La bare de recherche</h3>
                           <div className="container_input">
                               <input type="text" onChange={handleChangeSearch}  name="persone" placeholder='cin Person' className="input_text search" /><br/> <br/>
                               <input type="text" onChange={handleChangeSearch}  name="logement" placeholder='Libelle logement' className="input_text search" /><br/> <br/>
                               <input type="text" onChange={handleChangeSearch}  name="dateArrive" placeholder='Date Arrive' className="input_text search" /><br/> <br/>
                               <input type="text" onChange={handleChangeSearch}  name="dateSortie" placeholder='Date Sortie' className="input_text search" />  <br/> <br/> 
                           </div>
                           <div className="container_input">
                           <input type="text" onChange={handleChangeSearch}  name="dureeLocationMin" placeholder='Minimum Duree' className="input_text search" />   <br/> <br/>
                           <input type="text" onChange={handleChangeSearch}  name="dureeLocationMax" placeholder='Maximum Duree' className="input_text search" />   <br/> <br/>
                           <input type="text" onChange={handleChangeSearch}  name="montantTotoaleMin" placeholder='Minimum Mentant' className="input_text search" />   <br/> <br/>
                           <input type="text" onChange={handleChangeSearch}  name="montantTotoaleMax" placeholder='Maximum Mentant' className="input_text search" />   <br/> <br/>
                           </div>
                           <br/>
                           <input type="button" value="Chercher" onClick={searchLogement} className="btn_input btn_search"/>          

                           <br/>
                           <input type="button" value="Nouvelle Logement"  onClick={show_formulaire} className="btn_input right_side" />          
                           <br/>
                           <div className="content_Table">

                           <table className="list_logement">
                             <thead>
                                 <tr>
                                     <th></th>
                                     <th>Nom</th>
                                     <th>Prenom</th>
                                     <th>Logement</th>
                                     <th>Adresse</th>
                                     <th colSpan="3">Options</th>
                                 </tr>
                             </thead>
                             <tbody className='list_content'>
                                {/* {JSON.stringify(listLouers)} */}
                                 {listLouers.map((l,i)=>(
                                <tr key={i}>
                                <td><img src={`${API_URL}/persone/getimage/${l.persone._id}`} alt="" className="compt_image" /></td>
                                <td>{l.persone.nom}</td>
                                <td>{l.persone.prenom}</td>
                                <td>{l.logement.libelle}</td>
                                <td>{l.logement.adresse}</td>
                                <td><ImBin onClick={deleteLouer.bind(this,l._id)} className="Icon Icon_delete"/></td>
                                <td><ImPencil onClick={updateLouer.bind(this,l)} className="Icon Icon_update"/></td>
                                <td><ImNotification onClick={showDetailLouer.bind(this,l)} className="Icon Icon_details"/></td>
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
                                {}
                                   {/* begin */}
                                   {lastCreates.map((l,i)=>(
                               <div key={i} onClick={showDetailLouer.bind(this,l)} className="item_add">
                               <img src={`${API_URL}/logement/getImage/${l.logement._id}`} className="compt_image" />
                               <div className="desc_item_added">
                                   <table>
                                       <tbody>
                                            <tr>
                                               <th>Persone :</th><td>{l.persone.nom} {l.persone.prenom}</td>
                                           </tr>
                                           <tr>
                                               <th>Libelle :</th><td>{l.logement.libelle}</td>
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
                           {lastUpdates.map((l,i)=>(
                               <div key={i} onClick={showDetailLouer.bind(this,l)} className="item_add">
                               <img src={`${API_URL}/logement/getImage/${l.logement._id}`} className="compt_image" />
                               <div className="desc_item_added">
                                   <table>
                                       <tbody>
                                            <tr>
                                               <th>Persone :</th><td>{l.persone.nom} {l.persone.prenom}</td>
                                           </tr>
                                           <tr>
                                               <th>Libelle :</th><td>{l.logement.libelle}</td>
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
export default Louer;