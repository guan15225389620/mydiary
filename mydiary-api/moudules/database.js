var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/diary', { useMongoClient: true })
var db = mongoose.connection;
db.on('error', function (err) {
    console.log('数据库连接失败，原因：' + err);
})
db.once('open', function () {
    console.log('数据库连接成功')
})

module.exports = mongoose