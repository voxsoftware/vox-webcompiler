
if(global.core && global.core.basic){
	exports= module.exports= global.core.basic.get_path();
}
else{
	throw new Error("Debe cargar el archivo core.basic");
}