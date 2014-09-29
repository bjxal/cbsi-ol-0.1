/**
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form.ImageListPicker = Fui.Form.Element.extend({
    config:{
        listTpl:require('!tpl:../tpl/imageListPicker/list'),
        itemTpl:require('!tpl:../tpl/imageListPicker/item'),
        value:[]
    },
    initialize:function(options){
        this.render();
        this.change = options.change||Fui.emptyFunc;
    },
    render:function(){
        var me = this
            ,$el = me.$el
            ,listTpl = Handlebars.compile(me.get('listTpl'))
            ,itemTpl = me.itemTpl = Handlebars.compile(me.get('itemTpl'))
            ,$imageList = me.$imageList = $(listTpl())
        ;

        $el.append($imageList);
        var $tools = $imageList.find('.image-tools');
        var addImgBtn = new Fui.Button({
            type:'primary',
            size:'xs',
            text:'添加图片',
            listeners:{
                tap:function(){
                    me.addImage(function(){
                        setTimeout(function(item){
                            item.$input[0].click();
                        },100);
                    });
                }
            }
        });
        $tools.append(addImgBtn.$el);
    },
    itemIndex:0,
    addImage: function (cb) {
        var me = this
            ,$il = me.$imageList.find('.image-list')
            ;
        var item = new Fui.Form.ImageListPicker.Item({
            index:me.itemIndex++,
            listeners:{
                clear:function(){
                    this.remove();
                    var index = this.get('index');
                    me.get('value').splice(index,1);
                    me.trigger('itemRemove',[index]);
                }
            }
        });
        me.get('value').push(item);
        $il.append(item.$el);
        cb(item);
    },
    getData:function(){
        return {
            name: this.get('name'),
            value: this.get('value')
        };
    },
    upload:function(cb){
        var me = this
            ,value = me.get('value')
            ;
        new Fui.FileUpload({
            file: value,
            listeners:{
                end:function(path,name){
                    console.log('upload ',me.get('name'),' end');
                    me.set('value',path);
                    cb(true);
                },
                error:function(){
                    cb(false);
                }
            }
        });
    },
    listeners:{
        valueChanged:function(n,o){
            var me = this;
            if (!_.isArray(n)) n = [n];
            _.each(n,function(a,i){
                me.trigger('change',[
                    null,
                    a,
                    i
                ]);
            });
        },
        change:null,
        itemRemove:null
    },
    events:{
        'change input':function(e){
            var me = this;
            var file = e.target.files[0];
            var url = URL.createObjectURL(file);
            var img = new Image();
            var index = $(e.target).attr('data-form-image-list-item');
            img.src = url;
            img.onload = function(){
                me.get('value').splice(index,1,file);
                me.trigger('change',[
                    e,
                    img.src,
                    index
                ]);
            };

        }
    }
});

Fui.Form.ImageListPicker.Item = Fui.extend({
    config:{
        tpl:require('!tpl:../tpl/imageListPicker/item'),
        index:-1
    },
    listeners:{
        clear:null
    },
    initialize:function(){
        var me = this,
            tpl = Handlebars.compile(me.get('tpl'))
        ;
        var el = me.el = tpl({index:me.get('index')});
        me.$el = $(el);
        me.$input = me.$el.find('input');
        var clearBtn = new Fui.Button({
            text:'清除',
            size:'xs',
            listeners:{
                tap:function(){
                    me.trigger('clear');
                }
            }
        });
        me.$el.append(clearBtn.$el);
    }
});