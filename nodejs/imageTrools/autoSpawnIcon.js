
qpConsole = require("../console/qpConsole.js");

var imageResize = require("./imageResize.js");
var YAML = require("js-yaml");
 
var icon_ids = [
	"./autoIcon.yaml",	
	// "./ios.yaml",	
]
function main(){
	var source_image = process.argv.splice(2)[0];
	qpConsole.assert(source_image,"no source_image".error);
	for (var i in icon_ids ) {
		var data = icon_ids[i];
		var icon_parametes_data = qpConsole.fs.readFileSync(data,"utf-8").toString();
		var icon_parametes = YAML.safeLoad(icon_parametes_data);
		imageResize.start([source_image],icon_parametes)
	}
}
main();
