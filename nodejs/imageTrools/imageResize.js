
var jimp = require("jimp");
var imageResize = {}
imageResize.start = function(input_parameter,output_parameter)
{
	output_parameter.sort(function (a,b) {
		return b.width - a.width;
	})

	qp.assert(input_parameter,"no input_parameter".error);
	qp.assert(output_parameter,"no output_parameter".error);

	for (var i in input_parameter) 
	{
		var input_path = input_parameter[i];
		var directory =qp.getFileDirectory(input_path);
		
		jimp.read(input_path).then(function (image) {
			for (var i in output_parameter) 
			{
				var data = output_parameter[i];

				qp.assert(data.path,"no output image path".error);
				qp.assert(data.width,"no output image size".error);
				
				var path = "./"+data.path
				if (directory!="") {
					path = directory + "/" + data.path
				}
				
				image.resize(data.width,data.height || data.width).write(path);
			}
		});
		
	}
	console.log("imageResize finished".info);  
}
module.exports=imageResize;
