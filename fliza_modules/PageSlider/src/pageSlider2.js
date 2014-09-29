//PageSlider

require('arrow');


Fui.PageSlider = Fui.Template.extend({
    className:function(){
        var me = this
            ,orient = me.get('orient')
        ;
        return ['fui-pageSlider','x' == orient?'x':''];
    },
    config:{
        index:-1,
        slideType:null,// type1 fade
        prePage:-1,
        pageNum:0,
        curPage:0,
//        prePage:0,
        nextPage:0,
        lock:false,
        data:null,
        toggleCls:'focus',
        pageWidth:640,
        arrow:'bottom',
        orient:'y'  //x y
    }
    ,data:null

    ,gestureItems:[]

    ,fg:null
    ,arrowWithout:''
    ,_slide_flag:false
    ,listeners:{
        gesture:null
    }
    ,getPage:function(index){
        return this.get('data')[index];
    }
    ,getImgPath:function(src){
        return src;
    }
//    ,render:function(){}
    ,render:function(){
        var me = this
            ,$el = me.$el
            ,$ul = me.$ul = $('<div class="c"></div>')
            ;
        $el.append($ul);

        this.event = new Fui.Event({
            hoster:this
        });

        // generate every page
        var data = this.get('data');
//        console.log(data);
        if(_.isArray(data)){
            _.each(data,function(a,i){
                var fn = Fui.Template[a.template];
                if(_.isFunction(fn)){
//                    delete a.template;
                    var $li = $(me.getOnePageLI(i));
                    me.$ul.append($li);
                    a.pageIndex = i;
                    //can not set value for '$el' directly
                    a.el = $li;
                    var ins = new fn(a);
                    ins.render();
                    data.splice(i,1,ins);
                }
            });
            this.set('pageNum',data.length);
        }else{
            this.set('data',[]);
        }

        // arrow
        var arrow = this.get('arrow');
        if(arrow){
            if(_.isString(arrow)) arrow = {
                orient:arrow,
                without:[],
                css:{}
            };
            var _a = this.arrow = new Fui.Arrow({
                orient:arrow.orient,
                style:arrow.style||{}
            });
            this.arrowWithout = _.isArray(arrow.without)?
                ('-'+arrow.without.join('-')+'-'):'';
            this.$el.append(_a.$el);
        }

        me.ensureLayout();

//        setTimeout(function(){
//            me.slide(me.get('curPage'));
//        },1);

    }

    ,pageMap:{}

    ,onSlideEnd:function(index){}
    ,onGesture:function(gesture,$tar,e){
        var me = this
            ,data = me.get('data')
            ,index = me.get('index')
            ,arr = [],a = null
        ;
        //参数处理 data-attr="name@param"
        var param = $tar.attr('data-'+gesture)||'';
        param = param.split('@');

        for(var i= 0,l=data.length;i<l;i++){
            a = data[i];
            var flag = false;
            if(a.getGestureItems)
                arr = a.getGestureItems()||[];
            for(var j= 0,ln = arr.length;j<ln;j++){
                var aa = arr[j];
                if(gesture == aa.gesture
                    &&aa.name == param[0]
                    && _.isFunction(aa.callback)
                    ){
                    aa.callback.call(data[i],e,$tar,param[1]);
                    flag = true;
                    break;
                }
            }
            if(flag)
                break;
        }

        if(data[index]&&data[index] instanceof Fui.Template){
            data[index].onGesture(e,gesture,$tar);
        }
        me.trigger('gesture',[e,gesture,$tar]);
    }
    ,onFocus:function(){
        this.get('data')[this.get('curPage')].onFocus();
    }
    ,onBlur:function(){
        this.get('data')[this.get('curPage')].onBlur();
    }
    ,slide: function (index,e) {
        var me = this
            ,$ul = me.$ul
            ,$sections = $ul.children()
            ,curPage = me.get('curPage')
            ,pageNum = me.get('pageNum')
            ,orient = me.get('orient')
            ,type = index == curPage?'=':(index > curPage?'+':'-')
            ,slideType = me.get("slideType")
            ;
        if(index<0) index = pageNum - 1;
        if(index>pageNum-1) index = 0;

        if(index == curPage) type = '=';

        if(this.arrow){
            if(this.arrow instanceof Fui
                &&this.arrowWithout.indexOf('-'+index+'-')>=0){
                this.arrow.hide();
            }else{
                this.arrow.show();
            }
        }

        me.set('prePage',me.get('curPage'));
        me.set('curPage',index);

        me._slide_flag = true;
        setTimeout(function(){
            me._slide_flag = false;
        },400);
        switch (slideType){
            case 'fade':
                fade();
                break;
            default :
                defaults();
        }
        function fade(){
            var $tar = $sections.eq(index);
            $tar.css({
                zIndex:1,
                opacity:1
            }).siblings().css({
                zIndex:0,
                opacity:0
            });
            transitionEnd($tar);
        }
        function trans(v){
            v = v||'0px';
            if(!/\%$/.test(v)) v = parseInt(v)+'px';
            return [
                'translate3d('+
                    (orient == 'x'?v:'0px'),
                orient == 'y'?v:'0px',
                '0px)'
            ].join(',');
        }
        function defaults(){
            var dis = me.event._event_cur_dis[orient];
            if(type == '='){
                dis>0?
                me.$preLi.css({
                    webkitTransform:trans('-100%'),
                    webkitTransition:'-webkit-transform .4s'
                }):
                me.$nextLi.css({
                    webkitTransform:trans('100%'),
                    webkitTransition:'-webkit-transform .4s'
                });
                me.$curLi.css({
                    webkitTransform:trans('0'),
                    webkitTransition:'-webkit-transform .4s'
                });
            }else {
                if(dis==0){
                    me.$preLi.css({
                        webkitTransform:trans('-100%'),
                        webkitTransition:'none',
                        display:'block'
                    });
                    me.$nextLi.css({
                        webkitTransform:trans('100%'),
                        webkitTransition:'none',
                        display:'block'
                    });
                }
                setTimeout(function(){
                    _do();
                },1);

                function _do(){
                    if(type == '+'){
                        me.$nextLi.css({
                            webkitTransform:trans('0'),
                            webkitTransition:'-webkit-transform .4s'
                        });
                        me.$curLi.css({
                            webkitTransform:trans('-100%'),
                            webkitTransition:'-webkit-transform .4s'
                        });
                    }else if(type == '-'){
                        me.$preLi.css({
                            webkitTransform:trans('0'),
                            webkitTransition:'-webkit-transform .4s'
                        });
                        me.$curLi.css({
                            webkitTransform:trans('100%'),
                            webkitTransition:'-webkit-transform .4s'
                        });
                    }

                    transitionEnd(me.$curLi);
                }




            }
        }
        function transitionEnd($tar){
            $tar.one('webkitTransitionEnd',function(e){
                $ul.children().eq(index).addClass('focus').siblings('li').removeClass('focus');
                var data = me.get('data')
                    ,prePage = me.get('prePage')
                    ,dIndex = data[index]
                    ,dPIndex = data[prePage]
                    ;
                if(dIndex&& _.isFunction(dIndex.onFocus)){
                    dIndex.onFocus();
                }
                if(dPIndex&&dPIndex!=dIndex&& _.isFunction(dPIndex.onBlur)){
                    dPIndex.onBlur();
                }
                me.onSlideEnd(index,e);
                me.ensureLayout();
                me._slide_flag = false;
            });
        }


    }
    ,next: function (e) {
        var me = this
            ,index = me.get('curPage')
            ;
        me.slide(index+1,e);
    }
    ,prev: function(e){
        var index = this.get('curPage');
        this.slide(index-1,e);
    }
    ,ensureLayout:function(){
        var me = this
            ,$lis = me.$ul.children()
            ,curPage = me.get('curPage')
            ,pageNum = me.get('pageNum')
            ,prePage = curPage - 1<0?pageNum-1:curPage-1
            ,nextPage = curPage +1>pageNum-1?0:curPage+1
            ,orient = me.get('orient')
            ,slideType = me.get('slideType')
            ,isV = 'y' == orient
            ,isH = 'x' == orient
            ;
        me.$curLi = $lis.eq(curPage);
        me.$preLi = $lis.eq(prePage);
        me.$nextLi = $lis.eq(nextPage);
        me.ul_height = me.$ul.height();
        me.ul_width = me.$ul.width();
        switch (slideType){
            case 'fade':
                fade();
                break;
            default :
                defaults();
        }
        function fade(){
            $lis.css({
                webkitTransition:'opacity .4s ease'
            });
            me.$curLi.css({
                    opacity:1,
                    zIndex:1
                }).siblings().css({
                    opacity:0,
                    zIndex:0
                });
        }
        function defaults(){
            var trans = [
                'translate3d(',
                isH?'-100%,':'0px,',
                isV?'-100%':'0px',
                ',0px)'
            ];
            $lis.css({
                webkitTransform:trans.join(''),
                webkitTransition:'-webkit-transform 0s'
                ,zIndex:0
            });
            me.$curLi.css(
                {
                    webkitTransform:'translate3d(0px,0px,0px)',
                    webkitTransition:'-webkit-transform 0s',
                    display:'block'
                }
            );
        }
    }
    ,_onstart:function(e){
        var me = this
            ,slideType = me.get('slideType')
            ;
        e.stopPropagation();
        e.preventDefault();
//        e.stopPropagation();
//        if(Fui.client.andrioid_version>=4.4)
//            e.preventDefault();
        if(me._slide_flag) return;
        /**
         * TMD 巨坑爹，如果不把划出屏外的section隐藏了，然后move的时候再显示出来，那么move的时候nextLi就不显示了。
         * */
        switch (slideType){
            case 'fade':
                fade();
                break;
            default :
                defaults();
        }
        function fade(){

        }
        function defaults(){
            me.$ul.children().css({
                zIndex:0,
                display:'none'
            });
            me.$curLi.css({
                display:'block'
            });
            me.$preLi.css({
                zIndex:1
            });
            me.$nextLi.css({
                zIndex:1
            });
        }

    }
    ,_onmove:function(e){
        e.stopPropagation();
        e.preventDefault();
//        e.stopPropagation();
//        if(Fui.client.andrioid_version>=4.4)
        /**
         * android 低版本下如果不禁用事件 touchmove 事件只会调用一次
         * */
//            e.preventDefault();
        var me = this
            ,event = me.event
            ,orient = me.get('orient')
            ,hh =  {
                x:me.ul_width
                ,y:me.ul_height
            }[orient]
            ,delY = event._event_cur_dis[orient]
            ,slideType = me.get('slideType')
        ;
        if(!event.checkOrientGesture(orient)) return;
        if(me._slide_flag) return;
        switch (slideType){
            case 'fade':
                fade();
                break;
            default :
                defaults();
        }
        function fade(){

        }
        function defaults(){
            function trans(v){
                v = v||'0px';
                if(!/\%$/.test(v)) v = parseInt(v)+'px';
                return [
                        'translate3d('+
                        (orient == 'x'?v:'0px'),
                        orient == 'y'?v:'0px',
                    '0px)'
                ].join(',');
            }
            if(delY>0){
                me.$nextLi.css({
                    webkitTransform:trans('100%'),
                    webkitTransition:'none',
                    display:'none'
                });
                me.$preLi.css({
                    webkitTransform:trans(delY - hh),
                    webkitTransition:'none',
                    display:'block'
                });
            }else{
                me.$preLi.css({
                    webkitTransform:trans('-100%'),
                    webkitTransition:'none',
                    display:'none'
                });
                me.$nextLi.css({
                    webkitTransform:trans(delY + hh),
                    webkitTransition:'none',
                    display:'block'
                });
            }
            me.$curLi.css({
                webkitTransform:trans(delY),
                webkitTransition:'none',
                display:'block'
            });
            if(/^up|down/g.test(event.startGesture)){

            }
        }




    }
    ,_onend:function(e){
        e.stopPropagation();
        e.preventDefault();
//        e.stopPropagation();
//        if(Fui.client.andrioid_version>=4.4)
//            e.preventDefault();


        var me = this,
            event = me.event
            ,orient = me.get('orient')
            ,gesture = me.gesture = event.gesture
            ,slideType = me.get('slideType')
            ,$tar = $(e.target)
        ;
        if(!event.checkOrientGesture(orient)){
            return me.slide(me.get('curPage'));
        }

        if(me._slide_flag) return;

//        $('body').scrollTop(0);
//        me.onGesture(gesture,$tar,e);
        if(true === me.get('lock'))return;
        if(orient == 'y'){
            switch (event.gesture){
                case 'upSwipe':
                    me.next(e);
                    break;
                case 'downSwipe':
                    me.prev(e);
                    break;
                default :
                    me.slide(me.get('curPage'));
            }
        }
        if(orient == 'x'){
            switch (event.gesture){
                case 'leftSwipe':
                    me.next(e);
                    break;
                case 'rightSwipe':
                    me.prev(e);
                    break;
                default :
                    me.slide(me.get('curPage'));
            }
        }
//        if(event.gesture == null){
//            me.slide(me.get('curPage'));
//        }

//        switch (slideType){
//            case 'fade':
//                fade();
//                break;
//            default:
//                defaults();
//        }
//        function fade(){
//
//        }
//        function defaults(){
//
//        }


    }
    ,_ontap:function(e){
//        this.onTap(e);

    }

    /**
     * for simulator ============
     * */
    ,getOnePageLI:function(index){
        return Handlebars.compile(
            '<section class="p p{{index}}"></section>'
        )({
            index:index
        });
    }
    ,insert:function(template,index){
        var me = this
            ,$ul = me.$ul
            ,pageNum = me.get('pageNum')+1
            ,data = me.get('data')
            ,fn = Fui.Template[template]
            ;

        if(index<0) index = 0;
        if(index>pageNum) index = pageNum;
        if(!_.isFunction(fn)){
            error(template+' is not loaded !');
            return false;
        }

//        var $li = $('<li class="p p'+(index)+'"></li>');
        var $li = $(me.getOnePageLI(index));
//        console.log('create page '+index+' !');
        var module = new fn({
            pageIndex:index,
            template:template,
            el:$li[0]
        });
//        module.addTpl();
        module.render();
        if(index == 0){
            $ul.prepend($li);
        }else{
            $li.insertAfter($ul.children().eq(index-1));
        }
        //data
        var a1 = data.slice(0,index)
            ,a2 = data.slice(index);
        me.set('data',a1.concat([module],a2));
        me.set('pageNum',pageNum);
        return module;
    }
});


