
if(global.core && global.core.basic){
	exports= module.exports= global.core.get_dns();
}
else{
	throw new Error("Debe cargar el archivo core.http");
}