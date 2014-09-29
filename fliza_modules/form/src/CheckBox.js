
Fui.Form.CheckBox = Fui.Form.Element.extend({
//    className:function(){
//        return ['fui-form-'];
//    },
    config:{
        checked:false,
        text:null,
        tpl:require('!tpl:../tpl/checkbox')
    },
    listeners:{
        change:null,
        checkedChanged:function(n){
            var $ck = this.$checkmark;
            n?$ck.addClass('icon-checkmark'):$ck.removeClass('icon-checkmark');
            this.set('value',n);
            this.trigger('change');
        }
    },
    events:{
        'click button':function(){
            this.set('checked',!this.get('checked'));
        }
    },
    initialize:function(){
        var me = this
            ,text = me.get('text')
            ,$el = me.$el
            ,label = me.get('label')
            ,tpl = Handlebars.compile(me.get('tpl'))
            ,checked = me.get('checked')
            ;
        me.$el.html(tpl({
            text:text,
            checked:checked,
            label:label
        }));

        me.$checkmark = $el.find('[data-form-checkbox-checkmark]');
        setTimeout(function(){
            me.set('checked',checked);
        },10);
    }
});