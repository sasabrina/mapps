const fs = require('fs');

let locations = fs.readFileSync('tmp/locations.json')
locations = JSON.parse(locations)

const getLocation = (req, res) => {
    res.json( {locations} )
}

const postLocation = (req, res) => {
    let data = req.body
    
    if(data.hasOwnProperty('coords')){
        locations.push(data)
        fs.writeFileSync('tmp/locations.json', JSON.stringify(locations))
        res.status('200').json(`Location received`)
    } else {
        res.status('400').json('Opps! Somenthing went wrong')
    }
}

module.exports = { getLocation, postLocation };