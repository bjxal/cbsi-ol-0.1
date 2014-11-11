//module.exports =
funList = {
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
                $(".p1 .logo").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p1 .txt").addClass("ani");
                });
            })
        },1000);
    },
    p2_fun:function(){
        setTimeout(function(){
            $(".p2 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p2 .rotate").addClass("ani");
            });
        },1000);
    },
    p3_fun:function(){
        setTimeout(function(){
            $(".p3 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p3 .txt").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p3 .tips").addClass("ani");
                });
            });
        },1000);
    },
    p4_fun:function(){
        setTimeout(function(){
            $(".p4 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p4 .lf,.p4 .rt").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p4 .tips").addClass("ani");
                });
            });
        },1000);
    },
    p5_fun:function(){
        setTimeout(function(){
            $(".p5 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p5 .lf,.p5 .rt").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p5 .tips").addClass("ani");
                });
            });
        },1000);
    },
    p6_fun:function(){
        setTimeout(function(){
            $(".p6 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p6 .lf,.p6 .rt").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p6 .tips").addClass("ani");
                });
            });
        },1000);
    },
    p7_fun:function(){
        setTimeout(function(){
            $(".p7 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p7 .top,.p7 .btm").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p7 .tips").addClass("ani");
                });
            });
        },1000);
    },
    p8_fun:function(){
        setTimeout(function(){
            $(".p8 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p8 .rt_1").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p8 .lf_2").addClass("ani").one("webkitTransitionEnd",function(){
                        $(".p8 .rt_3").addClass("ani").one("webkitTransitionEnd",function(){
                            $(".p8 .tips").addClass("ani");
                        });
                    });
                });
            });
        },1000);
    },
    p9_fun:function(){
        setTimeout(function(){
            $(".p9 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p9 .top,.p9 .btm").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p9 .tips").addClass("ani");
                });
            });
        },1000);
    },
    p10_fun:function(){
        setTimeout(function(){
            $(".p10 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p10 .tips").addClass("ani");
            });
        },1000);
    },
    p11_fun:function(){
        setTimeout(function(){
            $(".p11 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p11 .rt_1").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p11 .lf_2").addClass("ani").one("webkitTransitionEnd",function(){
                        $(".p11 .rt_3").addClass("ani").one("webkitTransitionEnd",function(){
                            $(".p11 .tips").addClass("ani");
                        });
                    });
                });
            });
        },1000);
    },
    p12_fun:function(){
        setTimeout(function(){
            $(".p12 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p12 .down_1").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p12 .down_2").addClass("ani").one("webkitTransitionEnd",function(){
                        $(".p12 .down_3").addClass("ani").one("webkitTransitionEnd",function(){
                            $(".p12 .down_4").addClass("ani").one("webkitTransitionEnd",function(){
                                $(".p12 .down_5").addClass("ani").one("webkitTransitionEnd",function(){
                                    $(".p12 .tips").addClass("ani");
                                });
                            });
                        });
                    });
                });
            });
        },1000);
    },
    p13_fun:function(){
        setTimeout(function(){
            $(".p13 .tit").addClass("ani").one("webkitTransitionEnd",function(){
                $(".p13 .lf,.p13 .rt").addClass("ani").one("webkitTransitionEnd",function(){
                    $(".p13 .tips").addClass("ani");
                });
            });
        },1000);
    },
    p14_fun:function(){}
};