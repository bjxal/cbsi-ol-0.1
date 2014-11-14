require("fliza-ui");
Fui.Template.IMG_DIR = ImgDir();

var PAGE0 = Fui.Template.extend({
    config:{
        template:'PAGE0',
        xtpl:'p0'
    },
    events:{
    },
    getGestureItems:function(){
        function slide(e,$tar){
            $(".p0_1 .word,.p0_1 .arrow_rt,.p0_1 .leaf_1,.p0_1 .leaf_2").addClass("ani_t").one("webkitTransitionEnd",function(){
                setTimeout(function(){
                    $(".p0_1").fadeOut(1000);
                },3000);
            });
        }
        return [
            {
                gesture:'leftSwipe',
                name:'leaf',
                callback:slide
            }
            ,{
                gesture:'rightSwipe',
                name:'leaf',
                callback:slide
            }
        ];
    }
});
var PAGE1 = Fui.Template.extend({
    config:{
        template:'PAGE1',
        xtpl:'p1'
    }
    ,getGestureItems:function(){
        return [
            {
                gesture:'tap',
                name:'btn',
                callback:function(){
                    slider.toPage(1);
                    slider.set("lock",false);
                }
            }
        ]
    }
});
Fui.Template.regTpl({
    PAGE0:PAGE0,
    PAGE1:PAGE1
});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    lock:true,
    listeners:{
        gesture:function(){
        }
    },
    data:[
        {
            template:'PAGE0',
            bg:ImgDir('/p0/p0_1/bg.jpg')
        }
        ,{
            template:'PAGE1',
            bg:ImgDir('/p1/bg.jpg')
        }
        ,{
            template:'PAGE1',
//            bg:ImgDir('/p2/bg.jpg')
        }
    ]
});
slider.render();