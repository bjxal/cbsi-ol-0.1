$(document).ready(function(){
    //旋转
    flag = true;
    index = 1;
    deg = -(360/14);
    circle_num = 0;
    change(index);
    bg_time = setInterval(function(){
        interval();
    },2000);
    //touch
    $(".link a")
        .on("touchstart",function(e){
            var me = this;
            flag = false;
            var tar = e.target;
            index = me.index_e = $(tar).data("index");
            change(me.index_e);
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
            deg = me.deg+360/14;
            setTimeout(function(){
                $(".rotate img").css({
                    webkitTransform:"rotate("+deg+"deg)",
                    webkitTransition:"all linear 1s"
                });
            },1000);
            bg_time = setInterval(function(){
                interval();
            },2000);
        });
});
function interval(){
    if(index>7) index=1;
    change(index);
    index++;
    deg = deg+(360/7);
    if(deg>360*(circle_num+1)){
        circle_num++;
    }
    rotate(deg);
}
function change(index){
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
//    $bg.find(".bg_"+index).show().siblings().hide();
//    $wheel.find(".wheel_"+wheel_index).show().siblings().hide();
//    $word.find(".word_"+index).show().siblings().hide();
}
function rotate(deg){
    //rotate
    var rotate = $(".rotate img");
    rotate.css({
        webkitTransform:"rotate("+deg+"deg)",
        webkitTransition:"all linear 2s"
    });
}
/*
 function change(index){
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
 //显示指定索引的背景、文字
 $bg.find(".bg_"+index).css("display","block").siblings().css("display","none");
 $wheel.find(".wheel_"+wheel_index).css("display","block").siblings().css("display","none");
 $word.find(".word_"+index).css("display","block").siblings().css("display","none");
 }
 function rotate(deg){
 //rotate
 var rotate = $(".rotate img");
 rotate.css({
 webkitTransform:"rotate("+deg+"deg)",
 webkitTransition:"all linear 14s"
 });
 }*/
//touch
//    $(".link a")
//        .on("touchstart",function(e){
//            e.preventDefault();
//            e.stopPropagation();
//            //清除所有setInterval、setTimeout
//            clearInterval(interval);
//            clearInterval(bg_change);
//            clearTimeout(st);
//            var me = this;
//            var tar = e.target;
//            index = me.index_e = $(tar).data("index");
//            //切换到指定索引的背景
//            change(me.index_e);
//            //指针指向特定角度
//            me.deg = parseInt(me.index_e-1)*(360/7)+circle_num*360;
//            $(".rotate img").css({
//                webkitTransform:"rotate("+me.deg+"deg)",
//                webkitTransition:"none"
//            });
//        })
//        .on("touchmove",function(e){})
//        .on("touchend",function(e){
//            e.preventDefault();
//            e.stopPropagation();
//            var me = this;
//            index++;
//            deg = me.deg+360;
//            //设置st
//            st = setTimeout(function(){
//                if(index>7) index=1;
//                change(index);
//                //重设bg_change
//                bg_change = setInterval(function(){
//                    index++;
//                    if(index>7) index=1;
//                    change(index);
//                },2000);
//            },1000);
//            rotate(deg);
//            //重设interval
//            interval = setInterval(function(){
//                deg = deg+360;
//                rotate(deg);
//            },14000);
//        });