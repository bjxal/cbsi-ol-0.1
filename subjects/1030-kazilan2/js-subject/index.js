var sid = false;
Fui.Template.IMG_DIR = ImgDir('');

var audio = Fui.Audio({
    src:ImgDir('/music.mp3')
//    ,color:'red'
});

var Page4 = Fui.Template.Base.extend({
    className:'p p4 module module-base focus',
    config:{
        xtpl:'p4',
        css:{
            backgroundColor:'rgba(0,0,0,.35)'
        }
    }
    ,events:{
        'touchend [data-tap=p4kiss]':function(e){
            var me = this;
            var ts = e.originalEvent.changedTouches;
            if(ts&&ts.length == 1){
                me.popup.hide();
                new Fui.Popup({
                    events:{
                        'click [data-tap=submit]':function(){
                            var this_pop = this;
                            var name = $('#name').val()
                                ,phone = $('#phone').val()
                                ,address = $('#address').val()
                                ;
                            if(!name) return alert(al.name);
                            if(!/^1\d{10}$/g.test(phone)) return alert(al.phone);
                            if(!address) return alert(al.address);
                            $.post(
                                'http://www.onlylady.com/files/eventapi.php?c=EventApi&a=AddEvent&indexsId=545',
                                {
                                    'data[2219]':phone
                                    ,'data[2218]':name
                                    ,'data[2220]':address
                                },
                                function(){
                                    this_pop.hide();
                                    new Fui.Popup().img(ImgDir('/share.png'));
                                }
                            );
                        }
                    },
                    listeners:{
                        gesture:function(e,gesture,$tar){
                            e.stopPropagation();
                            e.preventDefault();
                            if(sid)return;
                            var this_pop = this;
                            if($tar.attr('data-'+gesture) == 'submit'){
                                sid = true;
                                setTimeout(function(){
                                    sid = false;
                                },500);
                                var name = $('#name').val()
                                    ,phone = $('#phone').val()
                                    ,address = $('#address').val()
                                    ;
                                if(!name) return alert('请输入姓名!');
                                if(!/1\d{10}/.test(phone)) return alert('请输入正确的电话号码!!');
                                if(!address) return alert('请输入地址!');
                                $.post(
                                    'http://www.onlylady.com/files/eventapi.php?c=EventApi&a=AddEvent&indexsId=545',
                                    {
                                        'data[2219]':phone
                                        ,'data[2218]':name
                                        ,'data[2220]':address
                                    },
                                    function(){
                                        this_pop.hide();
                                        new Fui.Popup().img(ImgDir('/share.png'));
                                    }
                                );
                            }
                        }
                    }
                }).popView(new Fui.View({
                        className:'p4-pop-view',
                        initialize:function(){
                            this.$el.append([
                                ,'<input id="phone" class="phone" type="text"/>'
                                ,'<input id="name" class="name" type="text"/>'
                                ,'<input id="address" class="address" type="text"/>'
                                ,'<a class="submit" data-tap="submit"></a>'
                            ]);
                        }
                    }));
            }
        }
    }
    ,listeners:{
        gesture:function(e,gesture,$tar){
            var me = this;
            if(gesture == 'tap'&&$tar.attr('data-tap') == 'p4kiss'){
                var ts = e.$e.originalEvent.changedTouches;
                if(ts&&ts.length == 1){
                    me.popup.hide();
                    new Fui.Popup({
                        events:{
                            'click [data-tap=submit]':function(){
                                alert(123123);
                            }
                        },
                        listeners:{
                            gesture:function(e,gesture,$tar){
                                e.stopPropagation();
                                e.preventDefault();
                                var this_pop = this;
                                if(sid)return;

                                if($tar.attr('data-'+gesture) == 'submit'){
                                    sid = true;
                                    setTimeout(function(){
                                        sid = false;
                                    },500);

//                                    e.$e.stopPropagation();
//                                    e.$e.preventDefault();
                                    var name = $('#name').val()
                                        ,phone = $('#phone').val()
                                        ,address = $('#address').val()
                                        ;
                                    if(!name) return alert('请输入姓名!');
                                    if(!/1\d{10}/.test(phone)) return alert('请输入正确的电话号码!!');
                                    if(!address) return alert('请输入地址!');
                                    $.post(
                                        'http://www.onlylady.com/files/eventapi.php?c=EventApi&a=AddEvent&indexsId=545',
                                        {
                                            'data[2219]':phone
                                            ,'data[2218]':name
                                            ,'data[2220]':address
                                        },
                                        function(){
                                            this_pop.hide();
                                            new Fui.Popup().img(ImgDir('/share.png'));
                                        }
                                    );
                                }
                            }
                        }
                    }).popView(new Fui.View({
                            className:'p4-pop-view',
                            initialize:function(){
                                this.$el.append([
                                    ,'<input id="phone" class="phone" type="text"/>'
                                    ,'<input id="name" class="name" type="text"/>'
                                    ,'<input id="address" class="address" type="text"/>'
                                    ,'<a class="submit" data-tap="submit"></a>'
                                ]);
                            }
                        }));
                }
            }
        }
    }
});

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    arrow:{
        orient:'bottom',
        style:{
            backgroundImage:'url('+ImgDir('/arrow.png')+')',
            width:60,
            height:60,
            marginLeft:-30,
            marginRight:-30,
            border:0
        },
        without:[0,3]
    },
    listeners:{
        gesture:function(e,gesture,$tar){
            var me = this
                ,pi = me.get('curPage')
                ;
            if(pi == 1){
                var $pl = $('#photo-list').find('.page2');
                if(gesture == 'leftSwipe'){
                    ensureListPage($pl,1);
                }
                if(gesture == 'rightSwipe'){
                    ensureListPage($pl,-1);
                }
            }
            function ensureListPage($tar,type){
                var $p = $tar.parent()
                    ;
                $p.children().removeClass('page1 page2 page3');
                if(type>0){
                    $tar.next().addClass('page2');
                    $tar.addClass('page1');
                    $tar.prev().addClass('page3');
                    $p.append($p.children().first());
                }else{
                    $tar.next().addClass('page1');
                    $tar.addClass('page3');
                    $tar.prev().addClass('page2');
                    $p.prepend($p.children().last());
                }
            }

        }
    },
    data:[
        {
            template:'Base',
            bg:ImgDir('/p0/bg.jpg'),
            xtpl:'p0',
            getGestureItems:function(){
                return [{
                    gesture:'tap',
                    name:'p0btn',
                    callback:function(){
                        slider.toPage(1);
                    }
                }];
            }
        }
        ,{
            template:'Base',
            bg:ImgDir('/p1/bg.jpg'),
            xtpl:'p1',
            getGestureItems:function(){

                return [
                    {
                        gesture:'tap',
                        name:'p1item',
                        callback:function(e,$tar,param){
                            if($tar.hasClass('page')){
                                $tar.children('img').removeClass('show');

                            }else{
                                $tar.toggleClass('show').siblings('img').removeClass('show');
                            }
                        }
                    }
                ];
            }
        }
        ,{
            template:'Base',
            bg:ImgDir('/p2/bg.jpg')
            ,xtpl:'p2'
            ,getGestureItems:function(){
                return [
                    {
                        gesture:'tap',
                        name:'p2video',
                        callback:function(){
                            new Fui.Popup().video('youku',{
                                vid:'XODE4NDYzMDg0',
                                audio:audio
                            });
                        }
                    }
                ];
            }
        }
        ,{
            template:'Base',
            bg:ImgDir('/p3/bg.jpg')
            ,xtpl:'p3'
            ,getGestureItems:function(){
                return [
                    {
                        gesture:'tap',
                        name:'p3action',
                        callback:function(){
                            var page4 = new Page4();
                            page4.loadResources(function(){
                                new Fui.Popup().popView(page4);
                            });
                        }
                    }
                ];
            }
        }
    ]
});
slider.render();