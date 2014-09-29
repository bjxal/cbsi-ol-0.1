var URL = window.URL && window.URL.createObjectURL ? window.URL :
        window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :null;
if (!URL) { throw Error("No createObjectURL function found to create blob url"); }

Fui.Template = Fui.extend({
//    className:'module',
    config:{
        template:null,
        tpl:null,
        pageIndex:0,
        bg:null
    },
    propsForm:null,
    save:function(cb){},
    getImgPath:function(src){
        return src;
    },
    design:null,
    initialize: function (options) {
        var me = this
            ,bg = me.get('bg')
            ;
        this.renderBg(bg);
        this.addTpl();
        if(_.isFunction(this.design))
            this.design();
//        $el.append(Handlebars.compile(me.get('tpl')||'')(me.getTplData()));
//        if(_.isFunction(me.render))
//            me.render();
    },
    renderBg:function(bg){
        if(bg){
            this.$el.css({
                backgroundImage:'url('+this.getImgPath(bg)+')'
            });
        }
    },
    clearBg:function(){
        this.$el.css({
            backgroundImage:'none'
        });
    },
    onFocus:function(){},
    onBlur:function(){},
    getTplData:function(){
        return {
            pageIndex:this.get('pageIndex')
        };
    },
    onGesture:function(e,gesture,$tar){},
    checkSize: function () {
        return true;
    },
    validateInfo:function(info,props){
        var flag = true;
        _.each(props,function(a){
            if(!info.hasOwnProperty(a)){
                error('Module must contain a ['+a+'] on [name: '+info.label+',label:'+info.name+']');
                flag = false;
            }
        });
        return flag;
    },
    /**
     * ========= methods for simulator ============
     * */
    addTpl:function(){
        var tpl = this.get('tpl')||'';
        this.$el.append(Handlebars.compile(tpl)(this.getTplData()));
    },
    getData:function(){
        return _.extend({},{template:this.get('template')},this.getForm().getData());
    },
    form:null,
    getForm:function(){
        var index = (this.get('pageIndex')+1);
        if(!this.form){
//            console.log(this.get('pageIndex'));
            this.form = new Fui.Form({
                size:'normal',
                title:(index==1?'首':'第 '+index+' ')+'页属性',
                items:this.getFormItems()
            });
        }
        return this.form;
    },
    getFormItems:Fui.emptyFunc,
    getGestureItems:function(){
        return [];
    },

    getText:function(info){
        if(!this.validateInfo(info,['name','label','placeHolder']))return;
        info.type = 'text';
        return info;
    },
//    getVideoPicker:function(info){
//        if(!this.validateInfo(info,['name','label','change']))return;
//        var me = this;
//        return {
//            type:'video',
//            name:info.name,
//            label:info.label,
//            change:function(e){
//                var file = e.target.files[0];
//                var url = URL.createObjectURL(file);
//                info.change
//            }
//        };
//    },
    getSelection:function(info){
        var me = this
            ,$pack = info.$el
        ;
        if(!this.validateInfo(info,['name','label','change','data']))return;
        info.type = 'select';
        return info;
//        return {
//            type:'select',
//            name:info.name,
//            label:info.label,
//            data:info.data,
//            listeners:{
//                change:info.change
//            }
//        };
    },
    getImagePicker:function(info){
        return this.getImage(info);
    },
    getImageListPicker: function (info) {
        var me = this
            ;
        if(!this.validateInfo(info,['name','change']))return;
        return {
            type:'image-list',
            name:info.name,
            listeners:{
                change:function(e,index){
                    var file = e.target.files[0];
                    var url = URL.createObjectURL(file);
                    var img = new Image();
                    img.src = url;
                    img.onload = function(){
                        var w = this.naturalWidth,
                            h = this.naturalHeight
                            ;
                        if(!me.checkSize(w,h)){
                            error('Image size must be 640 X 1010');
                            return;
                        }
                        info.change.call(img,e,index);
                    };
                }
            }

        };
    },
    getImage:function(info){
        var me = this
        ;
        if(!this.validateInfo(info,['name','label','change']))return;
        info.type = 'image';
        return info;
        var f = {
            type:'image',
            name:info.name,
            label:info.label,
            listeners:{
                change:function(e){
                    var file = e.target.files[0];
                    var url = URL.createObjectURL(file);
                    var img = new Image();
                    img.src = url;
                    img.onload = function(){
                        var w = this.naturalWidth,
                            h = this.naturalHeight
                            ;
                        if(!me.checkSize(w,h)){
                            error('Image size must be 640 X 1010');
                            return;
                        }
                        info.change.call(img);
                    };
                }
            }
        };
        return f;
    }
});