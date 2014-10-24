Fui.Slide = Fui.extend({
    config:{
    },
    initialize:function(options){
        this.render();
        this.event = new Fui.Event({
            hoster:this
        });
        var me = this;
        me.$el_cur = null;
        me.index = 0;
        me.curLi = "p1";
        me.gesture = "topSwipe";
        me.lastIndex = 0;
        me.move = true;
        me.next = false;
        me.pageCount = options.pageCount;
        me.per = options.percent;
        me.winHeight = options.winHeight;
        me.fun = options.fun;
        if(me.curLi=="p1"){
            me.fun.p1();
        }
    },
    _onstart:function(e){
        if(e.target.nodeName.toLowerCase()!="input"){
            e.stopPropagation();
            e.preventDefault();
        }else{
            $(e.target).focus();
        }
        var me = this
            ,event = me.event
            ,tar = e.target
            ;
        me.next = false;
    },
    _onmove:function(e){
        if(e.target.nodeName.toLowerCase()!="input"){
            e.stopPropagation();
            e.preventDefault();
        }else{
            $(e.target).focus();
        }
        var me = this
            ,event = me.event
            ,sp = event._event_start_p
            ,cp = event._event_cur_p
            ,del = {
                y:cp.y - sp.y
            };
        me.gesture = event.gesture;
        if(Math.abs(del.y)>100){
            me.next = true;
        }
    },
    _onend:function(e){
        if(e.target.nodeName.toLowerCase()!="input"){
            e.stopPropagation();
            e.preventDefault();
        }else{
            $(e.target).focus();
        }
        var me = this;
        if(me.next==true){
            switch (me.gesture){
                case "topSwipe":
                    if(me.move==false){
                    }
                    if(me.move==true){
                        me._movePage_top();
                    }
                    break;
                case "bottomSwipe":
                    if(me.move==true){me._movePage_btm();}
                    if(me.move==false){
                    }
                    break;
            }
            me._arrow();
        }
    },
    _move_back:function(){
        var me = this;
        me.index = 0;
        me._transform(0);
        me._getCur();
        me.fun[me.curLi]();
    },
    _movePage_top:function(){
        var me = this;
        me.index++;
        me.index = (me.index<me.pageCount) ? me.index : me.pageCount-1;
        var trans = (me.index)*(-1)*me.winHeight+"px";
        me._transform(trans);
        me._getCur();
        me.fun[me.curLi]();
    },
    _movePage_btm:function(){
        var me = this;
        --me.index;
        me.index = (me.index<0) ? 0 : me.index;
        var trans_1 = (me.index)*(-1)*me.winHeight+"px";
        me._transform(trans_1);
        me._getCur();
        me.fun[me.curLi]();
    },
    _transform:function(val){
        var me = this;
        me.$el.find("#c").css({
            webkitTransform:"translate3d(0,"+val+",0)"
        });
    },
    _getCur:function(){
        var me = this;
        me.$el.find("li.p").eq(me.index).addClass("cur").siblings().removeClass("cur");
        me.curLi = me.$el.find("li.cur").attr("data-li");
        setTimeout(function(){me.$el.find("li.p.cur").siblings().find(".ani").removeClass("ani");},1000);
    },
    _arrow:function(){
        var me = this;
        if(me.curLi=="p16"){
            $(".arrow").delay(500).fadeOut();
        }
        else{
            $(".arrow").delay(500).fadeIn();
        }
        var index = me.$el.find("li.p").eq(me.index).attr("data-index");
        $(".menu .nav").eq(index).addClass("cur").siblings().removeClass("cur");
    }
});