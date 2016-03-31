

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var parser= new core.VW.Ecma2015.Parser()
var loaderUtils = require("loader-utils");
module.exports = function(source) {
	this.cacheable && this.cacheable();
	var coffeeRequest = loaderUtils.getRemainingRequest(this);
	var jsRequest = loaderUtils.getCurrentRequest(this);
	var query = loaderUtils.parseQuery(this.query);
	var result;
	result= parser.parse(source)
	//var map = JSON.parse(result.v3SourceMap);
	//map.sourcesContent = [source];
	this.callback(null, result.code);
}

module.exports.filename= __filename