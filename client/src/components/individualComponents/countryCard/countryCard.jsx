import React from "react";
import './countryCard.css'
import {Link} from 'react-router-dom'



function CountryCard({name, flag, continent, id}) {
    return (
        <div className="cards">
            {
                (flag)?(
                    <Link className='cardLink' to={`/country/${id}`}>
            <div className="countryCard">
            <div className="countryCardContent">
                <div className="countryCardImageContainer">
                    <img src={flag} alt={`bandera de ${name}`} className="countryCardImage" />
                </div>
                <div className="countryCardHighlineContainer">
                    <div className="countryCardHighlineText">
                        <h1>{name}</h1>
                        <h2>{continent}</h2>
                    </div>
                </div>
            </div>
        </div>
        </Link>
                ):(
                    <div className="countryCardAny">
                        <h1 className="any">
                            No se encontró ningun país que coincida
                        </h1>
                    </div>
                )
            }
        </div>
    )
}


export default CountryCard