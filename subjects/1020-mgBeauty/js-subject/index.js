$(document).ready(function(){
    var winHeight = $(window).height();
    //li
    var length = $("li.p").length;
    percent = 100/length;
    //bg
//    $("#pack #c").css({
//        height:length*winHeight+"px"
//    });
    //bg
//    $("#pack").find("li").each(function(i,item){
//        $(item).css({
//            height:winHeight+"px"
//        });
//    });
    //bind touch
    var touchList = require("./touch_list");
    touchList.init();
    var funList = require("./fun_list");
    funList.init();
    cover = new Fui.Slide({
        el:"#pack",
        pageCount:16,
        next_no:"",
        percent:percent,
        fun:funList.funList,
        winHeight:winHeight
    });
});
