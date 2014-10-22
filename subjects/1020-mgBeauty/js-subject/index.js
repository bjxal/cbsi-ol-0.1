$(document).ready(function(){
    var winHeight = $(window).height();
    //li
    var length = $("li.p").length;
    percent = 100/length;
    //bg
    $("#pack #c").css({
        height:length*winHeight+"px"
    });
    //bg
    $("#pack").find("li").each(function(i,item){
        var bg = $(item).attr("data-src");
        $(item).css({
            height:winHeight+"px"
        });
        if(bg!=""){
            $(item).css({
                background:"url("+getImgPath()+"/"+bg+") no-repeat center",
                backgroundSize:"cover"
            });
        }
    });
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
