$(document).ready(function(){
    var winHeight = $(window).height();
    //li
    var length = $("li.p").length;
    percent = 100/length;
    //bind touch
//    var touchList = require("./touch_list");
    touchList.init();
//    var funList = require("./fun_list");
    funList.init();
    cover = new Fui.Slide({
        el:"#pack",
        pageCount:14,
        next_no:"",
        arrow_none:"p14",
        percent:percent,
        fun:funList.funList,
        winHeight:winHeight
    });
    //bg
    $("#pack").find("li").each(function(i,item){
        var bg = $(item).attr("data-src");
        if(bg!=""){
            $(item).css({
                backgroundImage:"url("+getImgPath()+"/"+bg+")",
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center bottom",
                backgroundSize:"100% auto"
            });
        }
    });
});
