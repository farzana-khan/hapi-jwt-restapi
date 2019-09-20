'use strict'

const Hapi = require('hapi');
const mongoose = require('mongoose');

const Inert = require('inert');
const Vision = require('vision');

const routes = require('./routes/users');

const server = new Hapi.server({
    host: 'localhost',
    port: 3000,
})

//DB Connection
mongoose.connect('mongodb://localhost:27017/hapijslogin', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log(`Error in DB connection : ${err}`)}
});
mongoose.set('useFindAndModify', false);


const init = async() => {
    
        server.route(routes);
        await server.start()
        console.log('Server running on %s', server.info.uri);
    }

    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });

init();

