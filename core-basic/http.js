global.core=global.core || {}
var basic= exports=module.exports= global.core.basic = global.core.basic||{}
basic.get_http= function(){
	return require("http");
}
basic.get_https= function(){
	return require("https");
}