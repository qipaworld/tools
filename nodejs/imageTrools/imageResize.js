
var jimp = require("jimp");
var imageResize = {}
imageResize.start = function(input_parameter,output_parameter)
{
	output_parameter.sort(function (a,b) {
		return b.width - a.width;
	})

	qpConsole.assert(input_parameter,"no input_parameter".error);
	qpConsole.assert(output_parameter,"no output_parameter".error);

	for (var i in input_parameter) 
	{
		var input_path = input_parameter[i];
		var finder_path = input_path.substring(0,input_path.lastIndexOf("/"));

		jimp.read(input_path).then(function (image) {
			for (var i in output_parameter) 
			{
				var data = output_parameter[i];

				qpConsole.assert(data.path,"no output image path".error);
				qpConsole.assert(data.width,"no output image size".error);
				
				var path = "./"+data.path
				if (finder_path!="") {
					path = finder_path + "/" + data.path
				}
				image.resize(data.width,data.height || data.width).write(path);
			}
		});
		
	}
	console.log("imageResize finished".info);  
}
module.exports=imageResize;
