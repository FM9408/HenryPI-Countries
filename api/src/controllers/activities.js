const {Country, Activity} = require('../db.js')

async function newAct(req, res) {
    let {name, dificulty, duration, season, id, description} = req.body;
    
    let validate =  await Activity.findOne({
        where: {
            name: name,
        },
    });

    if(!validate) {
        let addActivity = await Activity.create({
            name: name,
            dificulty: dificulty,
            duration: duration,
            season: season,
            description: description
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
    res.send(response)
}


module.exports = {
    newAct
}