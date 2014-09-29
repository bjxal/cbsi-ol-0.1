
Fui.Popup = Fui.extend({
    className:'fui-popup hide',
    config:{
        form:null,
        type:'scale'
    },
    initialize:function(){
        var me = this
            ,type = me.get('type')
        ;
        me.$el.addClass(type);
    },
    form:function(form){
        this.$el.append(form.$el);
        this.show();
    },
    img:function(src){

    },
    show:function(){
        var $el = this.$el;
        $el.removeClass('hide');
        $('body').append($el);
        setTimeout(function(){
            $el.addClass('show');
        },1);
    },
    hide:function(){
        var $el = this.$el
            ,me = this;
        $el.removeClass('show');
        setTimeout(function(){
            me.remove();
        },500);
    },
    events:{
        'click':function(){
            this.hide();
        }
    }
});