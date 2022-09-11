const axios = require('axios')
const {Router}  = require('express')
const { allCountries, getCountryById } = require('../controllers/country.js')

let route = Router()


route.get('/', allCountries)
route.get('/:idPais', getCountryById)




module.exports = route


