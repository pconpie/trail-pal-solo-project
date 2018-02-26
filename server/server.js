require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('./strategies/user.strategy');
const sessionConfig = require('./modules/session-middleware');

const db = require('./modules/db.config.js');

const userRouter = require('./routes/user.router');
const geoRouter = require('./routes/geo.router');
const favoritesRouter = require('./routes/favorites.router');
const commentsRouter = require('./routes/comments.router');
const imagesRouter = require('./routes/images.router');
const onLoadRouter = require('./routes/onLoad.router');


const stateGrabber = require('./modules/stateData.module');



app.use(express.static('server/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/geoInfo', geoRouter);
app.use('/favorites', favoritesRouter);
app.use('/comments', commentsRouter);
app.use('/images', imagesRouter);
app.use('/onLoad', onLoadRouter);





/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Listening on port: ', app.get('port'));
});