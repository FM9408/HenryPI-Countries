import React from "react";
import { connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail } from "../../../redux/actions";
import Navbar from "../../individualComponents/navbar/navbar";
import './countryPage.css'




function CountryPage(props) {
    let countryById = useSelector((state) => state.countryDetail)
    let {id} = useParams()
   
    React.useEffect(() => {
        props.getCountryDetail(id)
        
    },[props, id] )

    
      
   

    return(
        <div className="pageContainer">
             <div className="navbarContainer">
                        <Navbar />
             </div>
            <div className="countryPageContainer">
             <Link to='/home'>
             <button >{'<'}</button>
             </Link>
                <div className="flagContainer">
                    <img src={countryById.flag} className='flagImage' alt="" />
                </div>
                <div className="infoContainer">
                <div >
                    <h1 className="text main">
                        {countryById.name}
                    </h1>
                </div>
                <div className="countryId">
                    <h2 className="text">{id}</h2>
                </div>
                <div className="languagesContainer text">
                    <h2 className="text">Idiomas hablados: </h2>
                    {
                        (countryById.languages) ? (
                            countryById.languages.map((l,i =1) => {
                                return (
                                    <h2 className="text" key={i++}>{l}</h2>
                                )
                            })
                        ): (
                            <h2 className="text">Sin idiomas hablados</h2>
                        )
                    }
                </div>
                <div >
                    <h2 className="text">
                        Nombre oficial: {countryById.official}
                    </h2>
                </div>
                <div>
                    <h2 className="text">
                        Capital: {countryById.capitol}
                    </h2>
                </div>
                <div>
                    <h2 className="text">
                        Continente: {countryById.continents}
                    </h2>
                </div>
                <div>
                    <h2 className="text">
                        Subregión: {countryById.subregion}
                    </h2>
                </div>
                <div>
                    <h3 className="text">
                        Área total: {countryById.area} km²
                    </h3>
                </div>
                <div>
                    <h3 className="text">
                        Población total: {countryById.population} personas
                    </h3>
                </div>
                <div>
                    <h4 className="text">Actividades turisticas: </h4>
                    {
                        (countryById.activities) ? (
                            countryById.activities.map((a, i) => {
                               
                                return (
                                    <div key={i++} style={{margin:'auto'}}>
                                        <h4 className="text" style={{display:"inline", margin:"auto", padding:"1%"}}>Nombre: {a.name}, </h4>
                                        <h4 className="text" style={{display: 'inline'}}>Duración: {a.duration}, </h4>
                                        <h4 className="text" style={{display: 'inline'}}>Dificultad: {a.dificulty}, </h4>
                                        <h4 className="text" style={{display:'initial'}}>Tipo: {a.type}</h4>
                                    </div>
                                    
                                )
                            })
                        ): (
                            <h4 className="text">No hay actividades turisticas aún, ¡agrega una!</h4>
                        )
                    }
                </div>
                    <div style={{marginTop: '5px'}}>
                    <Link to={`/countries/${countryById.id}/addActivity`} className="touristActivityLink">
                        <button className="touristActivityButton"> <p className="text">Agregar Actividad turistica</p> </button>
                    </Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getCountryDetail : (id) => dispatch(getCountryDetail(id))
    }
}

export default connect(null, mapDispatchToProps)(CountryPage)