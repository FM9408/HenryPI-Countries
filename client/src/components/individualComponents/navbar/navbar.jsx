import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/searchbar";
import './navbar.css'




function Navbar ({handleSubmit,  onInput}) {
    return (
        <div id="navbar">
            <div className="navbarItem">
                <Link className='navbarLink' to='/home'>Home</Link>
            </div>
            <div className="navbarItem">
                <Link to={`/countries/unknow/addActivity`} className="navbarLink">Agregar Actividad turistica</Link>
            </div>
            <div className="navbarItem">
                <Searchbar handleSubmit={handleSubmit} onInput={onInput}/>
            </div>
        </div>
    )
}


export default Navbar