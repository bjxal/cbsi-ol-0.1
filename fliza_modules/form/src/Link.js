
Fui.Form.Link = Fui.Form.Element.extend({
    config:{
        link:null,
        text:null,
        textAlign:'left',
        target:'_blank',
        tpl:require('!tpl:../tpl/link')
    },
    listeners:{

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
            ,link = me.get('link')
            ,tpl = Handlebars.compile(me.get('tpl'))
            ;
        me.$el.html(tpl({
            target:me.get('target'),
            text:text,
            label:label,
            link:link
        })),
        me.$el.find('[data-form-link-a]').css({
            textAlign:me.get('textAlign')
        });


    }
});