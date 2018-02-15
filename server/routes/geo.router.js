const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

let geoJsons = [];

function parseGeoInfo(array) {
    let geoData = {
        "type": 'Feature',
        "geometry": {
            "type": 'Point',
            "coordinates": []
        },
        "properties": {
            "name": '',
            "description": '',
            "id": '',
        }
    };
    for (let i = 0; i < array.length; i++) {
        const object = array[i];
        // console.log('geodata ', object);      
        geoData.geometry.coordinates[0] = object.lat;
        geoData.geometry.coordinates[1] = object.lon;
        geoData.properties.name = object.name;
        geoData.properties.id = object.unique_id;
        geoData.properties.description = object.description;
        geoJsons.push(geoData);
        geoData = {
            "type": 'Feature',
            "geometry": {
                "type": 'Point',
                "coordinates": []
            },
            "properties": {
                "name": ''
            }
        };
    }

    // for (const geoJson of geoJsons) {
    //     // console.log('name: ', geoJson.properties.name, '; coordinates: ', geoJson.geometry.coordinates, );
    // }
    return geoJsons;
}

/* GET REQUESTS */

router.get('/single/:lat/:lon/:id', (req, res) => {
    let trail_lat = req.params.lat;
    let trail_lon = req.params.lon;
    // console.log('lat, ', req.params.lat, 'lon, ', req.params.lon, 'id ', req.params.id);

    axios.get(`https://trailapi-trailapi.p.mashape.com/?lat=${trail_lat}&lon=${trail_lon}`, {
            headers: {
                "X-Mashape-Key": `${process.env.X_MASHAPE_KEY}`,
                "Accept": "text/plain"
            }
        })
        .then((response) => {
            for (let i = 0; i < response.data.places.length; i++) {
                const element = response.data.places[i];
                if (element.unique_id == req.params.id) {
                    // console.log('MATCH', element);
                    res.send(element);
                }
            }
            // console.log(response.data.places, 'response from single search');
        })
        .catch((err) => {
            console.log('err on single ', err);

        })
})

router.get('/:state', (req, res) => {

    axios.get(`https://trailapi-trailapi.p.mashape.com/?limit=100&q[state_cont]=${req.params.state}`, {
            headers: {
                "X-Mashape-Key": `${process.env.X_MASHAPE_KEY}`,
                "Accept": "text/plain"
            }
        })
        // .header("X-Mashape-Key", )
        // .header("Accept", "text/plain")
        .then(function (result) {
            // console.log('result ', result.data.places);  
            // console.log('result status: ', result.status, 'result headers: ', result.headers, 'result body: ', result.body);
            res.send(parseGeoInfo(result.data.places));
            geoJsons = [];
        })
        .catch((err) => {
            console.log('err on get, ', err);
        })
}); //end GET

/* POST REQUESTS */


router.post('/', (req, res) => {

}); // end post route

/* PUT REQUESTS */
router.put('/', (req, res) => {

});

/* DELETE REQUESTS */
router.delete('/', (req, res) => {

});

/* MISC FUNCTIONS (If any) */


module.exports = router;