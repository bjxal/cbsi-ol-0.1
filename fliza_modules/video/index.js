
Fui.Video = Fui.extend({
    config:{
        src:'',
        width:300,
        height: 200,
        playCls:'icon icon-play2',
        $hoster:null
    },
    initialize:function(){
        var me = this
            ,$el = me.$el
            ,w = 48,h=48
            ,$video = me.$video = $('<video></video>')
            ,$hoster = me.get('$hoster')
            ;
        if(!hoster) return;
        $el.css({
            position:'absolute',
            width: w,
            height: h,
            left:'50%',
            top: '50%',
            marginLeft: -w/2,
            marginTop: -h/2
        });
        $el.addClass(me.get('playCls'));

        $video.attr({
            controls:'controls',
            preload:'preload',
            src:me.get('src'),
            width: me.get('width'),
            height: me.get('height')
        });
        $video.css({
            display:'none',
            width:600,
            height: 400,
            position: 'absolute',
            left:'50%',
            top: '50%',
            marginLeft: -300,
            marginTop: -200
        });
        $hoster.append($video);
        $video.on('pause',function(){
            $video.hide();
        });
    },
    play:function(){
        var me = this
            ;
        me.$video.show();
        me.$video[0].play();
    }
});
