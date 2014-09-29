/**
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form.Text = Fui.Form.Element.extend({
    config:{
        type:'text',
        label:null,
        icon:null,
        textAlign:'left',
        fieldLabel:null,
        tpl:require('!tpl:../tpl/text'),
        placeHolder:'',
        value:null,
        focusCls:'focus'
    },
    initialize:function(){
        var me = this
            ,label = me.get('label')
            ,pH = me.get('placeHolder')
            ,tpl = Handlebars.compile(me.get('tpl'))
            ,value = me.get('value')
            ;
        me.$el.html(tpl({
            type:me.get('type'),
            label:label,
            icon:me.get("icon"),
            placeHolder:pH,
            fieldLabel:me.get('fieldLabel')
        }));
        var $input = me.$input = me.$el.find('input');
        $input.css({
            textAlign:me.get('textAlign')
        });
        me.$field = me.$el.find('.fui-form-field');
        me.$err_msg = me.$el.find('.fui-form-ele-error-msg');
        if(value!=null&&typeof value != 'undefined'){
            $input.val(value);
        }
        if(_.isFunction(this.render))
            this.render();
    },
    setErrorMsg:function(msg){
        if(!msg){
            this.$field.removeClass('error');
            this.$err_msg.text('');
        }else{
            this.$field.addClass('error');
            this.$err_msg.text(msg);
        }
    },
    listeners:{
        valueChanged:function(n,o){
//            this.$input.val(n);
            this.trigger('change',[n]);
        },
        change:null
    },
    events:{
        'focus input':function(){
            this.$field.addClass(this.get('focusCls'));
        },
        'input input':function(){
            this.set('value',this.$input.val());
        },
        'blur input':function(){
            var me = this;
            this.$field.removeClass(this.get('focusCls'));
            this.validate(function(flag,msg){
                if(flag){
                    me.$field.removeClass('error');
                    me.$err_msg.text('');
                }else{
                    me.$field.addClass('error');
                    me.$err_msg.text(msg);
                }
            });

        }
    },
    getData: function () {
        return {
            name:this.get("name"),
            value:this.get('value')
        };
    }
});