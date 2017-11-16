var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var fs = require('fs')
var User = require('../models/User.js') 
var UserInfo = require('../models/UserInfo.js')
var secure = require('../moudules/secure')
var path = require('path')
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
            message:err,
          })
        }
        res.json({
          code:0,
          data:info
        })
      })
  })
router.route('/saveinfo')
  .post((req, res) => {
    UserInfo.findOneAndUpdate({
      username: req.session.username
    }, req.body, function (err, info) {
      if (err) {
        res.json({
          code: 1,
          message: err,  
        })
      }
      res.json({
        code: 0,
        message: 'ok'
      })
    })
  })

router.route('/uploadavater')
  .post((req,res) =>{
      UserInfo.findOne({
        username: req.session.username
      },(err,info) => {
        if(err) {
          res.json({
            code:1,
            message:err,
          })
          return
        }
        var form = new formidable.IncomingForm()
        console.log(form)
          form.encoding = 'utf-8';
          form.uploadDir = 'public/avatar/'
          form.keepExtensions = true;
          form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req,(err,fields,files) =>{
          if(err){
            res.send(err)
            return
          }
          var extName = '';  //后缀名
          switch (files.file.type) {
            case 'image/pjpeg':
              extName = 'jpg';
              break;
            case 'image/jpeg':
              extName = 'jpg';
              break;
            case 'image/png':
              extName = 'png';
              break;
            case 'image/x-png':
              extName = 'png';
              break;
          }
          if (extName.length == 0) {
            res.send(err)
            return
          }   
          var newName =  Date.now() + '.' + extName         
          fs.renameSync(files.file.path, form.uploadDir + newName);  //重命名
          info.avatar = 'http://localhost:3000/avatar/' + newName
          info.save(function () {       
                res.json({
                  code: 0,
                  data: info
                })
              })
            });      
        })
      })

module.exports = router;
