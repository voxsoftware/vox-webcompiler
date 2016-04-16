


exports.module= function(name){

	if(name=="VW.Util"){
		return require("vox-core/submodules/vox-core-base/src/VW/Util.js")
	}

	if(name=="VW.Task"){
		return require("vox-core/submodules/vox-core-async/src/VW/Task.js")
	}

	if(name=="VW.Ecma2015.runtime"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/runtime.js")
	}

	if(name=="VW.Ecma2015.Utils"){
		return require("vox-core/submodules/vox-core-es6/src/VW/Ecma2015/Utils.js")
	}

	if(name=="System.NotImplementedException"){
		return require("vox-core/submodules/vox-core-base/src/System/NotImplementedException.js")
	}

	if(name=="System.Exception"){
		return require("vox-core/submodules/vox-core-base/src/System/Exception.js")
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