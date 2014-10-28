var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    orient:'x',
    listeners:{},
    data:[
        {
            template:'Base',
            xtpl:'p0'
        }
    ]
});
slider.render();