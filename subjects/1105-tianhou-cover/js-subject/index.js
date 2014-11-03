$(document).ready(function(){
    //Ðý×ª
    flag = true;
    index = 1;
    $(".rotate img").addClass("ani");
    interval(index);
    bg_time = setInterval(function(){
        if(flag==true){
            index++;
            if(index>7) index=1;
            interval(index);
        }
    },2000);
    //touch
    $(".link a")
        .on("touchstart",function(e){
            var me = this;
            flag = false;
            var tar = e.target;
            me.index_e = $(tar).data("index");
            interval(me.index_e);
            var deg = parseInt(me.index_e-1)*50;
            $(".rotate img").removeClass("ani").css({
                webkitTransform:"rotate("+deg+"deg)"
            });
//            clearInterval(bg_time);
        })
        .on("touchmove",function(e){})
        .on("touchend",function(e){
            var me = this;
            flag = true;
            index = 0;
            setTimeout(function(){
                $(".rotate img").addClass("ani");
            },1000);
        });
});
function interval(index){
    var $bg = $(".bg");
    var $wheel = $(".wheel_bg");
    var $word = $(".word");
    var wheel_index = index==1?1:2;
    if(index!=1){
        $(".await").show();
    }
    else{
        $(".await").hide();
    }
    $bg.find(".bg_"+index).fadeIn().siblings().css("display","none");
    $wheel.find(".wheel_"+wheel_index).css("display","block").siblings().css("display","none");
    $word.find(".word_"+index).css("display","block").siblings().css("display","none");
}