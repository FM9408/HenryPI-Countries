import React from "react";
import { connect} from "react-redux";
import { searchCountryByName, getAllCountries} from "../../../redux/actions";
import './searchbar.css'




function Searchbar(props) {
    let [input, onInput] = React.useState('')
    
    function onInputChange(e) {
        onInput(e.target.value)
        if(input === '') {
            props.getAllCountries()
        }
        else {
            props.searchCountryByName(input.toLowerCase())

        }
        
    }
    
    

    
    
    return(
        <div id="searchBar">
            <form method="get" id='searchbarForm' action="">
                <input onChange={(e) => onInputChange(e)}type="search" name="" id="searchbarInput" placeholder="Buscar país"/>
            </form>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        searchCountryByName: (name) => dispatch(searchCountryByName(name)),
        
        getAllCountries: () => dispatch(getAllCountries())
    }
}

export default connect (null, mapDispatchToProps) (Searchbar)