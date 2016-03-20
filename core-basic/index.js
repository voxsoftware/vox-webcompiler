var webpack= require("webpack");


var extend= function(obj1, obj2){
	obj2= obj2||{}
	for(var id in obj1){
		var o= obj1[id];
		var o2= obj2[id];
		if(typeof o === "object" && typeof o2 === "object"){
			extend(o,o2);
		}
	}

	for(var id in obj2){
		var o= obj1[id];
		var o2= obj2[id];
		if(o===undefined){
			obj1[id]= o2;
		}
	}
	return obj1
}



exports.default= exports.resolve= function(obj){
	var obj2= {
		"resolve":{
			"alias":{
				"buffer": __dirname + "/buffer-replace.js",
				"path": __dirname + "/path-replace.js",
				"events": __dirname + "/events-replace.js",
				"querystring": __dirname + "/querystring-replace.js",
				"url": __dirname + "/url-replace.js",
				"crypto": __dirname + "/crypto-replace.js",
				"vm": __dirname + "/vm-replace.js",
				"http": __dirname + "/http-replace.js",
				"https": __dirname + "/https-replace.js"
				/*,
				"process": __dirname + "/process-obj-replace.js"*/
			}
		}
	}

	extend(obj2, obj||{})
	obj2.plugins= obj2.plugins||[]
	obj2.plugins.push(new webpack.ProvidePlugin({
		"Buffer": __dirname + "/buffer-obj-replace.js"
	}))
	
	obj2.plugins.push(new webpack.ProvidePlugin({
		"process": __dirname + "/process-obj-replace.js"
	}))
	return obj2;
}