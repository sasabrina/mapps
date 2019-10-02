const express = require('express')
const path = require('path')

const locations = require('../api/locations')
const router = express.Router();


// PAGES ROUTES
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'))
})

// API ROUTES
router.get('/api/locations', locations.getLocation)

module.exports = router;