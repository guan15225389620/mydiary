var mongoose = require('../moudules/database.js')
var schema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    nickname: String,
    email: String,
    mobile: Number,
    gender: Number,
    avatar: String
})

var Model = mongoose.model('userinfo', schema)

module.exports = Model