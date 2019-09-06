const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    jobSeeker: Boolean,
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
})

module.exports = mongoose.model('User', UserSchema)