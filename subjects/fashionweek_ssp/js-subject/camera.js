var Camera = function(){};
Camera.prototype = {
    init:function(option){
        var me = this;
        me.nav = "iphone";
        me._nav();
        me.loading = false;
        me.canvas = document.getElementById(option.id);
        me.$input = $("#"+option.input);
        me.$canvas = $(canvas);
        if (me.canvas == null)
            return false;
        me.context = me.canvas.getContext("2d");
        //xy
        me.default_xy = me.move_xy = me.touch_1_xy = me.touch_2_xy = me.touchmove_1_xy = me.touchmove_2_xy = {x:1,y:1};
        me.bindEvent();
        //me.context.cssText = "-webkit-transform-origin:100px 100px;";
    },
    _nav:function(){
        var me = this;
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            me.nav = "android";
        } else if (u.indexOf('iPhone') > -1) {
            me.nav = "iphone";
        } else if (u.indexOf('Windows Phone') > -1) {
            me.nav = "webPhone";
        }
    },
    bindEvent:function(){
        var me = this;
        $(".mbList").
            bind("touchstart",function(e){
                me._touchstart(e);
            })
            .bind("touchmove",function(e){
                me._touchmove(e);
            })
            .bind("touchend",function(e){
                me._touchend(e);
            });
    },
    _touchstart:function(e){
        var me = this;
        e.stopPropagation();
        e.preventDefault();
        var tar = e.originalEvent.touches;
        if(tar.length==1){
            me.default_xy = me.move_xy = {
                x:tar[0].pageX,
                y:tar[0].pageY
            }
        }
        else{
            me.touch_1_xy = {
                x:tar[0].pageX,
                y:tar[0].pageY
            }
            me.touch_2_xy = {
                x:tar[1].pageX,
                y:tar[1].pageY
            }
        }
    },
    _touchmove:function(e){
        var me = this;
        e.stopPropagation();
        e.preventDefault();
        var tar = e.originalEvent.touches;
        var num = tar.length;
        me.context.clearRect(-1000,-1000,10000,10000);
        if(num==1){
            me.move_xy = {
                x:tar[0].pageX,
                y:tar[0].pageY
            };
            var val = {
                x:me.default_xy.x-me.move_xy.x,
                y:me.default_xy.y-me.move_xy.y
            };
            me.default_xy = me.move_xy = {
                x:tar[0].pageX,
                y:tar[0].pageY
            };
            me.context.translate((val.x/10)*(-1),(val.y/10)*(-1));
        }
        else{
            me.touchmove_1_xy = {
                x:tar[0].pageX,
                y:tar[0].pageY
            };
            me.touchmove_2_xy = {
                x:tar[1].pageX,
                y:tar[1].pageY
            };
            var val_default = {
                x:me.touch_1_xy.x-me.touch_2_xy.x,
                y:me.touch_1_xy.y-me.touch_2_xy.y
            };
            var val_move = {
                x:me.touchmove_1_xy.x-me.touchmove_2_xy.x,
                y:me.touchmove_1_xy.y-me.touchmove_2_xy.y
            };
            me.touch_1_xy = {
                x:tar[0].pageX,
                y:tar[0].pageY
            }
            me.touch_2_xy = {
                x:tar[1].pageX,
                y:tar[1].pageY
            }
            var default_p = Math.sqrt((val_default.x)*(val_default.x)+(val_default.y)*(val_default.y));
            var move_p = Math.sqrt((val_move.x)*(val_move.x)+(val_move.y)*(val_move.y));
            var bli = move_p/default_p;
            me.context.scale(bli,bli);

        }
        me._drawImg(me.imgUrl)
    },
    _touchend:function(e){
    },
    _translate:function(val){
        var me = this;
        var dir  = -1;
        //if(val.y<0) dir = -1;
        //else dir = 1;
        me.context.translate((val.x/10)*dir,(val.y/10)*dir);
    },
    _rotate:function(val,val_move){
        var me = this;
        //角度
        var d_value = {
            x:val.x-val_move.x,
            y:val.y-val_move.y
        };
        var deg = me._getAngle(d_value.x,d_value.y);
        /*if(d_value.x<0){
         cans.rotate(deg*1);
         }
         else{
         cans.rotate(deg*(-1));
         }*/
    },
    _drawImg:function(imgUrl){
        var me = this;
        //var bmp = new createjs.Bitmap(imgUrl);
        var image = new Image();
        image.src = imgUrl;
        image.onload = function () {
            var w = $(image)[0].width;
            var h = $(image)[0].height;
            var curH = (320/w)*h;
            me.context.drawImage(image,0,0,320,curH);
            //me.stage.addChild(bmp);
        };
    },
    _getAngle:function(dx,dy) {
        var a = Math.atan(Math.abs(dy/ dx))*180/Math.PI;
        if(dx<0){
            a= 180 - a;
        }
        if(dy>0)a = -a;//屏幕上的Y轴与习惯上是反的
        return a;
    }
};