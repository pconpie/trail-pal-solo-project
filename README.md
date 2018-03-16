# Name of Project

Trail Pal is a full stack web application that will enable users to find trails easier than ever before. Novice hikers and experienced hikers looking for new trails close by or interesting trails not far off can view trails organized by state and get quick info all in one view. If the user wants more detail on a specific trail they can click on that trail name to open a detailed trail view where comments can be added and viewed by logged in users.

## Built With
* Technologies
    * MongoDB
    * Express.js
    * AngularJs
    * Node.js
    * HTML5
    * CSS3
    * Angular Material
    * Mongoose
    * Passport.js
    * Trailapi for trail info
    * Leaflet.js for interactive map
    * Heroku

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
* Fork and clone the repo


### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)


### Installing

* npm install to get all required dependencies
* Create a .env file with a PORT number and trailapi key if wanting trail data
<!-- * Move angular, angular material, leaflet, fontawesome, and  -->
* Run npm start to get it running on local host


### Completed Features

High level list of items completed.

- [x] Interactive map of USA
- [x] Trailapi sourced for trail details
- [x] User registration and features
- [x] Trail detail pages with community interaction

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Cache data in the database for faster laoding times
- [ ] User able to add descriptions to trails

## Deployment

After installing with npm, run npm start to get the server going and then go to localhost on the PORT you setup in the .env file. Remember you may need a trailapi key to get trail data, which can also be placed in the .env file. Alternatively go to the heroku site https://trailpal.herokuapp.com/#!/ for a live demo.

## Authors

* Patrick Connelly (pconpie)
