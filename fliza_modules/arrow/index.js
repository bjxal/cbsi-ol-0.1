
Fui.Arrow = Fui.extend({
    tagName:'a',
    config:{
        orient:'bottom',
        color:'white',
        style:{}
    },
    initialize:function(){
        var me = this
            ,orient = me.get('orient')
            ,css = {
                position:'absolute',
                zIndex:1030,
                border:'2px solid '+me.get('color'),
                borderRight:0,
                borderBottom:0,
                width: 36,
                height: 36,
                webkitAnimation: me.get('orient')+'Arrow 2s linear infinite'
            }
            ,pos = {}
        ;
        switch (orient){
            case 'top':
                pos = {
                    left:'50%',
                    top: 30,
                    marginLeft:-18
                };
                break;
            case 'left':
                pos = {
                    top:'50%',
                    left: 30,
                    marginTop:-18
                };
                break;
            case 'right':
                pos = {
                    top:'50%',
                    right:30,
                    marginTop:-18
                };
                break;
            case 'bottom':
                pos = {
                    left:'50%',
                    bottom: 30,
                    marginLeft:-18
                };
                break;

        }
        _.extend(css,pos,me.get('style'));
        this.$el.css(css);
    }
});