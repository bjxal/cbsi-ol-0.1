
Fui.Button = Fui.extend({
    tagName:'button',
    config:{
        type:'default',// default primary success info warning danger link
        text:'button',
        action:null,
        size:null// lg sm xs
    },
    initialize:function(){
        this.render();
    },
    attributes:{
        type:'button'
    },
    className:function(){
        var size = this.get('size');
        return ['btn',this.getCls(this.get('type')),this.getCls(this.get('size'))];//.join(' ');
    },
    getCls:function(type){
        if(!type)return '';
        return 'btn-'+type;
    },
    render:function(){
        this.$el.text(this.get('text'));
    },
    onClick:Fui.emptyFunc,
    listeners:{
        tap:null
    },
    events:{
        'click':function(e){
//            var action = this.get('action');
//            if(_.isFunction(action)){
//                action.call(this);
//            }
//            if(this.get('type')!='default')
//                this.onClick.call(this);
            this.trigger('tap',[e]);
            e.stopPropagation();
        },
        typechanged:function(n,o){
            this.$el.removeClass(this.getCls(o));
            this.$el.addClass(this.className());
        },
        textchanged:function(n,o){
            this.$el.text(n);
        }
    }
});