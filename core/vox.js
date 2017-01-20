
var Path= require("path")
function init(vox, $, window, document){

    //
    core.baseUrl= "/"
    core.require= function(module){
        var src= $("<script>")
        src.attr("src", Path.join(core.baseUrl, module))
        $("head").append(src)
        
    }

	var Waves= core.VW.Web.Waves;
    Array.prototype.each= Array.prototype.forEach;
    $(function(){
        Waves.attach('.button');
        Waves.init();
    });
    
    document.createElement("vox-css");
    document.createElement("vox-action");
    document.createElement("vox-object");
    document.createElement("vox-item");
    document.createElement("vox-bindevent");
    
    
    var platform= function(){
        var self= this;
        var f={};
        
        self.scrollObject= $(window);


        self.getJsonResponseAsync= function(/*core.VW.Http.Request*/ request){
            request.validateStatusCode= true
            var task= request.getResponseAsync()

            task.beforeExpose(function(){
                try{
                    var data= task.result.body
                    if(typeof data==="string")
                        data=JSON.parse(data)

                    
                    if(data && data.error){
                        task.exception= data.error
                    }
                    return data
                }
                catch(e){
                    task.exception= "La respuesta no es válida. " + e.message
                }
            })

            return task
        }

      

        self.attachOuterClick= function(obj, pars){
            
            var self= pars.self;
            var isOpened= pars.active || function(){return true;}
            
            var y= function(ev){
                if(!isOpened()){
                    return;
                }
                
                
                var e= $(ev.target);
                if((ev.target!= obj.get(0)) && (obj.find(e).length==0)){
                
                    if(pars.processEvent){
                        ev=pars.processEvent(ev);
                    }
                    self.emit("outerclick", ev);
                    if(ev.defaultPrevented){
                        return; 
                    }
                    if(pars.callback){
                        pars.callback(ev);
                    }
                }
                
            }
            $(document).bind("click", y);
            
        }
        
        self.attachEvents= function(events, pars){
            
            var self= pars.self;
            var isOpened= pars.active || function(){return true;}
            
            var y= function(ev){
                if(!isOpened()){
                    return;
                }
                if(pars.processEvent){
                    ev=pars.processEvent(ev);
                }
                self.emit(ev.type, ev);
                if(ev.defaultPrevented){
                    return; 
                }
                if(pars.callback){
                    pars.callback(ev);
                }
            }
            $(document).bind(events, y);
            
        };
        
        self.transition= function(obj, values, effect, time, cb){
            var callback= cb?cb:function(){};
            var st=[];
            for(var i in values){
                st.push(i);
            }
            
            obj.css("transition-property", st.join(","));
            if(time){
                var timec= (time/1000);
                timec= timec.toString() + "s";
                obj.css("transition-duration", timec);    
            }
            if(effect){
                obj.addClass(effect);
            }
            
            if(st.length==0){
                callback();
            }
            obj.css(values);
            
            obj.addClass("transitioned");
            
            setTimeout(function(){
                obj.removeClass("transitioned");
                if(effect){
                    obj.removeClass(effect);
                }
                callback();
            }, time);
        }
        
        self.animate= function(obj, effect, time, cb){
            
            callback= function(){
                if(hide){
                    obj.hide();
                }
                obj.removeClass(effect);
                if(cb){
                    cb();
                }
            }
            
            var hide;
            if(effect.toLowerCase().indexOf("out")>=0){
                
                hide= true;
                // Es efecto de salida ...
                if(!obj.is(":visible")){
                    return callback();
                }
            }
            else{
                if(obj.is(":visible")){
                    return callback();
                }
            }
            
            
            if(!obj.hasClass("animated")){
                obj.addClass("animated");    
            }
            if(obj.data("last-effect")){
                obj.removeClass(obj.data("last-effect"));
            }
            obj.removeClass(effect);
            obj.show();
            obj.addClass(effect);
            obj.data("last-effect", effect);
            
            if(!time){
                time= parseFloat(obj.css("animation-duration"));
                if(!time){
                    time= parseFloat(obj.css("-webkit-animation-duration"));    
                }
            }
            else{
                var s=(time/1000).toString() + "s";
                time /= 1000;
                obj.css({
                    "-webkit-animation-duration":s,
                    "animation-duration": s
                });
            }
            
            time= (time*1000) + 1;
            setTimeout(callback, time);
            
        }
        
        f.processRow= function(obj){
            var temp= $("<div>")
            obj.each(function(){
                var j= $(this);
                var col= j.find(">*");
                var cols=[];
                for(var i=0;i<col.length;i++){
                    cols.push(col.eq(i));
                    temp.append(col.eq(i))
                }
                //col.remove();
                for(var i=0;i<cols.length;i++){
                    j.append(cols[i]);
                }    
            });
        };
        
        if (document.createEvent) {
    		self.createEvent = function(name){
    	        var evt = document.createEvent("Event");
    	        evt.initEvent(name, true, true);
    	        return evt;
    	    }
    
        } else if (document.createEventObject) { 
        	// MSIE (NOT WORKING)
        	self.createEvent = function(name){
    	        var evt = document.createEventObject("Event");
    	        evt.type= name;
    	        return evt;
    	    }
            
        }
        
        f.bodySize= function(){
            var w= parseInt($(window).width());
            var s;
            
            if(w<600){
                s= "s";
            }
            else if(w<860){
                s= "sl";
            }
            else if(w<1024){
                s= "m";
            }
            else if(w<1200){
                s= "ml";
            }
            else{
                s= "l";
            }
            var b=$("body");
            b.removeClass("size-s");
            b.removeClass("size-sl");
            b.removeClass("size-m");
            b.removeClass("size-ml");
            b.removeClass("size-l");
            b.addClass("size-"+ s);
        }
        
        f.processScript= function(script){
            script.each(function(){
                try{
                    var s= $(this); 
                    var p= s.attr("vox-name")|| "value";
                    var f= eval(s.text());
                    f.script= s;
                    if(p){
                        s.parent().data(p, f);    
                    }
                    
                    if(s.attr("vox-auto")!=undefined){
                        f(s);
                    }
                }
                catch(e){
                    console.log("Error al procesar script");
                    console.error(e);
                }
            });
        }
        f.processObjects= function(obj2){
            obj2.each(function(){
                
                var obj= $(this);
                if(obj.find("vox-object").length>0){
                   f.processObjects(obj.find("vox-object"));
                }
                var o={};
                if(obj.data("vox-processed")){
                    return;
                }
                obj.find(">vox-item").each(function(){
                    var g= $(this);
                    var n= g.attr("vox-name");
                    if(n){
                        o[n]= g.data("value");
                    }
                });    
                var v=obj.attr("vox-name") || "value";
                obj.parent().data(v, o);
                obj.data("vox-processed", true);
                
            });
        }
        
        
        f.processAction= function(obj){
            obj.each(function(){
                var c= $(this);
                var s= c.attr("vox-selector");
                var v= c.data("value");
                var p= c.parent();
                
                var u= function(k){
                    k.each(function(){
                       v($(this));
                    });
                }
                u(p.find(s));
                
                vox.mutation.watchAppend(p, function(ev){
                    u(ev.jTarget);
                }, s);
                
            });
        }
        f.processCss= function(css){
            css.each(function(){
                var c= $(this);
                if(c.attr("vox-type")=="class"){
                    var s= c.attr("vox-selector");
                    var v= c.data("value");
                    
                    var p= c.parent();
                    p.find(s).addClass(v);
                    
                    vox.mutation.watchAppend(p, function(ev){
                        ev.jTarget.addClass(v);
                    }, s);
                }
                else if(c.attr("vox-type")=="style"){
                    var s= c.attr("vox-selector");
                    var v= c.data("value");
                    
                    var p= c.parent();
                    p.find(s).css(v);
                    
                    vox.mutation.watchAppend(p, function(ev){
                        ev.jTarget.css(v);
                    }, s);
                }
            });
        }
        
        self.merge= function(obj1, obj2){
            return $.merge(obj1, obj2);
        }
        
        f.processChipAction= function(obj){
            obj.click(function(){
                $(this).parents(".chip").eq(0).remove();
            });
        }
        
        f.processBindEvent= function(obj2){
            
			obj2.each(function(){
				var obj= $(this);
				var name= obj.attr("vox-name");
                console.log(name);
				obj.parent().bind(name, function(ev){
					var fu= obj.data("value");
					if(fu.call){
						fu(ev);
					}
				});
			});
            
        }
        
        self.start= function(){
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processRow(ev.jTarget);
            } , ".row");
            f.processRow($(".row"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processScript(ev.jTarget);
            } , "script[lang=vox]");
            f.processScript($("script[lang=vox]"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processObjects(ev.jTarget);
            } , "vox-object");
            f.processObjects($("vox-object"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processCss(ev.jTarget);
            } , "vox-css");
            f.processCss($("vox-css"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processAction(ev.jTarget);
            } , "vox-action");
            f.processAction($("vox-action"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processChipAction(ev.jTarget);
            } , ".chip .action");
            f.processChipAction($(".chip .action"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processBindEvent(ev.jTarget);
            } , "vox-bindevent");
            f.processBindEvent($("vox-bindevent"));
            
            var re= function(){
                if(re.y){
                    clearTimeout(re.y);
                    re.y=undefined;
                }
                re.y= setTimeout(function(){
                    $(".window-height").height($(window).height());
                }, 100);
                f.bodySize();
            }
            $(window).resize(re);
            re();
            
        }
    }
    
    var mutation= function(){
        var self= this;
        var f={};
        
        self.watchAppend= function(obj, callback2, filter){
            var callback=function(ev){
                var j1= ev.jTarget.not("[vox-watched]");
                var j2= ev.jTarget.is("[vox-watched]");
                
                ev.moved= true;
                ev.jTarget= j2;
                if(j2.length>0){
                    callback2(ev);
                }
                
                ev.moved= false;
                ev.jTarget= j1;
                if(j1.length>0){
                    callback2(ev);
                }
                
                j1.attr("vox-matched","");
            };
            /*
            obj.bind("DOMNodeInserted", function(ev){
                var inserted= $(ev.target);
                var v=true;
                
                if(filter){
                    var all= inserted.find("*");
                    all= all.filter(filter);
                    
                    if(all.length>0){
                        ev.jTarget= all;
                        callback(ev);
                    }
                }  
                
                
                if(filter){
                    if(!inserted.is(filter)){
                        v=false;
                    }
                }
                
                if(v){
                    ev.jTarget= inserted;
                    callback(ev);
                }
                
            });*/
            var observer= new MutationObserver(function(events){
                for(var i=0;i<events.length;i++){
                    var ev= events[i]
                    var inserted= $(ev.addedNodes);
                    var v=true;
                    
                    if(filter){
                        var all= inserted.find("*");
                        all= all.filter(filter);
                        
                        if(all.length>0){
                            ev.jTarget= all;
                            callback(ev);
                        }
                    }  
                    
                    
                    if(filter){
                        if(!inserted.is(filter)){
                            v=false;
                        }
                    }
                    
                    if(v){
                        ev.jTarget= inserted;
                        callback(ev);
                    }
                }
            })
            self.observers.push(observer)
            obj.each(function(){
                //console.info(observer)
                observer.observe(this, { childList: true, subtree: true });
            })
        }
        
    }
    
    
    vox.platform= new platform();
    vox.mutation= new mutation();
    vox.mutation.observers=[];
    $.fn.voxanimate= function(effect, time, callback){
        vox.platform.animate(this, effect, time, callback);
    }
    $.fn.voxtransition= function(values,effect, time, callback){
        vox.platform.transition(this, values, effect, time, callback);
    }
    $(function(){
        if (window.voxpreinit) {
            window.voxpreinit();
        }
        vox.platform.start();    
    });
}



var vox= exports;
var $= core.VW.Web.JQuery;
var owindow,odocument;
if(typeof window== "object"){
	owindow=window;
}
else{
	owindow={};
}
if(typeof document== "object"){
	odocument=document;
}
else{
	odocument={};
}
init(vox, $, owindow, odocument);