require('fliza-ui');
var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    orient:'y',
    listeners:{},
    data:[
        {
            template:'Base',
            xtpl:'p0'
        }
    ]
});
slider.render();