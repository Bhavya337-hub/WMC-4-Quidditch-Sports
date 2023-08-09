const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/quidditchDB", {useNewUrlParser: true}); 


const MatchSchema = new mongoose.Schema({
    clan1: {type: 'string', required: true},
    clan2: {type: 'string', required: true},
    date: {type: 'date', required: true,unique: true},
    t1u1: {type: 'string', default: null},
    t1u2: {type: 'string', default: null},
    t1u3: {type: 'string', default: null},
    t1u4: {type: 'string', default: null},
    t1u5: {type: 'string', default: null},
    t1u6: {type: 'string', default: null},
    t1u7: {type: 'string', default: null},
    t2u1: {type: 'string', default: null},
    t2u2: {type: 'string', default: null},
    t2u3: {type: 'string', default: null},
    t2u4: {type: 'string', default: null},
    t2u5: {type: 'string', default: null},
    t2u6: {type: 'string', default: null},
    t2u7: {type: 'string', default: null},
    status: {type: 'string', default: "not declared"}
}); 

const MatchModel = mongoose.model('match', MatchSchema);

module.exports = MatchModel;