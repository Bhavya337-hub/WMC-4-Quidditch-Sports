const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/quidditchDB", {useNewUrlParser: true}); 


const MatchSchema = new mongoose.Schema({
    t1u1: {type: 'string',unique: true},
    t1u2: {type: 'string',unique: true},
    t1u3: {type: 'string',unique: true},
    t1u4: {type: 'string',unique: true},
    t1u5: {type: 'string',unique: true},
    t1u6: {type: 'string',unique: true},
    t1u7: {type: 'string',unique: true},
    t2u1: {type: 'string',unique: true},
    t2u2: {type: 'string',unique: true},
    t2u3: {type: 'string',unique: true},
    t2u4: {type: 'string',unique: true},
    t2u5: {type: 'string',unique: true},
    t2u6: {type: 'string',unique: true},
    t2u7: {type: 'string',unique: true},
    clan1: {type: 'string',required: true},
    clan2: {type: 'string',required: true},
    status: {type: 'string'},
    date: {type: 'date',required: true,unique: true},
},{timestamps:true}); 

MatchSchema.plugin(passportLocalMongoose);
const MatchModel = mongoose.model('match', MatchSchema);

module.exports = MatchModel;