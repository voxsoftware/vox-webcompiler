var Path= require("path");
var minimal= core.VW.Web.Compiler.minimal
var data = {
	node: {
	    net: "empty",
	    tls: "empty",
	    "fs": "empty"
	},
	module: {
	    loaders: [
	        { test: /\.json$/, loader: "json-loader" }
		]
	},
    entry:  Path.normalize(__dirname + "/vw.js"),
    output: {
        path:  __dirname + "/../dist",
        filename: minimal?"vox.min.js":"vox.js",
        libraryTarget: "umd"
    }
}

module.exports= data