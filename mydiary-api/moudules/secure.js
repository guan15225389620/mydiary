// 加密模块

var crypto = require('crypto')

function encryt(data, key) {
    var cipher = crypto.createCipher("bf", key);
    var newPsd = "";
    newPsd += cipher.update(data, "utf8", "hex");
    newPsd += cipher.final("hex");
    return newPsd;
}
function decryt(data, key) {
    var decipher = crypto.createDecipher("bf" ,key);
    var oldPsd = "" ;
    oldPsd += decipher.update(data,"hex","utf8");
    oldPsd += decipher.final("utf8");
    return oldPsd;
}

module.exports = {
    encryt,
    decryt
}