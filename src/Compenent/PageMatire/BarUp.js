import React from 'react'
import * as FaIcon from 'react-icons/fa';
import "../Logement/Logement.css"
import {API_URL} from '../../config';

function BarUp(props) {
    const {admin}=JSON.parse(localStorage.getItem('JWT_INFO'));
  return (
    <div className="bar_up">
    <div className="bar_menu"><FaIcon.FaBars onClick={props.showHideMenu}/></div>
    <div className="info_compt">
        <span className="compt_nom">{`${admin.nom} ${admin.prenom}`}</span>
        <img src={`${API_URL}/admin/getCompt/${admin._id}`} alt="" className="compt_image" /> 
     </div>
</div>
)
}

export default BarUp