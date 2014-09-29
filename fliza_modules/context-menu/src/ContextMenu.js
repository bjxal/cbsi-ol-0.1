/**
 * Created by ericai on 14-8-10.
 * Email: 330785652@qq.com
 */

Fui.ContextMenu = Fui.extend({
    config:{
        tpl: require('!tpl:./contextmenu')
    },
    callbackMap:{},
    initialize:function(){
        var me = this;
        $('body').bind('contextmenu',function(e){
            var key = $(e.target).attr('fui-context-menu-key');
            if(!key) return false;
            me.remove();
            me.render(me.onContextMenu(key));
        });
    },
    render:function(menus){
        var me = this
            ;
        menus = menus||[];
        me.$el.html({
            menus:menus
        });
        me.callbackMap = {};
        _.each(menus,function(a,i){
            me.callbackMap[a.name] = a.callback;
        });
    },
    onContextMenu:Fui.emptyFunc,
    events:{
        'click a[data-fui-key]':function(e){
            var me = this
                ,key = $(e.target).attr('data-fui-key')
                ,cb = me.callbackMap[key]
            ;
            if(_.isFunction(cb)) cb();
        }
    }
});