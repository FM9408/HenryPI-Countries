import {GET_ALL_COUNTRIES, GET_COUNTRY_NAME, GET_COUNTRY_BY_ID, ORDER_ASEN_BY_POP, ORDER_DESEN_BY_POP, FILTER_BY_CONTINENTS, ORDER_BY_NAME_ASENT, ORDER_BY_NAME_DECENT} from '../actions/index'

let initialState = {
    countries: [],
    countryDetail: {},
    popOrder: '',
}




export default function  rootReducer(state = initialState, action) {
    switch (action.type) {
          case GET_ALL_COUNTRIES: {
            return {
                ...state,
                countries: action.payload,
                popOrder: 'Ningún orden'
            }
          }
           case GET_COUNTRY_NAME: {
            return {
                ...state,
                countries: action.payload
            }
           }
           case GET_COUNTRY_BY_ID: {
            return {
                ...state,
                countryDetail: action.payload
            }
           } 
           case  ORDER_ASEN_BY_POP: {
            return {
                ...state,
                countries: state.countries.slice().sort(function(a,b) {
                    return a.population - b.population
                }),
                popOrder: 'Población acendente'
            }
           } 
           case ORDER_DESEN_BY_POP : {
            return {
                ...state,
                countries: state.countries.slice().sort(function (a,b) {
                    return a.population - b.population
                }).reverse(),
                popOrder: 'Población decendente'
            }
           }

           case ORDER_BY_NAME_ASENT: {
                return {
                    ...state,
                    countries: state.countries.slice().sort(function(a,b) {
                        if(a.name > b.name) {
                            return 1
                        }
                        if(a.name < b.name) {
                            return -1
                        }
                        else return 0
                    }),
                    popOrder: 'Nombre acendente'
                }
           }
           case ORDER_BY_NAME_DECENT: {
            return {
                ...state,
                countries: state.countries.slice().sort(function(a,b) {
                    if(a.name > b.name) {
                        return 1
                    }
                    if(a.name < b.name) {
                        return -1
                    }
                    else return 0
                }).reverse(),
                popOrder: 'Nombre decendente'
            }
           }
           case FILTER_BY_CONTINENTS: {
                return {
                    ...state,
                    countries: state.countries.filter(e => e.continents.includes(action.payload))

                    
                }
           }
        default:
            return state
    }
}
