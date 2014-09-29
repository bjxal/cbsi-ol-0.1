Fui.Template.Base = Fui.Template.extend({
    className:'module module-base',
    config:{
        //foreground
        tpl:require('!tpl:./tpl/base'),
        fg:null
    },
    listeners:{
        fgChanged:function(n){
            this.renderFg(n);
        }
    },
    save:function(cb){
        var me = this,d = this.getForm().getData();
        var i = 0;
        _.each(d,function(f,key){
            new Fui.FileUpload({
                file: f,
                name: key,
                listeners:{
                    end:function(path,name){
                        me.getForm().setData(name,path);
                        success();
                    },
                    error:function(){
                        cb(false);
                    }
                }
            });
        });

        function success(){
            i++;
            if(i == 2){
                cb(true,me);
            }
        }
    },
    render:function(){
        var me = this,
            fg = me.get('fg')
            ;
        this.renderFg(fg);
    },
    renderFg:function(fg){

        if(fg){
            this.$el.children('.base-foreground').css({
                backgroundImage:'url('+this.getImgPath(fg)+')'
            });
        }
    },
    clearFg:function(){
        this.$el.children('.base-foreground').css({
            backgroundImage:'none'
        });
    },
    getFormItems:function(){
        var me = this
            ,$el = me.$el;
        return [
            {
                type:'ImagePicker',
                $el:this.$el,
                label:'背景图片：',
                name:'bg',
                listeners:{
                    change:function(src){
                        me.renderBg(src);
                    },
                    clear:function(){
                        me.clearBg();
                    }
                }
            }
            ,{
                type:'ImagePicker',
                $el:this.$el,
                label:'前景图片：',
                name:'fg',
                listeners:{
                    change:function(src){
                        me.renderFg(src);
                    },
                    clear:function(){
                        me.clearFg();
                    }
                }
            }
        ];
    }
});