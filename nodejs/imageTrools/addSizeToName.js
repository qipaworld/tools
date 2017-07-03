
var jimp = require("jimp");
var addSizeToName = {}
addSizeToName.start = function(path,name,format)
{
	qp.assert(path,"no path".error);
	if (!format) {
		format = "png"
		console.log("no format! >> format = png".error)
	}
	if (!name) {
		name = "image"
		console.log("no name! >> name = image".error)
	}
	var stats = qp.fs.statSync(path)
	if (stats.isFile()){
		addSizeToName.rename(path,name,format)
	}
	else{
		var files = qp.fs.readdirSync(path);
	    
	    files.forEach(function(filename){
			addSizeToName.rename(path+"/"+filename,name,format);
    	});
	}
	
	console.log("addSizeToName finished".info);  
}
addSizeToName.rename = function(icon_path,name,format){
	var directory = qp.getFileDirectory(icon_path);
	jimp.read(icon_path,function (err,icon_image) {
		if (!err){
			var temp_path = "/qipaworldIcon/"+name+"_"+icon_image.bitmap.width+"_"+icon_image.bitmap.height+"."+format
			var path = "."+temp_path
			if (directory!="") {
				path = directory + temp_path
			}
			icon_image.write(path);
		}
	});
}
module.exports=addSizeToName;
