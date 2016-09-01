'use strict';

var CONFIG = global.CONFIG;
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    // 名称
    name: {
        type: String,
        required: true
    },
    // URI
    uri: {
        type: String,
        required: true
    },
    // 封面
    cover: {
        type: String,
        required: true
    },
    // 文章数量
    posts: {
        type: Number,
        default: 0
    },
    // 分类元信息（方便扩展）
    meta: {
        type: Object,
        default: {}
    }
});


// 虚拟字段：分类封面路径
schema.virtual('coverUrl').get(function () {
    if (this.cover === CONFIG.category.cover) return '/static/img/' + this.cover;

    return '/static/uploads/'+ this.cover;
});


module.exports = schema;