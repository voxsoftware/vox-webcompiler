
import fs from 'fs'
import Path from 'path'
var Resolver= require(__dirname + "/../../core-basic")

var webpack= require("webpack")
class Compiler{
	
	constructor(/*string */ path){
		var stat= fs.statSync(path)
		if(stat.isDirectory()){
			this.$file= Path.join(path, "vox.webcompiler.config.js")
			this.$dir= path
		}
		else{
			this.$file= path
			this.$dir= Path.dirname(this.$file)
		}

	}	

	get config(){
		if(!this.$config){
			this.$config= this.loadConfig()
		}
		return this.$config
	}

	loadConfig(options){

		if(arguments.length==0){
			if(!this.$originalConfig){
				this.$originalConfig= require(this.$file)
			}
			return this.$originalConfig
		}


		var convertarg= require("webpack/bin/convert-argv")
		options=options||{}
		options._=[]		
		var array= require("./_config.js")
		while(array.pop()){}
		var r= this.loadConfig()
		if(!(r instanceof Array))
			r=[r]
		for(var i=0;i<r.length;i++){
			array.push(r[i])
		}

		options.config= Path.join(__dirname,"_config.js")
		return this.$config= convertarg({}, options)
	}


	/**
	* La diferencia entre compile y webpackCompile es que compile añade la referencia
	* a core-basic y core-http
	*/
	compile(config){
		config= config||thi.config

		for(var i=0;i<config.length;i++){
			var conf= config[i]
			conf= Resolver.resolve(conf)
			config[i]= conf
		}
		return Compiler.webpackCompile(config)
	}


	static webpackCompile(config){
		var task= new core.VW.Task()
		webpack(config, function(err, stats) {
			if(err){
				task.exception= err
				return task.finish()
			}

			task.result= stats
			task.finish()
		})

		return task
	}


	webpackCompile(config){

		if(!config){
			config= this.config
		}
		
		return Compiler.webpackCompile(config)
	}

	static get coreBasic(){
		return new Compiler(__dirname + "/../../core-basic")
	}


	static compileCoreBasic(options){
		var compilation= Compiler.coreBasic
		return compilation.webpackCompile(compilation.loadConfig(options))
	}



}

export default Compiler