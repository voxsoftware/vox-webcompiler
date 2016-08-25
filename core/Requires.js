


exports.module= function(name){

	if(name=="VW.Util"){
		return require("vox-core/submodules/vox-core-base/src/VW/Util.js")
	}
	/*
	if(name=="VW.Moment"){
		return require("vox-core/submodules/vox-core-moment/dist/MomentClass.js")
	}
	*/
	if(name=="VW.Task"){
		return require("vox-core/submodules/vox-core-async/src/VW/Task.js")
	}

	if(name=="VW.Ecma2015.runtime"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/runtime.js")
	}

	if(name=="VW.Ecma2015.runtime"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/runtime.js")
	}

	if(name=="VW.Ecma2015.Utils"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/Utils.js")
	}

	if(name=="VW.Ecma2015.Parser"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/Parser.js")
	}


	// ### POR DEFINIR ...
	/*
	if(name=="VW.Ecma2015.ArrowFunctionPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/ArrowFunctionPlugin.js")
	}

	if(name=="VW.Ecma2015.AsyncPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/AsyncPlugin.js")
	}

	if(name=="VW.Ecma2015.BlockScopedPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/BlockScopedPlugin.js")
	}

	if(name=="VW.Ecma2015.ClassPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/ClassPlugin.js")
	}

	if(name=="VW.Ecma2015.DestructuringAssignmentPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/DestructuringAssignmentPlugin.js")
	}

	if(name=="VW.Ecma2015.EnhancedObjectPropertiesPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/EnhancedObjectPropertiesPlugin.js")
	}


	if(name=="VW.Ecma2015.Esprima"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/Esprima.js")
	}

	if(name=="VW.Ecma2015.ExtendedParametersPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/ExtendedParametersPlugin.js")
	}

	if(name=="VW.Ecma2015.IteratorPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/IteratorPlugin.js")
	}

	if(name=="VW.Ecma2015.ModulePlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/ModulePlugin.js")
	}

	if(name=="VW.Ecma2015.ParseException"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/ParseException.js")
	}

	if(name=="VW.Ecma2015.TemplateLiteralPlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/TemplateLiteralPlugin.js")
	}

	if(name=="VW.Ecma2015.VariablePlugin"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/VariablePlugin.js")
	}
	*/
	// ### POR DEFINIR


	if(name=="System.NotImplementedException"){
		return require("vox-core/submodules/vox-core-base/src/System/NotImplementedException.js")
	}

	if(name=="System.Exception"){
		return require("vox-core/submodules/vox-core-base/src/System/Exception.js")
	}

	if(name=="System.ArgumentException"){
		return require("vox-core/submodules/vox-core-base/src/System/ArgumentException.js")
	}

	if(name=="System.IEnum"){
		return require("vox-core/submodules/vox-core-base/src/System/IEnum.js")
	}

	if(name=="VW.Http.RequestArgs"){
		return require("vox-core/submodules/vox-core-http/src/VW/Http/RequestArgs.js")
	}

	if(name=="VW.Http.Request"){
		return require("vox-core/submodules/vox-core-http/src/VW/Http/Request.js")
	}

	if(name=="VW.Http.RequestException"){
		return require("vox-core/submodules/vox-core-http/src/VW/Http/RequestException.js")
	}

	if(name=="VW.TaskCancelledException"){
		return require("vox-core/submodules/vox-core-async/src/VW/TaskCancelledException.js")
	}

	if(name=="VW.Http.HttpStatusCode"){
		return require("vox-core/submodules/vox-core-http/src/VW/Http/HttpStatusCode.js");
	}

}
