
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
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-right:10px;" src="/paris/'+imgDir+'/pro.png" align="left"/>');
                },
                data:[
                    {
                        src:imgDir + '/paris/day1/4.jpg'
                        ,desc:PARIS_DESC[0]
                    }
                    ,{
                        src:imgDir + '/paris/day1/3.jpg'
                        ,desc:PARIS_DESC[0]

                    }
                    ,{
                        src:imgDir + '/paris/day1/2.jpg'
                        ,desc:PARIS_DESC[0]

                    }
                    ,{
                        src:imgDir + '/paris/day1/1.jpg'
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
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-right:10px;" src="/paris/'+imgDir+'/pro.png" align="left"/>');
                },
                data:[
                    {
                        src:imgDir + '/paris/day2/4.jpg'
                        ,desc:PARIS_DESC[1]
                    }
                    ,{
                        src:imgDir + '/paris/day2/3.jpg'
                        ,desc:PARIS_DESC[1]

                    }
                    ,{
                        src:imgDir + '/paris/day2/2.jpg'
                        ,desc:PARIS_DESC[1]

                    }
                    ,{
                        src:imgDir + '/paris/day2/1.jpg'
                        ,desc:PARIS_DESC[1]

                    }
                ]
            }
            /**
             * 巴黎图片列表，第3天
             * */
            ,{
                template:'Photos',
                bg: imgDir +'/paris/bg.jpg'
                ,design:function(){
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-right:10px;" src="'+imgDir+'/pro.png" align="left"/>');
                },
                data:[
                    {
                        src:imgDir + '/paris/day3/4.jpg'
                        ,desc:PARIS_DESC[2]
                    }
                    ,{
                        src:imgDir + '/paris/day3/3.jpg'
                        ,desc:PARIS_DESC[2]

                    }
                    ,{
                        src:imgDir + '/paris/day3/2.jpg'
                        ,desc:PARIS_DESC[2]

                    }
                    ,{
                        src:imgDir + '/paris/day3/1.jpg'
                        ,desc:PARIS_DESC[2]

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
        this.$el.append('<a class="logo"></a>');
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
                        src:imgDir + '/beijing/day1/5.jpg'
                        ,desc:BEIJING_DESC[0]
                    }
                    ,{
                        src:imgDir + '/beijing/day1/4.jpg'
                        ,desc:BEIJING_DESC[0]

                    }
                    ,{
                        src:imgDir + '/beijing/day1/3.jpg'
                        ,desc:BEIJING_DESC[0]

                    }
                    ,{
                        src:imgDir + '/beijing/day1/2.jpg'
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
                        src:imgDir + '/beijing/day2/7.jpg'
                        ,desc:BEIJING_DESC[1]
                    }
                    ,{
                        src:imgDir + '/beijing/day2/6.jpg'
                        ,desc:BEIJING_DESC[1]

                    }
                    ,{
                        src:imgDir + '/beijing/day2/5.jpg'
                        ,desc:BEIJING_DESC[1]

                    }
                    ,{
                        src:imgDir + '/beijing/day2/4.jpg'
                        ,desc:BEIJING_DESC[1]

                    }
                    ,{
                        src:imgDir + '/beijing/day2/3.jpg'
                        ,desc:BEIJING_DESC[1]

                    }
                    ,{
                        src:imgDir + '/beijing/day2/2.jpg'
                        ,desc:BEIJING_DESC[1]

                    }
                    ,{
                        src:imgDir + '/beijing/day2/1.jpg'
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
                        src:imgDir + '/beijing/day3/9.jpg'
                        ,desc:BEIJING_DESC[2]
                    }
                    ,{
                        src:imgDir + '/beijing/day3/8.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                    ,{
                        src:imgDir + '/beijing/day3/7.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                    ,{
                        src:imgDir + '/beijing/day3/6.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                    ,{
                        src:imgDir + '/beijing/day3/5.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                    ,{
                        src:imgDir + '/beijing/day3/4.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                    ,{
                        src:imgDir + '/beijing/day3/3.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                    ,{
                        src:imgDir + '/beijing/day3/2.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                    ,{
                        src:imgDir + '/beijing/day3/1.jpg'
                        ,desc:BEIJING_DESC[2]

                    }
                ]
            }
        /**
         * 北京图片列表，第4天
         * */
            ,{
                template:'Photos',
                bg: imgDir +'/paris/bg.jpg'
                ,design:function(){
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-left:10px;" src="'+imgDir+'/pro.png" align="right"/>');
                },
                data:[
                    {
                        src:imgDir + '/beijing/day4/10.jpg'
                        ,desc:BEIJING_DESC[3]
                    }
                    ,{
                        src:imgDir + '/beijing/day4/9.jpg'
                        ,desc:BEIJING_DESC[3]

                    }
                    ,{
                        src:imgDir + '/beijing/day4/8.jpg'
                        ,desc:BEIJING_DESC[3]

                    }
                    ,{
                        src:imgDir + '/beijing/day4/7.jpg'
                        ,desc:BEIJING_DESC[3]

                    }
                    ,{
                        src:imgDir + '/beijing/day4/6.jpg'
                        ,desc:BEIJING_DESC[3]

                    }
                    ,{
                        src:imgDir + '/beijing/day4/5.jpg'
                        ,desc:BEIJING_DESC[3]

                    }
                    ,{
                        src:imgDir + '/beijing/day4/4.jpg'
                        ,desc:BEIJING_DESC[3]

                    }
                    ,{
                        src:imgDir + '/beijing/day4/3.jpg'
                        ,desc:BEIJING_DESC[3]

                    }
                    ,{
                        src:imgDir + '/beijing/day4/2.jpg'
                        ,desc:BEIJING_DESC[3]
                    }
                    ,{
                        src:imgDir + '/beijing/day4/1.jpg'
                        ,desc:BEIJING_DESC[3]
                    }
                ]
            }
        /**
         * 北京图片列表，第5天
         * */
            ,{
                template:'Photos',
                bg: imgDir +'/paris/bg.jpg'
                ,design:function(){
                    this.$el.find('.desc-pack').prepend('<img data-tap="pro" style="margin-left:10px;" src="'+imgDir+'/pro.png" align="right"/>');
                },
                data:[
                    {
                        src:imgDir + '/beijing/day5/10.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/9.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/8.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/7.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/6.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/5.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/4.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/3.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/2.jpg'
                        ,desc:BEIJING_DESC[4]
                    }
                    ,{
                        src:imgDir + '/beijing/day5/1.jpg'
                        ,desc:BEIJING_DESC[4]
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
        this.$el.append('<a class="logo"></a>');
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