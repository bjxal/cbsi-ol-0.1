
var homelink = 'http://m.clarisonic.cn/clarisonic/campaign/name/newdeeppore?utm_source=onlylady%5FM&utm_medium=cpc&utm_term=DPC%5FM&utm_campaign=DPC&utm_content=DPC%20mobile';
Fui.Template.Page1 = Fui.Template.extend({
    config:{
        tpl:Tpl.page1
    }
    ,getGestureItems:function(){
        return [
            {
                gesture:'tap',
                name:'p1-btn1',
                callback:function(e,$tar){
                    $tar.siblings('.popup1').show();
                }
            }
            ,{
                gesture:'tap',
                name:'popup1',
                callback:function(e,$tar){
                    $tar.hide();
                }
            }
            ,{
                gesture:'tap',
                name:'p1-btn2',
                callback:function(e,$tar){
                    slider.slide(1);
                }
            }
            ,{
                gesture:'tap',
                name:'p1-home',
                callback:function(e,$tar){
                    window.location.href = homelink;
                }
            }
        ];
    }
    ,getTplData:function(){
        return {
            slideupBg:getImgPath()+'/p1/shiyong.png',
            popup1:getImgPath()+'/p1/popup.png',
            home:getImgPath()+'/p1/home.png'
        };
    }
});

Fui.Template.Page2 = Fui.Template.extend({
    config:{
        tpl:Tpl.page2
    }
    ,getGestureItems:function(){
        return [
            {
                gesture:'tap',
                name:'p2-submit',
                callback:function(e,$tar){
                    var phone = $('#p2-phone').val();
                    var addr = $('#p2-addr').val();
                    if(!/1\d{10}/g.test(phone)) return alert(al.phone);
                    if(!addr) return alert(al.addr);
                    $.post('http://www.onlylady.com/files/eventapi.php?c=EventApi&a=AddEvent&indexsId=528'
                        ,{
                                'data[2166]':phone,
                                'data[2167]':addr
                        }
                        ,function(data){
                            slider.slide(2);
                        }
                    );
                }
            }
        ];
    }
});

Fui.Template.ScrollablePage = Fui.Template.extend({
    config:{
        orient:'y'
    },
    render:function(){
        var me = this
            ,$el = me.$el
            ,orient = me.get('orient')
            ,tpl = me.get('tpl')
        ;
        var event = new Fui.Event({
            hoster:me,
            iscroll:'y'
        });
    }
});
Fui.Template.Page3 = Fui.PageSlider.extend({
    cid:'page3',
    className:'page3',
    config:{
        orient:'x',
        arrow:false,
        curPage:0,
        data:[
            {
                template:'Base',
                bg: getImgPath() + '/p3/1.jpg'
            }
            ,{
                template:'Base',
                bg: getImgPath() + '/p3/2.jpg'
            }
            ,{
                template:'Base',
                bg: getImgPath() + '/p3/3.jpg'
            }
            ,{
                template:'Base',
                bg: getImgPath() + '/p3/4.jpg'
            }
            ,{
                template:'Base',
                bg: getImgPath() + '/p3/5.jpg'
            }
            ,{
                template:'Base',
                bg: getImgPath() + '/p3/6.jpg'
            }
            ,{
                template:'ScrollablePage',
                tpl: Tpl.page3,
                getTplData:function(){
                    return {
                        src: getImgPath() + '/p3/7.jpg',
                        share: getImgPath() + '/p3/7-1.png',
                        home: getImgPath() + '/p3/7-2.png',
                        share_popup: getImgPath() + '/p3/share_popup.png'
                    };
                },
                getGestureItems:function(){
                    return [
                        {
                            gesture:'tap',
                            name:'share',
                            callback:function(){
                                console.log(this,this.$el);
                                this.$el.children('.share_popup').show();
                            }
                        }
                        ,{
                            gesture:'tap',
                            name:'share_popup',
                            callback:function(){
                                this.$el.children('.share_popup').hide();
                            }
                        }
                        ,{
                            gesture:'tap',
                            name:'home',
                            callback:function(){
                                window.location.href = homelink;
                            }
                        }

                    ];
                }
            }
        ]
    }
    ,listeners:{
        gesture:function(e,gesture){
            console.log($(e.target).attr('data-tap'));
            if(gesture == 'downSwipe'&&this.get('index') == 0){
                slider.prev();
            }
        }
    }
});



var slider = new Fui.PageSlider({
    el:'#pack',
    lock:true,
    curPage:0,
    slideType:'fade',
    arrow:{
        orient:'bottom',
        without:[1,2],
        style:{
            backgroundImage:'url('+getImgPath()+'/p1/arrow.png)',
            backgroundRepeat:'no-repeat',
            webkitTransform:'none',
            webkitAnimation:'arrow-down 2s linear infinite',
            width: 22,
            marginLeft:-11,
            height: 15,
            bottom:60,
            border:'0'
        }
    },
    data:[
        {
            template:'Page1'
        }
        ,{
            template:'Page2'
        }
        ,{
            template:'Page3'
        }
    ],
    listeners:{
        gesture:function(e,gesture,$tar){
            var me = this
                ,index = me.get('curPage')
                ;
            if(index == 0){
                var $slideup = $('#slideup');
                switch (gesture){
                    case 'upSwipe':
                        $slideup.addClass('show');
                        me.arrow.hide();
                        break;
                    case 'downSwipe':
                        me.arrow.show();
                        $slideup.removeClass('show');
                        if(index == 1) me.prev();
                        break;
                }
            }
        }
    }
});

slider.render();