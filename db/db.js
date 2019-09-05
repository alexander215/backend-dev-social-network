const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dev-social', {
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('You are now connected to Mongoose.')
});

mongoose.connection.on('error', (err) => {
    console.log(err, 'Problem: Mongoose failed to connect.')
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected')
});