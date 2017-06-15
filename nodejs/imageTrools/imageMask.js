
var jimp = require("jimp");
var imageMask = {}
imageMask.start = function(icon_path,mask_path,format)
{
	qp.assert(icon_path,"no icon_path".error);
	qp.assert(mask_path,"no mask_path".error);

	if (!format) {
		format = "png"
		console.log("no format! >> format = png".error)
	}

	var directory =qp.getFileDirectory(icon_path);

	jimp.read(icon_path).then(function (icon_image) {
		jimp.read(mask_path).then(function (mask_image) {
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
