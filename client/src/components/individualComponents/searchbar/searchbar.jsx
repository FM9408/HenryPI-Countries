import React from "react";
import { connect } from "react-redux";

import './searchbar.css'




function Searchbar({handleSubmit, onInput}) {
   

    function onInputChange(e) {
        onInput(e.target.value)
        
    }

    

    
    return(
        <div id="searchBar">
            <form action="" method="post">
                <input onChange={(e) => onInputChange(e)}type="search" name="" id="searchbarInput" placeholder="Buscar país"/>
                <button onClick={(e) => handleSubmit(e)} id="searchButton" type="submit">Buscar</button>
            </form>
        </div>
    )
}




export default Searchbar