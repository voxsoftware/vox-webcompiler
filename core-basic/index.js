var webpack= require("webpack");
var Path= require("path")

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

	var native=obj["vwc-native"]
	//vw.info(core.VW.path)

	var obj2;

	if(!native){
		obj2= {
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
					"https": __dirname + "/https-replace.js",
					"vox-core": core.VW.path
					/*,
					"process": __dirname + "/process-obj-replace.js"*/
				}
			}
		}
	}
	else{
		obj2= {
			"resolve":{
				"alias":{
					"vox-core": core.VW.path
				}
			}
		}
	}
	extend(obj2, obj||{})
	obj2.plugins= obj2.plugins||[]
	obj2.module= obj2.module ||{}
	obj2.module.loaders= obj2.module.loaders ||[]
	obj2.module.loaders.push({
		test: /\.es6$/,
		loader: core.VW.Web.ES6Loader.filename
	})

	if(!native){
		obj2.plugins.push(new webpack.ProvidePlugin({
			"Buffer": __dirname + "/buffer-obj-replace.js"
		}))

	
		obj2.plugins.push(new webpack.ProvidePlugin({
			"process": __dirname + "/process-obj-replace.js"
		}))
	}
	return obj2;
}