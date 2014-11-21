Fui.Template.IMG_DIR = ImgDir();
var winHeight = $(window).height();
$(".match_result").height(winHeight+"px");
var audio = Fui.Audio({
    src:ImgDir('/music.mp3'),
    color:'white'
});
setTimeout(function(){
    audio.play();
},1000);
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
        bg:ImgDir('/p0/2.jpg'),
        xtpl:'p0'
    },
    design:function(){
        var me = this;
        me.$el.append(new Fui.Guagua({
//            backgroundSrc:"http://m.onlylady.com/m/zhuantiimg/2.jpg",
//            maskSrc:"http://m.onlylady.com/m/zhuantiimg/1.jpg",
            backgroundSrc:ImgDir('/p0/2.jpg'),
            maskSrc:ImgDir('/p0/1.jpg'),
            completeValue:15,
            radius:30,
            ontouchstart:function(){
                audio.play();
            },
            listeners:{
                complete:function(){
                    slider.set("lock",false);
                    me.$el.find(".gesture").fadeOut();
                    setTimeout(function(){
                        me.$el.find(".word").addClass("ani").one("webkitTransitionEnd",function(){
                            slider.arrow.down.show();
                        });
                    },1000);
                }
            }
        }).$el);
    }
});
var Page1 = Fui.PageSlider.extend({
    config:{
        stopPropagation:false,
        preventDefault:false,
        orient:'x',
        arrow:{
            left:{
                css:{
                    borderColor:'white'
                }
            },
            right:{
                css:{
                    borderColor:'white'
                }
            }
        }
    }
});

var Page11 = Fui.Template.extend({
    config:{
        template:'Page11',
        xtpl:'p11',
        img_txt:null,
        img_bg:null
    },
    getXtplData:function(){
        return {
            img_txt:this.get('img_txt')
            ,img_bg:this.get('img_bg')
        };
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
                    $tar.addClass('left');
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
        return [
            {
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
        'touchstart .opt_0':function(e){
            var me = this;
            var tch = e.originalEvent.touches;
            var random_val = Math.floor(Math.random()*10);
            var i = (random_val==0)?1:random_val;
            if(tch.length>=2){
                slider.set("lock",true);
                var index = (i<5)?((i%2==0)?2:1):((i%2==0)?4:3);
                me.$el.find(".sm,.kiss_word").hide();
                me.$el.find(".kissList img").attr("src",ImgDir('/p2/kiss/'+index+'.png')).fadeIn();
                $(".match_result .result_img").attr("src",ImgDir('/p3/model_jpg/'+i+'.jpg'));
                $(".match_result .kiss").attr("src",ImgDir('/p3/kiss/'+index+'.png'));
                //share_desc
                var msg = getMsg(models[i-1]);
                Weixin.set("title",msg.title);
                Weixin.set("desc",msg.desc);
                setTimeout(function(){
                    me.$el.find(".match").fadeIn().find(".matching .jdt_move").animate({width:"260px"}).one("webkitTransitionEnd",function(){
                        me.$el.find(".matching").hide().siblings().show();
                        me.$el.find(".matching .jdt_move").css("width","0px");
                    });
                },2000);
            }
        }
    }
});
Fui.Template.regTpl({
    PAGE0:PAGE0,
    Page1:Page1,
    Page11:Page11,
    PAGE1:PAGE1,
    PAGE2:PAGE2
});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    lock:true,
    iteration:false,
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
            template:'Page1',
            data:[
                {
                    template:'Page11',
                    bg:ImgDir('/p1/list/11.jpg')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/1.jpg'),
                    img_txt:ImgDir('/p1/list/1_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/2.jpg'),
                    img_txt:ImgDir('/p1/list/2_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/3.jpg'),
                    img_txt:ImgDir('/p1/list/3_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/4.jpg'),
                    img_txt:ImgDir('/p1/list/4_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/5.jpg'),
                    img_txt:ImgDir('/p1/list/5_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/6.jpg'),
                    img_txt:ImgDir('/p1/list/6_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/7.jpg'),
                    img_txt:ImgDir('/p1/list/7_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/8.jpg'),
                    img_txt:ImgDir('/p1/list/8_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/9.jpg'),
                    img_txt:ImgDir('/p1/list/9_word.png')
                }
                ,{
                    template:'Page11',
                    img_bg:ImgDir('/p1/list/10.jpg'),
                    img_txt:ImgDir('/p1/list/10_word.png')
                }

            ]
        }
        ,{
            template:'PAGE2',
            bg:ImgDir('/p2/1.jpg')
        }
    ]
});
slider.render();
slider.arrow.down.hide();

$(".fui-arrow.bottom").addClass("hide");
//play again
$(".again").on("touchend",function(e){
    var $tar = $(e.currentTarget);
    $tar.parent().fadeOut();
    $(".p2").find(".match,.match .matchend,.share,.kissList img").hide();
    $(".p2").find(".kiss_word,.sm,.matching").show();
    slider.set("lock",false);
});