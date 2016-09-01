'use strict';

var mongoose = require('mongoose');
var schemas = require('../schemas/index.js');
var schema = schemas.category;


//schema.statics.getValByKey = function (key, callback) {
//    this.findOne({
//        key: key
//    }, callback);
//};


module.exports = mongoose.model('Category', schema);