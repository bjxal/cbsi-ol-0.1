module.exports = Fun = {
    init:function(){
        var me = this;
        me.funList = {};
        me.fun_list();
    },
    fun_list:function(){
        var me = this;
        me.funList = {
            "p1":me.p1_fun,
            "p2":me.p2_fun,
            "p3":me.p3_fun,
            "p4":me.p4_fun,
            "p5":me.p5_fun,
            "p6":me.p6_fun
        };
    },
    p1_fun:function(){
        setTimeout(function(){
            $(".p1 .bowen").addClass("move").one("webkitAnimationEnd",function(){
                $(".p1 .tit").addClass("move").one("webkitTransitionEnd",function(){
                    $(".p1 .cd,.p1 .mv").addClass("move");
                });
            })
        },1000);
    },
    p2_fun:function(){
        setTimeout(function(){
            $(".p2 .tit").addClass("move");
        },1000);
    },
    p3_fun:function(){
        setTimeout(function(){
            $(".p3 .tit").addClass("move").one("webkitTransitionEnd",function(){
                $(".p3 .child ").addClass("move").one("webkitAnimationEnd",function(){
                    $(".p3 .child .mark").addClass("move").one("webkitTransitionEnd",function(){
                        $(".p3 .child .word").addClass("move");
                    });
                });
            });
        },1000);
    },
    p4_fun:function(){
    },
    p5_fun:function(){
    },
    p6_fun:function(){
    }
};