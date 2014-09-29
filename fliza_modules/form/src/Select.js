/**
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form.Select = Fui.Form.Element.extend({
    config:{
        value:null,
        label:'Select : ',
        data:[],
        tpl:require('!tpl:../tpl/select')
    },
    initialize:function(){
        this.render();
    },
    render:function(){
        var me = this
            ,label = me.get('label')
            ,data = me.get('data')
            ,tpl = Handlebars.compile(me.get('tpl'))
            ;
        me.$el.html(tpl({
            label:label,
            data:data
        }));
        me.$list = me.$el.find('[data-fui-key=sel-list]');
        me.$holder = me.$el.find('[data-fui-key=sel-holder]');
        _.each(data,function(a,i){
            if(a.checked === true)
                me.set('value', a.value);
        });
    },
    openSelList:function(){
        this.$list.show();
        this.$holder.addClass('on');
    },
    closeSelList:function(){
        this.$list.hide();
        this.$holder.removeClass('on');
    },
    getData:function(){
        return {
            name:this.get("name"),
            value:this.get('value')
        };
    },
    onSelChange:Fui.emptyFunc,
    listeners:{
        change:Fui.emptyFunc,
        valueChanged:function(n,o){
            var me = this;
            _.each(this.get('data'),function(a,i){
                if(a.value == n){
                    me.$holder.text(a.text);
//                    me.onSelChange(n,o);
                    me.trigger('change',[n,o]);
                    return false;
                }
            });
        }
    },
    events:{
        'click [data-fui-key=sel-holder]':function(e){
            if(this.$holder.hasClass('on')){
                this.closeSelList();
            }else{
                this.openSelList();
            }
        },
        'click [data-fui-key=sel-list]>li>a':function(e){
            this.set('value', $(e.target).attr('data-value'));
            this.closeSelList();
        }

    }
});