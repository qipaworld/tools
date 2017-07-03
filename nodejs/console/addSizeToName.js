
qp = require("../base/qp.js");
var addSizeToName = require("../imageTrools/addSizeToName.js");
function main(){
	var source_image = process.argv.splice(2);
	addSizeToName.start(source_image[0],source_image[1],source_image[2]);
}
main();
