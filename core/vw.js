// Módulo web de VW
global.core= global.core ||{};

require("./ShimGetterAndSetter.js")
var Requires= require("./Requires")
var util=Requires.module("VW.Util");
core.internalError= require("vox-core/submodules/vox-core-base/src/System/internal_error.js")


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

	core.VW.get_Moment=function(){
		if(!this.$moment)
			this.$moment= require("./moment.js")
		return this.$moment
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
	core.VW.Http.get_RequestException= function(){
		if(!this.$RequestException){
			this.$RequestException= Requires.module("VW.Http.RequestException");
		}
		return this.$RequestException;
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
	core.System.get_ArgumentException= function(){
		if(!this.$exception){
			this.$exception= Requires.module("System.Argument.Exception")
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

	/*
	core.VW.Ecma2015.get_Parser= function(){
		if(!this.$parser){
			this.$parser= require("voxsoftware-ecma2015-parser")
		}
		return this.$parser;
	}*/


	// ESTO NO ESTÁ DEFINIDO SI VA A IR O NO ...
	/*
	core.VW.Ecma2015.get_Parser= function(){
		if(!this.$parser){
			this.$parser= Requires.module("VW.Ecma2015.Parser")
		}
		return this.$parser;
	}

	core.VW.Ecma2015.get_ArrowFunctionPlugin= function(){
		if(!this.$arrowfplugin){
			this.$arrowfplugin= Requires.module("VW.Ecma2015.ArrowFunctionPlugin")
		}
		return this.$arrowfplugin;
	}

	core.VW.Ecma2015.get_AsyncPlugin= function(){
		if(!this.$asyncplugin){
			this.$asyncplugin= Requires.module("VW.Ecma2015.AsyncPlugin")
		}
		return this.$asyncplugin;
	}

	core.VW.Ecma2015.get_BlockScopedPlugin= function(){
		if(!this.$blockplugin){
			this.$blockplugin= Requires.module("VW.Ecma2015.BlockScopedPlugin")
		}
		return this.$blockplugin;
	}

	core.VW.Ecma2015.get_ClassPlugin= function(){
		if(!this.$classplugin){
			this.$classplugin= Requires.module("VW.Ecma2015.ClassPlugin")
		}
		return this.$classplugin;
	}

	core.VW.Ecma2015.get_DestructuringAssignmentPlugin= function(){
		if(!this.$dasplugin){
			this.$dasplugin= Requires.module("VW.Ecma2015.DestructuringAssignmentPlugin")
		}
		return this.$dasplugin;
	}

	core.VW.Ecma2015.get_EnhancedObjectPropertiesPlugin= function(){
		if(!this.$epplugin){
			this.$epplugin= Requires.module("VW.Ecma2015.EnhancedObjectPropertiesPlugin")
		}
		return this.$epplugin;
	}

	core.VW.Ecma2015.get_ExtendedParametersPlugin= function(){
		if(!this.$explugin){
			this.$explugin= Requires.module("VW.Ecma2015.ExtendedParametersPlugin")
		}
		return this.$explugin;
	}

	core.VW.Ecma2015.get_IteratorPlugin= function(){
		if(!this.$iplugin){
			this.$iplugin= Requires.module("VW.Ecma2015.IteratorPlugin")
		}
		return this.$iplugin;
	}

	core.VW.Ecma2015.get_ModulePlugin= function(){
		if(!this.$modulep){
			this.$modulep= Requires.module("VW.Ecma2015.ModulePlugin")
		}
		return this.$modulep;
	}

	core.VW.Ecma2015.get_TemplateLiteralPlugin= function(){
		if(!this.$tmplugin){
			this.$tmplugin= Requires.module("VW.Ecma2015.TemplateLiteralPlugin")
		}
		return this.$tmplugin;
	}

	core.VW.Ecma2015.get_VariablePlugin= function(){
		if(!this.$varplugin){
			this.$varplugin= Requires.module("VW.Ecma2015.VariablePlugin")
		}
		return this.$varplugin;
	}

	core.VW.Ecma2015.get_ParseException= function(){
		if(!this.$parseexception){
			this.$parseexception= Requires.module("VW.Ecma2015.ParseException")
		}
		return this.$parseexception;
	}

	core.VW.Ecma2015.get_Esprima= function(){
		if(!this.$esprima){
			this.$esprima= Requires.module("VW.Ecma2015.Esprima")
		}
		return this.$esprima;
	}
	*/
	util.createProperties(core.VW.Ecma2015);
}


function moduleVW_Web(){
	var c= core.VW.Web= core.VW.Web || {};
	c.JQuery= require("./jquery-loader.js")
	var w= (typeof window=="object") ? window : {document:null}
	w.$= c.JQuery
	w.jQuery= c.JQuery
	if(!(w.document && w.document.registerElement)){
		c.RegisterElement= require("./registerelement.js");
	}
	c.WebComponents= require("./webcomponents-lite.js");
	c.Waves= require("node-waves");
	c.Vox= require("./vox.js");
	c.Templates= require("./Templates.js");
}



moduleVW();
moduleHttp();
moduleSystem();
moduleVW_Web();
moduleEcma2015();
exports= module.exports= core;
