
qp = require("../base/qp.js");

var imageResize = require("../imageTrools/imageResize.js");
var YAML = require("js-yaml");
 
var icon_ids = [
	"./spawnIcon.yaml",	
	// "./ios.yaml",	
]
function main(){
	var source_image = process.argv.splice(2)[0];
	qp.assert(source_image,"no source_image".error);
	for (var i in icon_ids ) {
		var data = icon_ids[i];
		var icon_parametes_data = qp.fs.readFileSync(data,"utf-8").toString();
		var icon_parametes = YAML.safeLoad(icon_parametes_data);
		imageResize.start([source_image],icon_parametes)
	}
}
main();
