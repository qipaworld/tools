
qp = require("../base/qp.js");
var resizeTo = require("../imageTrools/resizeTo.js");
function main(){
	var source_image = process.argv.splice(2);
	var path = source_image[0];
	var width = source_image[1];
	var height = source_image[2];
	var files = qp.fs.readdirSync(path);
	qp.mkdirs(path+"/qipaworld");
    files.forEach(function(filename){
		resizeTo.start(path+"/"+filename,path+"/qipaworld/"+filename,width,height);
	});

}
main();
