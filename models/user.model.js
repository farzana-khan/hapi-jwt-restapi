'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name:  {
        type: String
    },
    last_name:  {
        type: String
    },
    email:  {
        type: String
    },
    password:  {
        type: String
    }
})

module.exports = mongoose.model('users', UserSchema);