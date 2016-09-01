'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    // 名称
    username: {
		unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

schema.pre('save', next => {
	next();
})


module.exports = schema;