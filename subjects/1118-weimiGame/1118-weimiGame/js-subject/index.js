Fui.Template.IMG_DIR = ImgDir();
var winHeight = $(window).height();
$(".match_result").height(winHeight+"px");
//背景音乐
var audio = new Audio();
audio.loop = true;
audio.preload = "auto";
audio.autoplay = true;
audio.isLoadedmetadata = false;
audio.touchstart = true;
audio.audio = true;
audio.src = ImgDir('/music.mp3');
audio.load();
//mute
$('#audio').on('touchend',function(e){
    var $this = $(this);
    e.stopPropagation();
    e.preventDefault();
    $this.toggleClass('stop');
    if($this.hasClass('stop')){
        audio.pause();
    }else{
        audio.play();
    }
});
var models = ["Behati Prinsloo","Doutzen Kroes","Lindsay Ellingson","Lily Aldridge","karlie kloss","Candice Swanepoel","Alessandra Ambrosio","adriana lima","何穗","奚梦瑶"];
//p1 switch photos
var action = function($tar,type){
    var $p = $tar.parent().parent();
    $tar.parent().addClass(type).one('webkitTransitionEnd',function(){
        $p.prepend($tar.parent());
        $tar.parent().removeClass(type);
    });
};
var PAGE0 = Fui.Template.extend({
    config:{
        template:'PAGE0',
        xtpl:'p0'
    },
    design:function(){
        var me = this;
        me.$el.append(new Fui.Guagua({
            //backgroundSrc:ImgDir('/p0/2.jpg'),
            //maskSrc:ImgDir('/p0/1.jpg'),
            backgroundSrc:"http://m.onlylady.com/m/zhuantiimg/2.jpg",
            maskSrc:"http://m.onlylady.com/m/zhuantiimg/1.jpg",
            completeValue:15,
            listeners:{
                complete:function(){
                    slider.set("lock",false);
                    me.$el.find(".gesture").fadeOut();
                    setTimeout(function(){
                        me.$el.find(".word").addClass("ani").one("webkitTransitionEnd",function(){
                            $(".fui-arrow.bottom").removeClass("hide").show();
                        });
                    },1000);
                }
            }
        }).$el);
    }
});
var PAGE1 = Fui.Template.extend({
    config:{
        template:'PAGE1',
        xtpl:'p1'
    },
    getGestureItems:function(){
        var me = this;
        return [
            {
                gesture:'leftSwipe',
                name:'img',
                callback:function(e,$tar){
                    action($tar,'left');
                }
            }
            ,{
                gesture:'rightSwipe',
                name:'img',
                callback:function(e,$tar){
                    console.log($tar)
                    action($tar,'right');
                }
            }
            ,{
                gesture:'rightSwipe',
                name:'cover',
                callback:function(e,$tar){
                    $tar.addClass('right');
                }
            }
            ,{
                gesture:'leftSwipe',
                name:'cover',
                callback:function(e,$tar){
                    $tar.addClass('right');
                }
            }
        ]
    }
});
var PAGE2 = Fui.Template.extend({
    config:{
        template:'PAGE2',
        xtpl:'p2'
    }
    ,getGestureItems:function(){
        var me = this;
        function tap_1_fun(e,$tar){
            var tch = e.$e.originalEvent.touches;
            if(tch.length>=1){
                slider.set("lock",true);
				var random_val = Math.floor(Math.random()*10);
				var i = (random_val==0)?1:random_val;
                var index = (i<5)?((i%2==0)?2:1):((i%2==0)?4:3);
                me.$el.find(".sm,.kiss_word").hide();
                me.$el.find(".kissList img").attr("src",ImgDir('/p2/kiss/'+index+'.png')).fadeIn();
                $(".match_result .result_img").attr("src",ImgDir('/p3/model_jpg/'+i+'.jpg'));
                $(".match_result .kiss").attr("src",ImgDir('/p3/kiss/'+index+'.png'));
                //share_desc
                Weixin.set("title","我和"+models[i-1]+"唇型最配！你也来玩游戏赢大奖吧!");
                Weixin.set("desc","我和"+models[i-1]+"唇型最吻合！你也快来玩游戏赢大奖吧！");
                setTimeout(function(){
                    me.$el.find(".match").fadeIn().find(".matching .jdt_move").animate({width:"260px"}).one("webkitTransitionEnd",function(){
                        me.$el.find(".matching").hide().siblings().show();
                        me.$el.find(".matching .jdt_move").css("width","0px");
                    });
                },2000);
            }
        }
        return [
            {
                gesture: 'tap',
                name: 'tap_1',
                callback: tap_1_fun
            }
            ,{
                gesture:'tap',
                name:'result',
                callback:function(e,$tar){
                    me.$el.find(".share").fadeIn();
                    $("#scro_2").scrollable({circular:true}).autoscroll({ autoplay: true,interval: 2000}).navigator({navi:'#scro_2_nav'});
                }
            }
            ,{
                gesture:'tap',
                name:'play_again',
                callback:function(e,$tar){
                    $tar.parent().fadeOut();
                    me.$el.find(".match,.share,.kissList img").hide();
                    me.$el.find(".kiss_word,.sm").show();
                }
            }
        ]
    }
    ,events:{
        "click .check_bg":function(e){
            console.log(e)
        }
    }
});
Fui.Template.regTpl({
    PAGE0:PAGE0,
    PAGE1:PAGE1,
    PAGE2:PAGE2
});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    lock:true,
    listeners:{
        slide:function(){
            var page = this.get("curPage");
            if(page==1){
                $(".fui-arrow.bottom").removeClass("hide").addClass("p1");
            }
            if(page==2){
                $(".p1 .cover").removeClass("right");
                $(".fui-arrow.bottom").addClass("hide");
            }
        },
        gesture:function(){

        }
    },
    data:[
        {
            template:'PAGE0'
        }
        ,{
            template:'PAGE1'
        }
        ,{
            template:'PAGE2',
            bg:ImgDir('/p2/1.jpg')
        }
    ]
});
slider.render();
$(".fui-arrow.bottom").addClass("hide");
//play again
$(".again").on("touchend",function(e){
    var $tar = $(e.currentTarget);
    $tar.parent().fadeOut();
    $(".p2").find(".match,.match .matchend,.share,.kissList img").hide();
    $(".p2").find(".kiss_word,.sm,.matching").show();
//    $(".p2").find(".matching .jdt").append("<span class='jdt_move'></span>");
});