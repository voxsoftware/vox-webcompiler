

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
		console.info(id)
		id++;
		obj.attr("uid", this.id)
		this.obj= obj;
		this.template= obj.find("template");
		this.options=options;
		//this.style= obj.find("style");
		this.name=this.obj.attr("name");
		this.specname= this.name+"-host";
		this.useshadow= this.obj.attr("dom-shadow")!== undefined;
		console.info(this.useshadow)


		this.init();
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


					if(self.options.created){
						self.options.created(ev);
					}

					if(ev.defaultPrevented){
						return;
					}

					$(this).addClass(self.specname)

					if(!self.useshadow){
						var target= $(this);
						clone= ev.template;
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
	})
	vox.mutation.watchAppend($("html"), function(ev){
		
		ev.jTarget.each(function(){
			procesar(this);	
		});


	}, "vw-template")


}

var $= core.VW.Web.JQuery;
var odocument={};
if(typeof document=="object"){
	odocument=document;
}
var root= global;
init(core.VW.Web.Vox, $,odocument,global);