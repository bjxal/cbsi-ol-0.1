/**
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form.ImagePicker = Fui.Form.Element.extend({
    config:{
        label:'Image Picker',
        file:null,
        tpl:require('!tpl:../tpl/imagePicker')
    },
    initialize1:function(options){
        this.render();
//        this.change = options.change||Fui.emptyFunc;
    },
    initialize:function(){
        var me = this
            ,label = me.get('label')
            ,$el = me.$el
            ,tpl = Handlebars.compile(me.get('tpl'))
        ;
        me.$el.html(tpl({
            label:label
        }));
        me.$desc = $el.find('.fui-form-ele-description');
        var $right = me.$el.find('.right');
        var $input = me.$input = me.$el.find('input[type=file]');
        me.$hidden = $el.find('input[type=hidden]');
        $input.hide();
        var selBtn = me.selBtn = new Fui.Button({
            type:'primary',
            size:'xs',
            text:'选择图片',
            listeners:{
                tap:function(){
                    $input[0].click();
                }
            }
        });
        var clearBtn = me.clearBtn = new Fui.Button({
            type:'default',
            size:'xs',
            text:'清除',
            listeners:{
                tap:function(){
                    me.$input.val('');
                    me.set('value',null);
                    this.hide();
                    selBtn.set('text','选择图片');
                    me.trigger('clear');
                }
            }
        });
        clearBtn.hide();
        $right.append(selBtn.$el);
        $right.append(clearBtn.$el);

        var value = me.get('value');
        if(value)
            setTimeout(function(){
                me.set('value',value)
            },10);

    },
    getData:function(){
        return {
            name: this.get('name'),
            value: this.get('value')
        };
    },
    upload:function(cb){
        var me = this
            ,file = me.get('file')
        ;
        if(!file) return cb(true);
        new Fui.FileUpload({
            file: file,
            listeners:{
                end:function(path,name){
                    console.log('upload ',me.get('name'),path,' end');
                    me.set('value',path);
                    cb(true);
                },
                error:function(){
                    cb(false);
                }
            }
        });
    },
    setImg:function(src){
        var me = this;
        me.trigger('change',[src]);
        if(src){
            me.selBtn.set({
                'text':'重新选择'
            });
            me.clearBtn.show();
        }else{
            me.selBtn.set({
                'text':'选择图片'
            });
            me.clearBtn.hide();
        }
//        var reg = /\/([^\/]*)$/g.exec(src);
//        me.$desc.text(reg?reg[1]:src);
    },
    listeners:{
        valueChanged:function(n,o){
            this.set('file',null);
            this.setImg(n);
        },
        change:null,
        clear:null,
        focus:function(){
            this.$input[0].click();
        }
    },
    events:{
        'blur input[type=file]':function(){
            console.log(arguments);
        },
        'change input[type=file]':function(e){
            var me = this;
            var file = e.target.files[0];
            if(file){
                var url = URL.createObjectURL(file);
                var img = new Image();
                img.src = url;
                img.onload = function(){
                    me.set('value',this.src);
                    me.set('file',file);
//                    me.setImg(this.src);
                };
            }
        }
    }
});