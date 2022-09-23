
var sharp = require('sharp');

var imageResize = {}
imageResize.start = function(input_parameter,output_parameter)
{
	//排序
	// output_parameter.sort(function (a,b) {
	// 	return b.width - a.width;
	// })
	
	qp.assert(input_parameter,"no input_parameter".error);
	qp.assert(output_parameter,"no output_parameter".error);

	for (var i in input_parameter) 
	{
		var input_path = input_parameter[i];
		var directory =qp.path.dirname(input_path);
		for (var i in output_parameter) 
		{
			var data = output_parameter[i];

			qp.assert(data.path,"no output image path".error);
			qp.assert(data.width,"no output image size".error);
			
			var path = "./"+data.path
			if (directory!="") {
				path = directory + "/" + data.path
			}
			
			qp.mkdirs(qp.path.dirname(path));//检测路径是否存在，没有就创建一个
			sharp(input_path)
		    .resize(data.width, data.height || data.width)
		    .sharpen()
		    .toFile(path, function (err) {
		    	if(err){
		    		console.log(path.error);
		    	}
	    		else{
	    			console.log(path.green);
	    		}
				        
		    });

		}
	}
	// console.log("imageResize finished".info);  
}
module.exports=imageResize;
