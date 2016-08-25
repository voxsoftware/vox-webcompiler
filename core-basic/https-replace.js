
if(global.core && global.core.basic){
	exports= module.exports= global.core.basic.get_https();
}
else{
	throw new Error("Debe cargar el archivo core.http");
}