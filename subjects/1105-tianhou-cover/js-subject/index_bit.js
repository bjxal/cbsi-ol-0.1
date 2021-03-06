$(document).ready(function(){
//旋转
    index = 1;//默认背景索引
    deg = -(360/14)+360;//默认角度
    circle_num = 0;//指针转动圈数
    st="";
    var fun = new Fun();
    fun.init();
    fun.touchA($(".link a"));
});
var Fun = function(){};
Fun.prototype = {
    init:function(){
        var me = this;
        me.rotate(deg);//指针转动
        me.switchBg(index);//背景切换
        //14s指针转动一圈
        interval = setInterval(function(){
            deg = deg+360;
            me.rotate(deg);
        },14000);
        //2s切换一次背景
        bg_change = setInterval(function(){
            index++;
            if(index>7) index=1;
            me.switchBg(index);
        },2000);
    },
    switchBg:function(){
        var $bg = $(".bg");
//        var $wheel = $(".wheel_bg");
        var $word = $(".word");
//        var wheel_index = index==1?1:2;
        var link_if = $(".link .link_"+index).attr("href");
        if(link_if=="#"){
            $(".await").show();
        }
        else{
            $(".await").hide();
        }
        //显示指定索引的背景、文字
        $bg.find(".bg_"+index).css("display","block").siblings().css("display","none");
//        $wheel.find(".wheel_"+wheel_index).css("display","block").siblings().css("display","none");
        $word.find(".word_"+index).css("display","block").siblings().css("display","none");
    },
    rotate:function(){
        var rotate = $(".rotate img");
        rotate.css({
            webkitTransform:"rotate("+deg+"deg)",
            webkitTransition:"all linear 14s"
        });
    },
    touchA:function($tar){
        var me = this;
        $tar.on("touchstart",function(e){
                e.preventDefault();
                e.stopPropagation();
                me.clear();
                var me_t = this;
                var tar = e.target;
                index = me_t.index_e = $(tar).data("index");
                //切换到指定索引的背景
                me.switchBg(me_t.index_e);
                //指针指向特定角度
                me_t.deg = parseInt(me_t.index_e-1)*(360/7)+circle_num*360;
                $(".rotate img").css({
                    webkitTransform:"rotate("+me_t.deg+"deg)",
                    webkitTransition:"none"
                });
            })
            .on("touchmove",function(e){})
            .on("touchend",function(e){
                e.preventDefault();
                e.stopPropagation();
                var me_t = this;
                index++;
                deg = me_t.deg+360;
                //设置st
                st = setTimeout(function(){
                    if(index>7) index=1;
                    me.switchBg(index);
                    //重设bg_change
                    bg_change = setInterval(function(){
                        index++;
                        if(index>7) index=1;
                        me.switchBg(index);
                    },2000);
                },1000);
                me.rotate(deg);
                //重设interval
                interval = setInterval(function(){
                    deg = deg+360;
                    me.rotate(deg);
                },14000);
            });
    },
    clear:function(){
        var me = this;
        //清除所有setInterval、setTimeout
        clearInterval(interval);
        clearInterval(bg_change);
        clearTimeout(st);
    }
};