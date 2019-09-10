const mongoose = require('mongoose');

// previous connect 'mongodb://localhost/dev-social'
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
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