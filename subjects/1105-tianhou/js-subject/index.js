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
    curPage:2,
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
            bg:ImgDir('/p1/model.jpg'),
            xtpl:'p1'
        }
        ,{
            template:'ModelPhotos',
            xtpl:'p1_list'
        }
        // No. 2
    ]
});
slider.render();

setInterval(function(){
    var $imglist = slider.getPage(slider.get('curPage')).$el.find('.imglist');
    if($imglist.length>0)
        action($imglist.children().last(),'left');
},2000);