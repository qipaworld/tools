
var jimp = require("jimp");
var imageMask = {}
imageMask.start = function(icon_path,mask_path,format)
{
	qpConsole.assert(icon_path,"no icon_path".error);
	qpConsole.assert(mask_path,"no mask_path".error);

	if (!format) {
		format = "png"
		console.log("no format! >> format = png".error)
	}

	var finder_path = icon_path.substring(0,icon_path.lastIndexOf("/"));

	jimp.read(icon_path).then(function (icon_image) {
		jimp.read(mask_path).then(function (mask_image) {
			var path = "./imageMask."+format
			if (finder_path!="") {
				path = finder_path + "/imageMask."+format
			}
			icon_image.composite(mask_image,1,1).write(path);
		});
	});
		
	console.log("imageMask finished".info);  
}
module.exports=imageMask;
