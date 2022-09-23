
var sharp = require('sharp');
var imageMask = {}
imageMask.start = function(icon_path,mask_path,format,auto_size)
{
	qp.assert(icon_path,"no icon_path".error);
	qp.assert(mask_path,"no mask_path".error);

	if (!format) {
		format = "png"
		console.log("no format! >> format = png".error)
	}

	var directory =qp.path.dirname(icon_path);
	var icon_image = sharp(icon_path);

	var path = "./qipaworldIcon/imageMask."+format
	if (directory!="") {
		path = directory + "/qipaworldIcon/imageMask."+format
	}
	qp.mkdirs(qp.path.dirname(path));//检测路径是否存在，没有就创建一个
	if (auto_size){
		var mask_image = sharp(mask_path);
		icon_image.metadata(function(err, metadata) {
			mask_image.metadata(function(err, mask_metadata) {
				if(mask_metadata.width != metadata.width || mask_metadata.height != metadata.height){
					mask_image.resize(metadata.width,metadata.height).sharpen()
					.toBuffer()
					.then(function(outputBuffer) {
						imageMask.save(icon_image,path,outputBuffer);
					});
				}
			});
		});
	} 
	else{
		imageMask.save(icon_image,path,mask_path);
	}
		
}

imageMask.save = function(icon_image,path,mask){
	icon_image.overlayWith(mask,{ gravity: sharp.gravity.southeast })
	.toFile(path, function (err) {
    	if(err){
    		console.log(path.error);
    	}
		else{
			console.log(path.green);
		}
		        
    });
}
module.exports=imageMask;
