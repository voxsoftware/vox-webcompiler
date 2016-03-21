// Módulo web de VW
global.core= global.core ||{};
var Requires= VoxModules
var util=Requires.module("VW.Util");



// Añadir Symbol si no existe ...
if(typeof Symbol === "undefined"){
	global.Symbol= require("symbol");
}


function moduleVW(){
	core.VW= core.VW ||{};	
	core.VW.Util= util;
	core.VW.get_Task= function(){
		if(!this.$task){
			this.$task= Requires.module("VW.Task");
		}
		return this.$task;
	}
	core.VW.get_TaskCancelledException= function(){
		if(!this.$TaskCancelledException){
			this.$TaskCancelledException= Requires.module("VW.TaskCancelledException");
		}
		return this.$TaskCancelledException;
	}
	core.VW.get_Request= function(){
		if(!this.$req){
			this.$req= require("browser-request");
		}
		return this.$req;
	}
	util.createProperties(core.VW);
}


function moduleHttp(){
	core.VW= core.VW ||{};	
	core.VW.Http= core.VW.Http||{};
	core.VW.Http.get_RequestArgs= function(){
		if(!this.$reqargs){
			this.$reqargs= Requires.module("VW.Http.RequestArgs");
		}
		return this.$reqargs;
	}
	core.VW.Http.get_Request= function(){
		if(!this.$req){
			this.$req= require("./Request");
		}
		return this.$req;
	}
	core.VW.Http.get_HttpStatusCode= function(){
		if(!this.$HttpStatusCode){
			this.$HttpStatusCode= Requires.module("VW.Http.HttpStatusCode");
		}
		return this.$HttpStatusCode;
	}
	util.createProperties(core.VW.Http);
}




function moduleSystem(){
	core.System= core.System ||{};	
	core.System.get_Exception= function(){
		if(!this.$exception){
			this.$exception= Requires.module("System.Exception")
		}
		return this.$exception;
	}
	core.System.get_IEnum= function(){
		if(!this.$IEnum){
			this.$IEnum= Requires.module("System.IEnum")
		}
		return this.$IEnum;
	}
	core.System.get_NotImplementedException= function(){
		if(!this.$notimplementedexception){
			this.$notimplementedexception= Requires.module("System.NotImplementedException");
		}
		return this.$notimplementedexception;
	}
	util.createProperties(core.System);
}


function moduleEcma2015(){
	core.VW.Ecma2015= core.VW.Ecma2015||{};
	core.VW.Ecma2015.get_Promise= function(){
		if(!this.$promise){
			if(typeof Promise !== "undefined"){
				this.$promise= Promise;
			}
			else{
				this.$promise=require("bluebird").Promise;
			}
		}
		return this.$promise;
	}
	core.VW.Ecma2015.get_regeneratorRuntime= function(){
		if(!this.$runtime){
			this.$runtime= Requires.module("VW.Ecma2015.runtime");
		}
		return this.$runtime;
	}
	core.VW.Ecma2015.get_Utils= function(){
		if(!this.$Utils){
			this.$Utils= Requires.module("VW.Ecma2015.Utils")
		}
		return this.$Utils;
	}
	util.createProperties(core.VW.Ecma2015);
}


function moduleVW_Web(){
	var c= core.VW.Web= core.VW.Web || {};
	if(typeof $ == "object"){
		c.JQuery= $;
	}
	else{
		c.JQuery= require("./jquery-2.2.1.js");
	}

	c.RegisterElement= require("./registerelement.js");
	c.WebComponents= require("./webcomponents.js");
	c.Waves= require("node-waves");
	c.Vox= require("./vox.js");
	c.Templates= require("./Templates.js");	
}



moduleVW();
moduleHttp();
moduleSystem();
moduleVW_Web();
moduleEcma2015();
exports= module.exports= core.VW;