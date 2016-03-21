var Path= require("path");
var minimal= core.VW.Web.Compiler.minimal
var data = [
	{
		
		module: {
		    loaders: [
		        { test: /\.json$/, loader: "json-loader" }
			]
		},
	    entry:  Path.normalize(__dirname + "/basic.js"),
	    output: {
	        path:  __dirname + "/../dist",
	        filename: minimal?"core-basic.min.js":"core-basic.js",
	        libraryTarget: "umd"/*,
	        library: "core"*/
	    }
	},
	{
		module: {
		    loaders: [
		        { test: /\.json$/, loader: "json-loader" }
			]
		},
	    entry:  Path.normalize(__dirname + "/http.js"),
	    output: {
	        path:  __dirname + "/../dist",
	        filename: minimal?"core-http.min.js":"core-http.js",
	        libraryTarget: "umd"/*,
	        library: "core"*/
	    }
	}
]
module.exports= data