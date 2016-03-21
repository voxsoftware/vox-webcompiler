


exports.module= function(name){

	if(name=="VW.Util"){
		return require("vox-core/VW/Util.js")
	}

	if(name=="VW.Ecma2015.runtime"){
		return require("vox-core/VW/Ecma2015/runtime.js")
	}

	if(name=="VW.Ecma2015.Utils"){
		return require("vox-core/VW/Ecma2015/Utils.js")
	}

	if(name=="System.NotImplementedException"){
		return require("vox-core/System/NotImplementedException.js")
	}

	if(name=="System.Exception"){
		return require("vox-core/gvw/System/Exception.js")
	}

	if(name=="System.IEnum"){
		return require("vox-core/gvw/System/IEnum.js")
	}

	if(name=="VW.Http.RequestArgs"){
		return require("vox-core/gvw/VW/Http/RequestArgs.js")
	}

	if(name=="VW.TaskCancelledException"){
		return require("vox-core/gvw/VW/TaskCancelledException.js")
	}

	if(name=="VW.Http.HttpStatusCode"){
		return require("vox-core/gvw/VW/Http/HttpStatusCode.js");
	}

}