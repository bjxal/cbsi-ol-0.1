/**
 * Created by ericai on 14-8-13.
 * Email: 330785652@qq.com
 */


module.exports = function(options){
    var audio = new Audio();
    audio.loop = options.loop||true;
    audio.preload = options.preload||"auto";
    audio.autoplay = options.autoplay||true;
    audio.isLoadedmetadata = false;
    audio.touchstart = true;
    audio.audio = true;
    audio.src = options.src||'';
    audio.load();
    var cls = options.stopCls
        ,onstop = options.onstop||function(){}
        ,onplay = options.onplay||function(){}
        ;
    $(options.el).bind('touchend',function(e){
        e.stopPropagation();
        e.preventDefault();
        var $this = $(this)
        ;
        $this.toggleClass(cls);
        if($this.hasClass(cls)){
            audio.pause();
            onstop();
        }else{
            audio.play();
            onplay();
        }
    });
    return {
        play:function(){
            audio.play();
        },
        pause:function(){
            audio.pause();
        }
    }
};
