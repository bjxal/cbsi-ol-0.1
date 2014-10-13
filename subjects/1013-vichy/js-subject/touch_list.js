module.exports = touchList = {
    init:function(){
        var me = this;
        me.p1_fun();
        me.p2_fun();
        me.p3_fun();
        me.p4_fun();
        me.p5_fun();
    },
    p1_fun:function(){
        touchList.touch_fun("p1_btn",function(){
            //next
            cover._movePage_top();
        });
    },
    p2_fun:function(){
        touchList.touch_fun("p2_btn",function(e){
            var pop = $(e.target).data("pop");
            $(".pop_"+pop).fadeIn().siblings().find(".pop").fadeOut();
        });
    },
    p3_fun:function(){
        touchList.touch_fun("p3_btn",function(e){
            $(".pop_p3").fadeIn();
        });
    },
    p4_fun:function(){
    },
    p5_fun:function(){
        //link
        touchList.touch_fun("btn_link",function(e){
            window.location.href=$(e.target).data("link");
        });
        //share
        touchList.touch_fun("btn_share",function(e){
            $(".shadow").fadeIn();
        });
        //go back
        touchList.touch_fun("btn_back",function(e){
//            window.location.reload();
            cover._move_back();
        });
        //shadow
        $(".shadow").on("touchend",function(){
            $(this).fadeOut();
        });
    },
    touch_fun:function(pname,cbfun){
        var default_mv = move_mv = {x:0};
        $("."+pname)
            .bind("touchstart",function(e){
                var me = this;
                me.pop = false;
                var tar = e.originalEvent.touches[0];
                default_mv = move_mv = {
                    x:tar.clientX,
                    y:tar.clientY
                };
            })
            .bind("touchmove",function(e){
                var me = this;
                var tar = e.originalEvent.touches[0];
                move_mv = {
                    x:tar.clientX,
                    y:tar.clientY
                };
            })
            .bind("touchend",function(e){
                var me = this;
                var move_c = move_mv.x-default_mv.x;
                if(move_c<10){
                    e.preventDefault();
                    e.stopPropagation();
                    cbfun(e);
                }
                else{
                    me.pop = false;
                }
            });
        $(".pop").on("touchend",function(){
            $(this).fadeOut();
        });
    },
    ajax_fun:function(url,data,cbfun){
        //ajax
        $.ajax({
            type:"POST",
            cache:false,
            asnyc:false,
            data:data,
            url:url,
            dataType:"json",
            success:function(){
                cbfun();
            },
            error:function(){
                cbfun();
            }
        });
    }
};