
import Path from 'path'
class Cli{
	

	static prompt(){
		
		core.VW.Console.foregroundColor= core.System.ConsoleColor.Green
		core.VW.Console.write("Vox Web Compiler ")
		core.VW.Console.resetColors()
		core.VW.Console.write("versión ")
		core.VW.Console.foregroundColor= core.System.ConsoleColor.Yellow
		core.VW.Console.write(core.VW.Web.Compiler.version,"")
		core.VW.Console.resetColors()
	}
	

	static error(e){
		
		core.VW.Console.backgroundColor= core.System.ConsoleColor.Red
		core.VW.Console.foregroundColor= core.System.ConsoleColor.White
		core.VW.Console.write(" ERROR ")
		core.VW.Console.resetColors()
		core.VW.Console.foregroundColor= core.System.ConsoleColor.Yellow
		core.VW.Console.write("", e.stack||e.toString())
	}
	static cli(){

		var Command=new  core.VW.CommandLine.Parser()
		Command.addParameter("core-basic")
		Command.addParameter("core")
		Command.addParameter("compile")
		Command.addParameter("help")
		Command.addParameter("min")
		Command.addParameter("out-dir", true, "")
		try{
			Command.parse()
			var options= Command.getAsOptionsObject()
			core.VW.Web.Compiler.minimal= !!options.min
			if(options.min)
				options.p=true
		}
		catch(e){
			Cli.prompt()
			core.VW.Console.writeLine()
			return Cli.error(e)			
		}
		return Cli.execute(options)

	}


	static execute(options){
		if(options["core-basic"]){
			Cli.coreBasic(options)
		}
		else if(options.core){
			Cli.core(options)
		}
		else if(options.compile){
			Cli.compile(options)
		}
		else{
			Cli.help()
		}
	}

	static get options(){
		return {
			"-min": "Compilar en modo minificado",
			"--out-dir": "Establecer un directorio de salida diferente (--out-dir path)"
		}
	}

	static get commands(){
		return {
			"-help": "Mostrar ayuda",	
			"-core-basic": "Compilar el módulo core-basic y core-http",
			"-core": "Compilar el módulo core",
			"-compile": "Compilar un módulo (-compile [opciones ....] [path])"
		}
	}


	static async coreBasic(options){
		Cli.prompt()
		core.VW.Console.writeLine().writeLine("Compilando core-basic y core-http").writeLine()
		try{
			var compilation= core.VW.Web.Compiler.Compiler.coreBasic
			var config= compilation.loadConfig(options)
			if(options["out-dir"]){
				config.forEach(function(conf){
					conf.output.path= Path.resolve(options["out-dir"])
				})
			}
			var resultado=await compilation.webpackCompile(config)
			core.VW.Console.write(resultado.toString({colors:true}))
		}
		catch(e){
			Cli.error(e)
		}
	}

	static async core(options){
		Cli.prompt()
		core.VW.Console.writeLine().writeLine("Compilando core").writeLine()
		try{
			var compilation= core.VW.Web.Compiler.Compiler.core
			var config= compilation.loadConfig(options)
			if(options["out-dir"]){
				config.forEach(function(conf){
					conf.output.path= options["out-dir"]
				})
			}
			var resultado=await compilation.compile(config)
			core.VW.Console.write(resultado.toString({colors:true}))
		}
		catch(e){
			Cli.error(e)
		}
	}

	static async compile(options){
		Cli.prompt()
		core.VW.Console.writeLine()

		//if(options.values.length==0)
			//return Cli.error("Debe especificar en argumentos la ruta a compilar.")
		try{
			var compilation= new  core.VW.Web.Compiler.Compiler(Path.resolve(options.values[0]||""))
			var config= compilation.loadConfig(options)
			if(options["out-dir"]){
				config.forEach(function(conf){
					conf.output.path= options["out-dir"]
				})
			}
			var resultado=await compilation.compile(config)
			core.VW.Console.write(resultado.toString({colors:true}))
		}
		catch(e){
			Cli.error(e)
		}
	}


	static help(){
		var help=Cli.options
		var cmds=Cli.commands

		Cli.prompt()
		core.VW.Console.writeLine()
		core.VW.Console.writeLine()

		vw.warning("Modo de uso:")
		core.VW.Console.writeLine("  comando [opcion [argumento], opcion [argumento] ...] [argumentos]")
		

		core.VW.Console.writeLine()
		vw.warning("Comandos:")
		var maxl=0
		for(var id in help){
			maxl= Math.max(maxl, id.length)
		}
		for(var id in cmds){
			maxl= Math.max(maxl, id.length)
		}
		maxl+= 5

		for(var id in cmds){
			core.VW.Console.setColorLog().write(("  " + id).padRight(maxl,' ')).resetColors()
			core.VW.Console.writeLine(cmds[id])
		}


		core.VW.Console.writeLine()
		vw.warning("Opciones:")
		for(var id in help){
			core.VW.Console.setColorLog().write(("  " + id).padRight(maxl,' ')).resetColors()
			core.VW.Console.writeLine(help[id])
		}

	}


}

export default Cli