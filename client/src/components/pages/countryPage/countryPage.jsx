import React from "react";
import { connect, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { getCountryDetail } from "../../../redux/actions";
import './countryPage.css'




function CountryPage(props) {
    let countryById = useSelector((state) => state.countryDetail)
    let {id} = useParams()
    let input = useSelector(state => state.input)
   
    React.useEffect(() => {
        props.getCountryDetail(id)
        
    },[props, id] )

    
      
   

    return(
        <div>
            {
                input === true ? (
                    <Redirect to='/countries/home' />
                ): (
                    <div className="pageContainer">
            <div className="countryPageContainer">
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
                    <h2 style={{display: 'inline'}} className="text">Idiomas hablados: </h2>
                    {
                        (countryById.languages) ? (
                            countryById.languages.map((l,i =1) => {
                                return (
                                    <h2 style={{display: 'inline'}}className="text" key={i++}>{l} </h2>
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
                                        <h4 className="text" style={{display:'inline'}}> Tipo: {
                                            a.type.map((t,m) => {
                                                return (
                                                    `${m +1}: ${t} `
                                                )
                                            })
                                        } </h4>
                                    </div>
                                    
                                )
                            })
                        ): (
                            <h4 className="text">No hay actividades turisticas aún, ¡agrega una!</h4>
                        )
                    }
                </div>
                    <div style={{marginTop: '5px', display:'inline-flex', width:'100%', justifyContent:'center'}}>
                        <div style={{padding:'1%'}}>
                            <Link to={`/countries/${countryById.id}/addActivity`} className="touristActivityLink">
                                <button className="touristActivityButton"> <p className="text">Agregar Actividad turistica</p> </button>
                            </Link>
                        </div>
                        <div style={{padding:'1%'}}>
                            <Link to='/countries/home' className="touristActivityLink">
                                <button className='touristActivityButton'><p className="text">Regresar</p></button>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
                )
            }
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getCountryDetail : (id) => dispatch(getCountryDetail(id))
    }
}

export default connect(null, mapDispatchToProps)(CountryPage)