var flag_1 = false;
var flag_2 = false;
var action = function($tar,type){
    var $p = $tar.parent();
    $tar.addClass(type).one('webkitTransitionEnd',function(){
        $p.prepend($tar);
        $tar.removeClass(type);
    });
};
Fui.Template.IMG_DIR = ImgDir();

var PAGE0 = Fui.Template.extend({
    config:{
        template:'PAGE0',
        xtpl:'p0'
    },
    design:function(){
        var me = this;
        console.log(me.$el);
        me.$el.append(new Fui.Guagua({
            backgroundSrc:ImgDir('/p0/2.jpg'),
            maskSrc:ImgDir('/p0/1.jpg'),
            completeValue:50,
            listeners:{
                complete:function(){
                    slider.set("lock",false);
                    me.$el.find(".word").addClass("ani").one("webkitTransitionEnd",function(){
                        $(".fui-arrow.bottom").fadeIn();
                    });
                }
            }
        }).$el);
    }
});
var PAGE1 = Fui.Template.extend({
    config:{
        template:'PAGE1',
        xtpl:'p1'
    },
    getGestureItems:function(){
        var me = this;
        return [
            {
                gesture:'leftSwipe',
                name:'img',
                callback:function(e,$tar){
                    console.log(1111)
                    action($tar,'left');
                }
            }
            ,{
                gesture:'rightSwipe',
                name:'img',
                callback:function(e,$tar){
                    console.log(2222)
                    action($tar,'right');
                }
            }
        ];
    }
});
var PAGE2 = Fui.Template.extend({
    config:{
        template:'PAGE2',
        xtpl:'p2'
    }
    ,getGestureItems:function(){
        return [
            {
                gesture:'topSwipe',
                name:'topSwipe',
                callback:function(e,$tar){
                }
            }
        ]
    }
});
Fui.Template.regTpl({
    PAGE0:PAGE0,
    PAGE1:PAGE1,
    PAGE2:PAGE2
});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    lock:true,
    listeners:{
        slide:function(){
            var page = this.get("curPage");
            console.log(page)
            if(page==1){
                $(".fui-arrow.bottom").addClass("p1");
            }
        },
        gesture:function(){

        }
    },
    data:[
        {
            template:'PAGE0'
        }
        ,{
            template:'PAGE1'
        }
        ,{
            template:'PAGE2',
            bg:ImgDir('/p2/1.jpg')
        }
    ]
});
slider.render();