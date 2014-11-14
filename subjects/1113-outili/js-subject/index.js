require("fliza-ui");
var flag_1 = false;
var flag_2 = false;
Fui.Template.IMG_DIR = ImgDir();

var PAGE0 = Fui.Template.extend({
    config:{
        template:'PAGE0',
        xtpl:'p0'
    },
    events:{
    },
    getGestureItems:function(){
        function slide(e,$tar){
            $(".p0_1 .word,.p0_1 .arrow_rt,.p0_1 .leaf_1,.p0_1 .leaf_2").addClass("ani_t").one("webkitTransitionEnd",function(){
                setTimeout(function(){
                    $(".p0_1").fadeOut(1000);
                },3000);
            });
        }
        return [
            {
                gesture:'leftSwipe',
                name:'leaf',
                callback:slide
            }
            ,{
                gesture:'rightSwipe',
                name:'leaf',
                callback:slide
            }
        ];
    }
});
var PAGE1 = Fui.Template.extend({
    config:{
        template:'PAGE1',
        xtpl:'p1'
    }
    ,getGestureItems:function(){
        return [
            {
                gesture:'tap',
                name:'btn',
                callback:function(e,$tar){
                    slider.toPage(slider.config.curPage+1);
//                    slider.set("lock",false);
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
        return [
            {
                gesture:'topSwipe',
                name:'topSwipe',
                callback:function(e,$tar){
                    slider.toPage(slider.config.curPage+1);
//                    slider.set("lock",false);
                }
            }
        ]
    }
});
var PAGE3 = Fui.Template.extend({
    config:{
        template:'PAGE3',
        xtpl:'p3'
    }
    ,getGestureItems:function(){
        function drag(e,$tar){
            $(".p3 .drag_1,.p3 .drag_2,.p3 .arrow_rt").addClass("ani_t");
        }
        return [
            {
                gesture:'leftSwipe',
                name:'drag',
                callback:drag
            }
        ]
    }
});
var PAGE4 = Fui.Template.extend({
    config:{
        template:'PAGE4',
        xtpl:'p4'
    }
});
var PAGE5 = Fui.Template.extend({
    config:{
        template:'PAGE5',
        xtpl:'p5'
    }
});
var PAGE6 = Fui.Template.extend({
    config:{
        template:'PAGE6',
        xtpl:'p6'
    }
    ,events:{
        "change #touchInput_1":function(e){
            var file = e.target.files[0];
            if(!file)return;
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onloadend = function(){
                var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result)), html = [];
                var orient = exif.Orientation;

                new MegaPixImage(file).render(
                    $("#canvas_1")[0]
                    ,{
                        width:186,
                        orientation:orient
                    }
                    ,function(){
                        $(".p6 .avt_1").show();
                        flag_1 = true;
                    }
                );
            };
        },
        "change #touchInput_2":function(e){
            var file = e.target.files[0];
            if(!file)return;
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onloadend = function(){
                var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result)), html = [];
                var orient = exif.Orientation;

                new MegaPixImage(file).render(
                    $("#canvas_2")[0]
                    ,{
                        width:186,
                        orientation:orient
                    }
                    ,function(){
                        flag_2 = true;
                        $(".p6 .avt_2").show();
                    }
                );
            };
        }
    }
    ,design:function(){
//        var $event = this.$el.children(".event");
        new Fui.View({
            $el:$("#canvas_1"),
            $target:$("#canvas_1"),
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
        new Fui.View({
            $el:$("#canvas_2"),
            $target:$("#canvas_2"),
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
var PAGE7 = Fui.Template.extend({
    config:{
        template:'PAGE7',
        xtpl:'p7'
    }
    ,getGestureItems:function(){
        return [
            {
                gesture:'tap',
                name:'next',
                callback:function(){
                    slider.toPage(8);
                }
            }
        ]
    }
});
var PAGE8 = Fui.Template.extend({
    config:{
        template:'PAGE8',
        xtpl:'p8'
    }
    ,getGestureItems:function(){
        return[{
            gesture:'tap',
            name:'submit',
            callback:function(){
                var name = $("#name").val();
                var phone = $("#phone").val();
                var addr = $("#addr").val();
                var mail = $("#mail").val();
                var img1 = document.getElementById("canvas_3").toDataURL('image/png');
                var img2 = document.getElementById("canvas_4").toDataURL('image/png');
                $.post('http://www.onlylady.com/files/eventapi.php?c=EventApi&a=AddEvent&indexsId=552&isreturn=true',{
                    "data[2241]":name,
                    "data[2242]":phone,
                    "data[2243]":addr,
                    "data[2244]":name,
                    "data[2245]":mail,
                    "data[2246]":img1,
                    "data[2247]":img2,
                },function(){
                    slider.toPage(9);
                })
            }
        }]
    }
});
var PAGE9 = Fui.Template.extend({
    config:{
        template:'PAGE9',
        xtpl:'p9'
    }
});
Fui.Template.regTpl({
    PAGE0:PAGE0,
    PAGE1:PAGE1,
    PAGE2:PAGE2,
    PAGE3:PAGE3,
    PAGE4:PAGE4,
    PAGE5:PAGE5,
    PAGE6:PAGE6,
    PAGE7:PAGE7,
    PAGE8:PAGE8,
    PAGE9:PAGE9
});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:6,
//    lock:true,
    listeners:{
        slide:function(){
            var page = this.get("curPage");
            console.log(page)
            var str = "0,2";
            if(str.indexOf(page)!=-1){
                slider.set("lock",true);
            }
            else{
                slider.set("lock",false);
            }
        },
        gesture:function(){

        }
    },
    data:[
        {
            template:'PAGE0',
            bg:ImgDir('/p0/p0_1/bg.jpg')
        }
        ,{
            template:'PAGE1',
            bg:ImgDir('/p1/bg.jpg')
        }
        ,{
            template:'PAGE2',
            bg:ImgDir('/p2/bg.jpg')
        }
        ,{
            template:'PAGE3',
            bg:ImgDir('/p3/bg.jpg')
        }
        ,{
            template:'PAGE4',
            bg:ImgDir('/p8/bg.jpg')
        }
        ,{
            template:'PAGE5',
            bg:ImgDir('/p8/bg.jpg')
        }
        ,{
            template:'PAGE6',
            bg:ImgDir('/p6/bg.jpg')
        }
        ,{
            template:'PAGE7',
            bg:ImgDir('/p7/bg.jpg')
        }
        ,{
            template:'PAGE8',
            bg:ImgDir('/p8/bg.jpg')
        }
        ,{
            template:'PAGE9',
            bg:ImgDir('/p9/bg.jpg')
        }
    ]
});
slider.render();
new Fui.Gravity({
    listeners:{
        shake:function(){
            if(slider.get("curPage")==6 && flag_1==true && flag_2==true){
                slider.toPage(7);
                var img_bg = new Image();
                img_bg.onload = draw;
                img_bg.src="http://www.onlylady.com/div/img/otili/bg.png";

                var canvas_1 = document.getElementById("canvas_1");
                var canvas_3 = document.getElementById("canvas_3");
                var context_3 = canvas_3.getContext("2d");

                var canvas_2 = document.getElementById("canvas_2");
                var canvas_4 = document.getElementById("canvas_4");
                var context_4 = canvas_4.getContext("2d");
                function draw(){
                    context_3.drawImage(img_bg,0,0);
                    var ss = /matrix\(([\d\,\.\-\s]*)\)/g.exec(getComputedStyle(canvas_1,null).webkitTransform)[1].split(',');//matrix (1scale,2,3,1scale,5x,6y)
                    context_3.translate(ss[4],ss[5]);
                    context_3.scale(ss[0],ss[0]);
                    context_3.drawImage(canvas_1,92,76,186,186);

                    ss = /matrix\(([\d\,\.\-\s]*)\)/g.exec(getComputedStyle(canvas_2,null).webkitTransform)[1].split(',');//matrix (1scale,2,3,1scale,5x,6y)
                    context_4.drawImage(img_bg,320,0,320,323,0,0,320,323);
                    context_4.translate(ss[4],ss[5]);
                    context_4.scale(ss[0],ss[0]);
                    context_4.drawImage(canvas_2,50,76,186,186);

                }
            }
        }
    }
});