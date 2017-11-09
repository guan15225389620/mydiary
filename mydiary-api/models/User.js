var mongoose = require('../moudules/database.js')
var schema =new mongoose.Schema({
    username: {
        required:true,
        type: String,  
        nameminlength: 2,
        namemaxlength:10
    },
    password: {
        type: String,
        required:true
    },
    email: {
        type: String,
        
        match: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    },
    mobile: {
        type: Number,
       
    }
})
schema.statics = {
    // 注册
    register: function (data, cb) {
        // 查询账号是否存在
        console.log(data)
        var filter = { username:data.name}
        Model.findOne(filter).exec(function (err, result) {
            if (err) {
                return cb({ code: 1, message: err });
            }
            if (result) {
                return cb({ code: 1, message: "注册的信息已存在" });
            } else {
                Model.insertMany(data, function (err, result) {
                    if (err) {
                        return cb({ code: 1, message: err });
                    }

                    return cb(null, result);
                })
            }
        });
    },
    // 登录
    login: function (data, cb) {
        var filter = {
            name: data.name, password: data.password 
        };
        Model.findOne(filter, function (err, result) {
            if (err) {
                return cb({ code: 1, message: err });
            }
            if (!result) {
                return cb({ code: 1, message: '账号或密码错误！' });
            }
            return cb(null, { code: 0, result });
        })
    },  
}


var Model = mongoose.model('users', schema)

module.exports = Model