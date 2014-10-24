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
            "p6":me.p6_fun,
            "p7":me.p7_fun,
            "p8":me.p8_fun,
            "p9":me.p9_fun,
            "p10":me.p10_fun,
            "p11":me.p11_fun,
            "p12":me.p12_fun,
            "p13":me.p13_fun,
            "p14":me.p14_fun
        };
    },
    p1_fun:function(){
        setTimeout(function(){
            $(".p1 .bg").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p1 .line").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p1 .cir").addClass("ani").one("webkitAnimationEnd",function(){
                        $(".p1 .tit").addClass("ani");
                    });
                });
            })
        },1000);
    },
    p2_fun:function(){
        setTimeout(function(){
            $(".p2 .cloud").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p2 .cir").addClass("ani");
            });
        },1000);
    },
    p3_fun:function(){
        setTimeout(function(){
            $(".p3 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p3 .lf,.p3 .rt").addClass("ani");
            });
        },1000);
    },
    p4_fun:function(){
        setTimeout(function(){
            $(".p4 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p4 .lf,.p4 .rt").addClass("ani");
            });
        },1000);
    },
    p5_fun:function(){
        setTimeout(function(){
            $(".p5 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p5 .list").addClass("ani");
            });
        },1000);
    },
    p6_fun:function(){
        setTimeout(function(){
            $(".p6 .cir").addClass("ani");
        },1000);
    },
    p7_fun:function(){
        setTimeout(function(){
            $(".p7 .tit").addClass("move").one("webkitTransitionEnd",function(){
                $(".p7 .item").addClass("move").one("webkitAnimationEnd",function(){
                    $(".p7 .tag").addClass("move").one("webkitTransitionEnd",function(){
                        $(".p7 .arrow_bg").addClass("move");
                    });
                });
            });
        },1000);
    },
    p8_fun:function(){
        setTimeout(function(){
            $(".p8 .tit").addClass("move").one("webkitTransitionEnd",function(){
                $(".p8 .img").addClass("move");
            });
        },1000);
    },
    p9_fun:function(){
        setTimeout(function(){
            $(".p9 .tit").addClass("move");
        },1000);
    },
    p10_fun:function(){
        setTimeout(function(){
            $(".p10 .tit").addClass("move").one("webkitTransitionEnd",function(){
                $(".p10 .lf").addClass("move");
                $(".p10 .rt").addClass("move").one("webkitTransitionEnd",function(){
                    $(".p10 .search").addClass("move");
                });
            });
        },1000);
    },
    p11_fun:function(){
        setTimeout(function(){
            $(".p11 .tit").addClass("move").one("webkitTransitionEnd",function(){
                $(".p11 .img").addClass("move");
            });
        },1000);
    },
    p12_fun:function(){
        setTimeout(function(){
            $(".p12 .tit").addClass("move").one("webkitTransitionEnd",function(){
                $(".p12 .item").addClass("move");
            });
        },1000);
    },
    p13_fun:function(){
        setTimeout(function(){
            $(".p13 .tit").addClass("move").one("webkitTransitionEnd",function(){
                $(".p13 .pro_1").addClass("move").one("webkitTransitionEnd",function(){
                    $(".p13 .pro_2").addClass("move");
                });
            });
        },1000);
    },
    p14_fun:function(){}
};