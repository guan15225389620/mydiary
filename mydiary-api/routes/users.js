var express = require('express');
var router = express.Router();
var User = require('../models/User.js')
var UserInfo = require('../models/UserInfo.js')
var secure = require('../moudules/secure')

/* GET users listing. */
router.route('/register')
  .post((req, res) => {
    var username = req.body.name;
    var password = req.body.password;
    var userinfo = new UserInfo({
      username:req.body.name
    })
    if (!username || !password){
      res.json({code :1 ,message: '输入数据不合法 ！'});
      return
    }
    password = secure.encryt(password,'buzhidao')
    User.register({ username,  password }, function (err, result) {
      if (err) {
        res.json({ code: 1, message: err.message });
        return;
      }
      userinfo.save(err=> {
        if(err) {
          res.json({code:1,massage:'info save err'})
          return
        }
      })
      req.session.username =username;
      res.json({ code: 0, message: '注册成功' });
    })
  })

router.route('/login')
  .post(function (req, res) {
    var username = req.body.name;
    var password = req.body.password;
    password = secure.encryt(password , 'buzhidao');

    User.login({ username, password},function (err,result) {
      if(err) {
        res.json({code: 1 , message :err.message})
        return;
      }
      req.session.username = username;
      res.json({code:0,message: '登录成功'})
    })
  })
router.route('/getinfo')
  .get(function (req,res) {
      UserInfo.findOne({
        username: req.session.username
      },function  (err,info) {
        if(err) {
          res.json({
            code: 1,
            message:'err',
            err:err
          })
        }
        res.json({
          code:0,
          data:info
        })
      })
  })
module.exports = router;
