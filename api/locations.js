const locations = [
    {
        name: 'Aeroterra', 
        address: 'Av. E. Madero 1020', 
        phoneNumber: '549 11 5272 0900', 
        category: 'Residencial', 
        coords: {
            lat: -34.595986,
            lng: -58.3724715
        },
        id: 1
    },
    {
        name: 'Workinn', 
        address: 'Pres. Tte. Gral. Juan Domingo Perón 698', 
        phoneNumber: '3333333', 
        category: 'Residencial', 
        coords: {
            lat: -34.6058542,
            lng: -58.3786129
        },
        id: 2
    }
]

const getLocation = (req, res, next) => {
    res.json({ locations })
    next()
}

module.exports = { getLocation };