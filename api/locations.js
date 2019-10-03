const fs = require('fs');

let locations = fs.readFileSync('locations.json')
locations = JSON.parse(locations)

const getLocation = (req, res, next) => {
    res.json( {locations} )
}

const postLocation = (req, res, next) => {
    let data = req.body
    
    if(data.hasOwnProperty('coords')){
        locations.push(data)
        fs.writeFileSync('locations.json', JSON.stringify(locations))
        res.status('200').json(`Location received`)
    } else {
        res.status('400').json('Opps! Somenthing went wrong')
    }
}

module.exports = { getLocation, postLocation };