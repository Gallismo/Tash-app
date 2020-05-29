const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    cost: {type: Number, required: true},
    to: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    code: {type: String, required: true, unique: true},
    createdBy: {type: Types.ObjectId, ref:'User'},
    phoneNumber: {type: Number, required:true},
    clicks: {type: Number, default: 0},
    createdByNick: {type: String, required: true}
});

module.exports = model ('Product', schema);