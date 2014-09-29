/**
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form.ImageListPicker = Fui.Form.Element.extend({
    config:{
        listTpl:require('!tpl:../tpl/imageListPicker/list'),
        value:[],
        items:[]
    },
    listeners:{
        valueChanged:function(n,o){
            var me = this;
            if(!_.isArray(n)) n = [n];
            this.clearAll();
            _.each(n,function(a){
                me.addItem(a);
            });
        },
        change:null
    }
    ,clearAll:function(){
        var items = this.get('items');
        _.each(items,function(item){
            item.trigger('clear');
        });
    }
    ,upload:function(cb){
        var me = this
            ,items = me.get('items')
            ,total = items.length,i=0
        ;
        _.each(items,function(a){
            a.upload(function(flag){
                if(!flag)return cb(false);
                if(++i == total){
                    cb(true);
                }
            });
        });
    }
    ,getData:function(){
        var me = this;
        return {
            name:me.get('name')
            ,value:me.get('value')
        };
    }
    ,addItem:function(src){
        var me = this
            ,items = me.get('items')
            ;
        var picker = new Fui.Form.ImagePicker({
            label:null,
            value:src,
            listeners:{
                change:function(src){
                    me.trigger('change',[src,this.index]);
                    me.get('value').splice(this.index,1,src);
                },
                clear:function(){
                    me.trigger('itemRemove',[this.index]);
                    me.get('value').splice(this.index,1);
                    items.splice(this.index,1);
                    this.remove();
                }
            }
        });
        picker.index = items.length;
        picker.trigger('focus');
        me.$list.append(picker.$el);
        items.push(picker);
    }
    ,initialize:function(options){
        var me = this
            ,$el = me.$el
            ,items = me.get('items')
            ,listTpl = Handlebars.compile(me.get('listTpl'))
            ,$tpl = me.$imageList = $(listTpl())
            ;

        $el.append($tpl);
        var $tools = $tpl.find('.image-tools');
        var $list = me.$list = $tpl.find('.image-list');
        var addImgBtn = new Fui.Button({
            type:'green',
            size:'xs',
            text:'添加图片',
            listeners:{
                tap:function(){
                    me.addItem();
                }
            }
        });
        $tools.append(addImgBtn.$el);
    }

});
