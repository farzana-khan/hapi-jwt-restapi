'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const mongoose = require('mongoose');

process.env.SECRET_KEY = 'secret';

/*exports.plugin = {
    name: 'myPlugin',
    //pkg: require('./package.json'),
    register: async function (server, options) {
        
        //Sign Up
        server.route(*/
module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: async function (request, h) {
            const userData = {
                first_name: request.payload.first_name,
                last_name: request.payload.last_name,
                email: request.payload.email,
                password: request.payload.password,
            }

            return User.findOne({
                email: request.payload.email
            })
                .then(user => {
                    if (!user) {
                        bcrypt.hash(request.payload.password, 10, (err, hash) => {
                            userData.password = hash
                            return User.create(userData)
                                .then(user => {
                                    return { status: user.email + 'Registered!' }
                                })
                                .catch(err => {
                                    return 'error: ' + err
                                })
                        })
                        return userData //{ status: userData.email = 'Registered!' }
                    } else {
                        return { error: 'User already exists' }
                    }
                })
                .catch(err => {
                    return 'error: ' + err
                })
        }
    },

    //Log In
    {
        method: 'POST',
        path: '/login',
        handler: async function (request, h) {
            return User.findOne({
                email: request.payload.email
            })
                .then(user => {
                    if (user) {
                        if (bcrypt.compareSync(request.payload.password, user.password)) {
                            const payload = {
                                id: user._id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email
                            }

                            let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1440 })
                            return token;
                        }
                        else {
                            return { error: 'User does not exist' }
                        }
                    }
                    else {
                        return { error: 'User does not exist' }
                    }
                })
                .catch(err => {
                    return { error: err }
                })
        }
    },

    //View Profile
    {
        method: 'GET',
        path: '/profile',
        handler: async function (request, h) {
            var decoded = jwt.verify(
                request.headers.authorization,
                process.env.SECRET_KEY
            )

            return User.findOne({
                _id: mongoose.Types.ObjectId(decoded.id)
            })
                .then(user => {
                    if (user) {
                        return user
                    } else {
                        return 'User does not exist'
                    }
                })
                .catch(err => {
                    return 'error ' + err
                })
        }
    },


    //Add User
    {
        method: 'POST',
        path: '/add',
        handler: async function (request, h) {
            var decoded = jwt.verify(
                request.headers.authorization,
                process.env.SECRET_KEY
            )
            return User.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(decoded.id),
            })
                .then(user => {
                    if (user) {
                        //return 'Only authenticated users can see photos'
                        let newUser = new User(request.payload); //req body on hapi
                        let result = newUser.save();
                        //user.books = result;
                        return (result);
                    } else {
                        return 'User is not authenticated'
                    }
                })
                .catch(err => {
                    return 'error ' + err
                })
        }
    },

    //Get All Users
    {
        method: 'GET',
        path: '/users',
        handler: async function (request, h) {
            var decoded = jwt.verify(
                request.headers.authorization,
                process.env.SECRET_KEY
            )
            return User.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(decoded.id),
            })
                .then(user => {
                    if (user) {
                        return User.find()
                        const users = db.users.find().pretty();
                        return users;
                    } else {
                        return 'User is not authenticated'
                    }
                })
                .catch(err => {
                    return 'error ' + err
                })
        }
    },

    //Get a User with Id
    {
        method: 'GET',
        path: '/user/{id}',
        handler: async function (request, h) {
            var decoded = jwt.verify(
                request.headers.authorization,
                process.env.SECRET_KEY
            )
            return User.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(decoded.id),
            })
                .then(user => {

                    if (user) {
                        return User.findOne(
                            {
                                _id: mongoose.Types.ObjectId(request.params.id)
                            },
                            (err, doc) => {
                                if (err) {
                                    return err, 'Internal MongoDB error'
                                }
                                if (!doc) {
                                    return 'Not found'
                                }
                                return doc
                            }
                        )
                    }
                })

        }
    },

    //Update a User
    {
        method: 'PATCH',
        path: '/user/{id}',
        handler: async function (request, h) {
            var decoded = jwt.verify(
                request.headers.authorization,
                process.env.SECRET_KEY
            )
            return User.findOne({
                _id: mongoose.Types.ObjectId(decoded.id),
            })
                .then(user => {

                    if (user) {
                        return User.findOneAndUpdate(
                            { _id: mongoose.Types.ObjectId(request.params.id) },
                            { first_name: request.payload.first_name },
                            (err, result) => {
                                if (err) {
                                    return err, 'Internal MongoDB error'
                                }
                                if (result.n === 0) {
                                    return 'Not found'
                                }
                                return 204
                            }
                        )
                    }
                })

        }
    },

    //Delete a User
    {
        method: 'DELETE',
        path: '/user/{id}',
        handler: async function (request, h) {
            var decoded = jwt.verify(
                request.headers.authorization,
                process.env.SECRET_KEY
            )
            return User.findOne({
                _id: mongoose.Types.ObjectId(decoded.id),
            })
                .then(user => {

                    if (user) {
                        return User.deleteOne(
                            { _id: mongoose.Types.ObjectId(request.params.id) },
                            (err, result) => {
                                if (err) {
                                    return err, 'Internal MongoDB error'
                                }
                                if (result.n === 0) {
                                    return 'Not found'
                                }
                                return 204
                            }
                        )
                    }
                })

        }
    }];

















