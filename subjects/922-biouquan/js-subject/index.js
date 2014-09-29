
Fui.Template.Page8 = Fui.Template.extend({
    config:{
        tpl:[
            '<div class="p8-form">',
            '<input id="name" class="name" type="text"/><input id="phone" class="phone" type="text"/><a data-tap="submit" class="submit"></a>'
            ,'</div>'
            ,'<div class="p8-share-popup">'
            ,'<a data-tap="share" class="share"></a><a data-tap="popup" class="popup"></a>'
            ,'</div>'
        ].join('')
    }
});
Fui.Template.Page9 = Fui.Template.extend({
    config:{
        tpl:'<a data-tap="share" class="share"></a><a data-tap="popup" class="popup"></a>'
    }
});
var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
//    slideType:'type1',
    data:[
        {
            template:'Base',
            bg: getImgPath()+'/p1/bg.jpg',
            fg: getImgPath()+'/p1/fg.png',
            design:function(){
                this.$el.children().addClass('p1-ani');
            }
        }
        ,{
            template:'Video',
            bg: getImgPath()+'/p2/bg.jpg',
            vid:'XNzYyNjY3MDgw',
            platform:'youku'
        }
        ,{
            template:'Base',
            bg: getImgPath()+'/p3/bg.jpg'
        }
        ,{
            template:'Base',
            bg: getImgPath()+'/p4/bg.jpg'
        }
        ,{
            template:'Base',
            bg: getImgPath()+'/p5/bg.jpg'
        }
        ,{
            template:'Base',
            bg: getImgPath()+'/p6/bg.jpg'
        }
        ,{
            template:'Base',
            bg: getImgPath()+'/p7/bg.jpg'
        }
        ,{
            template:'Page8',
//            bg: getImgPath()+'/p8/bg.jpg',
            design:function(){
                this.$el.children('.p8-form').css({
                    backgroundImage:'url('+getImgPath()+'/p8/bg.jpg)'
                });
                this.$el.children('.p8-share-popup').css({
                    backgroundImage:'url('+getImgPath()+'/p9/bg.jpg)'
                });

            },
            //
            getGestureItems:function(){
                return [
                    {
                        gesture:'tap',
                        name:'submit',
                        callback:function(){
                            var name = $('#name').val(),
                                phone = $('#phone').val()
                                ,$p8 = this.$el
                                ;
                            if(!/1\d{10}/g.test(phone)) return alert(al.phone);
                            if(!name) return alert(al.name);
                            $.post('http://www.onlylady.com/files/eventapi.php?c=EventApi&a=AddEvent&indexsId=530',{
                                'data[2170]':name,
                                'data[2171]':phone
                            },success);
                            function success(){
                                $p8.children('.p8-share-popup').show();
                                $p8.children('.p8-form').hide();
                            }
                        }
                    },
                    {
                        gesture:'tap',
                        name:'share',
                        callback:function(){
                            this.$el.find('.popup').show();
                        }
                    }
                    ,{
                        gesture:'tap',
                        name:'popup',
                        callback:function(){
                            this.$el.find('.popup').hide();
                        }
                    }
                ];
            }
        }
//        ,{
//            template:'Page9',
//            bg: getImgPath()+'/p9/bg.jpg',
//            getGestureItems:function(){
//                return [
//                    {
//                        gesture:'tap',
//                        name:'share',
//                        callback:function(){
//                            this.$el.children('.popup').show();
//                        }
//                    }
//                    ,{
//                        gesture:'tap',
//                        name:'popup',
//                        callback:function(){
//                            this.$el.children('.popup').hide();
//                        }
//                    }
//                ];
//            }
//        }

    ]
});