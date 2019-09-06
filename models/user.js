const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    jobSeeker: Boolean
})

module.exports = mongoose.model('User', UserSchema)