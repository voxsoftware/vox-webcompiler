var Path= require("path");
var minimal= core.VW.Web.Compiler.minimal
var data = {
	"vwc-native":true,
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
	"resolve":{
		"alias": {
			"vox-core": Path.dirname(require.resolve("vox-core"))
		}
	},
    entry:  Path.normalize(__dirname + "/vw.js"),
    output: {
        path:  __dirname + "/../dist",
        filename: minimal?"js/vox.min.js":"js/vox.js",
        libraryTarget: "umd"
    }
}

module.exports= data