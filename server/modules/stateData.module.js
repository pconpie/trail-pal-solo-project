// const express = require('express');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const StateData = require('../models/StateData');



// /* GET REQUESTS */
// let usaStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
//     'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
// ];

// let stateData = {
//     states: {
//     Alabama: 0,
//     Alaska: 0,
//     Arizona: 0,
//     Arkansas: 0,
//     California: 0,
//     Colorado: 0,
//     Connecticut: 0,
//     Delaware: 0,
//     Florida: 0,
//     Georgia: 0,
//     Hawaii: 0,
//     Idaho: 0,
//     Illinois: 0,
//     Indiana: 0,
//     Iowa: 0,
//     Kansas: 0,
//     Kentucky: 0,
//     Louisiana: 0,
//     Maine: 0,
//     Maryland: 0,
//     Massachusetts: 0,
//     Michigan: 0,
//     Minnesota: 0,
//     Mississippi: 0,
//     Missouri: 0,
//     Montana: 0,
//     Nebraska: 0,
//     Nevada: 0,
//     newHampshire: 0,
//     newJersey: 0,
//     newYork: 0,
//     northCarolina: 0,
//     northDakota: 0,
//     Ohio: 0,
//     Oklahoma: 0,
//     Oregon: 0,
//     Pennsylvania: 0,
//     rhodeIsland: 0,
//     southCarolina: 0,
//     southDakota: 0,
//     Tennessee: 0,
//     Texas: 0,
//     Utah: 0,
//     Vermont: 0,
//     Virginia: 0,
//     Washington: 0,
//     westVirginia: 0,
//     Wisconsin: 0,
//     Wyoming: 0,
//     }
// };

// function getStates() {
//     let count = 0;
//     // console.log('state ', state);
//     axios.get(`https://trailapi-trailapi.p.mashape.com/?limit=2000`, {
//             headers: {
//                 "X-Mashape-Key": `${process.env.X_MASHAPE_KEY}`,
//                 "Accept": "text/plain"
//             }
//         })
//         .then(function (result) {
//             count++;
//             console.log('result ', result.data.places);
//             for (const trail of result.data.places) {
//                 stateData.states[trail.state]++;
//             }
//             console.log('states', stateData);
//             let newStateData = new StateData(stateData);
//             console.log(newStateData);
//             newStateData.save()
//                 .then((thing) => {
//                     console.log('thing ', thing);
//                 })
//                 .catch((err) => {
//                     console.log('err on save states ', err);
//                 });
            
//         })
//         .catch((err) => {
//             console.log('err on get, ', err);
//         })
// }
// getStates();

// module.exports = stateData;