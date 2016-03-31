


exports.module= function(name){

	if(name=="VW.Util"){
		return require("vox-core/VW/Util.js")
	}

	if(name=="VW.Task"){
		return require("vox-core/VW/Task.js")
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
		return require("vox-core/System/Exception.js")
	}

	if(name=="System.IEnum"){
		return require("vox-core/System/IEnum.js")
	}

	if(name=="VW.Http.RequestArgs"){
		return require("vox-core/VW/Http/RequestArgs.js")
	}

	if(name=="VW.Http.Request"){
		return require("vox-core/VW/Http/Request.js")
	}

	if(name=="VW.Http.RequestException"){
		return require("vox-core/VW/Http/RequestException.js")
	}

	if(name=="VW.TaskCancelledException"){
		return require("vox-core/VW/TaskCancelledException.js")
	}

	if(name=="VW.Http.HttpStatusCode"){
		return require("vox-core/VW/Http/HttpStatusCode.js");
	}

}