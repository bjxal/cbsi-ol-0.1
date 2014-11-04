$(document).ready(function(){
    //Ðý×ª
    flag = true;
    index = 1;
    deg = -(360/14);
    circle_num = 0;
//    $(".rotate img").addClass("ani");
    interval(index);
    bg_time = setInterval(function(){
        aa();
    },2000);
    function aa(){
        if(flag==true){
            deg = deg+(360/7);
            if(deg>360*(circle_num+1)){
//                deg=-28;
                circle_num++;
            }
            rotate(deg);
            if(index>7) index=1;
            interval(index);
            index++;
        }
    }
    //touch
    $(".link a")
        .on("touchstart",function(e){
            var me = this;
            flag = false;
            var tar = e.target;
            index = me.index_e = $(tar).data("index");
            interval(me.index_e);
            me.deg = parseInt(me.index_e-1)*(360/7)+circle_num*360;
            $(".rotate img").removeClass("ani").css({
                webkitTransform:"rotate("+me.deg+"deg)",
                webkitTransition:"none"
            });
            clearInterval(bg_time);
        })
        .on("touchmove",function(e){})
        .on("touchend",function(e){
            var me = this;
            flag = true;
            index++;
            deg = me.deg+25;
            setTimeout(function(){
                $(".rotate img").css({
                    webkitTransform:"rotate("+deg+"deg)",
                    webkitTransition:"all linear 1s"
                });
            },1000);
            bg_time = setInterval(function(){
                aa();
            },2000);
        });
});
function interval(index){
    //change
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
function rotate(deg){
    //rotate
    var rotate = $(".rotate img");
    rotate.css({
        webkitTransform:"rotate("+deg+"deg)",
        webkitTransition:"all linear 2s"
    });
}