import React from "react";
import { Link, useHistory } from "react-router-dom";
import TemporalImage from '../../../img/countries.png'
import './temporalScreen.css'


function TemporalScreen() {
    let history = useHistory()


    function enter() {
        history.push('/')
        console.log(history)
    }
    return (
        <div className="temporalScreen">
            <img className='temporalImage' src={TemporalImage} alt='Imagen temporal' />
            <div className="buttonContainer">
                <Link to='/home'>
                    <button onClick={() => enter()} id="enterButton">Entrar</button>
                </Link>
            </div>
        </div>
    )
}

export default TemporalScreen