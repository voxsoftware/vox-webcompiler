

var request= require("browser-request");
var Util= core.VW.Util;
var Request= module.exports= function(/*Uri*/uri){
	this.headers={};
	if(uri){
		this.set_address(uri);
	}
}



Request.prototype.getResponse= function(){
	throw new core.System.NotImplementedException("Utilice getResponseAsync");
}

Request.prototype.getResponseAsync= function(){

	if(this.$date){
		this.headers["Last-modified"]= this.$date.JSDate.toUTCString();
		this.headers["Date"]= this.$date.JSDate.toUTCString();
	}

	var task= core.VW.Task.get(arguments);
	this.originalReq= request({
		uri: this.uri.toString(),
		"form": this.$body,
		"method":this.$method,
		"headers": this.headers,
		"timeout": this.$timeout
	}, function(err, response){

		if(err){
			task.exception= err;
			task.finish();
			return; 
		}
		else{

			response.statusCode= core.VW.Http.HttpStatusCode.parse(response.statusCode);
			task.result= response;
			task.finish();

		}

	});


	return task;
}



Request.prototype.get_body= function(){
	return this.body;
}

Request.prototype.set_body= function(val){
	return this.body=val;
}



Request.prototype.get_accept= function(){
	return this.headers["Accept"];
}

Request.prototype.set_accept= function(val){
	return this.headers["Accept"]=val;
}


Request.prototype.get_address= function(){
	return this.uri;
}

Request.prototype.set_address= function(uri){
	return this.uri= uri;
}

Request.prototype.get_connection= function(){
	return this.headers["Connection"];
}

Request.prototype.set_connection= function(val){
	return this.headers["Connection"]=val;
}

Request.prototype.get_contentType= function(){
	return this.headers["Content-type"];
}

Request.prototype.set_contentLength= function(val){
	return this.headers["Content-length"]=val;
}


Request.prototype.get_date= function(){
	return this.$date;
}

Request.prototype.set_date= function(val){
	return this.$date=val;
}

Request.prototype.get_expect= function(){
	return this.headers["Expect"];
}

Request.prototype.set_expect= function(val){
	return this.headers["Expect"]=val;
}


Request.prototype.get_contentType= function(){
	return this.headers["Content-type"];
}

Request.prototype.set_contentLength= function(val){
	return this.headers["Content-length"]=val;
}

Request.prototype.get_host= function(){
	return this.headers["Host"];
}

Request.prototype.set_host= function(val){
	return this.headers["Host"]=val;
}


Request.prototype.get_ifModifiedSince= function(){
	return this.headers["If-modified-since"];
}

Request.prototype.set_ifModifiedSince= function(date){
	return this.headers["If-modified-since"]=date;
}


Request.prototype.get_keepAlive= function(){
	return this.headers["Keep-alive"]=="true";
}

Request.prototype.set_ifModifiedSince= function(val){
	return this.headers["Keep-alive"]=val.toString();
}


Request.prototype.get_method= function(){
	return this.$method;
}

Request.prototype.set_method= function(val){
	return this.$method=val.toString();
}




Request.prototype.get_referer= function(){
	return this.headers["Referer"];
}

Request.prototype.set_referer= function(val){
	return this.hyeaders["Referer"]=val.toString();
}



Request.prototype.get_requestUri= function(){
	return this.uri;
}


Request.prototype.get_timeout= function(){
	return this.$timeout;
}

Request.prototype.set_timeout= function(val){
	return this.$timeout=val|0;
}



Request.prototype.get_userAgent= function(){
	return this.headers["User-agent"];
}

Request.prototype.set_userAgent= function(val){
	return this.hyeaders["User-agent"]=val.toString();
}



Util.createProperties(Request,Request.prototype);