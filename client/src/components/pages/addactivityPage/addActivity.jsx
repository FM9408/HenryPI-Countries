import React from "react";
import { connect, useSelector } from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import { getAllCountries, getCountryDetail,  newActivity} from "../../../redux/actions";
import './addActivity.css'
import { seasons, duration, dificulty, types } from "../homepage/homepage";




function AddActivity(props) {
    let [errors, setErrors] = React.useState('')
    let [validForm, validFormSet] = React.useState(false)
    let {id} = useParams();
    let history = useHistory()
    let countries = useSelector(state => state.countries)
    let [page, setPage] = React.useState(0)
    let currentPage = countries.slice(page, page + countries.length/3)
    let fromCountry = useSelector(state => state.countryDetail)
    let [input, setInput] = React.useState({
        name: '',
        season: '',
        dificulty:  '',
        duration: '',
        description: '',
        id: [],
        type: []
    })


    function nextPage() {
        if(countries.length <= page + countries.length/3) {
            setPage(page)
            
        }else {
            setPage(page + countries.length/3)
            
        }

    }
    function prvPage() {
        if(page < (countries.length/3) -1) {
            setPage(0)
            
        } else {
            setPage(page - countries.length/3)
        }

    }
   
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
        
    }, [countries, fromCountry, id])

    function validation(input) {
        if(input.name.length >= 3  && input.name.length < 20) {
            if(input.duration.length !== 0) {
                if(input.id.length !==0 && !input.id.includes('unknow') ) {
                    if(input.season.length !== 0) {
                        if(input.type.length !== 0) {
                            if (input.dificulty.length !== 0 ) {
                               return  validFormSet(true)
                            }
                        }
                    }
                    
                } 
            }
        }
        validFormSet(false)
    }
    
    function countrySelection(e) {
        if(input.id[0] === 'unknow') {
            input.id.shift()
        }
        if(!input.id.includes(e.target.value)) {
            
            setInput({
                ...input,
                id: input.id.concat(e.target.value)
            })
            validation({
                ...input,
                [e.target.name]: e.target.value
            })
        }
        else {
            
            setInput({
                ...input,
                id: input.id.filter(f => f !== e.target.value)
            })
            validation({
                ...input,
                [e.target.name]: e.target.value
            })
           
        }


        
    }
    

    
    function onInputChange(e) { 
       
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
        return validation({
            ...input,
            [e.target.name]: e.target.value
        })
       

    }

    function onTypeInput(e) {
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


        return validation({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    

    
    async function handleSubmit(e) {

        e.preventDefault()
        try {
            let respuesta = await props.newActivity(input)
            setInput({
                name: '',
                season: '',
                dificulty:  '',
                duration: '',
                description: '',
                id: [],
                type: []
            })
        } catch (error) {
            setErrors(error.type)
            setTimeout(() => {
                setErrors('')
            }, 5000)
        }
        
        
    }
   
    return (
        <div className="pageContainer">
            <div className="AddActContainer" >
                {
                    errors.length > 0 ? (
                        <div>
                            <h1>Agrega una nueva activadad a algun país</h1>
                            <h2 className="error">{errors}</h2>
                        </div>
                    ):(
                        <div>
                            <h1>Agrega una nueva activadad a algun país</h1>
                        </div>
                    )
                }
            <form className="addNewActivityForm" action="POST"  >
            <div >
            {
                (id === 'unknow')?(
                    
                    <div style={{width: '100%'}}>
                        <label>Selecciona un pais: </label> 
                        <div style={{margin:'auto', display:'grid', gridTemplateColumns:'20% 20% 20% 20% 20%', justifyItems:'flex-start'}}>
                        {
                            currentPage.map(e => {
                                return (
                                   <div key={e.id} style={{}}> <input className='inputCheckbox' type="checkbox" name="id" value={e.id}  onChange={(e) => countrySelection(e)} id={e.id} /> <label className="text label" htmlFor={e}>{e.name}</label></div>
                                )
                            })
                        }
                        </div>
                        <div style={{marginTop:'55px'}}>
                        <button id='prevButton' onClick={() => prvPage()}>{'<'}</button><button id='nextButton' onClick={() => nextPage()}>{'>'}</button>
                        </div>
                    {
                        input.id.includes('unknow') ? (
                            <h4 className="text">Seleccciona al menos 1 país</h4>
                        ): (
                            <div>
                                <h4 className="text">Paises seleccionados:</h4>
                    
                                {
                                    (input.id) ? (
                                        input.id.map((e,i) => {
                                            return (
                                                <h4 key={i} className="text label">{`${e}, `}</h4>
                                            )
                                        })
                                        ):(
                                            <h4 className="text">Selecciona al menos un país</h4>
                                        )
                                    
                                }
                            </div>
                        )
                    }
                  
                    </div>
                    
                ): (
                    <h1 className="text">{fromCountry.name}</h1>
                )
            }
            </div>
            <div className="Container" >
            <div className="inputContainer" >
            <label htmlFor="name">Nombre: </label>
            <input required className='inputName' type="text" name="name" onChange={(e) => onInputChange(e)} id="name" value={input.name} placeholder='Ponle un nombre a la actividad' minLength={3} maxLength={20}/>
            </div>
            <div className="inputContainer">
                <label htmlFor="dificulty">Dificultad media de la actividad: </label>
                <select className='inputDificulty' required onChange={(e) => onInputChange(e)} name='dificulty' id='dificulty' value={input.dificulty} >
                    <option value=''>Elige una dificultad</option>
                    {
                        dificulty.map((e, i) => {
                            return (
                                <option key={i}value={e}>{e}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="duration">Duración media de la actividad: </label>
                <select className="inputDuration" required onChange={(e) => onInputChange(e)} name='duration'  id='duration' value={input.duration}>
                    <option value="" >Duración media de la actividad</option>
                    {
                        duration.map((e, i) => {
                            return (
                                <option key={i} value={e}>{e}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="season">Temporada ideal para realizar la actividad: </label>
                <select className="inputSeason" required name="season" id="season" value={input.season} onChange={(e) => onInputChange(e)}>
                    <option value="">Temporada ideal para la actividad</option>
                    {
                        seasons.map((e, i) => {
                            return (
                                <option key={i} value={e}>{e}</option>
                            )
                        })
                    }
                </select>
            </div>
            </div>
            <div style={{display:'block', padding:'10px', margin:'20px'}}>
                <label htmlFor="type" >Tipo de actividad</label>
                {
                    types.map((t, i) => {
                        return (
                            <div key={i} style={{display:'inline', margin:'3%'}}>
                                <input key={t} type="checkbox" name="type" value={t}  onChange={(e) => onTypeInput(e)} id={t} /> <label key={i} className="text label" htmlFor={t}>{t}</label>
                            </div>
                        )
                    })
                }
            </div>
            <div className="descriptionContainer">
                <label htmlFor="description">Describre brevemente la actividad: </label>
                <input autoComplete="off" className='description' name='description' type="text" onChange={(e)=> onInputChange(e)} value={input.description} maxLength={255} minLength={80} placeholder='la descripcion debe de tener al menos 80 caracteres  y maximo 255'  id='descrption'/>
            </div>
            <div>
                {
                    validForm === true ? (
                        <button onClick={(e) => handleSubmit(e)} className="createActivityButton">Crear actividad</button>
                    ):(
                        <button onClick={(e) => handleSubmit(e)} className="createActivityButton" disabled>Crear actividad</button>
                    )
                }
                <button onClick={history.goBack} className="createActivityButton">Regresar</button>
            </div>
            </form>
          
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