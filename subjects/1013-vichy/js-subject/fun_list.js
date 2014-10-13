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
    },
    p2_fun:function(){
    },
    p3_fun:function(){
    },
    p4_fun:function(){
    },
    p5_fun:function(){
    },
    p6_fun:function(){
    }
};