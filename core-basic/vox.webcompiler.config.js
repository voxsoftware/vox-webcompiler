var Path= require("path");
var minimal= core.VW.Web.Compiler.minimal
var data = [
	{
		"vwc-native":true,
		module: {
		    loaders: [
		        { test: /\.json$/, loader: "json-loader" }
			]
		},
	    entry:  Path.normalize(__dirname + "/basic.js"),
	    output: {
	        path:  __dirname + "/../dist",
	        filename: minimal?"js/core-basic.min.js":"js/core-basic.js",
	        libraryTarget: "umd"/*,
	        library: "core"*/
	    }
	},
	{
		"native":true,
		module: {
		    loaders: [
		        { test: /\.json$/, loader: "json-loader" }
			]
		},
	    entry:  Path.normalize(__dirname + "/http.js"),
	    output: {
	        path:  __dirname + "/../dist",
	        filename: minimal?"js/core-http.min.js":"js/core-http.js",
	        libraryTarget: "umd"/*,
	        library: "core"*/
	    }
	}
]
module.exports= data