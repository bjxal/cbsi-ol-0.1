
var flag1 = false;
Fui.Template.IMG_DIR = ImgDir();
Fui.Template.Page234 = Fui.Template.Base.extend({
    getGestureItems:function(){
        var me = this;
        return [
            {
                gesture:'leftSwipe',
                name:'img',
                callback:function(e,$tar){
                    var $p = $tar.parent();
                    $tar.addClass('left').one('webkitTransitionEnd',function(){
                        $p.prepend($tar);
                        $tar.removeClass('left');
                    });
                }
            }
            ,{
                gesture:'rightSwipe',
                name:'img',
                callback:function(e,$tar){
                    var $p = $tar.parent();
                    $tar.addClass('right').one('webkitTransitionEnd',function(){
                        $p.prepend($tar);
                        $tar.removeClass('right');
                    });
                }
            }
            ,{
                gesture:'tap',
                name:'tab',
                callback:function(e,$tar){
                    $tar.addClass('on').siblings().removeClass('on');
                    var $inner = me.$el.children('.inner').eq($tar.index());
                    $inner.addClass('show').siblings().removeClass('show');
                }
            }

        ];
    }

});



Fui.Template.Page2 = Fui.Template.Base.extend({
    events:{
        'change input':function(e){
            var me = this
                ,$el = me.$el
                ;
            e.stopPropagation();
            var file = e.target.files[0];
            if(!file)return;
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onloadend = function(){
                var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result)), html = [];
                var orient = exif.Orientation;

                new MegaPixImage(file).render(
                    $('.photo')[0]
                    ,{
                        width:200,
                        orientation:orient
                    }
                    ,function(){
                        flag1 = true;
                        $el.children('.step1').fadeOut();
                        $el.children('.step2').fadeIn();
                        var canvas = document.createElement('canvas');
                        canvas.width = canvas.height = 400;
                        var ctx = canvas.getContext('2d');
                        var $s2 = $el.children('.step2');
                        $(canvas).css({
                            position:'absolute'
                            ,opacity:0,
                            zIndex:-1
                        });
                        $s2.append(canvas);
                        me.canvas = canvas;
                        me.ctx = ctx;
                    }
                );
            };
        }
    },
    getGestureItems:function(){
        var me = this
            ,$el = me.$el
        ;
        return [
            {
                gesture:'tap',
                name:'p2next',
                callback:function(){
                    $el.children('.step1').fadeOut();
                    $el.children('.step2').fadeIn();
                }
            }
            ,{
                gesture:'tap',
                name:'p2prev',
                callback:function(){
                    $el.children('.step2').fadeOut();
                    $el.children('.step1').fadeIn();
                }
            }
            ,{
                gesture:'tap',
                name:'p2finish',
                callback:function(){
                    var template = $('.template')[0],
                        face = $('.face')[0],
                        photo = $('.photo')[0]
                        ;
                    var ss = /matrix\(([\d\,\.\-\s]*)\)/g.exec(getComputedStyle(photo,null).webkitTransform)[1].split(',');
                    for(var i= 0,ln = ss.length;i<ln;i++){
                        ss[i] = Number(ss[i]);
                    }
                    me.ctx.clearRect(0,0,400,400);
                    me.ctx.save();
                    var h = 200*photo.height/photo.width;
                    me.ctx.translate((100+ss[4])+(1-ss[0])*100,ss[5]+(1-ss[0])*h/2);
                    me.ctx.scale(ss[0],ss[0]);
                    me.ctx.drawImage(photo,0,0,200,h);
                    me.ctx.restore();
                    me.ctx.drawImage(template,template.width/2-200,280,400,400,0,0,400,400);
                    me.ctx.drawImage(face,template.width/2-200,280,400,400,0,0,400,400);

                    var loading = new Fui.Popup().loading();
                    setTimeout(function(){
                        $.post('/files/eventapi.php?c=Event&a=flashupload',{
                            imgfile:me.canvas.toDataURL().substring('data:image/png;base64,'.length)
                        },function(link){
                            weixin.set('img_url',link);
                            loading.hide();
                            new Fui.Popup().img(ImgDir('/share.png'));
                        });
                    },500);

                }
            }


        ];
    },
    design:function(){
        var me = this
            ,$el = me.$el
        ;
        var slider1 = new Fui.PageSlider({
            cid:'inner',
            el:'#slider',
            orient:'x',
            arrow:'left right',
            data:[
                {
                    template:'Base',
                    xtpl:'p21'
                }
                ,{
                    template:'Base',
                    xtpl:'p22'
                },{
                    template:'Base',
                    xtpl:'p23'
                },{
                    template:'Base',
                    xtpl:'p24'
                }
            ],
            listeners:{
                gesture:function(e,gesture,$tar){
                    if(gesture == 'upSwipe'){
                        slider.toPage(3);
                    }else if(gesture == 'downSwipe'){
                        slider.toPage(1);
                    }
                },
                slide:function(index){
                    $('.template').attr('src',$('img.bg')[index].src);
                }
            }
        });
        slider1.render();
//        slider.hide();

        var $event = $el.find('.step2 .event')
            ,$target=this.$el.find('.step2 .photo');

        new Fui.View({
            cid:'aaa',
            $el:$event,
            $target:$target,
            initialize:function(){
                var me1 = this;
                me1.event = new Fui.Event({
                    stopPropagation:true,
                    draggable:true,
                    pinch:true,
                    hoster:me1
                });
            }
        });


    }
});

new Fui.Gravity({
    listeners:{
        shake:function(){
            if(flag1){
                $('.face').attr('src','http://www.onlylady.com/div/img/chanel/'+Math.ceil(Math.random()*4)+'_f.png');
            }
        }
    }
});

var slider = new Fui.PageSlider({
    cid:'outer',
    el:'#pack',
    curPage:0,
    arrow:{
        orient:'bottom',
        without:[]
    },
    listeners:{
        slide:function(index){
//            if(index == 2){
//                $('#slider').css({
//                    position:'absolute',
//                    top:0,
//                    left:0
//                }).show();
//            }
        }
    },
    data:[
        {
            template:'Base',
            bg:ImgDir('/p0/bg.jpg'),
            xtpl:'p0',
            getGestureItems:function(e,$tar){
                return [
                    {
                        gesture:'tap',
                        name:'book',
                        callback:function(e,$tar,param){
                            slider.toPage(1);
                            $('.inner').eq(param).addClass('show').siblings('.inner').removeClass('show');
                            $('.tabs').children().eq(param).addClass('on').siblings().removeClass('on');
                        }
                    }
                ];
            }
        }
        ,{
            template:'Page234',
            bg:ImgDir('/p1/bg.jpg'),
            xtpl:'p1'
        }
        ,{
            template:'Page2',
//            bg:ImgDir('/p2/bg.jpg'),
            xtpl:'p2'
        }
        ,{
            template:'Base',
            bg:ImgDir('/p3/bg.jpg'),
            xtpl:'p3'
        }
    ]
});
slider.render();