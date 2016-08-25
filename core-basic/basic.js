global.core=global.core || {}
var basic= exports=module.exports= global.core.basic = global.core.basic||{}

// Módulos base ...
basic.get_buffer=function(){
	return require("buffer");
}
basic.get_crypto=function(){
	return require("crypto");
}
basic.get_path= function(){
	return require("path")
}
basic.get_events= function(){
	return require("events")
}
basic.get_querystring= function(){
	return require("querystring")
}
basic.get_url= function(){
	return require("url")
}

basic.get_vm= function(){
	return require("vm")
}

basic.get_process= function(){
	return process;
}