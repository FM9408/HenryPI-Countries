import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllCountries, getCountryDetail, searchCountryByName, newActivity} from "../../../redux/actions";
import './addActivity.css'
import Navbar from "../../individualComponents/navbar/navbar";


function AddActivity(props) {
    let {id} = useParams()
    let countries = useSelector(state => state.countries)
    let fromCountry = useSelector(state => state.countryDetail)
    let [input, setInput] = React.useState({
        name: '',
        season: 'Verano',
        dificulty:  0,
        duration: 'Corta',
        description: ''
    })
    React.useEffect(() =>{
        if(countries.length === 0 && id === 'unknow') {
            props.getAllCountries()
        }
        else {
            getCountryDetail(id)
            setInput({
                ...input,
                id: id
            })

        }
        
    }, [countries, fromCountry])


    function setId(e) {
        
            setInput({
                ...input,
                id: e.target.value
            })
    }
    
    
    function onInputChange(e) {
        
        
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            let send = await props.newActivity(input)
            
        } catch (error) {
            return error.message
        }
        props.history.push(`/countries/${input.id}`)
    }
    return (
        <div className="pageContainer">
            <Navbar />
            <div className="AddActContainer" >
            <form className="addNewActivityForm">
            <div className="inputContainer">
            <label>Selecciona un pais: </label> 
            {
                (id === 'unknow')?(
                    
                    <select onChange={(e) => setId(e)}className="formSelect">
                        {
                            countries.map(e => {
                                return (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                ): (
                    <h4 className="text">{fromCountry.name}</h4>
                )
            }
            </div>
            <div className="inputContainer">
            <label htmlFor="name">Nombre: </label>
            <input type="text" name="name" onChange={(e) => onInputChange(e)} id="name" value={input.name} placeholder='Ponle un nombre a la actividad' />
            </div>
            <div className="inputContainer">
                <label htmlFor="dificulty">Dificultad media de la actividad: </label>
                <select onChange={(e) => onInputChange(e)} name='dificulty' id='dificulty' value={input.dificulty} >
                    <option value="1">Muy fácil</option>
                    <option value="2">Fácil</option>
                    <option value="3">Algo desafiante</option>
                    <option value="4">Difícil</option>
                    <option value="5">Muy difícil</option>
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="duration">Duración media de la actividad: </label>
                <select onChange={(e) => onInputChange(e)} name='duration'  id='duration' value={input.duration}>
                    <option value="Corta">Corta</option>
                    <option value="Media">Media</option>
                    <option value="Larga">Larga</option>
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="season">Temporada ideal para realizar la actividad: </label>
                <select name="season" id="season" value={input.season} onChange={(e) => onInputChange(e)}>
                    <option value="Verano">Verano</option>
                    <option value="Primavera">Primavera</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="description">Describre brevemente la actividad: </label>
                <input className='description' name='description' type="text" onChange={(e)=> onInputChange(e)} value={input.description} maxLength={255} minLength={80} placeholder='la descripcion debe de tener al menos 80 caracteres  y maximo 255'  id='descrption'/>
            </div>
            </form>
            <button onClick={(e) =>handleSubmit(e)} id='createActivityButton' type='submit'>Crear actividad</button>
        </div>
        </div>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries()),
        getCountryDetail: (id) => dispatch(getCountryDetail(id)),
        searchCountryByName: (name) => dispatch(searchCountryByName(name)),
        newActivity: (info)=> dispatch(newActivity(info))
    }
}

export default connect(null, mapDispatchToProps)(AddActivity)