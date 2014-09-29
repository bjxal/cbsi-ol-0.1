
Fui.Template.Page1 = Fui.Template.extend({
    config:{
        tpl:Tpl.page1,
        bg:ImgDir('/p1/bg.jpg')
    },
    getTplData:function(){
        return {
            cover:ImgDir('/p1/cover.jpg')
            ,popup1:ImgDir('/p1/popup/1.jpg')
            ,popup2:ImgDir('/p1/popup/2.jpg')
            ,popup3:ImgDir('/p1/popup/3.jpg')
            ,popup4:ImgDir('/p1/popup/4.jpg')
        };
    },
    getGestureItems:function(){
        var me = this
        ;
        return [
            {
                gesture:'tap',
                name:'p1-cover',
                callback:function(){
                    me.$el.find('.cover').fadeOut();
                }
            }
            ,{
                gesture:'tap',
                name:'p1-popup',
                callback:function(){
                    me.$el.find('.popup').removeClass('show');
                }
            }
            ,{
                gesture:'tap',
                name:'p1-pro',
                callback:function(e,$tar,param){
                    me.$el.find('.popup'+param).addClass('show');
                }
            }
        ];
    }
});

Fui.Template.Page2 = Fui.Template.extend({
    className:'page2',
    config:{
        tpl:'<img data-tap="p2-1" src="'+ImgDir('/p2/bg0.jpg')+'"/><img style="display:none;" data-tap="p2-2" src="'+ImgDir('/p2/bg1.jpg')+'"/>'
    },
    getGestureItems:function(){
        return [
            {
                gesture:'tap',
                name:'p2-1',
                callback:function(e){
                    $(e.target).fadeOut();
                    $(e.target).siblings().fadeIn();
                }
            }
            ,{
                gesture:'tap',
                name:"p2-2",
                callback:function(e){
                    $(e.target).fadeOut();
                    $(e.target).siblings().fadeIn();
                }
            }
        ];
    }
});

Fui.Template.Page3 = Fui.Template.extend({
    css:{
        backgroundPosition:'center bottom'
    },
    config:{
        tpl:Tpl.page3,
        bg:ImgDir('/p3/bg.jpg')
    },
    getTplData:function(){
        return {
            tip:ImgDir('/p3/popup/tip.jpg')
            ,popup1:ImgDir('/p3/popup/1.jpg')
            ,popup2:ImgDir('/p3/popup/2.jpg')
            ,popup3:ImgDir('/p3/popup/3.jpg')
            ,popup4:ImgDir('/p3/popup/4.jpg')
        };
    },
    getGestureItems:function(){
        var me = this
        ;
        return [
            {
                gesture:'tap',
                name:'p3-popup',
                callback:function(e,$tar,param){
                    me.$el.find('.popup').removeClass('show');
                    me.$el.find('.s'+param).show().siblings().hide().parent().addClass('show');
                    Weixin.set('img_url',ImgDir('/w'+param+'.jpg'));
                }
            }
            ,{
                gesture:'tap',
                name:'p3-close',
                callback:function(e,$tar,param){
                    me.$el.find('.popup'+param).removeClass('show');
                }
            }
            ,{
                gesture:'tap',
                name:'p3-pro',
                callback:function(e,$tar,param){
                    me.$el.find('.popup'+param).addClass('show');
                }
            }

            ,{
                gesture:'tap',
                name:'p3-tip',
                callback:function(){
                    me.$el.find('.popup').removeClass('show');
                }
            }
            ,{
                gesture:'tap',
                name:'success',
                callback:function(){
//                    me.$el.find('.success').removeClass('show');
                }
            }

        ];
    }
});



var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:0,
    design:function(){
    },
    listeners:{
        gesture:function(e,gesture){

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
            template:'Photos',
            bg:ImgDir('/p2/bg.jpg'),
            withDesc:false,
            data:[
                {
                    src:ImgDir('/p2/list/1.png')
                }
                ,{
                    src:ImgDir('/p2/list/2.png')
                }
                ,{
                    src:ImgDir('/p2/list/3.png')
                }
                ,{
                    src:ImgDir('/p2/list/4.png')
                }
                ,{
                    src:ImgDir('/p2/list/5.png')
                }
            ]
        }
        ,{
            template:'Page3'
        }

    ]
});

slider.render();