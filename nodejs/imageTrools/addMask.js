
qpConsole = require("../console/qpConsole.js");
var imageMask = require("./imageMask.js");
function main(){
	var source_image = process.argv.splice(2);
	imageMask.start(source_image[0],source_image[1]);
}
main();
