
require("./consoleColor.js");
var qpConsole = {};

qpConsole.fs = require("fs");
qpConsole.assert =  require('assert');
qpConsole.getFileDirectory = function(file_path){
    var directory = file_path.substring(0,file_path.lastIndexOf("/"));
        //检测平台
    if (process.platform == "win32"){
        if (directory == "") {
            directory = file_path.substring(0,file_path.lastIndexOf("\\"));
        }
    }
    return directory;
}
module.exports = qpConsole;
