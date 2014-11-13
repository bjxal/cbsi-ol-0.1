Fui.Template.IMG_DIR = ImgDir();

var PAGE0 = Fui.Template.extend({
    config:{
        template:'PAGE0',
        xtpl:'p0'
    },
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
                    $('#p5c1')[0]
                    ,{
                        width:212,
                        orientation:orient
                    }
                    ,function(){
                        $(".p4 div.p4-popup").addClass("show");
                        slider.set('lock',true);
                    }
                );
            };
        }
    },
    listeners:{
    },
    getGestureItems:function(){
        function aa(e,$tar){
            $(".word,.arrow_rt,.leaf_1,.leaf_2").addClass("ani_t");
        }
        return [
            {
                gesture:'leftSwipe',
                name:'leaf',
                callback:aa
            }
            ,{
                gesture:'rightSwipe',
                name:'leaf',
                callback:aa
            }
        ];
    }
});

Fui.Template.regTpl({
    PAGE0:PAGE0
});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    lock:true,
    listeners:{
        gesture:function(){
        }
    },
    data:[
        {
            template:'PAGE0',
            bg:ImgDir('/p0/bg.jpg')
        }
    ]
});
slider.render();