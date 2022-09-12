import React from "react";
import { Link } from "react-router-dom";
import TemporalImage from '../../../img/countries.png'
import './temporalScreen.css'


function TemporalScreen() {
   


    return (
        <div className="temporalScreen">
            <img className='temporalImage' src={TemporalImage} alt='Imagen temporal' />
            <div className="buttonContainer">
                <Link to='/home'>
                    <button id="enterButton">Entrar</button>
                </Link>
            </div>
        </div>
    )
}

export default TemporalScreen