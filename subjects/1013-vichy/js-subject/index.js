$(document).ready(function(){
    var winHeight = $(window).height();
    //li
    var length = $("li.p").length;
    percent = 100/length;
    //bg
    $("#pack #c").css({
//        height:length*100+"%"
        height:length*winHeight+"px"
    });
    //bind touch
    var touchList = require("./touch_list");
    touchList.init();
    var funList = require("./fun_list");
    funList.init();
    cover = new Fui.Slide({
        el:"#pack",
        pageCount:5,
        next_no:"p4",
        percent:percent,
        fun:funList.funList,
        winHeight:winHeight
    });
    //bg
    $("#pack").find("li").each(function(i,item){
        var bg = $(item).attr("data-src");
        $(item).css({
//            height:percent+"%"
            height:winHeight+"px"
        });
        if(bg!=""){
            $(item).css({
                background:"url("+getImgPath()+"/"+bg+") no-repeat center",
                backgroundSize:"100% auto"
            });
        }
    });
});
