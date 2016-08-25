
if(global.jQuery){
	exports=module.exports= global.$
}
else{
	// Esto puede ser quitado en un futuro ...
	exports=module.exports=require("./jquery.js")
}
