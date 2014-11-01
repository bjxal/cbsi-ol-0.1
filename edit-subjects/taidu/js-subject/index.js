
Fui.Template.IMG_DIR = ImgDir();

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    listeners:{},
    data:[
        {
            template:'Base',
            bg:ImgDir('/p0/bg.jpg')
            ,xtpl:'p0'
        }
        ,{
            template:'Base',
            bg:ImgDir('/p1/bg.jpg')
        }
         ,{
            template:'Base',
            bg:ImgDir('/p2/bg.jpg')
        }

    ]
});
slider.render();