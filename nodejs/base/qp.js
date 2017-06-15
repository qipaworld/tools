
require("./logColor.js");
var qp = {};

qp.fs = require("fs");
qp.assert =  require('assert');
qp.getFileDirectory = function(file_path){
    var directory = file_path.substring(0,file_path.lastIndexOf("/"));
        //检测平台
    if (process.platform == "win32"){
        if (directory == "") {
            directory = file_path.substring(0,file_path.lastIndexOf("\\"));
        }
    }
    return directory;
}
module.exports = qp;
