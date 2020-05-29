'use strict';
const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nick: {type: String, required: true, unique: true},
    products: [{type: Types.ObjectId, ref: 'Product'}]
});

module.exports = model ('User', schema);