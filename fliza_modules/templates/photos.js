
Fui.Template.Photos = Fui.Template.extend({
    className:'module module-photos',
    config:{
        tpl: require('!tpl:./tpl/photos'),
        data:null,
        withDesc:true,
        index:0
    },
    onPopFlag:true,
    render:function(){
        var me =this
            ,$el = me.$el
            ,$pack = me.$pack = $el.children('.photos-pack')
            ,data = me.get('data')||[]
            ;
        if(me.get('withDesc')){
            var $descPack = me.$descPack = $el.children('.desc-pack');
            $descPack.children('p').last().show().siblings('p').hide();
        }

        this.ensureTop3Rotate();
    },
    save:function(cb){
        var me = this
            ,form = me.getForm()
            ,data = form.getData()
            ,i = 0
            ;
        _.each(data,function(value,key){
            new Fui.FileUpload({
                file:value,
                name:key,
                listeners:{
                    end:function(res,name){
//                        console.log(arguments);
                        form.setData(name,res);
                        success();
                    },
                    error:function(){
                        cb(false);
                    }
                }
            });
        });
        function success(){
            if(++i == 2)
                cb(true);
        }

    },
    onFocus:function(){
        var me = this;
        me.$pack.addClass('focus').one('webkitTransitionEnd',function(e){
            me.$el.addClass('ani');
        });
    },
    onBlur:function(){
        this.$pack.removeClass('focus');
        this.$el.removeClass('ani');
    },
    ensureTop3Rotate:function(){
        var $imgs = this.$pack.children('img')
            ,$last = $imgs.last()
            ;
        $imgs.removeClass('pre1 pre2');
        $last.addClass('pre1').prev().addClass('pre2');
    },
    getTplData:function(){
        var me = this
            ,data = me.get('data')
        ;
        if(_.isFunction(data)) {
            data = data.call(me);
            me.set('data',data);
        }
        return {
            pageIndex:me.get('pageIndex'),
            imgList: data,
            withDesc:me.get('withDesc')
        };
    },
    pop:function(orient){
        var me = this
            ,$pack = me.$pack
            ,$imgs = $pack.children()
            ;
        if(me.onPopFlag){
            me.onPopFlag = false;
            var $tar = $imgs.last();
            $tar.addClass(orient).one('webkitTransitionEnd',function(){
                $pack.prepend($tar.removeClass(orient));
                me.ensureTop3Rotate();
                me.onPopFlag = true;
            });
            if(me.get('withDesc')){
                var $descs = me.$descPack.children('p');
                me.$descPack.addClass('hide').one('webkitTransitionEnd',function(){
                    me.$descPack.prepend($descs.last());
                    me.$descPack.children('p').last().show().siblings('p').hide();
                    me.$descPack.removeClass('hide');
                });
            }
        }
    },
    getGestureItems: function () {
        var me = this
            ,p = me.get('pageIndex')
            ,name = ['page',p,'photos','item'].join('-')
        ;

        return [
            {
                gesture:'leftSwipe',
                name:name,
                callback:function(e){
                    me.pop('afterL');
                }
            }
            ,{
                gesture:'rightSwipe',
                name:name,
                callback:function(e){
                    me.pop('afterR');
                }
            }
        ];
    },

    addImg:function(src,index){
        var me = this
            ,$tar = me.$pack.children('img').eq(index)
            ;
        if($tar.length > 0){
            $tar.attr('src',src);
        }else{
            me.$pack.append(Handlebars.compile(
                '<img class="normal" data-form-image-list-item="{{index}}" data-leftSwipe="page-{{pageIndex}}-photos-item" data-rightSwipe="page-{{pageIndex}}-photos-item" src="{{src}}"/>'
            )({
                index:index,
                src:src,
                pageIndex:me.get('pageIndex')
            }));
        }
        this.ensureTop3Rotate();
    },
    removeImg:function(index){
        this.$pack.children('[data-form-image-list-item='+index+']').remove();
//        this.getForm().getItem('imageList').removeItem(index);
        this.ensureTop3Rotate();
    },
    getFormItems: function () {
        var me = this
            ,$pack = me.$pack
        ;
        return [
            {
                type:'ImagePicker',
                name:'bg',
                label:'背景图片：',
                listeners:{
                    change:function(src){
                        me.renderBg(src);
                    },
                    clear:function(){
                        me.clearBg();
                    }
                }
            },
            {
                type:'ImageListPicker',
                name:'data',
                listeners:{
                    change:function(src,index){
                        me.addImg(src,index);
                    },
                    itemRemove: function (index) {
                        me.removeImg(index);
                    }
                }
            }
        ];
    }
});
