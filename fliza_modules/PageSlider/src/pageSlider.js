//PageSlider

require('arrow');


Fui.PageSlider = Fui.extend({
    fid:'PageSlider',
    className:function(){
        var me = this
            ,orient = me.get('orient')
        ;
        return ['fui-pageSlider','h' == orient?'h':''];
    },
    config:{
        index:-1,
        preIndex:-1,
        pageNum:0,
        curPage:0,
        lock:false,
        data:null,
        toggleCls:'focus',
        pageWidth:640,
        arrow:'bottom',
        orient:'v'  //v h hv
    }
    /**
     * 保存了每一页的配置数据，这个数据也应该是在后台 DB 中要保存的，生成页面的时候直接放这里
     * PageSlider 会根据这个 data new每一个Template，每一个 Template 的 tpl 在生成页面的时候就已经在页面里写好了
     * new 每一个 Template 的时候，需要把 data 里对应的 {} 替换为 Template 的实例
     * ##这个DATA，应该是一个 Model ，而不是一个简单的数组，因为当 data 增删的时候需要对应的操作要执行
     * */
    ,appData:null
    ,data:null

    ,gestureItems:[]

    ,fg:null
    ,arrowWithout:''
    ,listeners:{
        gesture:null
    }
    ,getImgPath:function(src){
        return src;
    }
    ,render:function(){}
//    ,render1:function(){
//        var me = this
//            ,$el = me.$el
//            ,$ul = me.$ul = $('<ul class="c"></ul>')
//            ;
//        $el.append($ul);
//        $el.css({
//            position:'relative',
//            width: me.get('pageWidth'),
//            height: '100%',
//            overflow:'hidden',
//            boxSizing:'border-box',
//            margin:'0 auto'
//        });
//
//        this.ensureLayout();
//    }
    ,getLICss:function(){
        var me = this
            ,size = {}
            ,orient = me.get('orient')
            ,pw = me.get('pageWidth')
            ;
        if('h' == orient){
            size = {
                width: pw
            }
        }else{
            size = {
                height: 100/this.get('pageNum')+'%'
            }
        }
        return _.extend({},size);
    }
    ,ensureLayout:function(){
        var me = this
            ,$ul = me.$ul
            ,n = me.get('pageNum')
            ,orient = me.get('orient')
            ,pw = me.get('pageWidth')
            ,css = {},css1 = {}
            ;
        if(orient == 'h'){
            css = {
                width: pw*n
            };
        }else{
            css = {
                height: n+'00%'
            }
        }
        css1 = me.getLICss();

        $ul.css(css);
        $ul.children('li').css(css1);
    }
    ,initialize:function(){
        var me = this
            ,$el = me.$el
            ,$ul = me.$ul = $('<ul class="c"></ul>')
            ;
//        this.render();
        $el.append($ul);
        $el.css({
            position:'relative',
            width: 640,
            height: '100%',
            overflow:'hidden',
            boxSizing:'border-box',
            margin:'0 auto'
        });

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

        this.ensureLayout();

        setTimeout(function(){
            // slide current page
            me.slide(me.get('curPage'));
        },10);
    }
    ,onTouchStart:Fui.emptyFunc
    ,onTouchMove:Fui.emptyFunc
    ,onTouchEnd:Fui.emptyFunc
    ,onTap:Fui.emptyFunc
    ,events:{
        'pageNumchanged':function(n,o){
            this.ensureLayout();
        }
    }
    ,pageMap:{}
    ,getOnePageLI:function(index){
        return Handlebars.compile(
            '<li class="p p{{index}}"></li>'
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
    // @desperate
    ,ontransitionend:function(){}
    // @desperate
    ,onslide:function(index){}
    // @desperate
    ,onswipe:function(gesture){}

    ,onSlide:function(index){}
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
    ,doSlide:function(index,type,e){
        var me = this
            ,$el = me.$ul
            ,pageNum = me.get('pageNum')
            ,orient = me.get('orient')
            ,trans = ''
            ;

        if(orient == 'v'){
            trans = '0,-'+(index*100/pageNum)+'%,0';
        }
        if(orient == 'h'){
            trans = '-'+(index*100/pageNum)+'%,0,0';
        }
        $el.css({
            webkitTransition:'-webkit-transform .3s ease-in-out',
            webkitTransform:'translate3d('+trans+')'
        });

        return $el;
    }
    ,slide: function (index,e) {
        var me = this
            ,$el = me.$ul
            ,pageNum = me.get('pageNum')
            ;
        if(
            index == me.get('index')
            ||index<0
            ||index>=pageNum
            ) return;

        me.set('preIndex',me.get('index'));
        me.set('index',index);

        if(false === me.onSlide(index,e)){
            return;
        }
        if(this.arrow){
            if(this.arrow instanceof Fui
                &&this.arrowWithout.indexOf('-'+index+'-')>=0){
                this.arrow.hide();
            }else{
                this.arrow.show();
            }
        }
        me.doSlide(index,e).one('webkitTransitionEnd',function(e){
            $el.children('li').eq(index).addClass('focus').siblings('li').removeClass('focus');
            var data = me.get('data')
                ,preIndex = me.get('preIndex')
                ,dIndex = data[index]
                ,dPIndex = data[preIndex]
                ;
            if(dIndex&& _.isFunction(dIndex.onFocus)){
                dIndex.onFocus();
            }
            if(dPIndex&& _.isFunction(dPIndex.onBlur)){
                dPIndex.onBlur();
            }
            me.onSlideEnd(index,e);
        });

    }
    ,next: function (e) {
        var me = this
            ,index = me.get('index')
            ;
        me.slide(++index,e);
    }
    ,prev: function(e){
        var index = this.get('index');
        this.slide(--index,e);
    }
    ,_onstart:function(e){
        e.stopPropagation();
        if(Fui.client.andrioid_version>=4.4)
            e.preventDefault();
        this.onTouchStart(e);
    }
    ,_onmove:function(e){
        e.stopPropagation();
        if(Fui.client.andrioid_version>=4.4)
            e.preventDefault();
        this.onTouchMove(e);
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

        this.onTouchEnd(e);
        $('body').scrollTop(0);
        me.onGesture(gesture,$tar,e);
        if(true === me.get('lock'))return;
        if(orient == 'v'){
            switch (event.gesture){
                case 'upSwipe':
                    me.next(e);
                    break;
                case 'downSwipe':
                    me.prev(e);
                    break;
            }
        }
        if(orient == 'h'){
            switch (event.gesture){
                case 'leftSwipe':
                    me.next(e);
                    break;
                case 'rightSwipe':
                    me.prev(e);
                    break;
            }
        }
    }
    ,_ontap:function(e){
        this.onTap(e);
        if(e.target.tagName.toLowerCase() == 'input'){
            e.target.focus();
        }
    }
});


