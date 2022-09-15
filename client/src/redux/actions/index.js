import axios from 'axios'
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID';
export const ORDER_ASEN_BY_POP ="ORDER_ASEN_BY_POP";
export const ORDER_DESEN_BY_POP = 'ORDER_DESEN_BY_POP';
export const FILTER_BY_CONTINENTS = 'FILTER_BY_CONTINENTS';
export const ORDER_BY_NAME_ASENT = 'ORDER_BY_NAME_ASENT';
export const ORDER_BY_NAME_DECENT = 'ORDER_BY_NAME_DECENT';
export const NEW_ACTIVITY = 'NEW_ACTIVITY';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
 
export  function getAllCountries() {
    return function(dispatch) {
        axios.get('http://localhost:3001/countries')
        .then((respone) => {
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: respone.data
            })
        })
    }
}


export  function searchCountryByName(name) {
    if(name === '') {
        return getAllCountries()
    } else {
        return  function(dispatch) {

            axios.get(`http://localhost:3001/countries?name=${name}`)
            .then((response) => {
               dispatch({
                    type: GET_COUNTRY_NAME,
                    payload: response.data
                })
                
            })
            .catch((err) => {
                dispatch({
                    type: GET_COUNTRY_NAME,
                    payload: [{
                        name: 'No se encuentra ningún país que coincida con la busqueda',
                        flag: '',
                        continent: ['any'],
                    }]
                })
            })
            
        }
    }
}


export function getCountryDetail(id) {
    return function(dispatch) {
       
        axios.get(`http://localhost:3001/countries/${id}`)
        .then((response) => {
            dispatch({
                type: GET_COUNTRY_BY_ID,
                payload: response.data
            })
        })
        .catch(err => {
            return err.response.data.err
        })
        
    }
}


export function orderAsentPopulation() {
    
        return {
            type: ORDER_ASEN_BY_POP
        }
}

export function orderDesenPopulation () {
    return {
        type: ORDER_DESEN_BY_POP
    }
}

export function orderAsentByName() {
    return {
        type: ORDER_BY_NAME_ASENT
    }
}

export function filterByContinent(continent) {
    if(!continent || continent === '') {
       return getAllCountries()
    } else {
        return {
            type: FILTER_BY_CONTINENTS,
            payload: continent
        }
    }
    
    
}


export function orderDecentByName() {
    return {
        type: ORDER_BY_NAME_DECENT
    }
}


export  function newActivity(info) {
    
    return async function () {
        try {
            await axios.post('http://localhost:3001/activities', {
            name: info.name,
            description: info.description,
            dificulty: info.dificulty,
            season: info.season,
            duration: info.duration,
            id: info.id,
            type: info.type
        })
       
        
        } catch (error) {
            throw new ErrorEvent(error.response.data.err)
        }
    }
    
}


export function filterByActivity(type) {
    if(!type || type === '') {
        getAllCountries()
    }
    else{
       return function(dispatch) {
            axios.get('http://localhost:3001/activities/?type=' + type)
            .then((response) => {
           dispatch({
            type: FILTER_BY_ACTIVITY,
            payload: {
                data: response.data,
                type: type
            }
           })
        })
       }
    }
    
}