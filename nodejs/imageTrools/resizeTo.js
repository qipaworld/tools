
var sharp = require('sharp');

var resizeTo = {}
resizeTo.start = function(path,outPath,width,height)
{
	qp.assert(path,"no path".error);
	qp.assert(width,"no width".error);
	var image = sharp(path)
	if (height){
		image.resize(+width,+height)
	}
	else{
		image.resize(+width)
	}
    
    image.sharpen()
    .toFile(outPath, function (err) {
    	if(err){
    		console.log(path.error);
    	}
		else{
			console.log(path.green);
		}
		        
    });

}
module.exports=resizeTo;
