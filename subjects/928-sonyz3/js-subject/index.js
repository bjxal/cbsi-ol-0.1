
var imgDir = getImgPath();


Fui.Template.Page1 = Fui.Template.extend({
    className:'page1',
    config:{
        bg: getImgPath()+'/cover/bg.jpg',
        tpl: '<a data-tap="goToParis" class="paris"></a><a data-tap="goToBeijing" class="beijing"></a>'
    }
});

Fui.Template.Paris = Fui.PageSlider.extend({
    cid:'Paris',
    className:'page-paris',
    config:{
        desc:null,
        data:[
            /**
             * 巴黎图片列表，第一天
             * */
            {
                template:'Photos',
                bg: imgDir +'/paris/bg.jpg'
                ,design:function(){
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-left:10px;" src="'+imgDir+'/pro.png" align="right"/>');
                },
                data:[
                    {
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:PARIS_DESC[0]
                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:PARIS_DESC[0]

                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:PARIS_DESC[0]

                    }
                ]
            }
        /**
         * 巴黎图片列表，第2天
         * */
            ,{
                template:'Photos',
                bg: imgDir +'/paris/bg.jpg'
                ,design:function(){
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-left:10px;" src="'+imgDir+'/pro.png" align="right"/>');
                },
                data:[
                    {
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:PARIS_DESC[1]
                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:PARIS_DESC[1]

                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:PARIS_DESC[1]

                    }
                ]
            }


            ,{
                template:'Base',
                bg:imgDir+'/share.jpg'
            }
        ]
    },

    design:function(){
        this.$el.append('<a class="beijing"><img data-tap="goToBeijing" src="'+imgDir+'/goToBeijing.png"/></a>');
    },
    listeners:{
        gesture:function(e,gesture){
            if(gesture == 'downSwipe'&&this.get('curPage') == 0){
                slider.slide(0);
            }
            if(gesture == 'tap'&&$(e.target).attr('data-tap') == 'goToBeijing'){
                slider.slide(1);
            }
            if(gesture == 'tap'&&$(e.target).attr('data-tap') == 'pro'){
                $('#popup_pro').addClass('show');
            }

        }
    }
});
Fui.Template.Beijing = Fui.PageSlider.extend({
    cid:'beijing',
    className:'page-beijing',
    config:{
        desc:null,
        data:[
            /**
             * 北京图片列表，第1天
             * */
            {
                template:'Photos',
                bg: imgDir +'/paris/bg.jpg'
                ,design:function(){
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-left:10px;" src="'+imgDir+'/pro.png" align="right"/>');
                },
                data:[
                    {
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[0]
                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[0]

                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[0]

                    }
                ]
            }
            /**
             * 北京图片列表，第2天
             * */
            ,{
                template:'Photos',
                bg: imgDir +'/paris/bg.jpg'
                ,design:function(){
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-left:10px;" src="'+imgDir+'/pro.png" align="right"/>');
                },
                data:[
                    {
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[1]
                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[1]

                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[1]

                    }
                ]
            }
            /**
             * 北京图片列表，第3天
             * */
            ,{
                template:'Photos',
                bg: imgDir +'/paris/bg.jpg'
                ,design:function(){
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-left:10px;" src="'+imgDir+'/pro.png" align="right"/>');
                },
                data:[
                    {
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[2]
                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                    ,{
                        src:imgDir + '/beijing/day1/1.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                ]
            }



            ,{
                template:'Base',
                bg:imgDir+'/share.jpg'
            }
        ]
    },
    design:function(){
        this.$el.append('<a class="paris"><img data-tap="goToParis" src="'+imgDir+'/goToParis.png"/></a>');
    },
    listeners:{
        gesture:function(e,gesture){
            if(gesture == 'downSwipe'&&this.get('curPage') == 0){
                slider.slide(0);
            }
            if(gesture == 'tap'&&$(e.target).attr('data-tap') == 'goToParis'){
                slider.slide(2);
            }
            if(gesture == 'tap'&&$(e.target).attr('data-tap') == 'pro'){
                $('#popup_pro').addClass('show');
            }
        }
    }
});



var slider = new Fui.PageSlider({
    cid:'cover',
    el:'#pack',
    curPage:0,
    slideType:'fade',
    design:function(){
        this.$el.append('<a id="popup_pro" class="popup_pro"><img data-tap="pro_detail" src="'+imgDir+'/pro_detail.jpg"/></a>');
    },
    listeners:{
        gesture:function(e,gesture){
            if(gesture == 'tap'&& $(e.target).attr('data-tap') == 'pro_detail'){
                $('#popup_pro').removeClass('show');
            }
        }
    },
    data:[
        {
            template: 'Page1'
            ,getGestureItems:function(){
                return [
                    {
                        gesture:'tap',
                        name:'goToParis',
                        callback:function(){
                            slider.slide(2);
                        }
                    }
                    ,{
                        gesture:'tap',
                        name:'goToBeijing',
                        callback:function(){
                            console.log('index');
                            slider.slide(1);
                        }
                    }
                ];
            }
        }
        ,{
            template:'Beijing'
        }
        ,{
            template:'Paris'
        }

    ]
});

slider.render();