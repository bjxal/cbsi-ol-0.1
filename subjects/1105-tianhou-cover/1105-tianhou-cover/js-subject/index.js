$(document).ready(function(){
//��ת
    index = 1;//Ĭ�ϱ�������
    deg = -(360/14)+360;//Ĭ�ϽǶ�
    circle_num = 0;//ָ��ת��Ȧ��
    st="";
    var fun = new Fun();
    fun.init();
    fun.touchA($(".link a"));
});
var Fun = function(){};
Fun.prototype = {
    init:function(){
        var me = this;
        me.rotate(deg);//ָ��ת��
        me.switchBg(index);//�����л�
        //14sָ��ת��һȦ
        interval = setInterval(function(){
            deg = deg+360;
            me.rotate(deg);
        },14000);
        //2s�л�һ�α���
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
        //��ʾָ�������ı���������
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
				me_t.link = $(tar).attr("href");
                //�л���ָ�������ı���
                me.switchBg(me_t.index_e);
                //ָ��ָ���ض��Ƕ�
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
				if(me_t.link!="#"){
					window.location.href=me_t.link;
				}
				else{
					//����st
					st = setTimeout(function(){
						if(index>7) index=1;
						me.switchBg(index);
						//����bg_change
						bg_change = setInterval(function(){
							index++;
							if(index>7) index=1;
							me.switchBg(index);
						},2000);
					},1000);
					me.rotate(deg);
					//����interval
					interval = setInterval(function(){
						deg = deg+360;
						me.rotate(deg);
					},14000);
				}
            });
    },
    clear:function(){
        var me = this;
        //�������setInterval��setTimeout
        clearInterval(interval);
        clearInterval(bg_change);
        clearTimeout(st);
    }
};