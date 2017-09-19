
qp = require("../base/qp.js");
var exec = require('child_process').exec; 
function main(){
	var source_image = process.argv.splice(2);
	var icon_path = source_image[0];
	var mask_path = source_image[1];
	var format = source_image[2] || "png";
	var auto_size = source_image[3] || "";
	qp.assert(icon_path,"no icon_path".error);
	qp.assert(mask_path,"no mask_path".error);
	var mask_str = "node addMask.js " + icon_path + " " + mask_path + " " + format + " " + auto_size;
	var build = exec(mask_str, function(err,stdout,stderr){
	    if (err) throw err;
		console.log(stdout);
		var directory = qp.path.dirname(icon_path);
		var spawn_str = "node spawnIcon.js " + directory + "/qipaworldIcon/imageMask."+format;
		exec(spawn_str, function(err,stdout,stderr){
		    if (err) throw err;
			console.log(stdout);
		});
	});
}
main();
