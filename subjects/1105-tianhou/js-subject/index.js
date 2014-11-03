Fui.Template.IMG_DIR = ImgDir();

var action = function($tar,type){
    var $p = $tar.parent();
    $tar.addClass(type).one('webkitTransitionEnd',function(){
        $p.prepend($tar);
        $tar.removeClass(type);
    });
};

Fui.Template.ModelPhotos = Fui.Template.Base.extend({
    design:function(){
        this.$el.addClass('photos');
    },
    getGestureItems:function(){
        var me = this;
        return [
            {
                gesture:'leftSwipe',
                name:'img',
                callback:function(e,$tar){
                    action($tar,'left');
                }
            }
            ,{
                gesture:'rightSwipe',
                name:'img',
                callback:function(e,$tar){
                    action($tar,'right');
                }
            }
        ];
    }
});
Fui.Template.Model = Fui.Template.Base.extend({
    design:function(){
        this.$el.addClass('model');
    }
});
var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    listeners:{},
    data:[
        {
            template:'Base',
            bg:ImgDir('/p0/bg.jpg'),
            xtpl:'p0'
        }
        //  No. 1
        ,{
            template:'Model',
//            bg:ImgDir('/p1/model.jpg'),
            xtpl:'p1'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p1_list'
        }
        // No. 2
        ,{
            template:'Model',
            bg:ImgDir('/p2/bg.jpg'),
            xtpl:'p2'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p2_list'
        }
        // No. 3
        ,{
            template:'Model',
            xtpl:'p3'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p3_list'
        }
        // No. 4
        ,{
            template:'Model',
            bg:ImgDir('/p2/bg.jpg'),
            xtpl:'p4'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p4_list'
        }
        // No. 5
        ,{
            template:'Model',
            xtpl:'p5'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p5_list'
        }
        // No. 6
        ,{
            template:'Model',
            bg:ImgDir('/p2/bg.jpg'),
            xtpl:'p6'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p6_list'
        }
        // No. 7
        ,{
            template:'Model',
            xtpl:'p7'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p7_list'
        }
        // No. 8
        ,{
            template:'Model',
            bg:ImgDir('/p2/bg.jpg'),
            xtpl:'p8'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p8_list'
        }
        // No. 9
        ,{
            template:'Model',
            xtpl:'p9'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p9_list'
        }
        // No. 10
        ,{
            template:'Model',
            bg:ImgDir('/p2/bg.jpg'),
            xtpl:'p10'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p10_list'
        }
        // No. last
        ,{
            template:'Base',
            bg:ImgDir('/p_last/bg.jpg'),
            xtpl:'p_last'
        }
    ]
});
slider.render();
var flag = true;
setInterval(function(){
    var $imglist = slider.getPage(slider.get('curPage')).$el.find('.imglist');
    if($imglist.length>0 && flag==true)
        action($imglist.children().last(),'left');
},2000);