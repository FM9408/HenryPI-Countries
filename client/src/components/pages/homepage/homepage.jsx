import React from "react";
import { connect, useSelector } from "react-redux";
import { getAllCountries, searchCountryByName } from "../../../redux/actions";
import CountryCard from "../../individualComponents/countryCard/countryCard";
import Navbar from "../../individualComponents/navbar/navbar";

import './homepage.css'


function Hompage(props) {
    let countries = useSelector((state) => state.countries)
    let totalPages = Math.ceil(countries.length/15)
    let [actualPageCount, setActualPage] = React.useState(1) 
    let [page, setPage] = React.useState(0);
    let actualPage = countries.slice(page,page + 15)
    let [loading, setLoading] = React.useState(true)
    let [loadingText, setText] =React.useState('Cargando')
    let [input, onInput] = React.useState('')
    
    function handleSubmit(e) {
        e.preventDefault()
        props.searchCountryByName(input.toLowerCase())
        setPage(0)
        setActualPage(1) 
      
    }

    function firstPage() {
        setPage(0)
        setActualPage(1)
    }

    function nextPage() {
        if(countries.length <= page +15) {
            setPage(page)
            setActualPage(totalPages)
        }else {
            setPage(page + 15)
            setActualPage(actualPageCount + 1)
        }

    }
    function prvPage() {
        if(page < 14) {
            setPage(0)
            setActualPage(1)
        } else {
            setPage(page - 15)
            setActualPage(actualPageCount -1)
        }

    }

    function lastPage() {
        setPage(countries.length - 15)
        setActualPage(totalPages)
    }

    function LoadingScreen() {
        setInterval(() => {
            setTimeout(() => {
                setText('Cargando.')
            }, 300)
            setTimeout(()=> {
                setText('Cargando..')
            }, 600)
            setTimeout(()=> {
                setText('Cargando...')
            }, 900)
        },900)
    }

    React.useEffect(() => {
        if(countries.length === 0) {
            LoadingScreen()
            setTimeout(() => {
                props.getAllCountries()
            },4000)
          
        } else {
            setLoading(false)
        }
        
        
    }, [countries, props])
    return (
        <div className="homepage">
            {
                (loading === true) ? (
                    <div className="loadingScreen">
                        {loadingText}
                    </div>
                ): (
                 <div>
                    <div className="navbarContainer">
                        <Navbar handleSubmit={(e) => handleSubmit(e)} onInput={(e) => onInput(e)} />
                    </div>
                    <div className="paginationButtons">
                        <button onClick={() => firstPage()} className="paginationButton">{'<<'}</button>
                        <button onClick={() => prvPage()} className="paginationButton">{'<'}</button>
                        {actualPageCount} de {totalPages}
                        <button  onClick={() => nextPage()} className="paginationButton">{'>'}</button>
                        <button  onClick={() => lastPage()} className="paginationButton">{'>>'}</button>
                    </div>
                    {
                        actualPage.map((e) => {
                            return (
                                <CountryCard
                                    name={e.name}
                                    continent= {e.continents}
                                    flag= {e.flag}
                                    key= {e.id}
                                    id={e.id}
                                />
                            )
                        })
                    }
                 </div>
                )
            }
        </div>
    )
}



function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries()),
        searchCountryByName: (name) => dispatch(searchCountryByName(name))
    }
}
export default connect(null, mapDispatchToProps)(Hompage)