import fs from 'fs'
require("..")

var func= async ()=>{
	var resultado=await core.VW.Web.Compiler.Compiler.compileCoreBasic()
	console.log(resultado.toString({colors:true}))
}

func()