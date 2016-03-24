

function init(vox, $, document, root){
	var id=0;
	var isIeMinor11=false;
	(function(){
		var i= (navigator.appVersion || "").indexOf("MSIE");	
		if(i>=0){
			var ver=navigator.appVersion.substring(i+4);
			var y= ver.indexOf(";");
			isIeMinor11=true;
			if(y>=0){
				ver= ver.substring(0,y)|0;
				if(ver>10){
					isIeMinor11= false;
				}
			}
		}
	})();
	
	var Template= function(obj,options){


		this.id= "vw-template"+id;
		id++;
		obj.attr("uid", this.id)
		this.obj= obj;
		this.template= obj.find("template");
		this.options=options;
		//this.style= obj.find("style");
		this.name=this.obj.attr("name");
		this.specname= this.name+"-host";
		this.useshadow= this.obj.attr("dom-shadow")!== undefined;
		this.init();
	}


	Template.prototype.importdata= function(target, e){
		var p= e.attr("properties")
		if(p)
			p= p.split(",")

		if(!p){
			e.parent().data(target.data())
		}
		else{
			for(var i=0;i<p.length;i++){
				e.parent().data(p[i], target.data(p[i]))
			}
		}
		e.remove()
	}

	Template.prototype.importattributes= function(target, e){
		var p= e.attr("properties")
		if(p)
			p= p.split(",")
		
		
		if(!p){
			p=[]
			var o= e.get(0).attributes
			for(var i=0;i<o.length;i++)	{
				p.push(o[i].name)
			}
		}
		
		for(var i=0;i<p.length;i++){
			e.parent().attr(p[i], target.attr(p[i]))
		}
		
		e.remove()	
	}

	Template.prototype.init= function(){
		var name=this.name;
		this.changeStyle();
		var self= this;
		var proto = Object.create(HTMLElement.prototype, {
			createdCallback: {
				value: function() {
					
					var t=self.template.get(0);
					var clone = document.importNode(t.content, true);
					ev= vox.platform.createEvent("create");
					ev.template= clone;
					ev.current= this;

					var data= null;


					if(self.options.created){
						self.options.created(ev);
					}

					if(ev.defaultPrevented){
						return;
					}

					$(this).addClass(self.specname)

					clone= ev.template;
					var target= $(this);
					$(clone).find("importdata").each(function(){
						var e= $(this)
						self.importdata(target,e)
					})

					$(clone).find("importattributes").each(function(){
						var e= $(this)
						self.importattributes(target,e)
					})


					if(!self.useshadow){
						
						
						$(clone).find("content").each(function(){
							var e= $(this);
							var sel= e.attr("sel");
							if(!sel){
								var nodes=target.get(0).childNodes;
								var first= true, l,q;
								for(var i=0;i< nodes.length;i++){
									if(first){
										l=$(nodes[i]);
										e.replaceWith(nodes[i]);
										first= false;
									}
									else{
										q=$(nodes[i])
										q.insertAfter(l);
										l= q;
									}
								}
							}
							else{
								e.replaceWith(target.find(sel));
							}
						});
						target.append(clone);
					}
					else{
						this.createShadowRoot().appendChild(ev.template);	      		
					}

				}
			}
		});
		document.registerElement(this.name, {prototype: proto});	

	}


	Template.prototype.changeStyle= function(){
		var self= this;
		
		if(isIeMinor11 || !this.useshadow ){
			this.style= $(self.template.get(0).content).find("style");
			this.style.each(function(){
				var style= $(this);
				var text= style.text();
				while(text.indexOf(":host")>=0){
					text= text.replace(":host","."+self.specname);
				}
				style.text(text);
			});
		}

		if(!this.useshadow){
			$("head").append(this.style);
		}
	}



	// Registrar vw-templat	e 
	document.createElement("vw-template");

	var procesar= function(self){
		var t=$(self);
		var created= t.data("created");
		if(t.data("vw-template")){
			return; 
		}
		t.data("vw-template", new Template(t, {
			created: created
		}));
	}

	$(function(){		
		$("vw-template").each(function(){
			procesar(this)
		})

		

		var rels= $("link[rel='import']")
		rels.on("load", function(){
			var e= $(this);
			var nodes;
			var g= function(){
				nodes=e.get(0).import
				if(!nodes){
					return setTimeout(g,10)
				}
				var link=nodes.querySelectorAll("link")
				nodes=nodes.querySelectorAll("vw-template")
				
				for(var i=0;i<nodes.length;i++){
					$("body").get(0).appendChild(document.importNode(nodes[i],true))			
				}	
				for(var i=0;i<link.length;i++){
					$("head").get(0).appendChild(link[i])			
				}	
			}
			g()				
		})
			
	})
	vox.mutation.watchAppend($("html,body"), function(ev){
		
		ev.jTarget.each(function(){
			procesar(this);	
		});


	}, "vw-template")
	exports.Template= Template

}


var odocument={};
if(typeof document=="object"){
	odocument=document;
}
var root= global;
init(core.VW.Web.Vox, core.VW.Web.JQuery ,odocument,global);