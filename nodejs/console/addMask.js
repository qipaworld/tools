
qp = require("../base/qp.js");
var imageMask = require("../imageTrools/imageMask.js");
function main(){
	var source_image = process.argv.splice(2);
	imageMask.start(source_image[0],source_image[1],source_image[2],source_image[3]);
}
main();
