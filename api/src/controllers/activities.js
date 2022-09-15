const {Country, Activity} = require('../db.js')
const {Op} = require('sequelize')


async function newAct(req, res) {
    try {
        let {name, dificulty, duration, season, id, description, type} = req.body;
    
    let validate =  await Activity.findOne({
        where: {
            name: name,
        },
    });

    if(!validate) {
        if(description === undefined) {
            description = null
        }
        let addActivity = await Activity.create({
            name: name,
            dificulty: dificulty,
            duration: duration,
            season: season,
            description: description,
            type: type
        });
        let matchCountry = await Country.findAll({
            where: {
                id: id,
            },
        });

        let responseActivity = await addActivity.addCountries(matchCountry)
        return res.send(responseActivity)
    }
    let countryMatch = await Country.findAll({
        where: {
            id: id
        },
    });

    let response = await validate.addCountries(countryMatch)
    res.staus(201).send(response)
    } catch (error) {
        let err = {
            err: error.message
        }
        res.status(409).json({err: 'Alguno de los campos no fue rellenado'})
    }
}

async function getAllActivities(req, res) {
    try {
        let {type} = req.query
    let json = {
        activities: []
    }
    if(!type) {
        let activities = await Activity.findAll({include: Country})
        res.send(activities)
    } else {
        let queryActivities = await Activity.findAll({include: Country})

        queryActivities.forEach(a => {
            if(a.type.includes(type)) {
                json.activities.push(a)
            }

        })
        res.status(200).send(json)
        
    }
    } catch (error) {
        res.status(404).json({err: 'No encontrado'})
    }
}




module.exports = {
    newAct,
    getAllActivities,
    
}