const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/quidditchDB", {useNewUrlParser: true}); 

const UserSchema = new mongoose.Schema({
    username: {type: 'string',required: true,unique: true},
    email: {type: 'string',required: true,unique: true},
    clan: {type: 'string',required: true},
    status: {type: 'string',default: 'member'}
},{timestamps:true});

UserSchema.plugin(passportLocalMongoose);
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;