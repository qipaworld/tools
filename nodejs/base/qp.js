
require("./logColor.js");
var qp = {};

qp.fs = require("fs");
qp.assert =  require('assert');

qp.path = require('path');
qp.mkdirs = function(dirpath) {
	if(!qp.fs.existsSync(dirpath)){
        qp.mkdirs(qp.path.dirname(dirpath));
        qp.fs.mkdirSync(dirpath);
    }
}

module.exports = qp;
