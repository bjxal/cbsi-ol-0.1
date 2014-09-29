//PageSlider

require('arrow');


Fui.PageSlider = Fui.Template.extend({
    fid:'PageSlider',
    className:function(){
        var me = this
            ,orient = me.get('orient')
        ;
        return ['fui-pageSlider','x' == orient?'x':''];
    },
    config:{
        index:-1,
        slideType:null,// type1
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
    ,getImgPath:function(src){
        return src;
    }
    ,render:function(){}
    ,initialize:function(){
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
    ,slide: function (index,e) {
        var me = this

            ,$ul = me.$ul
            ,curPage = me.get('curPage')
            ,pageNum = me.get('pageNum')
            ,type = index == curPage?'=':(index > curPage?'+':'-')
            ,$tar = null
            ;
        if(index<0) index = pageNum - 1;
        if(index>pageNum-1) index = 0;

        if(this.arrow){
            if(this.arrow instanceof Fui
                &&this.arrowWithout.indexOf('-'+index+'-')>=0){
                this.arrow.hide();
            }else{
                this.arrow.show();
            }
        }

        if(type == '+'){
            me.$nextLi.css({
                webkitTransform:'translate3d(0px,0px,0px) ',
                webkitTransition:'-webkit-transform .4s'
            });
            me.$curLi.css({
                webkitTransform:'translate3d(0px,-100%,0px) ',
                webkitTransition:'-webkit-transform .4s'
            });
        }else if(type == '-'){
            me.$preLi.css({
                webkitTransform:'translate3d(0px,0px,0px) ',
                webkitTransition:'-webkit-transform .4s'
            });
            me.$curLi.css({
                webkitTransform:'translate3d(0px,100%,0px) ',
                webkitTransition:'-webkit-transform .4s'
            });
        }else if(type == '='){
            me.$preLi.css({
                webkitTransform:'translate3d(0px,-100%,0px) ',
                webkitTransition:'-webkit-transform .4s'
            });
            me.$nextLi.css({
                webkitTransform:'translate3d(0px,100%,0px) ',
                webkitTransition:'-webkit-transform .4s'
            });
            me.$curLi.css({
                webkitTransform:'translate3d(0px,0px,0px) ',
                webkitTransition:'-webkit-transform .4s'
            });
        }
//        me.$curLi.css({
//            webkitTransform:'translate3d(0px,'+type+'100%,0px) ',
//            webkitTransition:'-webkit-transform .4s'
//        });

        me.set('prePage',me.get('curPage'));
        me.set('curPage',index);
        me._slide_flag = true;
        setTimeout(function(){
            me._slide_flag = false;
        },400);
        me.$curLi.one('webkitTransitionEnd',function(e){
            $ul.children().eq(index).addClass('focus').siblings('li').removeClass('focus');
            var data = me.get('data')
                ,prePage = me.get('prePage')
                ,dIndex = data[index]
                ,dPIndex = data[prePage]
                ;
            if(dIndex&& _.isFunction(dIndex.onFocus)){
                dIndex.onFocus();
            }
            if(dPIndex&& _.isFunction(dPIndex.onBlur)){
                dPIndex.onBlur();
            }
            me.onSlideEnd(index,e);
            me.ensureLayout();
            me._slide_flag = false;
        });

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
    ,_onstart:function(e){
        var me = this;
        e.stopPropagation();
        if(Fui.client.andrioid_version>=4.4)
            e.preventDefault();
        if(me._slide_flag) return;
        /**
         * TMD 巨坑爹，如果不把划出屏外的section隐藏了，然后move的时候再显示出来，那么move的时候nextLi就不显示了。
         * */
        this.$ul.children().css({
            zIndex:0,
            display:'none'
        });
        this.$curLi.css({
            display:'block'
        });
        this.$preLi.css({
            zIndex:1
        });
        this.$nextLi.css({
            zIndex:1
        });
    }
    ,_onmove:function(e){
        e.stopPropagation();
//        if(Fui.client.andrioid_version>=4.4)
        /**
         * android 低版本下如果不禁用事件 touchmove 事件只会调用一次
         * */
            e.preventDefault();
        var me = this
            ,event = me.event
            ,hh =  me.ul_height
            ,delY = event._event_cur_dis.y
            ,slideType = me.get('slideType')
        ;
        if(me._slide_flag) return;
        if(delY>0){
            me.$preLi.css({
                webkitTransform:'translate3d(0px,'+(delY - hh)+'px,0px) ',
                webkitTransition:'none',
                display:'block'
            });
            me.$nextLi.css({
                webkitTransform:'translate3d(0px,100%,0px) ',
                webkitTransition:'none',
                display:'none'
            });
        }else{
            me.$preLi.css({
                webkitTransform:'translate3d(0px,-100%,0px) ',
                webkitTransition:'none',
                display:'none'
            });
            me.$nextLi.css({
                webkitTransform:'translate3d(0px,'+(delY + hh)+'px,0px) ',
                webkitTransition:'none',
                display:'block'
            });
        }
        me.$curLi.css({
            webkitTransform:'translate3d(0px,'+(delY)+'px,0px) ',
            webkitTransition:'-webkit-transform 0s',
            display:'block'
        });

//        var _p = delY/(hh*0.5);
//        console.log(_p);
//        switch (slideType){
//            case 'type1':
//
//                break;
//        }
    }
    ,_onend:function(e){
        e.stopPropagation();
        if(Fui.client.andrioid_version>=4.4)
            e.preventDefault();


        var me = this,
            event = me.event
            ,orient = me.get('orient')
            ,gesture = me.gesture = event.gesture
            ,$tar = $(e.target)
        ;

        if(me._slide_flag) return;

        $('body').scrollTop(0);
        me.onGesture(gesture,$tar,e);
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
    }
    ,_ontap:function(e){
//        this.onTap(e);
        if(e.target.tagName.toLowerCase() == 'input'){
            e.target.focus();
        }
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


