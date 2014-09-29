
Fui.Guagua = Fui.extend({
    config:{
        backgroundSrc:null,
        maskSrc:null
    },
    bgCnvs:null,
    bgCtx:null,
    mskCnvs:null,
    mskCtx:null,
    _lastPoint:null,
    _rate:2,
    initialize:function(){
        var me = this
            ,$el = me.$el
            ,mskCnvs = me.mskCnvs = document.createElement('canvas')
            ,$mskCnvs = me.$mskCnvs = $(mskCnvs)
            ,mskCtx = me.mskCtx = mskCnvs.getContext('2d')
            ,mskImg = new Image()
            ;

        $el.css({
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            backgroundImage:'url('+me.get('backgroundSrc')+')',
            backgroundSize:'100% auto'
        });


        mskImg.onload = function(){
            var w = this.naturalWidth
                ,h = this.naturalHeight
                ;
            me._rate = w/$el.width();
            mskCnvs.width = w;
            mskCnvs.height = h;
            mskCtx.drawImage(this,0,0,w,h);
        };


        mskImg.src = me.get('maskSrc');

        $mskCnvs.css({
            width:'100%',
            height:'100%',
//            backgroundSize:'100% auto',
            position:'relative',
//            background:'transparent',
            zIndex:20
        });
        $el.append(mskCnvs);
        this.event = new Fui.Event({
            hoster:this
        });
    },
    onTouchStart:function(e){
        e.stopPropagation();
        e.preventDefault();
        var me = this
            ,ev = me.event
            ,cp = me._lastPoint = ev._event_cur_p
            ,mskCtx = this.mskCtx
            ;
        var offset = $(e.target).offset();
        mskCtx.beginPath();
//        mskCtx.arc(cp.x*me._rate, cp.y*me._rate, 30, 0, Math.PI * 2);
        mskCtx.arc(cp.x - offset.left,cp.y - offset.top, 10, 0, Math.PI * 2);
        mskCtx.globalCompositeOperation = 'destination-out';
        mskCtx.fill();
    },
    onTouchMove:function(e){
        e.stopPropagation();
        e.preventDefault();
        var me = this
            ,ev = me.event
            ,mskCtx = this.mskCtx
            ,lp = me._lastPoint
            ,cp = ev._event_cur_p
            ;
        var offset = $(e.target).offset();
        mskCtx.beginPath();
        mskCtx.arc(cp.x - offset.left,cp.y - offset.top, 10, 0, Math.PI * 2);
        mskCtx.globalCompositeOperation = 'destination-out';
        mskCtx.fill();
        mskCtx.beginPath();
        // 画笔大小
        mskCtx.lineWidth = 20;
        // 前者是线的末端样式，后者是线连接处的样式---圆
        mskCtx.lineCap = mskCtx.lineJoin = 'round';
        mskCtx.moveTo(lp.x - offset.left,lp.y - offset.top);
        mskCtx.lineTo(cp.x - offset.left,cp.y - offset.top);
        mskCtx.globalCompositeOperation = 'destination-out';
        mskCtx.stroke();
        me._lastPoint = cp;
        me.$mskCnvs.css({
            zIndex:(me.$mskCnvs.css('zIndex') == 20)?21:20
        });
    },
    onComplete:Fui.empty,
    onTouchEnd:function(e){
        e.stopPropagation();
        e.preventDefault();
        var me = this;
        if(this.getTransparentPercent(this.mskCtx,this.mskCnvs.width,this.mskCnvs.height)>70){
            setTimeout(function(){
                me.onComplete();
            },100);
        }
    },
    // 获取当前canvas透明像素的百分比
    getTransparentPercent: function(ctx, width, height) {
        // 获取画布的像素点
        var imgData = ctx.getImageData(0, 0, width, height),
            pixles = imgData.data,
            transPixs = [];

        // 计算画布中，透明程度（第四个值为透明度0-255）
        for (var i = 0, j = pixles.length; i < j; i += 4) {
            var a = pixles[i + 3];
            if (a < 128) {
                transPixs.push(i);
            }
        }
        return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
    }
});

//new CanvasMask({
//    el:'#canvasmask',
//    backgroundSrc:'/statics/ol/h5/fashionweek_game/img/pro.jpg',
//    maskSrc:'/statics/ol/h5/fashionweek_game/img/gua.jpg',
//    onComplete:function(){
//        // 如果中奖，显示表单，提交
//    }
//});