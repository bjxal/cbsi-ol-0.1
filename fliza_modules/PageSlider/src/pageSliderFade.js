//PageSlider

Fui.PageSliderFade = Fui.PageSlider.extend({
    fid:'PageSliderFade',
    config:{
//        index:0,
//        pageNum:0,
//        curPage:0,
        toggleCls:'focus',
        lock:false,
        orient:'v'  //v h hv
    }
    ,ensureLayout:function(){
        var me = this
            ,$ul = me.$ul
            ,n = me.get('pageNum')
            ;
        $ul.css({
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0
        }).children('li').css({
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            opacity:0
//            ,backgroundSize:'cover'
        });
    }
    ,doSlide: function (index) {
        var me = this
            ,$ul = me.$ul
            ,pageNum = me.get('pageNum')
            ;
        $ul.children('li').eq(index).css({
            webkitTransition:'opacity .3s ease-in-out',
            opacity:1,
            zIndex:1
        }).siblings('li').css({
            webkitTransition:'opacity .3s ease-in-out',
            opacity:0,
            zIndex:0
        });
        return $ul;
    }
});


