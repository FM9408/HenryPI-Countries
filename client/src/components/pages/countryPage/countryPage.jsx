import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../../../redux/actions";
import Navbar from "../../individualComponents/navbar/navbar";
import './countryPage.css'




function CountryPage(props) {
    let countryById = useSelector((state) => state.countryDetail)
    let {id} = useParams()
    React.useEffect(() => {
        props.getCountryDetail(id)
    },[props] )


    
   

    return(
        <div className="pageContainer">
             <div className="navbarContainer">
                        <Navbar />
             </div>
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
                <div className="languagesContainer text">
                    <h2>Idiomas hablados: </h2>
                    {
                        (countryById.languages) ? (
                            countryById.languages.map(l => {
                                return (
                                    <h2 className="text">{l}</h2>
                                )
                            })
                        ): (
                            <div></div>
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