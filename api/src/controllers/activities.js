const {Country, Activity} = require('../db.js')

function newAct(req, res) {
    let {name, dificulty, duration, season, country} = req.body;
    
    let validate = Activity.findOne({
        where: {
            name: name,
        },
    });

    if(!validate) {
        let addActivity = Activity.create({
            name: name,
            dificulty: dificulty,
            duration: duration,
            season: season,
        });
        let matchCountry = Country.findAll({
            where: {
                id: country
            },
        });

        let responseActivity = addActivity.addCountries(matchCountry)
        return res.send(responseActivity)
    }
    let countryMatch = Country.findAll({
        where: {
            id: country
        },
    });

    let response = validate.addCountries(countryMatch)
    res.send(response)
}


module.exports = {
    newAct
}