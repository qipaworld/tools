
var jimp = require("jimp");
var imageMask = {}
imageMask.start = function(icon_path,mask_path,format,auto_size)
{
	qp.assert(icon_path,"no icon_path".error);
	qp.assert(mask_path,"no mask_path".error);

	if (!format) {
		format = "png"
		console.log("no format! >> format = png".error)
	}

	var directory =qp.getFileDirectory(icon_path);

	jimp.read(icon_path).then(function (icon_image) {
		// 
		// console.log(icon_image.bitmap.width)
		// console.log(icon_image.bitmap.height)
		jimp.read(mask_path).then(function (mask_image) {
			if (auto_size){
				if(mask_image.bitmap.width != icon_image.bitmap.width || mask_image.bitmap.height != icon_image.bitmap.height){
					mask_image.resize(icon_image.bitmap.width,icon_image.bitmap.height)
				}
			} 
			var path = "./qipaworldIcon/imageMask."+format
			if (directory!="") {
				path = directory + "/qipaworldIcon/imageMask."+format
			}
			icon_image.composite(mask_image,1,1).write(path);
		});
	});
		
	console.log("imageMask finished".info);  
}
module.exports=imageMask;
