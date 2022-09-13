import React from "react";
import { connect, useSelector } from "react-redux";
import { getAllCountries, orderAsentPopulation, orderDesenPopulation, filterByContinent, orderAsentByName, orderDecentByName, filterByActivity} from "../../../redux/actions";
import CountryCard from "../../individualComponents/countryCard/countryCard";
import Navbar from "../../individualComponents/navbar/navbar";
import Brazil from '../../../assets/brazil.svg'
import Venezuela from '../../../assets/venezuela.svg'
import Israel from '../../../assets/israel.svg'
import Chile from '../../../assets/chile.svg'
import Argentina from '../../../assets/argentina.svg'



import './homepage.css'


function Hompage(props) {
    let banderas = [Brazil, Chile, Venezuela, Israel, Argentina]
    let countries = useSelector((state) => state.countries)
    let totalPages = Math.ceil(countries.length/10)
    let [actualPageCount, setActualPage] = React.useState(1) 
    let [page, setPage] = React.useState(0);
    let actualPage = countries.slice(page,page + 10)
    let [loading, setLoading] = React.useState(true)
    let [origen, setOrigen] = React.useState('')
    let popOrder = useSelector(state => state.popOrder)
    let [entry, setSntry] = React.useState(true)
    
   

    function firstPage() {
        setPage(0)
        setActualPage(1)
    }

    function nextPage() {
        if(countries.length <= page +10) {
            setPage(page)
            setActualPage(totalPages)
        }else {
            setPage(page + 10)
            setActualPage(actualPageCount + 1)
        }

    }
    function prvPage() {
        if(page < 14) {
            setPage(0)
            setActualPage(1)
        } else {
            setPage(page - 10)
            setActualPage(actualPageCount -1)
        }

    }

    function lastPage() {
        setPage(countries.length - 10)
        setActualPage(totalPages)
    }

    function LoadingScreen() {
            setTimeout(() => {
                let random = banderas[Math.floor(Math.random()*banderas.length)]
                setOrigen(random)
            })
            setTimeout(()=> {
                let random = banderas[Math.floor(Math.random()*banderas.length)]
                setOrigen(random)
            }, 2000)
            setTimeout(()=> {
                let random = banderas[Math.floor(Math.random()*banderas.length)]
                setOrigen(random)
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
            case 'Nombre acendente': {
                return (
                    props.orderDecentByName()
                )
            }
            case 'Nombre decendente': {
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
       switch (e.target.value) {
           case 'Africa': {
                setLoading(true)
               props.getAllCountries()
               return (
                   setTimeout(() => {
                    setLoading(false)
                    props.filterByContinent('Africa')
                }, 1000)   
                )
            }
            case 'North America': {
                setLoading(true)
                props.getAllCountries()
                return (
                    setTimeout(()=>
                        {props.filterByContinent('North America')
                        setLoading(false)
                    },1000)   
                    )
                }
                case 'South America': {
                    setLoading(true)
                    props.getAllCountries()
                    return (
                        setTimeout(()=>{props.filterByContinent('South America')
                         setLoading(false)},1000)   
                        
               )
           }
           case 'Antarctica': {
            setLoading(true)
               props.getAllCountries()
               return (
                setTimeout(()=>{props.filterByContinent('Antarctica')
                setLoading(false)},1000)   
               )
           }
           case 'Europe': {
               props.getAllCountries()
               setLoading(true)
               return (
                setTimeout(()=>{props.filterByContinent('Europe')
                setLoading(false)},1000)
               )
           }
           case 'Oceania': {
            setLoading(true)
               props.getAllCountries()
               return (
                setTimeout(()=>{props.filterByContinent('Oceania')
                setLoading(false)
                },1000)  
               )
           }
           case 'Asia': {
            setLoading(true)
               props.getAllCountries()
               return (
                setTimeout(()=>{props.filterByContinent('Asia')
                setLoading(false)},1000) 
               )
           }
           
       
        default:
            props.getAllCountries()
       }
        
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
            setTimeout(() => {
                props.getAllCountries()
                
            },7000)
        } else {
            if(entry === true) {
                setLoading(false)
                firstPage()
                setSntry(false)
            }
        }
        
        
    }, [countries, props.countries])
    return (
        <div className="homepage">
            {
                (loading === true) ? (
                    <div className="loadingScreen">
                        <img className='countryLoadingFlag' src={origen} alt="" />
                    </div>
                ): (
                 <div>
                    <div className="navbarContainer">
                        <Navbar  />
                    </div>
                    <div className="paginationButtons">
                        <button onClick={() => firstPage()} className="paginationButton">{'<<'}</button>
                        <button onClick={() => prvPage()} className="paginationButton">{'<'}</button>
                        {actualPageCount} de {totalPages}
                        <button  onClick={() => nextPage()} className="paginationButton">{'>'}</button>
                        <button  onClick={() => lastPage()} className="paginationButton">{'>>'}</button>
                    </div>
                    <div className="filtersAndOrders">
                        <div className="orderButtonContainer">
                            <button id='orderButton' onClick={() => orderByPop()}>Ordenar por: {popOrder}</button>
                        </div>
                        <div className="filterList">
                            
                            <select id="continents" onChange={(e) => filterByContinentfn(e)}>
                                <option value={null} selected>Todos los continentes</option>
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
                            <select name="touristActivity" onChange={(e) => filterByTouristActivity(e)} id="touristActivity">
                                <option value={null}>Todos los tipos de Actividades</option>
                                <option value="Familiar">Familiar</option>
                                <option value="Para solteros">Para solteros</option>
                                <option value="Para relajarse">Para relajarse</option>
                                <option value="De negocios">De negocios</option>
                                <option value="Para Grupos">Para grupos</option>
                            </select>
                        </div>
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
        orderAsentPopulation: () => dispatch(orderAsentPopulation()),
        orderDesenPopulation:() => dispatch(orderDesenPopulation()),
        filterByContinent: (continent) => dispatch(filterByContinent(continent)),
        orderAsentByName: () => dispatch(orderAsentByName()),
        orderDecentByName: () => dispatch(orderDecentByName()),
        filterByActivity: (type) => dispatch(filterByActivity(type))
    }
}
export default connect(null, mapDispatchToProps)(Hompage)