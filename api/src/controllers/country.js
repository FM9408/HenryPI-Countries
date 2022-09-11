const { Country, Activity} = require('../db.js');
const {Op} = require('sequelize')
const axios = require('axios');
const {API_ALL} = process.env;



async function WriteDatabase() {
    let api = await axios.get(API_ALL);
    let data = api.data
    data.forEach(e=> {
        let languagues = []
        if(e.capital === undefined) {
            e.capital = null
        }
        if(e.subregion === undefined) {
            e.subregion = null
        }
        if(e.languages === undefined) {
            e.languages = null
        } else {
            for (const lang in e.languages) {
                if (Object.hasOwnProperty.call(e.languages, lang)) {
                    const element = e.languages[lang];
                    languagues.push(element)
                }
            }
        }
        
        Country.findOrCreate({
            where: {
                name: e.translations.spa.common,
                id: e.cca3,
                flag: e.flags[1],
                capitol: e.capital,
                subregion: e.subregion,
                area: e.area,
                population: e.population,
                continents: e.continents,
                official: e.translations.spa.official,
                languages: languagues
            }
        })
        
    });    
        
}


async function allCountries(req, res) {
    let {name} = req.query;
    try {
        if(!name) {
            let allCountries = await Country.findAll({include: Activity});
            res.send(allCountries)
        } else {
            let queryCountries = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}`
                    },
                },
                include: Activity
            });
            if(!queryCountries[0]) {
                let error = {
                    err: 'No se encuentra ingun país que coincida'
                }
                return res.status(404).send(error)
            } else {
                res.status(200).send(queryCountries)
            }
        }
    } catch (error) {
        res.send(error.message)
    }
}


async function getCountryById(req, res) {
    console.log(req.params)
    try {
        let idPais = req.params.idPais.toUpperCase()

        let country = await Country.findOne({
            where: {
                id: idPais
            },
            include: Activity
        });
        return res.json(country)
    } catch (error){
        res.send(error)
    }
}


module.exports = {
    WriteDatabase,
    allCountries,
    getCountryById
}