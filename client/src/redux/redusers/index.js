import {GET_ALL_COUNTRIES, GET_COUNTRY_NAME, GET_COUNTRY_BY_ID} from '../actions/index'

let initialState = {
    countries: [],
    countryDetail: {}
}

export default function  rootReducer(state = initialState, action) {
    switch (action.type) {
          case GET_ALL_COUNTRIES: {
            return {
                ...state,
                countries: action.payload
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
        default:
            return state
    }
}
