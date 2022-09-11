import axios from 'axios'
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME'
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID'


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


export function searchCountryByName(name) {
    return function(dispatch) {
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


export function getCountryDetail(id) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/countries/${id}`)
        .then((response) => {
            dispatch({
                type: GET_COUNTRY_BY_ID,
                payload: response.data
            })
        })
    }
}