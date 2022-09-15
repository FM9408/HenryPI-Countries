import React from "react";
import { connect, useSelector } from "react-redux";
import { getAllCountries, orderAsentPopulation, orderDesenPopulation, filterByContinent, orderAsentByName, orderDecentByName, filterByActivity} from "../../../redux/actions";
import CountryCard from "../../individualComponents/countryCard/countryCard";
import Brazil from '../../../assets/brazil.svg'
import Venezuela from '../../../assets/venezuela.svg'
import Israel from '../../../assets/israel.svg'
import Chile from '../../../assets/chile.svg'
import Argentina from '../../../assets/argentina.svg'
import Suiza from '../../../assets/suiza.svg'
import './homepage.css'



export let dificulty = ['Muy fácil', 'Fácil', 'Algo desafiante', 'Difícil', 'Muy difícil']
export let duration = ['Corta', 'Media', 'Larga']
export let seasons = ['Verano', 'Primavera', 'Invierno', 'Otoño']
export let types = ['Para solteros', 'De negocios', 'Familiar', 'Para grupos', 'Para relajarse']

function Hompage(props) {
    let banderas = [Brazil, Chile, Venezuela, Israel, Argentina, Suiza]
    let countries = useSelector((state) => state.countries)
    let totalPages = Math.ceil(countries.length/10)
    let [actualPageCount, setActualPage] = React.useState(1) 
    let [page, setPage] = React.useState(0);
    let actualPage = countries.slice(page,page + 10)
    let [loading, setLoading] = React.useState(true)
    let [origen, setOrigen] = React.useState('')
    let popOrder = useSelector(state => state.popOrder)
    let entry = useSelector(state => state.entry)
    let [loadingText, setTexr] = React.useState('')
    let continent = useSelector(state => state.countinent)
    let activity = useSelector(state => state.activity)
    let [buttons, getDisabled] = React.useState({
        firstPageDisabled: true,
        prevPageDisabled: true,
        nextPageDisabled: false,
        lastPageDisabled: false
    })
    
   

    function firstPage() {
        getDisabled({
            firstPageDisabled: true,
            prevPageDisabled: true,
            nextPageDisabled: false,
            lastPageDisabled: false
        })
        setPage(0)
        setActualPage(1)
    }

    function nextPage() {
        if(countries.length <= page +10) {
            getDisabled({
                nextPageDisabled: true,
                lastPageDisabled: true
            })
            setPage(page)
            setActualPage(totalPages)

        }else {
            getDisabled({
                prevPageDisabled: false,
                firstPageDisabled: false
            })
            if(actualPageCount + 1 === totalPages) {
                getDisabled({
                    nextPageDisabled: true,
                    lastPageDisabled: true
                })
    
            }
            setPage(page + 10)
            setActualPage(actualPageCount + 1)
        }

    }
    function prvPage() {
        if(page < 9) {
            getDisabled({
                firstPageDisabled: true,
                prevPageDisabled: true,
            })
            setPage(0)
            setActualPage(1)
        } else {
            getDisabled({
                nextPageDisabled: false,
                lastPageDisabled: false
            })
            if(page <= 10) {
                getDisabled({
                    firstPageDisabled: true,
                    prevPageDisabled: true,
                })
            } 
            setPage(page - 10)
            setActualPage(actualPageCount -1)

        }

    }

    function lastPage() {
        getDisabled({
            firstPageDisabled: false,
            prevPageDisabled: false,
            nextPageDisabled: true,
            lastPageDisabled: true
        })
        setPage(countries.length - 10)
        setActualPage(totalPages)
    }

    function LoadingScreen() {
            setTimeout(() => {
                let random = banderas[Math.floor(Math.random()*banderas.length)]
                setOrigen(random)
                setTexr('Rellenando el océano...')
            })
            
            
            setTimeout(()=> {
                let random = banderas[Math.floor(Math.random()*banderas.length)]
                setOrigen(random)
                setTexr('Escupiendo a las llamas escupidoras...')
            }, 2000)
            setTimeout(() => {
                setTexr('Afrancesando a Francia...')
            }, 4000)
            
            setTimeout(()=> {
                let random = banderas[Math.floor(Math.random()*banderas.length)]
                setOrigen(random)
                setTexr('Preparando tacos...')

            }, 6000)
       
    }

    function orderByPop() {
        switch (popOrder) {
            case 'Población acendente': {
               
                return ( 
                    props.orderDesenPopulation()
                )
            }
            case 'Población decendente': {
                
                return (
                    props.orderAsentByName()
                )
            }
            case 'Nombre A-Z': {
                return (
                    props.orderDecentByName()
                )
            }
            case 'Nombre Z-A': {
                return (
                    props.getAllCountries()
                )
            }
        
            default:
                return(
                    props.orderAsentPopulation()
                )
        }
    }


    function filterByContinentfn(e) {
        setOrigen(banderas[Math.floor(Math.random()*banderas.length)])
        setLoading(true)
        setTexr('')
        props.getAllCountries()
        return (
            setTimeout(() => {
                props.filterByContinent(e.target.value)
            setLoading(false)
        }, 500)  
        ) 
          
    }

    function  filterByTouristActivity(e) {
        try {
            props.filterByActivity(e.target.value)
        } catch (error) {
            
        }
    }

    React.useEffect(() => {      
        if(countries.length === 0) {
            LoadingScreen()
            document.getElementById('navbar').style.visibility = 'hidden'
            setTimeout(() => {
                props.getAllCountries()
                
            },7000)
        } else {
            if(entry === true) {
                document.getElementById('navbar').style.visibility = 'visible'
                setOrigen(banderas[Math.floor(Math.random()*banderas.length)])
                setTimeout(()=> {
                    setLoading(false)
                firstPage()
                },1000)
                
            }
        }
        
        
    }, [countries, props.countries])
    return (
        <div className="homepage">
            {
                (loading === true) ? (
                    <div className="loadingScreen">
                        <img className='countryLoadingFlag' src={origen} alt="" />
                        <h1 className="loadingText">{loadingText}</h1>
                    </div>
                ): (
                 <div>
                    <div className="paginationButtons">
                        <button onClick={() => firstPage()} disabled={buttons.firstPageDisabled} className="paginationButton">{'<<'}</button>
                        <button onClick={() => prvPage()} disabled={buttons.prevPageDisabled} className="paginationButton">{'<'}</button>
                        {actualPageCount} de {totalPages}
                        <button  onClick={() => nextPage()} disabled={buttons.nextPageDisabled} className="paginationButton">{'>'}</button>
                        <button  onClick={() => lastPage()} disabled={buttons.lastPageDisabled} className="paginationButton">{'>>'}</button>
                    </div>
                    <div className="filtersAndOrders">
                        <div className="orderButtonContainer">
                            <button id='orderButton' onClick={() => orderByPop()}>Ordenar por: {popOrder}</button>
                        </div>
                        <div className="filterList">
                            
                            <select defaultValue={continent} id="continents" onChange={(e) => filterByContinentfn(e)}>
                                <option value=''>Todos los continentes</option>
                                <option value="South America">SudAmerica</option>
                                <option value='North America'>Norte America</option>
                                <option value='Africa'>África</option>
                                <option value='Europe'>Europa</option>
                                <option value= 'Asia'>Asia</option>
                                <option value='Antarctica'>Antartida</option>
                                <option value= 'Oceania'>Oceania</option>
                            </select>
                        </div>
                        <div className="filterbyTouristActivity">
                            <select name="touristActivity" defaultValue={activity} onChange={(e) => filterByTouristActivity(e)} id="touristActivity">
                                <option value={''}>Todos los tipos de Actividades</option>
                                {
                                    types.map((t, i) => {
                                        return (
                                            <option value={t} key={i}>{t}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flagsContainer">
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
                 </div>
                )
            }
        </div>
    )
}



function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries()),
        orderAsentPopulation: () => dispatch(orderAsentPopulation()),
        orderDesenPopulation:() => dispatch(orderDesenPopulation()),
        filterByContinent: (continent) => dispatch(filterByContinent(continent)),
        orderAsentByName: () => dispatch(orderAsentByName()),
        orderDecentByName: () => dispatch(orderDecentByName()),
        filterByActivity: (type) => dispatch(filterByActivity(type))
    }
}
export default connect(null, mapDispatchToProps)(Hompage)