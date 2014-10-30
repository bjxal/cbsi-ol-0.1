require('fliza-ui');

Fui.Template.IMG_DIR = ImgDir();
Fui.Template.Page234 = Fui.Template.extend({
    getGestureItems:function(){
        var me = this;
        return [
            {
                gesture:'leftSwipe',
                name:'img',
                callback:function(e,$tar){
                    var $p = $tar.parent();
                    $tar.addClass('left').one('webkitTransitionEnd',function(){
                        $p.prepend($tar);
                        $tar.removeClass('left');
                    });
                }
            }
            ,{
                gesture:'rightSwipe',
                name:'img',
                callback:function(e,$tar){
                    var $p = $tar.parent();
                    $tar.addClass('right').one('webkitTransitionEnd',function(){
                        $p.prepend($tar);
                        $tar.removeClass('right');
                    });
                }
            }
            ,{
                gesture:'tap',
                name:'tab',
                callback:function(e,$tar){
                    $tar.addClass('on').siblings().removeClass('on');
                    var $inner = me.$el.children('.inner').eq($tar.index());
                    $inner.addClass('show').siblings().removeClass('show');
                }
            }

        ];
    }

});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:1,
    listeners:{},
    data:[
        {
            template:'Base',
            bg:ImgDir('/p0/bg.jpg'),
            xtpl:'p0'
        }
        ,{
            template:'Page234',
            bg:ImgDir('/p1/bg.jpg'),
            xtpl:'p1'
        }

    ]
});
slider.render();