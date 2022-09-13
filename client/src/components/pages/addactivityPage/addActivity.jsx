import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCountries, getCountryDetail,  newActivity} from "../../../redux/actions";
import './addActivity.css'
import Navbar from "../../individualComponents/navbar/navbar";


function AddActivity(props) {
    let {id} = useParams()
    let countries = useSelector(state => state.countries)
    let fromCountry = useSelector(state => state.countryDetail)
    let [input, setInput] = React.useState({
        name: [],
        season: '',
        dificulty:  '',
        duration: '',
        description: '',
        id: [],
        type: []
    })
    React.useEffect(() =>{
        if(countries.length === 0 && id === 'unknow') {
            props.getAllCountries()
            
        }
        else {
            getCountryDetail(id)
            setInput({
                ...input,
                id: input.id.concat(id)
            })

        }
        
    }, [countries, fromCountry])


    function setId(e) {
        
            setInput({
                ...input,
                id: e.target.value
            })
    }
    
    function countrySelection(e) {
        if(input.id[0] === 'unknow') {
            input.id.shift()
        }
        setInput({
            ...input,
               name: input.name.concat(e.target.name),
               id: input.id.concat(e.target.value)
        })
    }
        
    
    function onInputChange(e) {
        
        
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function onTypeInput(e) {
        console.log(input)
        if(input.type.includes(e.target.value)){
            setInput({
                ...input,
                type: input.type.filter(t => t !== e.target.value)
            })
        }
        else {

            setInput({
                ...input,
                type: input.type.concat(e.target.value)
            })
        }
    }

    async function handleSubmit(e) {
        
        e.preventDefault()
        try {
            let send = await props.newActivity(input)
            
        } catch (error) {
            return error.message
        }
        
        
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
                    
                    <div>
                        <select multiple size={4} required onChange={(e) => countrySelection(e)}className="formSelect">
                        {
                            countries.map(e => {
                                return (
                                    <option key={e.id} name={e.name} value={e.id}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                    <h4 className="text">Paises seleccionados:</h4>
                    
                        {
                            (input.id) ? (
                                input.id.map((e,i) => {
                                    return (
                                        <h4 className="text label">{`${e}, `}</h4>
                                    )
                                })
                                ):(
                                    <h4 className="text">Selecciona al menos un país</h4>
                                )
                            
                        }
                  
                    </div>
                    
                ): (
                    <h4 className="text">{fromCountry.name}</h4>
                )
            }
            </div>
            <div className="inputContainer">
            <label htmlFor="name">Nombre: </label>
            <input required className='inputName' type="text" name="name" onChange={(e) => onInputChange(e)} id="name" value={input.name} placeholder='Ponle un nombre a la actividad' minLength={3} maxLength={20}/>
            </div>
            <div className="inputContainer">
                <label htmlFor="dificulty">Dificultad media de la actividad: </label>
                <select className='inputDificulty' required onChange={(e) => onInputChange(e)} name='dificulty' id='dificulty' value={input.dificulty} >
                    <option value=''>Elige una dificultad</option>
                    <option value='Muy fácil'>Muy fácil</option>
                    <option value='Fácil'>Fácil</option>
                    <option value='Algo desafiante'>Algo desafiante</option>
                    <option value='Difícil'>Difícil</option>
                    <option value='Muy difícil'>Muy difícil</option>
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="duration">Duración media de la actividad: </label>
                <select className="inputDuration" required onChange={(e) => onInputChange(e)} name='duration'  id='duration' value={input.duration}>
                    <option value="" >Duración media de la actividad</option>
                    <option value="Corta">Corta</option>
                    <option value="Media">Media</option>
                    <option value="Larga">Larga</option>
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="season">Temporada ideal para realizar la actividad: </label>
                <select className="inputSeason" required name="season" id="season" value={input.season} onChange={(e) => onInputChange(e)}>
                    <option value="">Temporada ideal para la actividad</option>
                    <option value="Verano">Verano</option>
                    <option value="Primavera">Primavera</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="type">Tipo de actividad</label>
                <input className='inputCheckbox' type="checkbox" name="type" value='Para solteros'  onChange={(e) => onTypeInput(e)} id="paraSolteros" /> <label className="text label" htmlFor="paraSolteros">Para solteros</label>
                <input className='inputCheckbox' type="checkbox" name="type" value='Familiar' onChange={(e) => onTypeInput(e)} id="familiar" /> <label className="text label" htmlFor="familiar">Familiar</label>
                <input className='inputCheckbox' type="checkbox" name="type" value='De negocios' onChange={(e) => onTypeInput(e)} id="deNegocios" /> <label className="text label" htmlFor="deNegocios">De Negocios</label>
                <input className='inputCheckbox' type="checkbox" name="type" value='Para relajarse' onChange={(e) => onTypeInput(e)} id="paraRelajarse" /> <label className="text label" htmlFor="paraRelajarse">Para relajarse</label>
                <input className='inputCheckbox' type="checkbox" name="type" value='Para grupos' onChange={(e) => onTypeInput(e)} id="paraGrupos" /> <label className="text label" htmlFor="paraGrupos">Para grupos</label>
            </div>
            <div className="inputContainer">
                <label htmlFor="description">Describre brevemente la actividad: </label>
                <input autoComplete="off"  required className='description' name='description' type="text" onChange={(e)=> onInputChange(e)} value={input.description} maxLength={255} minLength={80} placeholder='la descripcion debe de tener al menos 80 caracteres  y maximo 255'  id='descrption'/>
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
        newActivity: (info)=> dispatch(newActivity(info))
    }
}

export default connect(null, mapDispatchToProps)(AddActivity)