import React from "react";
import { connect} from "react-redux";
import { searchCountryByName} from "../../../redux/actions";
import './searchbar.css'




function Searchbar(props) {
    let [input, onInput] = React.useState('')
    
    function onInputChange(e) {
        onInput(e.target.value)
        
    }
    
    
    
    function handleSubmit(e) {
        e.preventDefault()
        props.searchCountryByName(input.toLowerCase())
        
       
      
    }

    
    return(
        <div id="searchBar">
            <form method="get" >
                <input onChange={(e) => onInputChange(e)}type="search" name="" id="searchbarInput" placeholder="Buscar país"/>
                <button onClick={(e) => handleSubmit(e)} id="searchButton" type="submit">Buscar</button>
            </form>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        searchCountryByName: (name) => dispatch(searchCountryByName(name)),
        
        
    }
}

export default connect (null, mapDispatchToProps) (Searchbar)