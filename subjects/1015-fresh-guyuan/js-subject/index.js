var slider = new Fui.PageSlider({
    cid:'cover',
    el:'#pack',
    curPage:0,
    arrow:{
        orient:'bottom',
        style:{
            borderColor:'black'
        }
    },
//    slideType:'fade',
    design:function(){
    },
    listeners:{
        gesture:function(e,gesture){
            //tap
            var dt = $(e.target).attr('data-'+gesture);
            switch (dt){
                case 'p1search':
                    slider.toPage(1);
                    break;

                case 'p2video':
                    new Fui.Popup().video('youku',{
                        vid:'XODAyNjI5Mjg4'
                    });
                    break;

                case 'p3video':
                    new Fui.Popup().video('youku',{
                        vid:'XODAyNjI5MzEy'
                    });
                    break;

                case 'p2img':
                    var dp = $(e.target).attr('data-param');
                    new Fui.Popup().img(ImgDir('/p2/pop'+dp+'.png'));
                    break;
                case 'p3img':
                    var dp = $(e.target).attr('data-param');
                    new Fui.Popup().img(ImgDir('/p3/pop'+dp+'.png'));
                    break;

                case 'p5share':
                    new Fui.Popup().img(ImgDir('/share.png'));
                    break;
            }
        }
    },
    data:[
        {
            template:'Base',
            bg: ImgDir('/p1/bg.jpg'),
            cls:'page1',
            design:function(){
                this.$el.append([
                    '<a data-tap="p1search" class="p1-search"></a>'
                ]);
            }
        }
        ,{
            template:'Base',
            bg: ImgDir('/p2/bg.jpg')
            ,cls:'page2'
            ,design:function(){
                this.$el.append([
                    '<a data-tap="p2video" class="p2video"></a>',
                    '<a data-tap="p2img" data-param="1" class="p2img p2img1"></a>',
                    '<a data-tap="p2img" data-param="2" class="p2img p2img2"></a>',
                    '<a data-tap="p2img" data-param="3" class="p2img p2img3"></a>'
                ]);
            }
        }
        ,{
            template:'Base',
            bg: ImgDir('/p3/bg.jpg')
            ,cls:'page3'
            ,design:function(){
                this.$el.append([
                    '<a data-tap="p3video" class="p3video"></a>',
                    '<a data-tap="p3img" data-param="1" class="p3img img1"></a>',
                    '<a data-tap="p3img" data-param="2" class="p3img img2"></a>',
                    '<a data-tap="p3img" data-param="3" class="p3img img3"></a>',
                    '<a data-tap="p3img" data-param="4" class="p3img img4"></a>',
                    '<a data-tap="p3img" data-param="5" class="p3img img5"></a>',
                    '<a data-tap="p3img" data-param="6" class="p3img img6"></a>'
                ]);
            }
        }
        ,{
            template:'Photos',
            bg: ImgDir('/p4/bg.jpg')
            ,data:[
                {
                    src:ImgDir('/p4/list/1.jpg'),
                    title:Title[1],
                    desc:Txt[1]
                }
                ,{
                    src:ImgDir('/p4/list/2.jpg'),
                    title:Title[2],
                    desc:Txt[2]
                }
                ,{
                    src:ImgDir('/p4/list/3.jpg'),
                    title:Title[3],
                    desc:Txt[3]
                }
                ,{
                    src:ImgDir('/p4/list/4.jpg'),
                    title:Title[4],
                    desc:Txt[4]
                }
                ,{
                    src:ImgDir('/p4/list/5.jpg'),
                    title:Title[5],
                    desc:Txt[5]
                }
                ,{
                    src:ImgDir('/p4/list/6.jpg'),
                    title:Title[6],
                    desc:Txt[6]
                }
                ,{
                    src:ImgDir('/p4/list/7.jpg'),
                    title:Title[7],
                    desc:Txt[7]
                }
                ,{
                    src:ImgDir('/p4/list/8.jpg'),
                    title:Title[8],
                    desc:Txt[8]
                }
                ,{
                    src:ImgDir('/p4/list/9.jpg'),
                    title:Title[9],
                    desc:Txt[9]
                }
                ,{
                    src:ImgDir('/p4/list/10.jpg'),
                    title:Title[10],
                    desc:Txt[10]
                }

            ].reverse()
        }
        ,{
            template:'Base',
            bg: ImgDir('/p5/bg.jpg')
            ,cls:'page5'
            ,design:function(){
                this.$el.append([
                    '<a data-tap="p5share" class="share"></a>'
                ]);
            }
        }
    ]
});

slider.render();