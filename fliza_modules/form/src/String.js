
Fui.Form.String = Fui.Form.Element.extend({
    config:{
        text:null,
        color:null,
        textAlign:'left',
        tpl:require('!tpl:../tpl/string')
    },
    listeners:{

    },
    initialize:function(){
        var me = this
            ,text = me.get('text')
            ,$el = me.$el
            ,label = me.get('label')
            ,link = me.get('link')
            ,tpl = Handlebars.compile(me.get('tpl'))
            ;
        me.$el.html(tpl({
            text:text,
            label:label
        }));
        me.$el.find('[data-form-string-a]').css({
            textAlign:me.get('textAlign')
        });


    }
});