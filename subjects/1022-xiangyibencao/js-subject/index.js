
Fui.Template.IMG_DIR = ImgDir('');

new Fui.Gravity({
    listeners:{
        shake:function(){
            if(slider.get('curPage') == 0)
            slider.toPage(1);
        }
    }
});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    orient:'y',
    listeners:{
        gesture:function(e,gesture,$tar){
            var tap = $tar.attr('data-'+gesture);
            switch (tap){
                case 'p1-video':
                    new Fui.Popup().video('youku',{
                        vid:'XODA4ODkwOTgw'
                    });
                    break;
                case 'p5-openForm':
                    slider.next();
                    break;
                case 'p6-submit':
                    var name = $('#name').val(),
                        phone = $("#phone").val();
                    if(!name) return alert(al.name);
                    if(!/^1\d{10}$/g.test(phone)) return alert(al.phone);
                    $.post(
                        'http://www.onlylady.com/files/eventapi.php?c=EventApi&a=AddEvent&indexsId=543'
                        ,{
                            'data[2213]':name,
                            'data[2214]':phone
                        }
                        ,function(){
                            console.log(arguments);
                            $('#share').show();
                            slider.set('lock',true);
                        });
                    break;
            }
        }
    },
    data:[
        {
            template:'Base'
//            ,bg:ImgDir('/p0/bg.jpg')
            ,xtpl:'p0'
        }
        ,{
            template:'Base'
//            ,bg:ImgDir('/p1/bg.jpg')
            ,xtpl:'p1'
        }
        ,{
            template:'Base'
//            ,bg:ImgDir('/p2/bg.jpg')
        }
        ,{
            template:'Base'
//            ,bg:ImgDir('/p3/bg.jpg')
            ,xtpl:'p3'
        }
        ,{
            template:'Base'
//            ,bg:ImgDir('/p4/bg.jpg')
        }
        ,{
            template:'Base'
//            ,bg:ImgDir('/p5/bg.jpg')
            ,xtpl:'p5'
        }
        ,{
            template:'Base'
//            ,bg:ImgDir('/p6/bg.jpg')
            ,xtpl:'p6'
        }

    ]
});
slider.render();

//alert(window.document.width+','+window.document.height);