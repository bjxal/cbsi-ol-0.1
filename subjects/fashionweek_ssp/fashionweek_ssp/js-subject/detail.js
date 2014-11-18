$(document).ready(function(){
    $(".save,.weixin").on("touchend",function(){
        var cname  = $(this).attr("class").replace("jtico ","");
        $(".save_tips").fadeIn().delay(1000).fadeOut();
        $(".save_tips ."+cname).fadeIn().delay(900).fadeOut();
    });
});