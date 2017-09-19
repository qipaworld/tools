
var sharp = require('sharp');
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
	
	// console.log("addSizeToName finished".info);  
}
addSizeToName.rename = function(icon_path,name,format){
	var directory = qp.path.dirname(icon_path);
	
	var image = sharp(icon_path);
	image.metadata(function(err, metadata) {
		if (err){
			console.log(icon_path.error);
		}
		else{
			var temp_path = "/qipaworldIcon/"+name+"_"+metadata.width+"_"+metadata.height+"."+format
			var path = "."+temp_path
			if (directory!="") {
				path = directory + temp_path
			}
			qp.mkdirs(qp.path.dirname(path));//检测路径是否存在，没有就创建一个

			image.toFile(path, function (err) {
		    	if(err){
		    		console.log(path.error);
		    	}
				else{
					console.log(path.green);
				}
				        
		    });
		}
	});

}
module.exports=addSizeToName;
